import { uuid, integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey().unique(), 
  username: text('username').unique(), 
  imageUrl: text('image_url'),

  externalUserId: text('externalUserId').unique(), //frm clerk

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at'),
});

// export const posts = pgTable('posts_table', {
//   id:             text('id').primaryKey(),
//   title:          text('title').notNull(),
//   content:        text('content').notNull(),

//   userId: integer('user_id')
//     .notNull()
//     .references(() => users.id, { onDelete: 'cascade' }),

//   createdAt: timestamp('created_at').notNull().defaultNow(),
//   updatedAt: timestamp('updated_at')
//     .notNull()
//     .$onUpdate(() => new Date()),
// });

export type InsertUser = typeof users.$inferInsert;
export type SelectUser = typeof users.$inferSelect;

// export type InsertPost = typeof posts.$inferInsert;
// export type SelectPost = typeof posts.$inferSelect;
