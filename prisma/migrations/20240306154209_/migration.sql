/*
  Warnings:

  - Changed the type of `operation` on the `Transaction` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "operation",
ADD COLUMN     "operation" CHAR(8) NOT NULL;

-- DropEnum
DROP TYPE "OperationType";
