import type { Comment } from "@/lib/firebase/types";
import style from "./comment.module.scss";

type CommentProps = {
  comment: Comment;
};

export default function Comment({ comment }: CommentProps) {
  const { content, upvotesCount, upvoters, repliesCount } = comment;
  const fakeUserId = "AW9o4rpPaQVGsFLGd8tg0u9JzNJ3";
  const isUpvoted = upvoters.includes(fakeUserId);
  return (
    <div className={style.wrapper}>
      <div className={style.upVoteContainer}>
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
        <p>({upvotesCount})</p>
      </div>
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
