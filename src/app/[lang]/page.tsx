import Comments from "@/components/comments";
import Dilemma from "@/components/dilemma";
import { getComments } from "@/lib/firebase/firestore";
import { getCurrentLocale } from "@/lib/locales/server";
import style from "./page.module.scss";

export default async function Home() {
  return (
    <main className={style.main}>
      <Dilemma />

      {/* Dilemma navigation */}

      <Comments />
    </main>
  );
}
