import { NextResponse } from "next/server";

// Mock reviews data
const reviews = [
  { id: 1, text: "Great roommate!", stars: 5 },
  { id: 2, text: "Very clean and respectful.", stars: 4 },
];

// Handle GET requests
export async function GET() {
  return NextResponse.json(reviews); // Return all reviews
}

// Handle POST requests
export async function POST(req: Request) {
  const body = await req.json();
  const newReview = { id: reviews.length + 1, ...body };
  reviews.push(newReview);
  return NextResponse.json(newReview, { status: 201 });
}
