import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json([
    {
      title: "Great Roommate",
      body: "Quiet and respectful",
      reviewer: "John",
      stars: 5,
    },
    { title: "Friendly", body: "Fun to live with", reviewer: "Jane", stars: 4 },
  ]);
}
