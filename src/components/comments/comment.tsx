"use client";
import type { Comment, OnClickUpvoteProps } from "@/lib/firebase/types";
import style from "./comment.module.scss";
import Upvote from "./upvote";

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
  const { content, upvotesCount, upvoters, repliesCount } = comment;

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

        {/* Maybe make it into a single client component */}
        {repliesCount !== 0 && (
          <button>
            <p className={style.reply}>View reply ({repliesCount})</p>
          </button>
        )}
      </div>
    </div>
  );
}
