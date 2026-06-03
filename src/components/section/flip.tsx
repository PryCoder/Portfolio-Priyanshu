"use client";

import React, { useState, useEffect, useCallback } from "react";
import { TextFlippingBoard } from "../ui/text-flipping-board";

const MESSAGES: string[] = [
  "STAY HUNGRY \nSTAY IN BED \n- STEVE JOBS",
  "What did you get done this week?",
   "BETTER THAN \nYESTERDAY \nHOPEFULLY",
  "Hi, I'm \nA Problem \nSolver",
  "DONT WORRY \nBE HAPPY FFS.",
  "I HAVE A PLAN \nIT INVOLVES \nMORE COFFEE",
  "TRUST THE \nPROCESS \nQUESTION THE REQUIREMENTS",
   "I HAVE A PLAN \nIT'S MOSTLY \nHOPE"
  
];

export function TextFlippingBoardDemo() {
  const [msgIdx, setMsgIdx] = useState(0);

  const next = useCallback(() => {
    setMsgIdx((i) => (i + 1) % MESSAGES.length);
  }, []);

  useEffect(() => {
    const id = setInterval(next, 20000); // 15 seconds per message

    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-8 px-2 py-10 sm:px-6 md:px-12">
      <TextFlippingBoard
        text={MESSAGES[msgIdx]}
        duration={1} // faster flip animation
      />
    </div>
  );
}