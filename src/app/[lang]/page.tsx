import Comments from "@/components/comments";
import Dilemma from "@/components/dilemma";
import style from "./page.module.scss";
import { getComments } from "@/lib/firebase/firestore";
import { getCurrentLocale } from "@/lib/locales/server";

export default async function Home() {
  const lang = getCurrentLocale();
  const comments = await getComments(lang);
  return (
    <main className={style.main}>
      <Dilemma />

      {/* Dilemma navigation */}
      <Comments comments={comments} />
    </main>
  );
}
