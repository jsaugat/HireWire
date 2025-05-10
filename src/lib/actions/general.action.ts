"use server"

import { feedbackSchema } from "@/schema/feedback";
import { db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

/**
 * Retrieves the latest interviews excluding the ones from the specified user.
 */
export async function getLatestInterviews(params: GetLatestInterviewsParams): Promise<Interview[] | null> {
  const { userId, limit = 20 } = params
  const interviews = await db.collection('interviews')
    .orderBy('createdAt', 'desc')
    .where('finalized', '==', true)
    .where('userId', '!=', userId)
    .limit(limit)
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

/**
 * Retrieves the interview by its ID.
 */
export async function getInterviewById(id: string): Promise<Interview | null> {
  const interview = await db
    .collection('interviews')
    .doc(id)
    .get();

  const data = interview.data();
  return data ? (data as Interview) : null;
}

/**
 * Retrieves the latest interviews for a specific user.
 */
export async function getInterviewsByUserId(userId: string): Promise<Interview[] | null> {
  const interviews = await db.collection('interviews')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();

  return interviews.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as Interview[];
}

export async function createFeedback({ interviewId, userId, transcript }: CreateFeedbackParams) {
  try {
    const formattedTranscript = transcript
      .map((sentence: { role: string, content: string }) => (
        `- ${sentence.role}: ${sentence.content}\n`
      )).join("")

    //? generateObject() returns clean structured data directly from the model, no need for manual parsing or validation.
    // doc: https://sdk.vercel.ai/docs/reference/ai-sdk-core/generate-object#generateobject
    const { object: generatedFeedbackObject } = await generateObject({
      model: google("gemini-2.0-flash-001"),
      schema: feedbackSchema, // schema is a JSON object that defines the structure of the data you want to generate.
      // output: 'no-schema', 
      prompt: `
          You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
          Transcript:
          ${formattedTranscript}
  
          Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
          - **Communication Skills**: Clarity, articulation, structured responses.
          - **Technical Knowledge**: Understanding of key concepts for the role.
          - **Problem-Solving**: Ability to analyze problems and propose solutions.
          - **Cultural & Role Fit**: Alignment with company values and job role.
          - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
          `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    if (!interviewId) {
      throw new Error('interviewId is required');
    }

    //? Destructure the generated feedback object to get the required fields.
    //? Add the feedback to the DB.
    const { totalScore, categoryScores, strengths, areasForImprovement, finalAssessment } = generatedFeedbackObject;
    const feedback = await db
      .collection('feedback') 
      .add({
        interviewId,
        userId,
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
        createdAt: new Date().toISOString(),
      });

    return {
      success: true,
      feedbackId: feedback.id
    }
  } catch (error) {
    console.error("Error creating feedback:", error);
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}

/**
 * Retrieves feedback for a specific interview by its ID.
 */
export async function getFeedbackByInterviewId(params: GetFeedbackByInterviewIdParams): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  try {
    const feedbackSnapshot = await db
      .collection('feedback')
      .where('interviewId', '==', interviewId)
      .where('userId', '==', userId)
      .limit(1)
      .get();

    if (feedbackSnapshot.empty) {
      return null;
    }

    const feedbackDoc = feedbackSnapshot.docs[0];
    return {
      id: feedbackDoc.id,
      ...feedbackDoc.data(),
    } as Feedback;
  } catch (error) {
    console.error("Error getting feedback:", error);
    return null;
  }
}


