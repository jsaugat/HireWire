"use client"

import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { vapi } from '@/lib/vapi.sdk';
import { useRouter } from 'next/navigation';

interface AgentProps {
  userName: string,
  userId: string,
  type: 'generate' | null
}

enum CallStatus {
  INACTIVE = 'INACTIVE',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
  CONNECTING = 'CONNECTING',
}
interface SavedMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export default function Agent({ userName, userId, type }: AgentProps) {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [messages, setMessages] = useState<SavedMessage[]>([]);
  const router = useRouter();

  useEffect(() => {
    const onCallStart = () => setCallStatus(CallStatus.ACTIVE);
    const onCallEnd = () => setCallStatus(CallStatus.FINISHED);
    const onMessage = (message: Message) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = {
          role: message.role,
          content: message.transcript,
        }

        setMessages(prevMessages => [...prevMessages, newMessage]);
      }
    }

    const onSpeechStart = () => setIsSpeaking(true);
    const onSpeechEnd = () => setIsSpeaking(false);
    const onError = (error: Error) => console.log("Error", error)

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);
    vapi.on('error', onError);

    // Cleanup event listeners on component unmount
    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
      vapi.off('error', onError);
    }
  }, [])

  useEffect(() => {
    if (callStatus === CallStatus.FINISHED) {
      router.push('/');
    }
  }, [messages, callStatus, type, userId])

  const handleCall = async () => {
    console.log("Starting call...");
    setCallStatus(CallStatus.CONNECTING);
    //? START THE WORKFLOW CALL
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const call = await vapi.start(process.env.NEXT_PUBLIC_VAPI_WORKFLOW_ID!, {
      variableValues: {
        username: userName,
        userid: userId,
      }
    })
    // { 
    //   "id": "bd2184a1-bdea-4d4f-9503-b09ca8b185e6", 
    //   "orgId": "6da6841c-0fca-4604-8941-3d5d65f43a17", 
    //   "createdAt": "2024-11-13T19:20:24.606Z", 
    //   "updatedAt": "2024-11-13T19:20:24.606Z", 
    //   "type": "webCall", 
    //   ... 
    // }

  }
  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED);
    vapi.stop();
  }

  const latestMessage = messages[messages.length - 1]?.content;
  const isCallInactiveOrFinished = callStatus === CallStatus.INACTIVE || callStatus === CallStatus.FINISHED;

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
              key={latestMessage}
              className={cn('transition-opacity duration-500', 'animate-fadeIn')}
            >
              {latestMessage}
            </p>
          </div>
        </div>
      )}

      <div className="w-full flex justify-center">
        {callStatus !== "ACTIVE" ? (
          <Button
            variant={'constructive'}
            className='min-w-28'
            onClick={handleCall}
          >
            {/*  */}
            <span
              className={cn("absolute animate-ping rounded-full opacity-75", callStatus !== 'CONNECTING' && 'hidden')}
            />
            <span>
              {isCallInactiveOrFinished ? "Call" : "..."}
            </span>
          </Button>
        ) : (
          <Button
            variant={'destructive'}
            className='min-w-28'
            onClick={handleDisconnect}
          >
            End
          </Button>
        )}
      </div>
    </>
  )
}
