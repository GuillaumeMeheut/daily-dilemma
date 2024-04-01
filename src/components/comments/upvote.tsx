import { useAuth } from "@/hooks/useAuth";
import type { Comment, OnClickUpvoteProps } from "@/lib/firebase/types";
import { useEffect, useState } from "react";
import style from "./upvote.module.scss";
import { toast } from "react-toastify";

type UpvoteProps = {
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

export default function Upvote({
  comment,
  onClickUpvote,
  comments,
  setComments,
}: UpvoteProps) {
  const user = useAuth();
  const { upvotesCount, upvoters, id, userId, lang } = comment;
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvCount, setUpvCount] = useState(upvotesCount);
  const [isMakingReq, setIsMakingReq] = useState(false);

  useEffect(() => {
    if (user) setIsUpvoted(upvoters.includes(user?.uid));
  }, [user?.uid]);

  const handleUpvote = async () => {
    const isUpvotedState = isUpvoted;
    try {
      if (!user) return;
      if (userId === user.uid) throw new Error("Can't upvote your own post");
      setIsUpvoted(!isUpvotedState);
      setUpvCount(isUpvoted ? upvCount - 1 : upvCount + 1);
      setIsMakingReq(true);
      const newComment = await onClickUpvote({
        commentId: id,
        commentUserId: userId,
        upvoters,
        userId: user?.uid,
      });
      if (newComment) {
        const index = comments.findIndex((x) => x.id === id);
        const newComments = comments.toSpliced(index, 1, newComment);
        setComments(newComments);
      }
    } catch (error: any) {
      toast.error(error.message, {
        position: "bottom-left",
      });
      setIsUpvoted(isUpvotedState);
      setUpvCount(upvCount);
    } finally {
      setIsMakingReq(false);
    }
  };

  return (
    <div className={style.upVoteContainer}>
      <button onClick={handleUpvote} disabled={!user || isMakingReq}>
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill={isUpvoted ? "white" : "none"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 0.703545L13.7842 6.92424H10.3699H9.8699V7.42424V14.5H5.1301V7.42424V6.92424H4.6301H1.21583L7.5 0.703545Z"
            stroke="white"
          />
        </svg>
      </button>
      <p>({upvCount})</p>
    </div>
  );
}
