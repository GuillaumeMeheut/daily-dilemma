import { addDoc, getDocs, query } from "firebase/firestore";
import { collection } from "firebase/firestore";
import { db } from "./firebase";

export async function getComments() {
  let q = query(collection(db, "comments"));

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
};

export async function addComment(data: AddCommentData) {
  await addDoc(collection(db, "comments"), data);
}
