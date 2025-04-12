import type { FC } from "react"
import { Badge } from "@/components/ui/badge"
import { ReactIcon, NextJsIcon, JavaScriptIcon } from "./tech-icons"

interface TechBadgeProps {
  tech: string
}

export const TechBadge: FC<TechBadgeProps> = ({ tech }) => {
  const getTechIcon = () => {
    const techLower = tech.toLowerCase()

    if (techLower.includes("react")) return <ReactIcon className="h-4 w-4" />
    if (techLower.includes("next")) return <NextJsIcon className="h-4 w-4" />
    if (techLower.includes("javascript") || techLower.includes("js")) return <JavaScriptIcon className="h-4 w-4" />

    return null
  }

  return (
    <Badge variant="outline" className="flex items-center gap-1 bg-muted/30">
      {getTechIcon()}
      <span>{tech}</span>
    </Badge>
  )
}
