import "./globals.css";

export const metadata = {
  title: "Samuel Okoosi — System Blueprint",
  description:
    "Full-stack engineer portfolio designed as a system blueprint — SQL schema, API routes, and container architecture.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
