"use client";

import { Pause, Play, RefreshCcw } from "lucide-react";

import Loader from "@/components/ui/Loader";
import { Button } from "@/components/ui/buttons/Button";

import { formatTime } from "./format-time";
import { useCreateSession } from "./hooks/useCreateSession";
import { useDeleteSession } from "./hooks/useDeleteSession";
import { useTodaySession } from "./hooks/useTodaySession";
import { useTracker } from "./hooks/useTracker";
import { useTrackerActions } from "./hooks/useTrackerActions";
import { TrackerRounds } from "./rounds/TrackerRounds";

const Tracker = () => {
  const trackerState = useTracker();
  const { isLoading, isSuccess, refetch, sessionResponse, workInterval } =
    useTodaySession(trackerState);
  const rounds = sessionResponse?.data.rounds;
  const actions = useTrackerActions({ ...trackerState, rounds });

  const { isPending, mutate } = useCreateSession();

  const { deleteSession } = useDeleteSession(() =>
    trackerState.setSecondsLeft(workInterval * 60),
  );

  return (
    <div className="relative w-80 text-center">
      {!isLoading && (
        <div className="text-7xl font-semibold">
          {formatTime(trackerState.secondsLeft)}
        </div>
      )}

      {isLoading ? (
        <Loader />
      ) : sessionResponse?.data ? (
        <>
          <TrackerRounds
            rounds={rounds}
            nextRoundHandler={actions.nextRoundHandler}
            prevRoundHandler={actions.prevRoundHandler}
            activeRound={trackerState.activeRound}
          />
          <button
            className="mt-6 opacity-80 hover:opacity-100 transition-opacity"
            onClick={
              trackerState.isRunning
                ? actions.pauseHandler
                : actions.playHandler
            }
            disabled={actions.isUpdateRoundPending}
          >
            {trackerState.isRunning ? <Pause size={30} /> : <Play size={30} />}
          </button>
          <button
            className="absolute top-0 right-0 opacity-40 hover:opacity-90 transition-opacity"
            onClick={() => {
              trackerState.setIsRunning(false);
              deleteSession(sessionResponse?.data.id);
            }}
          >
            <RefreshCcw size={19} />
          </button>
        </>
      ) : (
        <Button className="mt-1" onClick={() => mutate()} disabled={isPending}>
          Create session
        </Button>
      )}
    </div>
  );
};

export default Tracker;
