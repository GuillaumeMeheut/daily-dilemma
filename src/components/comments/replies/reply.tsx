"use client";
import style from "./reply.module.scss";
import { Reply } from "@/lib/firebase/types";

type ReplyProps = {
  reply: Reply;
};

export default function Replies({ reply }: ReplyProps) {
  const { content } = reply;
  return (
    <div className={style.container}>
      <p>{content}</p>
    </div>
  );
}
