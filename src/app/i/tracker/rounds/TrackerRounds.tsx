import cn from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { IPomodoroRoundResponse } from "@/types/tracker.types";

import styles from "./TrackerRound.module.scss";

interface ITrackerRounds {
  rounds: IPomodoroRoundResponse[] | undefined;
  nextRoundHandler: () => void;
  prevRoundHandler: () => void;
  activeRound: IPomodoroRoundResponse | undefined;
}

export function TrackerRounds({
  rounds,
  nextRoundHandler,
  prevRoundHandler,
  activeRound,
}: ITrackerRounds) {
  const isCanPrevRound = rounds
    ? rounds.some((round) => round.isCompleted)
    : false;

  const isCanNextRound = rounds
    ? !rounds[rounds.length - 1].isCompleted
    : false;

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        disabled={!isCanPrevRound}
        onClick={() => (isCanPrevRound ? prevRoundHandler() : false)}
      >
        <ChevronLeft size={23} />
      </button>
      <div className={styles.roundContainer}>
        {rounds &&
          rounds.map((round, index) => (
            <div
              key={round.id}
              className={cn(styles.round, {
                [styles.completed]: round.isCompleted,
                [styles.active]:
                  round.id === activeRound?.id && !round.isCompleted,
              })}
            />
          ))}
      </div>
      <button
        className={styles.button}
        disabled={!isCanNextRound}
        onClick={() => (isCanNextRound ? nextRoundHandler() : false)}
      >
        <ChevronRight size={23} />
      </button>
    </div>
  );
}
