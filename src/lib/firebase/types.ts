import { Timestamp } from "firebase/firestore";
import { Lang } from "../locales/settings";

export type Comment = {
  userId: string;
  text: string;
  lang: Lang;
  upVote: number;
  timestamp: Timestamp;
};
