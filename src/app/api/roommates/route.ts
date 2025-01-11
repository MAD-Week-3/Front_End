import prisma from '../../utils/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all users from the database
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
