import { getAuthUser } from "@/lib/actions/auth.action"
import { getFeedbackByInterviewId, getInterviewById } from "@/lib/actions/general.action"
import { redirect } from "next/navigation"
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Sparkles, AlertTriangle, ArrowLeft, RefreshCw, Calendar } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export default async function FeedbackPage({ params }: RouteParams) {
  const { id: interviewId } = await params
  const user = await getAuthUser()

  const interview = await getInterviewById(interviewId)
  if (!interview) redirect("/")

  let feedback: Feedback | null = null

  if (user) {
    feedback = await getFeedbackByInterviewId({
      interviewId,
      userId: user.id,
    })
  }

  if (!feedback) redirect("/")

  const formattedDate = feedback.createdAt ? format(new Date(feedback.createdAt), "MMM dd, yyyy - h:mm a") : ""

  const getScoreColor = (score: number, maxScore = 100) => {
    const percentage = (score / maxScore) * 100
    if (percentage < 30) return "bg-destructive"
    if (percentage < 70) return "bg-amber-500"
    return "bg-emerald-500"
  }

  const getCategoryScoreColor = (score: number) => {
    if (score < 3) return "text-destructive"
    if (score < 7) return "text-amber-500"
    return "text-emerald-500"
  }

  const getScoreBadgeVariant = (score: number) => {
    if (score < 30) return "destructive"
    if (score < 70) return "warning"
    return "success"
  }

  return (
    <main className="feedback-container">
      <Card className="bg-background border-border overflow-hidden shadow-lg max-sm:p-0 gap-0">
        {/* Header with gradient background */}
        <div className="feedback-header">
          <div className="feedback-header-content">
            <div className="feedback-title-wrapper">
              <h1 className="feedback-title">Feedback on the Interview</h1>
              <p className="feedback-subtitle">Frontend Developer Interview</p>
            </div>
            <div className="feedback-date">
              <Calendar className="feedback-date-icon" />
              <span className="feedback-date-text">{formattedDate}</span>
            </div>
          </div>

          <div className="feedback-score">
            <div className="feedback-score-overview">
              <span className="feedback-score-label">Overall Impression</span>
              <div className="feedback-score-value">
                <span className="feedback-score-number">{feedback.totalScore}</span>
                <span className="feedback-score-max">/100</span>
              </div>
            </div>
            <div className="feedback-score-progress">
              <Progress
                value={feedback.totalScore}
                max={100}
                className={`feedback-progress-bar ${getScoreColor(feedback.totalScore)}`}
              />
            </div>
          </div>
        </div>

        <CardContent className="feedback-content">
          {/* Final Assessment */}
          <div className="feedback-assessment">
            <p className="feedback-assessment-text">{feedback.finalAssessment}</p>
          </div>

          <Separator />

          {/* Category Scores */}
          <div className="feedback-categories">
            <h2 className="feedback-categories-title">Breakdown of Evaluation</h2>
            <div className="feedback-categories-grid">
              {feedback.categoryScores.map((category, index) => (
                <div
                  key={index}
                  className="feedback-category"
                >
                  <div className="feedback-category-header">
                    <h3 className="feedback-category-title">
                      <span className="feedback-category-number">
                        {index + 1}
                      </span>
                      {category.name}
                    </h3>
                    <div className="feedback-category-score">
                      <Progress
                        value={category.score}
                        max={20}
                        className={`feedback-category-progress ${getScoreColor(category.score, 20)}`}
                      />
                      <Badge variant={getScoreBadgeVariant(category.score * 5)} className="feedback-category-badge">
                        {category.score}/20
                      </Badge>
                    </div>
                  </div>
                  <p className="feedback-category-comment">{category.comment}</p>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Strengths and Areas for Improvement */}
          <div className="feedback-evaluation">
            <div className="feedback-strengths">
              <h3 className="feedback-strengths-title">
                <Sparkles className="feedback-strengths-icon" />
                Strengths
              </h3>
              <ul className="feedback-strengths-list">
                {feedback.strengths.map((strength, index) => (
                  <li key={index} className="feedback-strength-item">
                    <span className="feedback-strength-number">
                      {index + 1}
                    </span>
                    <span className="feedback-strength-text">{strength}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="feedback-improvements">
              <h3 className="feedback-improvements-title">
                <AlertTriangle className="feedback-improvements-icon" />
                Areas for Improvement
              </h3>
              <ul className="feedback-improvements-list">
                {feedback.areasForImprovement.map((area, index) => (
                  <li key={index} className="feedback-improvement-item">
                    <span className="feedback-improvement-number">
                      {index + 1}
                    </span>
                    <span className="feedback-improvement-text">{area}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Verdict */}
          <div className="feedback-verdict">
            <h2 className="feedback-verdict-title">Final Verdict</h2>
            {feedback.totalScore < 7 ? (
              <Badge
                variant="outline"
                className="text-base py-1.5 px-4 rounded-full bg-destructive/10 text-destructive border-destructive/20 font-medium"
              >
                👎 Not Recommended
              </Badge>
            ) : (
              <Badge
                variant="outline"
                className="text-base py-1.5 px-4 rounded-full bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-medium"
              >
                👍 Recommended
              </Badge>
            )
          }
          </div>
        </CardContent>

        <CardFooter className="feedback-footer">
          <Button variant="outline" className="feedback-back-button" size="lg">
            <ArrowLeft className="feedback-back-icon" />
            Back to dashboard
          </Button>
          <Button className="feedback-retake-button" size="lg">
            <RefreshCw className="feedback-retake-icon" />
            Retake interview
          </Button>
        </CardFooter>
      </Card>
    </main>
  )
}