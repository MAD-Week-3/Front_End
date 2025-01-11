-- CreateEnum
CREATE TYPE "Smoking" AS ENUM ('yes', 'no');

-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "password" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "phone_num" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "smoking" "Smoking" NOT NULL,
    "education" TEXT,
    "preference" TEXT,
    "contact_info" TEXT,
    "desired_location" TEXT,
    "bio" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "image" BYTEA,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);
