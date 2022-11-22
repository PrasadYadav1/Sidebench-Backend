-- CreateTable
CREATE TABLE "lookbook_status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(20) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "lookbook_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "lookbook" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "no_of_looks" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "occasion" VARCHAR(300) NOT NULL,
    "due_by" TIMESTAMPTZ NOT NULL,
    "sent_at" TIMESTAMPTZ,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "lookbook_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "look" (
    "id" SERIAL NOT NULL,
    "customer_id" INTEGER NOT NULL,
    "lookbook_id" INTEGER NOT NULL,
    "status_id" INTEGER NOT NULL,
    "occasion" VARCHAR(300) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "look_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "item" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(1024) NOT NULL,
    "image_url" VARCHAR(1024) NOT NULL,
    "name" VARCHAR(300) NOT NULL,
    "price" INTEGER NOT NULL,
    "item_type" INTEGER[],
    "attire_type" INTEGER[],
    "wear_type" INTEGER[],
    "season" INTEGER[],
    "color" INTEGER[],
    "fit" INTEGER[],
    "waist_location" INTEGER[],
    "keyword" INTEGER[],
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "item_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "look_items" (
    "id" SERIAL NOT NULL,
    "look_id" INTEGER NOT NULL,
    "item_id" INTEGER NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_by" INTEGER,

    CONSTRAINT "look_items_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "lookbook" ADD CONSTRAINT "lookbook_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "lookbook_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "look" ADD CONSTRAINT "look_lookbook_id_fkey" FOREIGN KEY ("lookbook_id") REFERENCES "lookbook"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "look" ADD CONSTRAINT "look_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "lookbook_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "look_items" ADD CONSTRAINT "look_items_look_id_fkey" FOREIGN KEY ("look_id") REFERENCES "look"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "look_items" ADD CONSTRAINT "look_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "item"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
