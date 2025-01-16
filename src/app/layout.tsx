import type { Metadata } from "next";
import { Quicksand } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import ReactQueryProvider from "./ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Flow Shop",
    absolute: "Flow Shop",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(quicksand.className, "relative")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="absolute right-[7rem] top-[-6rem] -z-10 h-[31.25rem] w-[31.25rem] animate-pulse-fast rounded-full bg-violet-300 blur-[10rem] dark:animate-pulse-slow dark:bg-[#676394] sm:w-[68.75rem]"></div>
          <div className="absolute left-[-35rem] top-[-1rem] -z-10 h-[31.25rem] w-[50rem] animate-pulse-faster rounded-full bg-violet-600/40 blur-[10rem] dark:animate-pulse-slower dark:bg-violet-700/40 sm:w-[68.75rem] md:left-[-33rem] lg:left-[-28rem] xl:left-[-15rem] 2xl:left-[-5rem]"></div>
          <ReactQueryProvider>
            <Navbar />
            <div className="mx-auto min-h-[50vh] max-w-7xl 2xl:max-w-8xl">
              {children}
            </div>
            <Footer />
          </ReactQueryProvider>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
