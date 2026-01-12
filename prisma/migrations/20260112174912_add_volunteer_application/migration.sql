-- CreateEnum
CREATE TYPE "ApplicationStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateEnum
CREATE TYPE "RouteRunStatus" AS ENUM ('IN_PROGRESS', 'COMPLETED', 'ABANDONED');

-- AlterEnum
ALTER TYPE "UserRole" ADD VALUE 'VOLUNTEER';

-- CreateTable
CREATE TABLE "volunteer_application" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "status" "ApplicationStatus" NOT NULL DEFAULT 'PENDING',
    "motivation" TEXT NOT NULL,
    "availability" TEXT NOT NULL,
    "linkedinProfile" TEXT,
    "phone" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_point" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "sequence" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "latitude" DOUBLE PRECISION,
    "longitude" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_point_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_assignment" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "active" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "volunteer_assignment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "route_run" (
    "id" TEXT NOT NULL,
    "routeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "status" "RouteRunStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "route_run_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "check_in" (
    "id" TEXT NOT NULL,
    "routeRunId" TEXT NOT NULL,
    "routePointId" TEXT NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "photoUrl" TEXT,
    "notes" TEXT,

    CONSTRAINT "check_in_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "volunteer_application_userId_idx" ON "volunteer_application"("userId");

-- CreateIndex
CREATE INDEX "volunteer_assignment_userId_idx" ON "volunteer_assignment"("userId");

-- CreateIndex
CREATE INDEX "volunteer_assignment_routeId_idx" ON "volunteer_assignment"("routeId");

-- CreateIndex
CREATE UNIQUE INDEX "volunteer_assignment_userId_routeId_key" ON "volunteer_assignment"("userId", "routeId");

-- CreateIndex
CREATE INDEX "route_run_userId_idx" ON "route_run"("userId");

-- CreateIndex
CREATE INDEX "route_run_routeId_idx" ON "route_run"("routeId");

-- CreateIndex
CREATE INDEX "check_in_routeRunId_idx" ON "check_in"("routeRunId");

-- CreateIndex
CREATE INDEX "check_in_routePointId_idx" ON "check_in"("routePointId");

-- AddForeignKey
ALTER TABLE "volunteer_application" ADD CONSTRAINT "volunteer_application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_point" ADD CONSTRAINT "route_point_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_assignment" ADD CONSTRAINT "volunteer_assignment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "volunteer_assignment" ADD CONSTRAINT "volunteer_assignment_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_run" ADD CONSTRAINT "route_run_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "route"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "route_run" ADD CONSTRAINT "route_run_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_routeRunId_fkey" FOREIGN KEY ("routeRunId") REFERENCES "route_run"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "check_in" ADD CONSTRAINT "check_in_routePointId_fkey" FOREIGN KEY ("routePointId") REFERENCES "route_point"("id") ON DELETE CASCADE ON UPDATE CASCADE;
