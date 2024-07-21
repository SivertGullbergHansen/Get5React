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
  } else {
    console.log("Updating user", profile.steamid);

    await prisma.user.update({
      where: { steamID: profile.steamid },
      data: {
        name: profile.personaname,
        avatar: profile.avatarfull,
      },
    });
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
      jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }

        // Register user if they don't exist
        if (profile) {
          registerUser(profile as SteamProfile);
        }

        return token;
      },
      session({ session, token }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
    },
  });
}

export { handler as GET, handler as POST };
