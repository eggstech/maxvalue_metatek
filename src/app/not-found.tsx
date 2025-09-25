import { Button } from '@/components/ui/button'
import { ArrowLeft, Search } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-background text-center">
        <div className="absolute top-8 left-8">
            <div className="flex items-center gap-2 justify-center mb-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 95 40"
                    className="w-10 h-10 text-primary"
                    fill="currentColor"
                >
                    <defs>
                        <linearGradient id="ring-gradient-404" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1}} />
                        <stop offset="100%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 0.5}} />
                        </linearGradient>
                    </defs>
                    <path d="M0 40 L10 40 L25 0 L15 0 Z" />
                    <path d="M28 0 L48 0 L48 8 L36 8 L36 16 L46 16 L46 24 L36 24 L36 32 L48 32 L48 40 L28 40 Z" />
                    <path d="M55 20 a 18 18 0 1 1 36 0 a 18 18 0 1 1 -36 0" />
                    <path d="M57 20 a 16 16 0 1 1 32 0 a 16 16 0 1 1 -32 0" fill="hsl(var(--background))" />
                    <path d="M 50 18 a 22 10 0 1 0 0 4 a 22 10 0 1 0 0 -4" fill="url(#ring-gradient-404)" transform="rotate(-15 72 20)" />
                </svg>
                <h1 className="text-xl font-bold">
                    ConnectFlow
                </h1>
            </div>
        </div>
      <div>
        <p className="text-base font-semibold text-primary">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-muted-foreground">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
      </div>
      <div className="mt-2 flex items-center justify-center gap-x-6">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2" />
            Go back home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/dashboard">
            Go to Dashboard
          </Link>
        </Button>
      </div>
    </div>
  )
}
