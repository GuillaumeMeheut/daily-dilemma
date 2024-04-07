import { Timestamp } from "firebase/firestore";
import { Lang } from "../locales/types";

export type BaseComment = {
  id: string;
  userId: string;
  content: string;
  upvotesCount: number;
  upvoters: string[];
  timestamp: Timestamp;
};
export interface Comment extends BaseComment {
  lang: Lang;
  repliesCount: number;
}

export interface Reply extends BaseComment {
  parentId: string;
}

export type OnClickUpvoteProps = {
  commentId: string;
  commentUserId: string;
  upvoters: any;
  userId?: string;
};
