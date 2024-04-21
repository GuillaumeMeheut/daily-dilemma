"use client";
import type { Comment } from "@/lib/firebase/types";
import style from "./comment.module.scss";
import Upvote from "./upvote";
import Replies from "./replies";

type CommentProps = {
  comment: Comment;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export default function Comment({
  comment,
  comments,
  setComments,
}: CommentProps) {
  const { content, repliesCount, id } = comment;

  return (
    <div className={style.wrapper}>
      <Upvote comment={comment} comments={comments} setComments={setComments} />
      <div>
        <p>{content}</p>

        <Replies repliesCount={repliesCount} parentId={id} />
      </div>
    </div>
  );
}
