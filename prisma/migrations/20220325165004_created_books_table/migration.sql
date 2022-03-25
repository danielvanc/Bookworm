/*
  Warnings:

  - You are about to drop the column `is_registered` on the `profile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "profile" DROP COLUMN "is_registered";

-- CreateTable
CREATE TABLE "books" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "user_id" VARCHAR NOT NULL,
    "book_id" VARCHAR NOT NULL,
    "read" BOOLEAN NOT NULL,
    "reading" BOOLEAN NOT NULL,
    "watching" BOOLEAN NOT NULL,
    "bookmarked" BOOLEAN NOT NULL,

    CONSTRAINT "books_pkey" PRIMARY KEY ("id")
);
