import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Coffee Shop Business Analytics Dashboard",
  description: "Dashboard BI interaktif untuk analisis bisnis coffee shop berbasis Next.js, shadcn/ui-style components, Tailwind CSS, dan Recharts.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  )
}
