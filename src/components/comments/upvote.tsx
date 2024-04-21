import { useAuth } from "@/hooks/useAuth";
import type { Comment } from "@/lib/firebase/types";
import { useCallback, useEffect, useState } from "react";
import style from "./upvote.module.scss";
import { toast } from "react-toastify";
import { triggerUpvote } from "@/lib/firebase/firestore";

const SPAM_THRESHOLD = 5;
const SPAM_COOLDOWN_DURATION = 5000;

const useUpvoteSpamPrevention = () => {
  const [spamCount, setSpamCount] = useState(0);
  const [isCooldown, setIsCooldown] = useState(false);

  const handleSpam = useCallback(() => {
    if (isCooldown) return;

    setSpamCount((count) => count + 1);

    if (spamCount >= SPAM_THRESHOLD) {
      setIsCooldown(true);
      toast.error("Stop spamming", {
        position: "bottom-left",
      });
      setTimeout(() => {
        setSpamCount(0);
        setIsCooldown(false);
      }, SPAM_COOLDOWN_DURATION);
    }
  }, [spamCount, isCooldown]);

  return { isCooldown, handleSpam };
};

type UpvoteProps = {
  comment: Comment;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
};

export default function Upvote({
  comment,
  comments,
  setComments,
}: UpvoteProps) {
  const user = useAuth();
  const { upvotesCount, upvoters, id, userId } = comment;
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(upvotesCount);
  const [isMakingReq, setIsMakingReq] = useState(false);
  const { isCooldown, handleSpam } = useUpvoteSpamPrevention();

  useEffect(() => {
    if (user) setIsUpvoted(upvoters.includes(user?.uid));
  }, [user, upvoters]);

  const handleUpvote = async () => {
    handleSpam();
    if (isCooldown) return;
    const isUpvotedState = isUpvoted;
    try {
      if (!user) return;
      if (userId === user.uid) throw new Error("Can't upvote your own post");
      setIsUpvoted(!isUpvotedState);
      setUpvoteCount(isUpvoted ? upvoteCount - 1 : upvoteCount + 1);
      setIsMakingReq(true);
      const newComment = await triggerUpvote({
        commentId: id,
        commentUserId: userId,
        upvoters,
        userId: user.uid,
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
      setUpvoteCount(upvoteCount);
    } finally {
      setIsMakingReq(false);
    }
  };

  return (
    <div className={style.upVoteContainer}>
      <button
        onClick={handleUpvote}
        disabled={!user || isMakingReq || isCooldown}
      >
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
      <p>({upvoteCount})</p>
    </div>
  );
}
