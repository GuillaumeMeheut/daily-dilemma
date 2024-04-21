"use client";
import style from "./index.module.scss";
import { getReplies } from "@/lib/firebase/firestore";
import type { Reply as ReplyType } from "@/lib/firebase/types";
import { useMemo, useState } from "react";
import Reply from "./reply";
import Loader from "@/components/loader";
import { useI18n } from "@/lib/locales/client";

type RepliesProps = {
  repliesCount: number;
  parentId: string;
};

export default function Replies({ repliesCount, parentId }: RepliesProps) {
  const t = useI18n();
  const [isLoading, setIsLoading] = useState(false);
  const [replies, setReplies] = useState<ReplyType[]>([]);
  const [showReplies, setShowReplies] = useState(true);

  const calculatedRepliesCount = useMemo(
    () => repliesCount - replies.length,
    [repliesCount, replies]
  );

  const onClickAnswer = () => {
    console.log("Targeting parentId", parentId);
  };

  const viewReplies = async () => {
    try {
      if (!showReplies) setShowReplies(true);
      setIsLoading(true);
      const receivedReplies = await getReplies(parentId);
      setReplies(receivedReplies);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={style.container}>
      <div className={style.buttonContainer}>
        <button onClick={onClickAnswer} className={style.answer}>
          {t("Reply")}
        </button>
        {repliesCount !== 0 && (
          <>
            {calculatedRepliesCount !== 0 || !showReplies ? (
              <div className={style.repliesButtonContainer}>
                <button onClick={viewReplies} className={style.repliesButton}>
                  {/*TODO check variable name */}
                  {t("View")}
                  {calculatedRepliesCount === 1 ? "reply" : "replies"} (
                  {showReplies ? calculatedRepliesCount : replies.length})
                </button>
                {isLoading && <Loader size={14} />}
              </div>
            ) : (
              <button
                onClick={() => setShowReplies(false)}
                className={style.repliesButton}
              >
                {t("HideRep")}
              </button>
            )}
          </>
        )}
      </div>
      {showReplies && (
        <div>
          {replies.map((reply) => {
            return <Reply key={reply.id} reply={reply} />;
          })}
        </div>
      )}
    </div>
  );
}
