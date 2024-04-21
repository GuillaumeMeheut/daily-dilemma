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
  Timestamp,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from ".";
import { Comment, Reply } from "./types";
import { Lang } from "../locales/types";
import { getI18n } from "../locales/server";

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

export async function addComment(
  formData: FormData,
  userId: string,
  lang: Lang
) {
  const t = await getI18n();

  const content = formData.get("content") as string;
  if (typeof content !== "string") return;
  if (!content) throw new Error(t("NoContent"));

  const data: Omit<Comment, "id"> = {
    userId,
    content,
    lang,
    upvotesCount: 0,
    upvoters: [],
    repliesCount: 0,
    timestamp: Timestamp.fromDate(new Date()),
  };

  const doc = await addDoc(collection(db, "comments"), data);
  if (!content) throw new Error(t("NoContent"));

  const comment = await getComment(doc.id);

  return comment;
}

export async function getReplies(parentId: string) {
  const repliesCollectionRef = collection(db, "replies");
  const newDocRef = doc(repliesCollectionRef, parentId);
  const subCollectionRef = collection(newDocRef, "replies");

  let q = query(subCollectionRef, orderBy("timestamp", "asc"), limit(5));

  const results = await getDocs(q);

  return results.docs.map((doc) => {
    return {
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp.toDate(),
    } as Reply;
  });
}

export async function getReply(
  id: string,
  parentId: string
): Promise<Reply | undefined> {
  const repliesCollectionRef = collection(db, "replies");
  const newDocRef = doc(repliesCollectionRef, parentId);
  const subCollectionRef = collection(newDocRef, "replies");
  const docRef = doc(subCollectionRef, id);

  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
      timestamp: docSnap.data().timestamp.toDate(),
    } as Reply;
  }
}

export async function addReply(
  formData: FormData,
  userId: string,
  parentId: string
) {
  const content = formData.get("content") as string;
  if (!content) return;

  const data: Omit<Reply, "id"> = {
    userId,
    parentId,
    content,
    upvotesCount: 0,
    upvoters: [],
    timestamp: Timestamp.fromDate(new Date()),
  };

  const repliesCollectionRef = collection(db, "replies");
  const newDocRef = doc(repliesCollectionRef, parentId);
  const subCollectionRef = collection(newDocRef, "replies");

  const myDoc = await addDoc(subCollectionRef, data);

  const commentsRef = doc(collection(db, "comments"), parentId);
  await updateDoc(commentsRef, {
    repliesCount: increment(1),
  });

  const reply = await getReply(myDoc.id, parentId);

  return reply;
}

type triggerUpvoteProps = {
  commentId: string;
  commentUserId: string;
  upvoters: any;
  userId: string;
};

export async function triggerUpvote({
  commentId,
  commentUserId,
  upvoters,
  userId,
}: triggerUpvoteProps): Promise<Comment | undefined> {
  const t = await getI18n();

  if (!userId) throw new Error(t("ErrorNoUserIdFound"));
  if (commentUserId === userId) throw new Error(t("CantUpvoteOwnPost"));

  const isUpvoted = upvoters.includes(userId);

  const commentRef = doc(collection(db, "comments"), commentId);
  if (commentRef) {
    if (isUpvoted) {
      await updateDoc(commentRef, {
        upvotesCount: increment(-1),
        upvoters: arrayRemove(userId),
      });
    } else {
      await updateDoc(commentRef, {
        upvotesCount: increment(1),
        upvoters: arrayUnion(userId),
      });
    }
  } else {
    throw new Error(t("CommentNotFound"));
  }
  //TODO Check if its useful to get the comment and if we cant
  //just update the previous comment depending on the result
  const updatedComment = await getComment(commentId);

  return updatedComment;
}
