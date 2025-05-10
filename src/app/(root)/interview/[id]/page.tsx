import Agent from '@/components/agent';
import { getAuthUser } from '@/lib/actions/auth.action';
import { getInterviewById } from '@/lib/actions/general.action';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Interview({ params }: RouteParams) {
  const { id } = await params;
  const interview = await getInterviewById(id);
  const user = await getAuthUser();
  if (!interview) {
    redirect(`/`);
  }

  return (
    <div>
      {user && (
        <Agent
          type="interview-conductor"
          userName={user.name}
          interviewId={id}
          userId={user.id}
        />
      )}
    </div>
  )
}
