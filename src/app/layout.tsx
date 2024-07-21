import "../style/globals.css";
import "@radix-ui/themes/styles.css";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Get5React",
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body>
        <Theme accentColor="violet" radius="full" appearance="dark">
          <NextAuthSessionProvider>
            {children}
            <Toaster richColors pauseWhenPageIsHidden />
          </NextAuthSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
