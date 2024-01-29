import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';
import UserProvider from "@/contexts/UserContext";


export const metadata: Metadata = {
  title: "Mr Cleaner",
  description: "Created by Guilherme da Costa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body >
      <UserProvider>
        {children}
      </UserProvider>
      </body>
    </html>
  );
}
