import "../style/globals.css";
import "@radix-ui/themes/styles.css";
import NextAuthSessionProvider from "@/providers/SessionProvider";
import { Titlebar } from "@/components/Titlebar/Titlebar";
import { Metadata } from "next";
import { Theme } from "@radix-ui/themes";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Tournament",
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
          accentColor="gold"
          grayColor="slate"
          radius="full"
          appearance="dark"
        >
          <NextAuthSessionProvider>
            <main className="flex flex-col w-screen h-screen overflow-hidden">
              <div className="flex w-full h-full items-center justify-center">
                {children}
              </div>
              <Titlebar />
            </main>
            <Toaster richColors pauseWhenPageIsHidden />
          </NextAuthSessionProvider>
        </Theme>
      </body>
    </html>
  );
}
