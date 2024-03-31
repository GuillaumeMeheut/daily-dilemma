"use client";
import { useAuth } from "@/hooks/useAuth";
import { addComment } from "@/lib/firebase/firestore";
import { useI18n } from "@/lib/locales/client";
import { Lang } from "@/lib/locales/settings";
import { Timestamp } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const user = useAuth();

  const postComment = () => {
    if (!user) return;
    addComment({
      userId: user.uid,
      content: "Texte en francais",
      lang: Lang.FR,
      upvotesCount: 0,
      repliesCount: 0,
      upvoters: [],
      id: uuidv4(),
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
