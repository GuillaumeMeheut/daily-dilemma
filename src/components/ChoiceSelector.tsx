"use client";

import { useState, useTransition } from "react";
import { Button } from "./ui/button";
import { User } from "@supabase/supabase-js";
import { submitChoice } from "@/app/actions";
import { useRouter } from "next/navigation";
import { getChoicesPercentage } from "@/lib/utils";

type Choices = {
  id: number;
  answer: string;
  psychological_profile: string;
  count: number;
};

type ChoiceSelectorProps = {
  choices: Choices[];
  user: User | null;
  dilemmaId: number;
  answered: boolean;
  choiceId?: number;
};

export const ChoiceSelector = ({
  choices,
  user,
  dilemmaId,
  answered,
  choiceId,
}: ChoiceSelectorProps) => {
  const [selectedChoice, setSelectedChoice] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: FormData) => {
    startTransition(async () => {
      await submitChoice(e, user, dilemmaId);
    });
  };

  const totalCount = choices.reduce((total, choice) => total + choice.count, 0);
  const isDisabled = !selectedChoice || isPending || answered;
  const cursor = answered ? "cursor-default" : "cursor-pointer";

  return (
    <form>
      <div className="space-y-2">
        {choices.map(({ id, answer, psychological_profile, count }) => (
          <div key={id}>
            <label htmlFor={`choice-${id}`}>
              <div
                className={`relative flex justify-center items-center w-full text-left p-4 rounded-lg transition-colors ${cursor}
              ${
                selectedChoice === id && !answered
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
                  checked={selectedChoice === id}
                  onChange={() => !answered && setSelectedChoice(id)}
                />
                {answer} ({psychological_profile})
                {answered && (
                  <>
                    <p className="text-center whitespace-nowrap h-fit ml-8">
                      {getChoicesPercentage(count, totalCount)}
                    </p>
                    <div
                      className="absolute left-0 z-0 h-full bg-black opacity-20"
                      style={{ width: `${(count / totalCount) * 100}%` }}
                    />
                  </>
                )}
              </div>
            </label>
          </div>
        ))}
        <Button
          formAction={(e) => handleSubmit(e)}
          className="w-full mt-4"
          disabled={isDisabled}
        >
          {answered
            ? "Already answered"
            : isPending
            ? "Submitting..."
            : "Submit Choice"}
        </Button>
      </div>
    </form>
  );
};
