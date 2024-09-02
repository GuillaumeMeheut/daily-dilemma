"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { submitChoice } from "@/app/actions";

type Choices = {
  id: number;
  answer: string;
  psychological_profile: string;
};

type ChoiceSelectorProps = {
  choices: Choices[];
  user: User | null;
};

export const ChoiceSelector = ({ choices, user }: ChoiceSelectorProps) => {
  const [selectedChoice, setSelectedChoice] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormData, user: User | null) => {
    startTransition(() => {
      submitChoice(e, user);
    });
  };

  return (
    <form>
      <div className="space-y-2">
        {choices.map(({ answer, psychological_profile, id }) => (
          <label
            key={id}
            className={`block w-full text-left p-4 rounded-lg transition-colors  cursor-pointer ${
              selectedChoice === answer
                ? "bg-black text-primary-foreground"
                : "bg-secondary hover:bg-secondary/80"
            }`}
          >
            <input
              id={`choice-${id}`}
              type="radio"
              name="choice"
              value={id}
              className="sr-only"
              checked={selectedChoice === answer}
              onChange={() => setSelectedChoice(answer)}
            />
            {answer} ({psychological_profile})
          </label>
        ))}
        <Button
          formAction={(e) => handleSubmit(e, user)}
          className="w-full mt-4"
          disabled={!selectedChoice || isPending}
        >
          {isPending ? "Submitting..." : "Submit Choice"}
        </Button>
      </div>
    </form>
  );
};
