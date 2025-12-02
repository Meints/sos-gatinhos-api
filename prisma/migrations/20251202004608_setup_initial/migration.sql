-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('SUPER_ADMIN', 'ADMIN', 'VOLUNTEER', 'ADOPTER');

-- CreateEnum
CREATE TYPE "Color" AS ENUM ('BLACK', 'WHITE', 'GRAY', 'ORANGE', 'CREAM', 'BROWN', 'CALICO', 'TORTOISESHELL', 'TABBY_BROWN', 'TABBY_GRAY', 'TABBY_ORANGE', 'BICOLOR_BLACK', 'BICOLOR_GRAY', 'BICOLOR_ORANGE', 'POINT', 'VAN', 'SHADED', 'SMOKE', 'MINK');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');

-- CreateEnum
CREATE TYPE "CatStatus" AS ENUM ('AVAILABLE', 'ADOPTED');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED', 'CANCELLED', 'COMPLETED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADOPTER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adopter_profiles" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "phone" TEXT,
    "cpf" TEXT,
    "birthDate" TIMESTAMP(3),

    CONSTRAINT "adopter_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" TEXT NOT NULL,
    "profileId" TEXT NOT NULL,
    "cep" TEXT,
    "street" TEXT,
    "number" TEXT,
    "complement" TEXT,
    "district" TEXT,
    "city" TEXT,
    "state" TEXT,

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cats" (
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

    CONSTRAINT "cats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "adoptions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "catId" TEXT NOT NULL,
    "adoptionDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "AdoptionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "adoptions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "adopter_profiles_userId_key" ON "adopter_profiles"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "addresses_profileId_key" ON "addresses"("profileId");

-- AddForeignKey
ALTER TABLE "adopter_profiles" ADD CONSTRAINT "adopter_profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "adopter_profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cats" ADD CONSTRAINT "cats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "adoptions" ADD CONSTRAINT "adoptions_catId_fkey" FOREIGN KEY ("catId") REFERENCES "cats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
