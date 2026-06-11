/**
 * Public-facing user model, safe to expose to the client.
 * Never include sensitive fields (e.g. password) here.
 */
export interface User {
  id: number
  email: string
}
