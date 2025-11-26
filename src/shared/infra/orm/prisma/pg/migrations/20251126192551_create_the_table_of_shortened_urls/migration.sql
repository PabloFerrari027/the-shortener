-- CreateTable
CREATE TABLE "short_url" (
    "id" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "click_count" INTEGER NOT NULL,
    "removed_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "short_url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "short_url_hash_key" ON "short_url"("hash");
