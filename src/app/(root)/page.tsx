/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getAuthUser } from "@/lib/actions/auth.action";
import { getInterviewsByUserId, getLatestInterviews } from "@/lib/actions/general.action";
import { InterviewCard } from "@/components/interview/interview-card";
// import InterviewCard from "@/components/InterviewCard";

// import {
//   getInterviewsByUserId,
//   getLatestInterviews,
// } from "@/lib/actions/general.action";

export default async function Home() {
  const user = await getAuthUser();
  const [userInterviews, allInterviews] = await Promise.all([
    getInterviewsByUserId(user?.id!),
    getLatestInterviews({ userId: user?.id! }),
  ]);

  const hasPastInterviews = userInterviews?.length! > 0;
  const hasUpcomingInterviews = allInterviews?.length! > 0;

  return (
    <>
      <section className="card-cta justify-center min-h-[80svh]">
        <div className="flex flex-col gap-6 lg:text-center">
          <h2 className="text-4.5xl md:text-6xl lg:text-7xl">AI-Powered Mock Interviews<br />
            <span className="inline-block text-zinc-400">That Talk Back</span>
          </h2>
          <p className="text-sm md:text-lg">
            Practice Smarter: Master Real Questions & Receive Instant Feedback
          </p>

          <Button asChild className="max-w-fit lg:mx-auto">
            <Link href="/interview">Start an Interview</Link>
          </Button>
        </div>

        {/* <Image
          src="/robot.png"
          alt="robo-dude"
          width={400}
          height={400}
          className="max-sm:hidden"
        /> */}
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Your Interviews</h2>

        <div className="interviews-section">
          {hasPastInterviews ? (
            userInterviews?.map((interview: Interview) => (
              <InterviewCard
                key={interview.id}
                id={interview.id}
                userId={user?.id}
                role={interview.role}
                type={interview.type}
                techStack={interview.techStack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>You haven&apos;t taken any interviews yet</p>
          )}
        </div>
      </section>

      <section className="flex flex-col gap-6 mt-8">
        <h2>Take Interviews</h2>

        <div className="interviews-section">
          {hasUpcomingInterviews ? (
            allInterviews?.map((interview: Interview) => (
              <InterviewCard
                key={interview.id}
                userId={user?.id}
                id={interview.id}
                role={interview.role}
                type={interview.type}
                techStack={interview.techStack}
                createdAt={interview.createdAt}
              />
            ))
          ) : (
            <p>There are no interviews available</p>
          )}
        </div>
      </section>
    </>
  );
}