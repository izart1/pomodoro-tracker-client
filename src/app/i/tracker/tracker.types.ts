import type { Dispatch, SetStateAction } from "react";

import type { IPomodoroRoundResponse } from "@/types/tracker.types";

export interface ITrackerState {
  isRunning: boolean;
  secondsLeft: number;
  activeRound: IPomodoroRoundResponse | undefined;
  setIsRunning: Dispatch<SetStateAction<boolean>>;
  setSecondsLeft: Dispatch<SetStateAction<number>>;
  setActiveRound: Dispatch<SetStateAction<IPomodoroRoundResponse | undefined>>;
}
