import { useCallback, useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/projects";
import { useTask } from "utils/task";
import { useUrlQueryParam } from "utils/url";

export const useProjectIdUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectById = () => useProject(useProjectIdUrl());

export const useKanbanSearchParams = () => ({
  projectId: useProjectIdUrl(),
});

export const useKanbanQueryKey = () => ["kanbans", useKanbanSearchParams()];

export const useTaskSearchParams = () => {
  const [param] = useUrlQueryParam(["name", "processorId", "typeId"]);
  const projectId = useProjectIdUrl();

  return useMemo(
    () => ({
      projectId,
      name: param.name || undefined,
      processorId: Number(param.processorId) || undefined,
      typeId: Number(param.typeId) || undefined,
    }),
    [projectId, param]
  );
};

export const useTaskQueryKey = () => ["tasks", useTaskSearchParams()];

// 管理编辑task-modal
export const useTaskModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId",
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: undefined });
  }, [setEditingTaskId]);

  return {
    editingTaskId,
    editingTask,
    isLoading,
    close,
    startEdit,
  };
};
