import { NextRequest, NextResponse } from "next/server";
import { getUserApplicationStatus } from "@/services/users/application-status";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");

    if (!email) {
      return NextResponse.json(
        { error: "Email parameter is required" },
        { status: 400 }
      );
    }

    const status = await getUserApplicationStatus(email);

    return NextResponse.json({
      hasApplied: status.hasApplied,
      applicationType: status.applicationType,
      applicationId: status.applicationId,
    });
  } catch (error) {
    console.error("Error checking application status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 