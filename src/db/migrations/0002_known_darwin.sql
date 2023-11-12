DO $$ BEGIN
 CREATE TYPE "level" AS ENUM('EASY', 'MEDIUM', 'HARD');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "scores" ALTER COLUMN "moves" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ADD COLUMN "time" numeric NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ADD COLUMN "level" "level" NOT NULL;--> statement-breakpoint
ALTER TABLE "scores" ADD COLUMN "user_id" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "scores" ADD CONSTRAINT "scores_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
