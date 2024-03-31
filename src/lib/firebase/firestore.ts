import {
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from ".";
import { Comment } from "./types";
import { Lang } from "../locales/types";

export async function getComments(lang: Lang): Promise<Comment[]> {
  "use server";
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
    } as Comment;
  });
}
export async function getReplies(lang: Lang, parentId: string) {
  "use server";
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
  "use server";
  await addDoc(collection(db, "comments"), data);
}
