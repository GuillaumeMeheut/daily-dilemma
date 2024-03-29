import { Timestamp } from "firebase/firestore";
import { Lang } from "../i18n/settings";

export type Comment = {
  userId: string;
  text: string;
  lang: Lang;
  upVote: number;
  timestamp: Timestamp;
};
