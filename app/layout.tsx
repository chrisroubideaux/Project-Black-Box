import type { Metadata } from "next";
import {   Michroma } from "next/font/google";
import 'animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
import '@/styles/navbar.css';
import '@/styles/sidebar.css';
import '@/styles/card.css';
import '@/styles/modals.css';
import '@/styles/form.css';
import '@/styles/login.css';
//import  '@/styles/register.css';

import BootstrapClient from "../utils/BootstrapClient";
{/*
const sixtyfourFont = Sixtyfour({
  variable: "--font-sixtyfour", 
  subsets: ["latin"],
  display: "swap",
});
*/}

const michromaFont = Michroma({
  weight: '400',              // ✅ REQUIRED for Michroma
  variable: '--font-michroma', // ✅ Optional custom variable name
  subsets: ['latin'],
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Black Box",
  description: "Black Box is a fully immersive asmr platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${michromaFont.variable}`}>
        {children}
        <BootstrapClient />  
      </body>
    </html>
  );
}

