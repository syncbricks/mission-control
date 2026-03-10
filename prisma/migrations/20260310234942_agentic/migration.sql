-- CreateEnum
CREATE TYPE "ExecutionStatus" AS ENUM ('IDLE', 'QUEUED', 'RUNNING', 'DONE', 'FAILED');

-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('NOT_REQUIRED', 'PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT 'NOT_REQUIRED',
ADD COLUMN     "executionStatus" "ExecutionStatus" NOT NULL DEFAULT 'IDLE',
ADD COLUMN     "gateway" TEXT DEFAULT 'local';

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "taskId" TEXT,
    "agentId" TEXT,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE SET NULL ON UPDATE CASCADE;
