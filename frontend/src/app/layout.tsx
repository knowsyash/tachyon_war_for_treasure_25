import type { Metadata } from "next";
import localFont from "next/font/local";
import { Avatar } from "antd";
import "./globals.css";
import { FloatingDock } from "./components/dock";
import avatar from "./assets/treasure-1-removebg.png"
import {
  IconSkull,
  IconExchange,
  IconHome,
  IconRollercoaster,
  IconUsers
} from "@tabler/icons-react";
// import { VerticalAlignBottomOutlined } from '@ant-design/icons';
import Image from "next/image";
import StoreProvider from "./StoreProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Treasure Hunt",
  description: "Website for Treasure Hunt to be conducted by Mozilla",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/",
    },

    {
      title: "Register",
      icon: (
        <IconRollercoaster className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/register",
    },
    {
      title: "Quiz",
      icon: (
        <IconSkull className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/quiz",
    },
    {
      title: "Developers",
      icon: (
        <IconUsers className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "/developers",
    },
  ];

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&display=swap"
          rel="stylesheet"
        />
        <StoreProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-grow">

              {children}
            </main>
            <footer className="w-full flex justify-center items-end">

              <FloatingDock
                desktopClassName="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg"
                mobileClassName="fixed bottom-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full shadow-lg"
                items={links}
              />

            </footer>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}