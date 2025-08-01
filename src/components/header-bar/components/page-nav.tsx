import Link from "next/link"

import { cn } from "@/lib/utils"

export function PageNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Overview 
      </Link>
      <Link
        href="/portfolio"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Portfolio 
      </Link>
      <Link
        href="/reports"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Reports
      </Link>
      <Link
        href="/models"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Models
      </Link>
      <Link
        href="/"
        className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        Settings
      </Link>
    </nav>
  )
}
