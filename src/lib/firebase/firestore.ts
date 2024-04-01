"use server";
import {
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from ".";
import { Comment, OnClickUpvoteProps } from "./types";
import { Lang } from "../locales/types";

export async function getComments(lang: Lang): Promise<Comment[]> {
  let q = query(
    collection(db, "comments"),
    where("lang", "==", lang),
    orderBy("upvotesCount", "desc"),
    limit(10)
  );

  const results = await getDocs(q);

  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    } as Comment;
  });
}

export async function getComment(id: string): Promise<Comment | undefined> {
  const docRef = doc(db, "comments", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toDate(),
    } as Comment;
  }
}
export async function getReplies(lang: Lang, parentId: string) {
  let q = query(
    collection(db, "replies"),
    orderBy("timestamp", "asc"),
    where("lang", "==", lang),
    where("parentId", "==", parentId),
    limit(10)
  );

  const results = await getDocs(q);

  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
    };
  });
}

export async function addComment(data: Omit<Comment, "id">) {
  await addDoc(collection(db, "comments"), data);
}

export async function triggerUpvote({
  commentId,
  commentUserId,
  upvoters,
  userId,
}: OnClickUpvoteProps): Promise<Comment | undefined> {
  //Add firebase rule
  if (!userId) throw new Error("No user id found");
  if (commentUserId === userId) throw new Error("Can't upvote your own post");

  const isUpvoted = upvoters.includes(userId);

  const commentsRef = doc(collection(db, "comments"), commentId);
  if (commentsRef) {
    if (isUpvoted) {
      await updateDoc(commentsRef, {
        upvotesCount: increment(-1),
        upvoters: arrayRemove(userId),
      });
    } else {
      await updateDoc(commentsRef, {
        upvotesCount: increment(1),
        upvoters: arrayUnion(userId),
      });
    }
  } else {
    throw new Error("Collection not found");
  }
  const updatedComment = await getComment(commentId);

  return updatedComment;
}
