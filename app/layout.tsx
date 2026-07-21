import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Healthworkers — Find and book trusted doctors near you",
  description:
    "Search verified doctors by specialization and area, view real availability, and book your visit in seconds.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-canvas text-ink">{children}</body>
    </html>
  );
}
