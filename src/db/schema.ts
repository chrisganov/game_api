/**
 * Insert Schema -  validating request
 * Select Schema - validating responses
 */

import { relations } from "drizzle-orm";
import { pgTable, serial, timestamp, varchar, text, numeric, pgEnum, integer } from "drizzle-orm/pg-core";

export const levelEnum = pgEnum("level", ["EASY", "MEDIUM", "HARD"]);

const basedEntityBuilder = {
  id: serial("id").primaryKey().notNull(),
  createdAt: timestamp("created_at", { mode: "string" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "string" }).defaultNow().notNull(),
};

export const usersTable = pgTable("users", {
  ...basedEntityBuilder,
  username: varchar("username", { length: 20 }).unique().notNull(),
  email: text("email").notNull(),
  passhash: varchar("passhash").notNull(),
});

export const usersRelations = relations(usersTable, ({ many }) => ({
  scores: many(scoresTable),
}));

export const scoresTable = pgTable("scores", {
  ...basedEntityBuilder,
  moves: numeric("moves").notNull(),
  time: numeric("time").notNull(),
  level: levelEnum("level").notNull(),
  userId: integer("user_id")
    .notNull()
    .references(() => usersTable.id),
});

export const scoresRelations = relations(scoresTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [scoresTable.userId],
    references: [usersTable.id],
  }),
}));
