/*
  Warnings:

  - You are about to drop the `cats` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `role` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'WHITE', 'GRAY', 'ORANGE', 'CREAM', 'BROWN', 'CALICO', 'TORTOISESHELL', 'TABBY_BROWN', 'TABBY_GRAY', 'TABBY_ORANGE', 'BICOLOR_BLACK', 'BICOLOR_GRAY', 'BICOLOR_ORANGE', 'POINT', 'VAN', 'SHADED', 'SMOKE', 'MINK');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CatStatus" AS ENUM ('AVAILABLE', 'ADOPTED');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "role" SET NOT NULL;

-- DropTable
DROP TABLE "cats";

-- CreateTable
CREATE TABLE "adopter_profile" (
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "cpf" TEXT,
    "birthDate" TIMESTAMP(3),
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,

    CONSTRAINT "adopter_profile_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "cat" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "color" "Color" NOT NULL,
    "gender" "Gender" NOT NULL,
    "status" "CatStatus" NOT NULL DEFAULT 'AVAILABLE',
    "description" TEXT,
    "photos" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "birthDate" TIMESTAMP(3),
    "isNeutered" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "cat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoption" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "adoptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AdoptionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adoption_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "adoption_userId_idx" ON "adoption"("userId");

-- CreateIndex
CREATE INDEX "adoption_catId_idx" ON "adoption"("catId");

-- AddForeignKey
ALTER TABLE "adopter_profile" ADD CONSTRAINT "adopter_profile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cat" ADD CONSTRAINT "cat_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption" ADD CONSTRAINT "adoption_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoption" ADD CONSTRAINT "adoption_catId_fkey" FOREIGN KEY ("catId") REFERENCES "cat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
