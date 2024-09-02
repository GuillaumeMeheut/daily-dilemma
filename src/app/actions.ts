"use server";
import { getErrorRedirect, getStatusRedirect } from "@/lib/utils";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";

export const submitChoice = async (formData: FormData, user: User | null) => {
  if (!user) {
    redirect(
      getErrorRedirect("/signin", "You must be logged", "Login and try again")
    );
  }

  const choice = formData.get("choice");

  console.log("Server action received choice:", choice);
  redirect(getStatusRedirect(`/`, "Success!", "Response submitted."));
};
