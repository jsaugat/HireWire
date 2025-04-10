import Agent from '@/components/agent'
import React from 'react'

export default function Interview() {
  return (
    <>
      <h3>Interview Generation</h3>
      <Agent
        userName="You"
        userId="user1"
        type="generate"
      />
    </>
  )
}
