import type { FC } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Star } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { TechBadge } from "./tech-badge"

export interface InterviewCardProps {
  id: string
  userId?: string
  role: string
  type: string
  techStack: string[]
  createdAt: Date | string
  score?: number
  completed?: boolean
  variant?: "default" | "compact" | "detailed" | "minimal"
}

export const BaseInterviewCard: FC<InterviewCardProps> = ({
  userId,
  interviewId,
  role,
  type,
  techStack = [],
  createdAt,
  score,
  completed = false,
  variant = "default",
}) => {
  const formattedDate = formatDate(createdAt)

  return (
    <Card className="w-full max-w-md overflow-hidden bg-card border-border hover:border-primary/20 transition-all duration-300">
      <CardHeader className="relative pb-2">
        <div className="absolute -top-10 -left-10 w-24 h-24 rounded-full bg-primary/90 flex items-center justify-center">
          <span className="text-2xl font-bold text-primary-foreground translate-x-5 translate-y-5">H</span>
        </div>
        <div className="w-full bg-primary/10 -mx-6 -mt-6 px-6 py-2 mb-4">
          <CardDescription className="text-sm font-medium text-primary/80">{type}</CardDescription>
        </div>
        <CardTitle className="text-2xl font-bold">{role}</CardTitle>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formattedDate}</span>
          {score !== undefined && (
            <>
              <Star className="h-4 w-4 ml-2" />
              <span className="text-sm">{score ? `${score}/100` : "---/100"}</span>
            </>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-base mb-4">
          {completed
            ? "You've completed this interview. Review it to improve your skills."
            : "You haven't taken this interview yet. Take it now to improve your skills."}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {techStack.map((tech) => (
            <TechBadge key={tech} tech={tech} />
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant="secondary" className="w-full sm:w-auto">
          {completed ? "Review Interview" : "View Interview"}
        </Button>
      </CardFooter>
    </Card>
  )
}
