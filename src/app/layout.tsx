import "@fontsource/open-sans/latin.css";
import "@fontsource/montserrat/latin.css";
import "../style/globals.css";
import "@radix-ui/themes/styles.css";
import { NextAuthSessionProvider } from "@/common";
import { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
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
    <html lang="en">
      <body>
        <Theme
          accentColor="jade"
          radius="full"
          appearance="dark"
          panelBackground="solid"
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
