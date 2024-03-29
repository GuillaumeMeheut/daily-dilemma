import { addDoc, getDocs, orderBy, query, where } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";
import { Timestamp } from "firebase-admin/firestore";

export enum Lang {
  FR = "FR",
  EN = "EN",
}

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

type AddCommentData = {
  userId: string;
  text: string;
  lang: Lang;
  timestamp: Timestamp;
};

export async function addComment(data: AddCommentData) {
  await addDoc(collection(db, "comments"), data);
}
