import debounce from "lodash.debounce";
import { useCallback, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";

import { TypeTaskFormState } from "@/types/task.types";

import { useCreateTask } from "./useCreateTask";
import { useUpdateTask } from "./useUpdateTask";

interface IUseTaskDebounce {
  watch: UseFormWatch<TypeTaskFormState>;
  itemId: string;
}

export function useTaskDebounce({ watch, itemId }: IUseTaskDebounce) {
  const { updateTask } = useUpdateTask();
  const { createTask } = useCreateTask();

  const debouncedCreateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      createTask(formData);
    }, 500),
    [],
  );

  const debouncedUpdateTask = useCallback(
    debounce((formData: TypeTaskFormState) => {
      updateTask({ id: itemId, data: formData });
    }, 500),
    [],
  );

  useEffect(() => {
    const { unsubscribe } = watch((formData) => {
      if (itemId) {
        debouncedUpdateTask({
          ...formData,
          priority: formData.priority || undefined,
        });
      } else {
        debouncedCreateTask(formData);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [watch(), debouncedUpdateTask, debouncedCreateTask]);
}
