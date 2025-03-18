import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * 扩展Session类型以包含accessToken
   */
  interface Session {
    accessToken?: string
    user?: {
      name?: string | null
      email?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  /** 扩展JWT类型以包含accessToken */
  interface JWT {
    accessToken?: string
  }
} 