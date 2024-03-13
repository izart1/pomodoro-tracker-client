import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TypePomodoroRoundState } from "@/types/tracker.types";

import { trackerService } from "@/services/tracker.service";

export function useUpdateRound() {
  const queryClient = useQueryClient();

  const { mutate: updateRound, isPending: isUpdateRoundPending } = useMutation({
    mutationKey: ["update round"],
    mutationFn: ({ id, data }: { id: string; data: TypePomodoroRoundState }) =>
      trackerService.updateRound(id, data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get today session"] });
    },
  });

  return { updateRound, isUpdateRoundPending };
}
