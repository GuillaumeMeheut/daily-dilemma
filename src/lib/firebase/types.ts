import { Timestamp } from "firebase/firestore";
import { Lang } from "../locales/types";

export type BaseComment = {
  userId: string;
  content: string;
  lang: Lang;
  upvotesCount: number;
  upvoters: string[];
  timestamp: Timestamp;
};
export interface Comment extends BaseComment {
  id: string;
  repliesCount: number;
}

export interface Reply extends BaseComment {
  id: string;
  parentId: string;
}
