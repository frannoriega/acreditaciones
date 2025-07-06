import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Get user info
    const user = await prisma.user.findUnique({
      where: { email: userEmail }
    });

    // Check all application types
    const [foodtruck, artisan, band, press] = await Promise.all([
      prisma.foodtruck.findUnique({ where: { email: userEmail } }),
      prisma.artisan.findUnique({ where: { email: userEmail } }),
      prisma.band.findUnique({ where: { email: userEmail } }),
      prisma.press.findUnique({ where: { email: userEmail } })
    ]);

    return NextResponse.json({
      user: {
        email: userEmail,
        hasApplied: user?.hasApplied || false,
        name: user?.name,
        emailVerified: user?.emailVerified
      },
      applications: {
        foodtruck: foodtruck ? { id: foodtruck.id, status: foodtruck.status } : null,
        artisan: artisan ? { id: artisan.id, status: artisan.status } : null,
        band: band ? { id: band.id, status: band.status } : null,
        press: press ? { id: press.id, status: press.status } : null
      }
    });

  } catch (error) {
    console.error("Error in debug endpoint:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 