import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from './providers';
import { ThemeProvider } from "./_context/ThemeProvider";
import NavBar from "./_components/NavBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rainbox Kit ",
  description: "Demo for rainbox kit for web3 connection",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <ThemeProvider>
            <Providers>
              <NavBar />
              {children}
            </Providers>
          </ThemeProvider>
      </body>
    </html>
  );
}
