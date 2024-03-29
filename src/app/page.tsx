"use client";
import { Lang, addComment, getComments } from "@/lib/firestore";
import { useEffect } from "react";
import { signInWithGoogle } from "@/lib/auth";
import { Timestamp } from "firebase/firestore";

export default function Home() {
  //   useEffect(() => {
  //     const test = async () => {
  //       const comments = await getComments();
  //       console.log(comments);
  //     };
  //     // test();
  //   }, []);

  const postComment = () => {
    addComment({
      userId: "Guillaume",
      text: "Texte en francais",
      lang: Lang.EN,
      timestamp: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <main>
      <button onClick={postComment}>Post comment</button>
    </main>
  );
}
