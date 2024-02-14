-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "createBy" UUID;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "createBy" UUID;
