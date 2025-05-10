import { getAuthUser } from '@/lib/actions/auth.action';
import { getFeedbackByInterviewId, getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function FeedbackPage({ params }: RouteParams) {
  const { id: interviewId } = await params;
  const user = await getAuthUser();

  const interview = await getInterviewById(interviewId);
  if (!interview) redirect("/");

  if (user) {
    const feedback = await getFeedbackByInterviewId({
      interviewId,
      userId: user.id,
    });
    console.log("feedback", feedback);
  }

  return (
    <div>page</div>
  )
}
