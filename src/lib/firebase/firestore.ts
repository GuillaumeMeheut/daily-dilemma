import { addDoc, getDocs, query, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from ".";
import { Comment } from "./types";
import { Lang } from "../locales/settings";

export async function getComments() {
  const lang: Lang = Lang.FR;
  let q = query(collection(db, "comments"), where("lang", "==", lang));

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
