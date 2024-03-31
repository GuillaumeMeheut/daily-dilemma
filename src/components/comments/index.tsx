import Comment from "./comment";
import style from "./index.module.scss";
import { getCurrentLocale } from "@/lib/locales/server";
import { getComments } from "@/lib/firebase/firestore";

export default async function Comments() {
  const lang = getCurrentLocale();
  const comments = await getComments(lang);
  return (
    <div className={style.container}>
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
