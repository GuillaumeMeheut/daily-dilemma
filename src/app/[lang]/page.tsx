"use client";
import { addComment } from "@/lib/firebase/firestore";
import { useTranslation } from "@/lib/i18n/client";
import { Lang } from "@/lib/i18n/settings";
import { Timestamp } from "firebase/firestore";

type HomeProps = {
  params: { lang: Lang };
};

export default function Home({ params: { lang } }: HomeProps) {
  const { t } = useTranslation(lang, "");

  const postComment = () => {
    addComment({
      userId: "AW9o4rpPaQVGsFLGd8tg0u9JzNJ3",
      text: "Texte en francais",
      lang: Lang.EN,
      upVote: 0,
      timestamp: Timestamp.fromDate(new Date()),
    });
  };

  return (
    <main>
      <p>{t("test")}</p>
      <button onClick={postComment}>Post comment</button>
    </main>
  );
}
