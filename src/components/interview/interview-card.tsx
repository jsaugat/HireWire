import type { FC } from "react"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Star, Clock, CheckCircle, XCircle } from "lucide-react"
import { formatDate } from "@/lib/utils"
import type { InterviewCardProps } from "./base-interview-card"
import { TechBadge } from "./tech-badge"
import Link from "next/link"

export const InterviewCard: FC<InterviewCardProps> = ({
  id,
  userId,
  role,
  type,
  techStack = [],
  createdAt,
  score,
  completed = false,
}) => {
  const formattedDate = formatDate(createdAt)

  return (
    <Card className="w-full max-w-md overflow-hidden bg-zinc-950 border-border hover:border-primary/20 transition-all duration-300">
      {/* <div className="w-full h-2 bg-primary" /> */}
      <CardHeader className="relative pb-2">
        {/* <div className="absolute top-4 right-6">
          <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
            <span className="text-xl font-bold text-primary-foreground">H</span>
          </div>
        </div> */}
        <Badge variant="outline" className="w-fit bg-primary/10 text-primary border-primary/20 mb-2 capitalize">
          {type}
        </Badge>
        <CardTitle className="text-2xl font-bold pr-16">{role}</CardTitle>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="h-4 w-4" />
          <span className="text-sm">{formattedDate}</span>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center gap-4 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">30 min</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{score ? `${score}/100` : "---/100"}</span>
          </div>
          <div className="flex items-center gap-1">
            {completed ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">Completed</span>
              </>
            ) : (
              <>
                <XCircle className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">Not started</span>
              </>
            )}
          </div>
        </div>

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
      <CardFooter className="pt-2">
        <Button variant="default" size="sm" asChild>
          <Link href={`/interview/${id}`} className="w-full">
            {completed ? "Review Interview" : "View Interview"}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
