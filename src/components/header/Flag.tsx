"use client";
import {
  onAuthStateChanged,
  signInWithGoogle,
  signOut,
} from "@/lib/firebase/auth";
import { User } from "firebase/auth";
import { useState, useEffect } from "react";
import style from "./style.module.scss";
import { useRouter } from "next/navigation";

type FlagProps = {};

export default function Flag({}: FlagProps) {
  const router = useRouter();

  return <div>{}</div>;
}
