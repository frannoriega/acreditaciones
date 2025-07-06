import { prisma } from "@/lib/prisma"

export type ApplicationType = 'foodtruck' | 'artisan' | 'band' | 'press'

export interface UserApplicationStatus {
  hasApplied: boolean
  applicationType?: ApplicationType
  applicationId?: string
}

/**
 * Check if a user has applied and get their application details
 */
export async function getUserApplicationStatus(email: string): Promise<UserApplicationStatus> {
  // Check if user exists and has applied flag
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !user.hasApplied) {
    return { hasApplied: false }
  }

  // Check which type of application they have
  const [foodtruck, artisan, band, press] = await Promise.all([
    prisma.foodtruck.findUnique({ where: { email } }),
    prisma.artisan.findUnique({ where: { email } }),
    prisma.band.findUnique({ where: { email } }),
    prisma.press.findUnique({ where: { email } })
  ])

  if (foodtruck) {
    return {
      hasApplied: true,
      applicationType: 'foodtruck',
      applicationId: foodtruck.id
    }
  }

  if (artisan) {
    return {
      hasApplied: true,
      applicationType: 'artisan',
      applicationId: artisan.id
    }
  }

  if (band) {
    return {
      hasApplied: true,
      applicationType: 'band',
      applicationId: band.id
    }
  }

  if (press) {
    return {
      hasApplied: true,
      applicationType: 'press',
      applicationId: press.id
    }
  }

  // User has hasApplied = true but no application found (inconsistent state)
  return { hasApplied: false }
}

/**
 * Mark a user as having applied
 */
export async function markUserAsApplied(email: string): Promise<void> {
  await prisma.user.update({
    where: { email },
    data: { hasApplied: true }
  })
}

/**
 * Get the appropriate redirect path based on user's application status
 */
export async function getRedirectPath(email: string): Promise<string> {
  const status = await getUserApplicationStatus(email)
  
  if (status.hasApplied) {
    return '/u'
  } else {
    return '/u/nuevo'
  }
} 