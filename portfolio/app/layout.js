import "./globals.css";

export const metadata = {
  title: "Samuel Okoosi — Portfolio",
  description:
    "Software Developer from Nigeria. A Twitter/X-styled portfolio built with Next.js.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
