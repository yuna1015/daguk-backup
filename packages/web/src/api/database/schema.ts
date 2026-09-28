import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core"

/**
 * You can write your custom database schema here.
 * Use this file for also re-exporting any generated schema for drizzle to generate proper migrations.
 */

export const inquiries = sqliteTable("inquiries", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  company: text("company").notNull(),
  name: text("name").notNull(),
  tel: text("tel"),
  email: text("email"),
  type: text("type"),
  message: text("message").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
