import { eq } from 'drizzle-orm'
import { db } from '../../db'
import { users } from '../../db/schema'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const email = String(body?.email ?? '').trim().toLowerCase()
  const password = String(body?.password ?? '')

  if (!email || !password) {
    throw createError({ statusCode: 400, statusMessage: 'Email and password are required' })
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1)

  if (existing.length > 0) {
    throw createError({ statusCode: 409, statusMessage: 'Email already registered' })
  }

  const [user] = await db
    .insert(users)
    .values({ email, password: await hashPassword(password) })
    .returning({ id: users.id, email: users.email })

  await setUserSession(event, { user })
  return user
})
