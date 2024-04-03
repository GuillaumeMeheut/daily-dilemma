import style from "./textarea.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { addComment } from "@/lib/firebase/firestore";
import { Lang } from "@/lib/locales/types";
import type { Comment } from "@/lib/firebase/types";

type TextAreaProps = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export default function Textarea({ comments, setComments }: TextAreaProps) {
  const user = useAuth();

  const onSubmit = async (e: FormData) => {
    if (!user) return;

    const newComment = await addComment(e, user.uid, Lang.FR);
    if (!newComment) return;
    const newComments = [...comments];
    newComments.unshift(newComment);
    setComments(newComments);
  };

  return (
    <>
      {user ? (
        <form action={onSubmit} className={style.form}>
          <textarea id="content" name="content" required />
          <button type="submit">Send</button>
        </form>
      ) : (
        <p>You should be connected to post a message</p>
      )}
    </>
  );
}
