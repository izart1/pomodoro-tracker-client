import { IPomodoroRoundResponse } from "@/types/tracker.types";

import type { ITrackerState } from "../tracker.types";

import { useLoadSettings } from "./useLoadSettings";
import { useUpdateRound } from "./useUpdateRound";

type TypeUseTrackerActions = ITrackerState & {
  rounds: IPomodoroRoundResponse[] | undefined;
};

export function useTrackerActions({
  activeRound,
  setIsRunning,
  secondsLeft,
  rounds,
  setActiveRound,
}: TypeUseTrackerActions) {
  const { workInterval } = useLoadSettings();
  const { isUpdateRoundPending, updateRound } = useUpdateRound();

  const pauseHandler = () => {
    setIsRunning(false);

    if (!activeRound?.id) return;

    updateRound({
      id: activeRound?.id,
      data: {
        totalSeconds: secondsLeft,
        isCompleted: Math.floor(secondsLeft / 60) >= workInterval,
      },
    });
  };

  const playHandler = () => {
    setIsRunning(true);
  };

  const nextRoundHandler = () => {
    if (!activeRound?.id) return;

    updateRound({
      id: activeRound?.id,
      data: {
        isCompleted: true,
        totalSeconds: workInterval * 60,
      },
    });
  };

  const prevRoundHandler = () => {
    const lastCompletedRound = rounds?.findLast((round) => round.isCompleted);

    if (!lastCompletedRound?.id) return;
    updateRound({
      id: lastCompletedRound?.id,
      data: {
        isCompleted: false,
        totalSeconds: 0,
      },
    });

    setActiveRound(lastCompletedRound);
  };

  return {
    isUpdateRoundPending,
    pauseHandler,
    playHandler,
    nextRoundHandler,
    prevRoundHandler,
  };
}
