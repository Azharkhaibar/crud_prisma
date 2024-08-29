import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// post
export async function POST(req: Request) {
  try {
    const { name, email } = await req.json();

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
    }

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "An error occurred while creating the user." }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

// fecthing
export async function GET() {
  try {
    const getResponse = await prisma.user.findMany({})
    return NextResponse.json(getResponse)
  } catch (error) {
    console.error('error fetching users', error);
    return NextResponse.json({ error: 'error bang'})
  
  }
}
