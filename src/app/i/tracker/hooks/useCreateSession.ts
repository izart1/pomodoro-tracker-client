import { useMutation, useQueryClient } from "@tanstack/react-query";

import { trackerService } from "@/services/tracker.service";

export function useCreateSession() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create new session"],
    mutationFn: () => trackerService.createSession(),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ["get today session"],
      });
    },
  });

  return { mutate, isPending };
}
