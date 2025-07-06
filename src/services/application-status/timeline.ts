import { prisma } from "@/lib/prisma"

export type ApplicationType = 'foodtruck' | 'artisan' | 'band' | 'press'
export type StatusType = 'PENDING_APPROVAL' | 'CHANGES_REQUESTED' | 'APPROVED' | 'REJECTED'

export interface StatusChange {
  status: StatusType
  message?: string
}

/**
 * Add a new status to an application's timeline
 */
export async function addStatusToTimeline(
  applicationType: ApplicationType,
  applicationId: string,
  statusChange: StatusChange
) {
  const data = {
    status: statusChange.status,
    message: statusChange.message,
    ...(applicationType === 'foodtruck' && { foodtruckId: applicationId }),
    ...(applicationType === 'artisan' && { artisanId: applicationId }),
    ...(applicationType === 'band' && { bandId: applicationId }),
    ...(applicationType === 'press' && { pressId: applicationId }),
  }

  return await prisma.applicationStatus.create({
    data
  })
}

/**
 * Get the current status of an application (latest status in timeline)
 */
export async function getCurrentStatus(
  applicationType: ApplicationType,
  applicationId: string
) {
  const where = {
    ...(applicationType === 'foodtruck' && { foodtruckId: applicationId }),
    ...(applicationType === 'artisan' && { artisanId: applicationId }),
    ...(applicationType === 'band' && { bandId: applicationId }),
    ...(applicationType === 'press' && { pressId: applicationId }),
  }

  return await prisma.applicationStatus.findFirst({
    where,
    orderBy: { createdAt: 'desc' }
  })
}

/**
 * Get the complete status timeline for an application
 */
export async function getStatusTimeline(
  applicationType: ApplicationType,
  applicationId: string
) {
  const where = {
    ...(applicationType === 'foodtruck' && { foodtruckId: applicationId }),
    ...(applicationType === 'artisan' && { artisanId: applicationId }),
    ...(applicationType === 'band' && { bandId: applicationId }),
    ...(applicationType === 'press' && { pressId: applicationId }),
  }

  return await prisma.applicationStatus.findMany({
    where,
    orderBy: { createdAt: 'asc' }
  })
}

/**
 * Create initial status for a new application
 */
export async function createInitialStatus(
  applicationType: ApplicationType,
  applicationId: string
) {
  return await addStatusToTimeline(applicationType, applicationId, {
    status: 'PENDING_APPROVAL',
    message: 'Aplicación enviada para revisión'
  })
} 