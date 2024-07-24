import "../style/globals.css";
import "@radix-ui/themes/styles.css";
import { NextAuthSessionProvider } from "@/common";
import { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

export const dynamic = "force-dynamic";

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
        <Theme
          accentColor="mint"
          grayColor="slate"
          radius="full"
          appearance="dark"
          hasBackground={false}
        >
          <NextAuthSessionProvider>
            {children}
            <Toaster richColors pauseWhenPageIsHidden />
          </NextAuthSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
