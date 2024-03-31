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
import { Lang } from "../locales/settings";

export async function getComments(lang: Lang) {
  let q = query(
    collection(db, "comments"),
    orderBy("upvotesCount", "asc"),
    where("lang", "==", lang),
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

export async function addComment(data: Comment) {
  await addDoc(collection(db, "comments"), data);
}
