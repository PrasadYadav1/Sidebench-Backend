/*
  Warnings:

  - You are about to drop the column `attire_type` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `fit` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `item_type` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `keyword` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `season` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `waist_location` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `wear_type` on the `item` table. All the data in the column will be lost.
  - Added the required column `itemType_id` to the `item` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "item" DROP COLUMN "attire_type",
DROP COLUMN "color",
DROP COLUMN "fit",
DROP COLUMN "item_type",
DROP COLUMN "keyword",
DROP COLUMN "season",
DROP COLUMN "waist_location",
DROP COLUMN "wear_type",
ADD COLUMN     "itemType_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "item_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_sub_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_type_id" INTEGER NOT NULL,

    CONSTRAINT "item_sub_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoe_height" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_type_id" INTEGER NOT NULL,

    CONSTRAINT "shoe_height_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "jewelry_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "item_sub_type_id" INTEGER NOT NULL,

    CONSTRAINT "jewelry_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attire_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "attire_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wear_type" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "wear_type_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "season" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "color" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "color_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fit" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "waist_location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "waist_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "key_word" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "key_word_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cloth_size" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "usa" VARCHAR(20) NOT NULL,
    "uk" VARCHAR(20) NOT NULL,
    "au" VARCHAR(20) NOT NULL,
    "denim" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cloth_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoe_size" (
    "id" SERIAL NOT NULL,
    "usa" VARCHAR(20) NOT NULL,
    "uk" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shoe_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_item_sub_types" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "itemSubTypeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_item_sub_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_attire_types" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "attireTypeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_attire_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_wear_types" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "wearTypeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_wear_types_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_seasons" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_seasons_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_colors" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "colorId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_fit" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "fitId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_fit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_waist_location" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "waistLocationId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_waist_location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_keyword" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "keywordId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_keyword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_cloth_size" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "clothSizeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_cloth_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_shoe_size" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "shoeSizeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_shoe_size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_shoe_height" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "shoeHeightId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_shoe_height_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item_on_jewelry_type" (
    "id" SERIAL NOT NULL,
    "itemId" INTEGER NOT NULL,
    "jewelryTypeId" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_on_jewelry_type_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "item_sub_type" ADD CONSTRAINT "item_sub_type_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoe_height" ADD CONSTRAINT "shoe_height_item_type_id_fkey" FOREIGN KEY ("item_type_id") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "jewelry_type" ADD CONSTRAINT "jewelry_type_item_sub_type_id_fkey" FOREIGN KEY ("item_sub_type_id") REFERENCES "item_sub_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item" ADD CONSTRAINT "item_itemType_id_fkey" FOREIGN KEY ("itemType_id") REFERENCES "item_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_item_sub_types" ADD CONSTRAINT "item_on_item_sub_types_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_item_sub_types" ADD CONSTRAINT "item_on_item_sub_types_itemSubTypeId_fkey" FOREIGN KEY ("itemSubTypeId") REFERENCES "item_sub_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_attire_types" ADD CONSTRAINT "item_on_attire_types_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_attire_types" ADD CONSTRAINT "item_on_attire_types_attireTypeId_fkey" FOREIGN KEY ("attireTypeId") REFERENCES "attire_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_wear_types" ADD CONSTRAINT "item_on_wear_types_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_wear_types" ADD CONSTRAINT "item_on_wear_types_wearTypeId_fkey" FOREIGN KEY ("wearTypeId") REFERENCES "wear_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_seasons" ADD CONSTRAINT "item_on_seasons_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_seasons" ADD CONSTRAINT "item_on_seasons_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_colors" ADD CONSTRAINT "item_on_colors_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_colors" ADD CONSTRAINT "item_on_colors_colorId_fkey" FOREIGN KEY ("colorId") REFERENCES "color"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_fit" ADD CONSTRAINT "item_on_fit_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_fit" ADD CONSTRAINT "item_on_fit_fitId_fkey" FOREIGN KEY ("fitId") REFERENCES "fit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_waist_location" ADD CONSTRAINT "item_on_waist_location_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_waist_location" ADD CONSTRAINT "item_on_waist_location_waistLocationId_fkey" FOREIGN KEY ("waistLocationId") REFERENCES "waist_location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_keyword" ADD CONSTRAINT "item_on_keyword_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_keyword" ADD CONSTRAINT "item_on_keyword_keywordId_fkey" FOREIGN KEY ("keywordId") REFERENCES "key_word"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_cloth_size" ADD CONSTRAINT "item_on_cloth_size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_cloth_size" ADD CONSTRAINT "item_on_cloth_size_clothSizeId_fkey" FOREIGN KEY ("clothSizeId") REFERENCES "cloth_size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_shoe_size" ADD CONSTRAINT "item_on_shoe_size_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_shoe_size" ADD CONSTRAINT "item_on_shoe_size_shoeSizeId_fkey" FOREIGN KEY ("shoeSizeId") REFERENCES "shoe_size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_shoe_height" ADD CONSTRAINT "item_on_shoe_height_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_shoe_height" ADD CONSTRAINT "item_on_shoe_height_shoeHeightId_fkey" FOREIGN KEY ("shoeHeightId") REFERENCES "shoe_height"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_jewelry_type" ADD CONSTRAINT "item_on_jewelry_type_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "item_on_jewelry_type" ADD CONSTRAINT "item_on_jewelry_type_jewelryTypeId_fkey" FOREIGN KEY ("jewelryTypeId") REFERENCES "jewelry_type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
