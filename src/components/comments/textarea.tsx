import style from "./textarea.module.scss";
import { useAuth } from "@/hooks/useAuth";
import { addComment } from "@/lib/firebase/firestore";
import { Lang } from "@/lib/locales/types";
import type { Comment } from "@/lib/firebase/types";
import { useRef } from "react";
import { useFormStatus } from "react-dom";

type TextAreaProps = {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export default function Textarea({ comments, setComments }: TextAreaProps) {
  const user = useAuth();
  const ref = useRef<HTMLTextAreaElement>(null);
  const { pending } = useFormStatus();

  const onSubmit = async (formData: FormData) => {
    if (!user) return;

    const newComment = await addComment(formData, user.uid, Lang.FR);
    if (!newComment) return;
    const newComments = [...comments];
    newComments.unshift(newComment);
    setComments(newComments);

    if (ref?.current) ref.current.value = "";
  };

  return (
    <>
      {user ? (
        <form action={onSubmit} className={style.form}>
          <textarea ref={ref} id="content" name="content" required />
          <button type="submit" disabled={pending}>
            Send
          </button>
        </form>
      ) : (
        <p>You should be connected to post a message</p>
      )}
    </>
  );
}
