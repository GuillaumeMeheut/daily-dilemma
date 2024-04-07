"use client";
import type { Comment, OnClickUpvoteProps } from "@/lib/firebase/types";
import style from "./comment.module.scss";
import Upvote from "./upvote";
import Replies from "./replies";

type CommentProps = {
  comment: Comment;
  onClickUpvote: ({
    commentId,
    commentUserId,
    upvoters,
    userId,
  }: OnClickUpvoteProps) => Promise<Comment | undefined>;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export default function Comment({
  comment,
  onClickUpvote,
  comments,
  setComments,
}: CommentProps) {
  const { content, repliesCount, id } = comment;

  return (
    <div className={style.wrapper}>
      <Upvote
        comment={comment}
        onClickUpvote={onClickUpvote}
        comments={comments}
        setComments={setComments}
      />
      <div>
        <p>{content}</p>

        <Replies repliesCount={repliesCount} parentId={id} />
      </div>
    </div>
  );
}
