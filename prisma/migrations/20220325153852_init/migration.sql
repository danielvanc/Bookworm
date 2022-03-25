-- CreateTable
CREATE TABLE "profile" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "is_registered" BOOLEAN DEFAULT false,
    "email" VARCHAR,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);
