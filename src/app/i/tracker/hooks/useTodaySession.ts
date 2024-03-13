import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

import type { ITrackerState } from "../tracker.types";

import { useLoadSettings } from "./useLoadSettings";
import { trackerService } from "@/services/tracker.service";

export function useTodaySession({
  setActiveRound,
  setSecondsLeft,
}: ITrackerState) {
  const { workInterval } = useLoadSettings();

  const {
    data: sessionResponse,
    isLoading,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: ["get today session"],
    queryFn: () => trackerService.getTodaySession(),
  });

  const rounds = sessionResponse?.data.rounds;

  useEffect(() => {
    if (isSuccess && rounds) {
      const activeRound = rounds.find((round) => !round.isCompleted);
      setActiveRound(activeRound);

      if (activeRound && activeRound?.totalSeconds !== 0) {
        setSecondsLeft(activeRound.totalSeconds);
      }
    }
  }, [isSuccess, rounds]);

  return { sessionResponse, isLoading, refetch, isSuccess, workInterval };
}
