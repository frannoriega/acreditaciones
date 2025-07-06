import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { markUserAsApplied } from '@/services/users/application-status'
import { newFoodtruckFormSchema } from '@/components/templates/sign-up-form/foodtruck/form/schemas'

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

    // Check if user already has a foodtruck application
    const existingFoodtruck = await prisma.foodtruck.findUnique({
      where: { email: userEmail }
    });

    if (existingFoodtruck) {
      return NextResponse.json(
        { error: "Ya tienes una aplicación de foodtruck registrada" },
        { status: 400 }
      );
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = newFoodtruckFormSchema.parse(body);

    // Create foodtruck application
    const foodtruck = await prisma.foodtruck.create({
      data: {
        email: userEmail,
        foodtruckName: validatedData.foodtruckName,
        employees: validatedData.employees,
        cuisineType: validatedData.cuisineType,
        menuItems: validatedData.menuItems,
        lot: validatedData.lot || null,
        status: "PENDING_APPROVAL"
      }
    });

    // Mark user as having applied
    await markUserAsApplied(userEmail);

    return NextResponse.json({ 
      message: 'Aplicación de foodtruck enviada exitosamente',
      foodtruck 
    });

  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Datos de formulario inválidos', details: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
} 