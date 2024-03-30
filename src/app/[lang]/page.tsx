"use client";
import { addComment } from "@/lib/firebase/firestore";
import { useI18n } from "@/lib/locales/client";
import { Lang } from "@/lib/locales/settings";
import { Timestamp } from "firebase/firestore";

export default function Home() {
  const postComment = () => {
    addComment({
      userId: "AW9o4rpPaQVGsFLGd8tg0u9JzNJ3",
      text: "Texte en francais",
      lang: Lang.EN,
      upVote: 0,
      timestamp: Timestamp.fromDate(new Date()),
    });
  };
  const t = useI18n();

  return (
    <main>
      <p>{t("hello")} client</p>

      <button onClick={postComment}>Post comment</button>
    </main>
  );
}
