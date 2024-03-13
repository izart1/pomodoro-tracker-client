import { useMutation, useQueryClient } from "@tanstack/react-query";

import { trackerService } from "@/services/tracker.service";

// setSecondsLeft(workInterval*60)

export function useDeleteSession(onDeleteSuccess: () => void) {
  const queryClient = useQueryClient();

  const { mutate: deleteSession, isPending: isDeletePending } = useMutation({
    mutationKey: ["delete session"],
    mutationFn: (id: string) => trackerService.deleteSession(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get today session"],
      });
      onDeleteSuccess();
    },
  });

  return { deleteSession, isDeletePending };
}
