import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm"
//import { users } from './../db/schema';

// this getUserByUsername function is used to fetch any user at all 
// export const getUserByUsername = async (username: string) => {
//   const [user] = await db
//   .select()
//   .from(users)
//   .where(eq(users.username, username))
//   .execute();

//   return user || null;
// }

export const getUserByUsername = async (username: string) => {
  const user = await db.query.users.findFirst ({
    where: eq(users.username, username)
  });

  return user;
}