import { NextRequest } from "next/server";
import SteamProvider, { SteamProfile } from "next-auth-steam";
import { PROVIDER_ID } from "next-auth-steam";
import NextAuth from "next-auth/next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function registerUser(profile: SteamProfile) {
  const existingUser = await prisma.user.findUnique({
    where: { steamID: profile.steamid },
  });

  if (!existingUser) {
    console.log("Registering new user with id:", profile.steamid);

    const userCount = await prisma.user.count();
    const isAdmin = userCount === 0;

    await prisma.user.create({
      data: {
        steamID: profile.steamid,
        isAdmin,
        name: profile.personaname,
        avatar: profile.avatarfull,
      },
    });

    return isAdmin;
  } else {
    console.log("Updating user", profile.steamid);

    const user = await prisma.user.update({
      where: { steamID: profile.steamid },
      data: {
        name: profile.personaname,
        avatar: profile.avatarfull,
      },
    });

    return user.isAdmin;
  }
}

async function handler(
  req: NextRequest,
  ctx: { params: { nextauth: string[] } }
) {
  return NextAuth(req, ctx, {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET!,
        callbackUrl: new URL(
          `/api/auth/callback`,
          process.env.NEXTAUTH_URL || "http://localhost:3000"
        ),
      }),
    ],
    callbacks: {
      jwt: async ({ token, account, profile }) => {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;

          // Register user if they don't exist and get isAdmin status
          if (profile) {
            const isAdmin = await registerUser(profile as SteamProfile);
            token.isAdmin = isAdmin; // Add isAdmin to the token
          }
        }

        return token;
      },
      session: ({ session, token }) => {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = {
            // @ts-expect-error
            ...token.steam,
            isAdmin: token.isAdmin, // Add isAdmin to session.user.steam
          };
        }

        return session;
      },
    },
  });
}

export { handler as GET, handler as POST };
