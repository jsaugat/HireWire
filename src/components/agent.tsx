"use client"

import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface AgentProps {
  userName: string,
  userId: string,
  type: 'generate' | null
}

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

export default function Agent({ userName }: AgentProps) {
  const callStatus = CallStatus.ACTIVE;
  const isSpeaking = true;
  const messages = [
    "What's your name?",
    "My name is Josh Saugat, nice to meet you!"
  ]
  const lastMessage = messages[messages.length - 1];

  return (
    <>
      <div className='call-view'>
        <div className="card-interviewer">
          <div className="avatar rounded-full">
            <Image
              src="/hirewire-black.svg"
              alt="vapi"
              width={65}
              height={54}
              className='object-cover rounded-full'
            />
            {isSpeaking && <span className='animate-speak rounded-full opacity-30'></span>}
          </div>
          <h3>Interviewer</h3>
        </div>

        <div className="card-border">
          <div className="card-content">
            <Image
              src="/user-avatar.png"
              alt='user avatar'
              width={540}
              height={540}
              className='rounded-full object-cover size-[120px]'
            />
            <h3>{userName}</h3>
          </div>
        </div>
      </div>
      {messages.length > 0 && (
        <div className="transcript-border">
          <div className="transcript">
            <p
              key={lastMessage}
              className={cn('transition-opacity duration-500', 'animate-fadeIn')}
            >
              {lastMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <Button variant={'constructive'} className='min-w-28'>
            <span
              className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== 'CONNECTING' && 'hidden')}
            />
            <span>
              {callStatus === "INACTIVE" || callStatus === "FINISHED" ? "Call" : "..."}
            </span>
          </Button>
        ) : (
          <Button
            variant={'destructive'}
            className='min-w-28'
            onClick={() => {
              console.log("dfjdk")
            }}
          >
            End
          </Button>
        )}
      </div>
    </>
  )
}
