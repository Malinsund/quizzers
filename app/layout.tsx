import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import GlobalStyle from "./GlobalStyles";
import Header from "./Header/page";

const roboto = Roboto({ weight: '400', subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Quizzers",
  description: "Find your favorite pub with the best quizzes today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
       <GlobalStyle/>
        <Header />
        {children}
        </body>
    </html>
  );
}
