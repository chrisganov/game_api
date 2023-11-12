CREATE TABLE IF NOT EXISTS "scores" (
	"id" serial PRIMARY KEY NOT NULL,
	"moves" numeric
);
--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "name" TO "username";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "email" text NOT NULL;