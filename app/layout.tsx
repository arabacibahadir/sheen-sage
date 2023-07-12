import './globals.css'

export const metadata = {
  title: 'Sheen Sage',
  description: 'Recommendation Engine for Movies',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
      <main className="bg-background">
        {children}
      </main>
      </body>
    </html>
  )
}
