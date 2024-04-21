"use client";
import Comment from "./comment";
import type { Comment as CommentType } from "@/lib/firebase/types";
import style from "./index.module.scss";
import { useState } from "react";
import Textarea from "./textarea";

type CommentsProps = {
  comments: CommentType[];
};

export default function Comments({ comments: comments2 }: CommentsProps) {
  const [comments, setComments] = useState(comments2);
  return (
    <div className={style.container}>
      <Textarea comments={comments} setComments={setComments} />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            comments={comments}
            setComments={setComments}
          />
        );
      })}
    </div>
  );
}
