import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: "FlowRoute | AI-Powered Mobility Operating System",
  description: "An intelligent journey planning platform combining live maps, weather intelligence, route optimization, and AI reasoning to recommend the most suitable journey.",
  keywords: ["flowroute", "mobility", "route optimizer", "transit", "weather route planning", "AI journey explanation"],
  authors: [{ name: "FlowRoute Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full">
      <body className="min-h-screen bg-background text-foreground antialiased flex flex-col font-sans selection:bg-primary/20 selection:text-primary">
        <Navbar />
        <main className="flex-grow flex flex-col pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
