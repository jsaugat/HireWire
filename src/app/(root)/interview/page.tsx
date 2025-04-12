import Agent from '@/components/agent'
import { getAuthUser } from '@/lib/actions/auth.action'
import React from 'react'

export default async function Interview() {
  const user = await getAuthUser();
  return (
    <>
      <h3>Interview Generation</h3>
      {user && <Agent
        userName={user.name}
        userId={user.id}
        type="generate"
      />}
    </>
  )
}
