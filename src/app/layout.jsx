import { Inter, Koulen } from "next/font/google";
import "./globals.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const inter = Inter({ subsets: ["latin"] });

const koulen = Koulen({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-koulen",
  display: "swap",
});

export const metadata = {
  title: "HDRSS | Political Party",
  description: "HDRSS - Political Party Website",
  keywords:"ramdass , hdrss , bjp , coimbatore , hindu dharma raksha sena , ram dass sandiliyan"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${koulen.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <main>{children}</main>
      </body>
    </html>
  );
}

RootLayout.getInitialProps = async ({ children }) => {
  return { children };
};
