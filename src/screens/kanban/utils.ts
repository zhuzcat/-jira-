import { useMemo } from "react";
import { useLocation } from "react-router";
import { useProject } from "utils/projects";
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
