import { NextRequest } from "next/server"
import SteamProvider from 'next-auth-steam'
import { PROVIDER_ID } from 'next-auth-steam'
import NextAuth from "next-auth/next"

async function handler(
    req: NextRequest,
    ctx: { params: { nextauth: string[] } }
  ) {
    return NextAuth(req, ctx, {
      providers: [
        SteamProvider(req, {
          clientSecret: process.env.STEAM_SECRET!,
          callbackUrl: new URL(`/api/auth/callback`, process.env.NEXTAUTH_URL || 'http://localhost:3000')
        })
        ],
        callbacks: {
            jwt({ token, account, profile }) {
              if (account?.provider === PROVIDER_ID) {
                token.steam = profile
              }
        
              return token
            },
            session({ session, token }) {
              if ('steam' in token) {
                // @ts-expect-error
                session.user.steam = token.steam
              }
        
              return session
            }
          }
    })
  }
  
  export {
    handler as GET,
    handler as POST
  }