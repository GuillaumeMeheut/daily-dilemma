"use client";
import { addComment, getComments } from "@/lib/firestore";
import { useEffect } from "react";
import { signInWithGoogle } from "@/lib/auth";

export default function Home() {
  //   useEffect(() => {
  //     const test = async () => {
  //       const comments = await getComments();
  //       console.log(comments);
  //     };
  //     // test();
  //   }, []);

  const postComment = () => {
    addComment({ userId: "fhsdjf", text: "SMALL COMMENT" });
  };

  return (
    <main>
      <button onClick={postComment}>Post comment</button>
    </main>
  );
}
