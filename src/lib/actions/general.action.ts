import { db } from "@/firebase/admin";

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
