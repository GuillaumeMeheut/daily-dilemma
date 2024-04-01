"use client";
import Comment from "./comment";
import type { Comment as CommentType } from "@/lib/firebase/types";
import style from "./index.module.scss";
import { getCurrentLocale } from "@/lib/locales/server";
import { getComments, triggerUpvote } from "@/lib/firebase/firestore";
import { useState } from "react";

type CommentsProps = {
  comments: CommentType[];
};

export default function Comments({ comments: comments2 }: CommentsProps) {
  const [comments, setComments] = useState(comments2);
  return (
    <div className={style.container}>
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            onClickUpvote={triggerUpvote}
            comments={comments}
            setComments={setComments}
          />
        );
      })}
    </div>
  );
}
