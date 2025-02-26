import "./globals.css";
import "bootstrap/dist/css/bootstrap.css";
import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
});
export const metadata = {
  title: "Wallpaper Hd",
  description: "wallpaper hd laptop 4k",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={quicksand.className}>{children}</body>
    </html>
  );
}
