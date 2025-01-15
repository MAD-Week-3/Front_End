@app.route('/profile', methods=['POST'])
def save_profile():
    """
    - user_id(필수) + 프로필 상세정보를 받아 UserProfile 테이블에 INSERT
    - Base64로 인코딩된 이미지를 받아서 서버에 저장 -> photo_url 에 경로 저장
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No JSON data provided"}), 400

        user_id = data.get('user_id')
        age = data.get('age')
        phone = data.get('phone')            # 연락처
        is_smoking_str = data.get('is_smoking')  # 흡연 여부('0' or '1')
        snoring_str = data.get('snoring')        # 코골이 여부('0' or '1')
        introduction = data.get('introduction')  # 한 줄 소개
        wishes = data.get('wishes')              # 희망 사항
        preferred_region = data.get('preferred_region')  # 살고 싶은 지역
        budget = data.get('budget')             # 예산
        profile_image_base64 = data.get('profile_image')  # Base64

        if not user_id:
            return jsonify({"success": False, "message": "user_id is required"}), 400

        # 흡연 여부, 코골이 여부 변환
        is_smoking = 1 if is_smoking_str == '1' else 0
        snoring = 1 if snoring_str == '1' else 0

        # Base64 이미지를 디코딩해서 저장할 경우
        photo_url = None
        if profile_image_base64:
            UPLOAD_FOLDER = 'uploads'
            if not os.path.exists(UPLOAD_FOLDER):
                os.makedirs(UPLOAD_FOLDER)

            header, encoded = profile_image_base64.split(',', 1)
            file_extension = header.split('/')[1].split(';')[0]  # 예: jpeg, png 등
            filename = f"{uuid.uuid4()}.{file_extension}"
            save_path = os.path.join(UPLOAD_FOLDER, filename)

            with open(save_path, "wb") as f:
                f.write(base64.b64decode(encoded))

            # DB에는 이미지 파일 경로를 저장
            photo_url = save_path

        # UserProfile에 데이터 삽입
        insert_sql = """
            INSERT INTO UserProfile (
                user_id,
                age,
                phone,
                photo_url,
                is_smoking,
                snoring,
                introduction,
                wishes,
                preferred_region,
                budget
            ) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """
        cursor.execute(insert_sql, (
            user_id,
            age,
            phone,
            photo_url,
            is_smoking,
            snoring,
            introduction,
            wishes,
            preferred_region,
            budget
        ))

        connection.commit()
        new_profile_id = cursor.lastrowid

        return jsonify({
            "success": True,
            "message": "프로필 정보가 저장되었습니다.",
            "profile_id": new_profile_id
        }), 201

    except Exception as e:
        if 'connection' in locals():
            connection.rollback()
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

##################################
# 4) 특정 유저의 프로필 상세 + 리뷰 조회
##################################
@app.route('/profile_detail', methods=['POST'])
def get_profile_detail():
    """
    - POST Body(JSON): { "user_id": 7 }
    - user_id에 맞는 프로필 + 유저 정보 + 리뷰 리스트 반환
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No JSON data provided"}), 400

        user_id = data.get('user_id')
        if not user_id:
            return jsonify({"success": False, "message": "user_id is required"}), 400

        # 유저 + 프로필 조회
        query_profile = """
            SELECT 
                U.user_id,
                U.username,
                U.name,
                P.profile_id,
                P.age,
                P.phone,
                P.photo_url,
                P.is_smoking,
                P.snoring,
                P.introduction,
                P.wishes,
                P.preferred_region,
                P.budget,
                P.created_at,
                P.updated_at
            FROM UserProfile AS P
            JOIN User AS U
              ON P.user_id = U.user_id
            WHERE U.user_id = %s
        """
        cursor.execute(query_profile, (user_id,))
        profile_row = cursor.fetchone()

        if not profile_row:
            return jsonify({"success": False, "message": "해당 유저의 프로필이 존재하지 않습니다."}), 404

        # 리뷰 조회
        query_review = """
            SELECT 
                R.review_id,
                R.content,
                R.created_at,
                reviewer.username AS reviewer_username
            FROM Review AS R
            JOIN User AS reviewer
              ON R.reviewer_id = reviewer.user_id
            WHERE R.reviewee_id = %s
            ORDER BY R.created_at DESC
        """
        cursor.execute(query_review, (user_id,))
        review_rows = cursor.fetchall()

        return jsonify({
            "success": True,
            "profile": profile_row,
            "reviews": review_rows
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

##################################
# 5) 팔로우 요청
##################################
@app.route('/follow', methods=['POST'])
def follow_user():
    """
    - JSON: { "follower_id": 1, "following_id": 2 }
    - follower_id가 following_id를 팔로우
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No JSON data provided"}), 400

        follower_id = data.get('follower_id')
        following_id = data.get('following_id')

        if not follower_id or not following_id:
            return jsonify({"success": False, "message": "follower_id와 following_id는 필수입니다."}), 400
        if follower_id == following_id:
            return jsonify({"success": False, "message": "자신을 팔로우할 수 없습니다."}), 400

        # 이미 팔로우 상태인지 확인
        check_sql = """
            SELECT follow_id FROM Follow
            WHERE follower_id = %s AND following_id = %s
        """
        cursor.execute(check_sql, (follower_id, following_id))
        existing = cursor.fetchone()
        if existing:
            return jsonify({"success": False, "message": "이미 팔로우 상태입니다."}), 400

        # 팔로우 추가
        insert_sql = """
            INSERT INTO Follow (follower_id, following_id)
            VALUES (%s, %s)
        """
        cursor.execute(insert_sql, (follower_id, following_id))
        connection.commit()

        return jsonify({"success": True, "message": "팔로우 완료"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()


##################################
# 6) 언팔로우 요청
##################################
@app.route('/unfollow', methods=['POST'])
def unfollow_user():
    """
    - JSON: { "follower_id": 1, "following_id": 2 }
    - follower_id가 following_id를 언팔로우
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No JSON data provided"}), 400

        follower_id = data.get('follower_id')
        following_id = data.get('following_id')

        if not follower_id or not following_id:
            return jsonify({"success": False, "message": "follower_id와 following_id는 필수입니다."}), 400
        if follower_id == following_id:
            return jsonify({"success": False, "message": "자신을 언팔로우할 수 없습니다."}), 400

        # 팔로우 삭제
        delete_sql = """
            DELETE FROM Follow
            WHERE follower_id = %s AND following_id = %s
        """
        cursor.execute(delete_sql, (follower_id, following_id))
        connection.commit()

        return jsonify({"success": True, "message": "언팔로우 완료"}), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()


##################################
# 7) 리뷰 작성
##################################
@app.route('/review', methods=['POST'])
def create_review():
    """
    - JSON: { "reviewer_id": 1, "reviewee_id": 2, "rating": 5, "content": "좋은 룸메이트!" }
    - reviewer_id가 reviewee_id에게 리뷰 작성
    - 조건: 서로 팔로우 관계인지 확인 후 INSERT
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor()

        data = request.get_json()
        if not data:
            return jsonify({"success": False, "message": "No JSON data provided"}), 400

        reviewer_id = data.get('reviewer_id')
        reviewee_id = data.get('reviewee_id')
        rating = data.get('rating')
        content = data.get('content', '')

        if not reviewer_id or not reviewee_id or not rating:
            return jsonify({"success": False, "message": "reviewer_id, reviewee_id, rating은 필수입니다."}), 400
        if not (1 <= int(rating) <= 5):
            return jsonify({"success": False, "message": "평점은 1~5 사이의 값이어야 합니다."}), 400
        if reviewer_id == reviewee_id:
            return jsonify({"success": False, "message": "자신에게 리뷰를 작성할 수 없습니다."}), 400

        # 팔로우 관계 확인 (서로 맞팔 상태 확인)
        check_follow_sql = """
            SELECT 1 FROM Follow f1
            JOIN Follow f2
            ON f1.follower_id = f2.following_id AND f1.following_id = f2.follower_id
            WHERE f1.follower_id = %s AND f1.following_id = %s
        """
        cursor.execute(check_follow_sql, (reviewer_id, reviewee_id))
        follow_status = cursor.fetchone()

        if not follow_status:
            return jsonify({"success": False, "message": "서로 팔로우 상태가 아닙니다."}), 403

        # 리뷰 추가
        insert_sql = """
            INSERT INTO Review (reviewer_id, reviewee_id, rating, content)
            VALUES (%s, %s, %s, %s)
        """
        cursor.execute(insert_sql, (reviewer_id, reviewee_id, rating, content))
        connection.commit()

        return jsonify({"success": True, "message": "리뷰 작성 완료"}), 201

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()

##################################
# 8) 상단 6개 리뷰 반환
##################################
@app.route('/reviews', methods=['GET'])
def get_top_reviews():
    """
    - 최신 리뷰 상위 6개 반환
    """
    try:
        connection = pymysql.connect(**db_config)
        cursor = connection.cursor(pymysql.cursors.DictCursor)

        # 최신 리뷰 상위 6개를 가져오는 쿼리
        query = """
            SELECT 
                R.review_id,
                R.reviewer_id,
                R.reviewee_id,
                R.rating,
                R.content,
                R.created_at,
                reviewer.username AS reviewer_username,
                reviewee.username AS reviewee_username
            FROM Review AS R
            JOIN User AS reviewer ON R.reviewer_id = reviewer.user_id
            JOIN User AS reviewee ON R.reviewee_id = reviewee.user_id
            ORDER BY R.created_at DESC
            LIMIT 6
        """
        cursor.execute(query)
        reviews = cursor.fetchall()  # 최신 리뷰 상위 6개

        return jsonify({
            "success": True,
            "reviews": reviews
        }), 200

    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        if 'connection' in locals():
            connection.close()
