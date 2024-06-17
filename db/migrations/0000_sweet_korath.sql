CREATE TABLE IF NOT EXISTS "users" (
	"id" text PRIMARY KEY DEFAULT 'gen_random_uuid()' NOT NULL,
	"username" text,
	"image_url" text,
	"externalUserId" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	CONSTRAINT "users_id_unique" UNIQUE("id"),
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_externalUserId_unique" UNIQUE("externalUserId")
);
