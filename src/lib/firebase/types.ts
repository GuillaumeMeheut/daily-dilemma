import { Timestamp } from "firebase/firestore";
import { Lang } from "../locales/settings";

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
  replies: Reply[];
}

export interface Reply extends BaseComment {
  id: string;
}
