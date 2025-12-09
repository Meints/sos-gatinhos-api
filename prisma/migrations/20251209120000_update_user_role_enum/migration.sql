-- Ensure the enum exists with the right values (safe for fresh DBs)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_type t
    JOIN pg_namespace n ON n.oid = t.typnamespace
    WHERE t.typname = 'UserRole'
      AND n.nspname = 'public'
  ) THEN
    ALTER TYPE "UserRole" RENAME TO "UserRole_old";
  END IF;
END $$;

CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'COLLABORATOR', 'ADOPTER');

-- Add the column if it does not exist (for DBs missing the field)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND table_name = 'user'
      AND column_name = 'role'
  ) THEN
    ALTER TABLE "user" ADD COLUMN "role" TEXT DEFAULT 'ADOPTER';
  END IF;
END $$;

-- Convert column to enum and set default
ALTER TABLE "user" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "user" ALTER COLUMN "role" TYPE "UserRole" USING "role"::text::"UserRole";
ALTER TABLE "user" ALTER COLUMN "role" SET DEFAULT 'ADOPTER';

DROP TYPE IF EXISTS "UserRole_old";

