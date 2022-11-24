/*
  Warnings:

  - A unique constraint covering the columns `[item_number]` on the table `item` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `currency_id` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `item_number` to the `item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type_name` to the `item_type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" ADD COLUMN     "brand" VARCHAR(300),
ADD COLUMN     "currency_id" INTEGER NOT NULL,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "item_number" VARCHAR(50) NOT NULL,
ALTER COLUMN "price" SET DATA TYPE DECIMAL(65,30);

-- AlterTable
ALTER TABLE "item_type" ADD COLUMN     "type_name" VARCHAR(20) NOT NULL;

-- AlterTable
ALTER TABLE "look_items" ADD COLUMN     "is_primary" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "message" TEXT;

-- CreateTable
CREATE TABLE "currency" (
    "id" SERIAL NOT NULL,
    "country" VARCHAR(30) NOT NULL,
    "name" VARCHAR(30) NOT NULL,
    "code" VARCHAR(10) NOT NULL,
    "symbol" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "currency_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "item_item_number_key" ON "item"("item_number");

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_currency_id_fkey" FOREIGN KEY ("currency_id") REFERENCES "currency"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
