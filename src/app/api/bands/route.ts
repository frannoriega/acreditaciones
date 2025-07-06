import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { markUserAsApplied } from "@/services/users/application-status";

export async function POST(request: NextRequest) {
  try {
    // Get the current session
    const session = await auth();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized - User not authenticated" },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;

    // Check if user already has an application
    const existingApplication = await prisma.band.findUnique({
      where: { email: userEmail }
    });

    if (existingApplication) {
      return NextResponse.json(
        { error: "User already has a band application" },
        { status: 400 }
      );
    }

    // Parse the form data
    const formData = await request.formData();
    
    // Extract form fields
    const name = formData.get("name") as string;
    const bio = formData.get("bio") as string;
    const gender = formData.get("gender") as string;
    const support = parseInt(formData.get("support") as string);
    const fee = parseInt(formData.get("fee") as string);
    
    // Handle discography array
    const discographyData = formData.get("discography") as string;
    const discography = discographyData ? JSON.parse(discographyData) : [];
    
    // Handle stage array
    const stageData = formData.get("stage") as string;
    const stage = stageData ? JSON.parse(stageData) : [];
    


    // Validate required fields
    if (!name || !bio || !gender) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the band application
    const band = await prisma.band.create({
      data: {
        email: userEmail,
        name,
        bio,
        gender,
        discography,
        support,
        fee,
        stage,
        status: "PENDING_APPROVAL"
      }
    });

    // Mark user as having applied
    await markUserAsApplied(userEmail);

    return NextResponse.json({
      success: true,
      bandId: band.id,
      message: "Band application submitted successfully"
    });

  } catch (error) {
    console.error("Error creating band application:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 