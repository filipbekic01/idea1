import type { User as SharedUser } from '#shared/models/user'

declare module '#auth-utils' {
  interface User extends SharedUser {}
}

export {}
