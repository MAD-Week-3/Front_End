import prisma from "../../../utils/prisma";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  if (!id) {
    return NextResponse.json(
      { error: "Roommate ID not provided" },
      { status: 400 }
    );
  }

  try {
    const roommate = await prisma.user.findUnique({
      where: { user_id: parseInt(id, 10) }, // Convert `id` to a number
    });

    if (!roommate) {
      return NextResponse.json(
        { error: "Roommate not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(roommate);
  } catch (error) {
    console.error("Error fetching roommate:", error);
    return NextResponse.json(
      { error: "Failed to fetch roommate" },
      { status: 500 }
    );
  }
}
