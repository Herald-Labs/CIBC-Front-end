// src/lib/validations/auth.ts

import * as z from "zod"

export const userAuthSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
})

export type UserAuthFormSchema = z.infer<typeof userAuthSchema>

