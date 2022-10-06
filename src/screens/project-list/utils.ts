import { useMemo } from "react";
import { useProject } from "utils/projects";
import { useSetUrlSearchParam, useUrlQueryParam } from "utils/url";

// 项目列表搜索参数
export const useProjectParam = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined,
      }),
      [param]
    ),
    setParam,
  ] as const;
};

// 获取react-query的queryKey
export const useProjectsQueryKey = () => {
  const [param] = useProjectParam();
  return ["projects", param];
};

export const useProjectModal = () => {
  // 创建项目
  const [{ projectCreated }, setSearchParams] = useUrlQueryParam([
    "projectCreated",
  ]);
  // 编辑项目的id
  const [{ projectEditId }, setProjectEditId] = useUrlQueryParam([
    "projectEditId",
  ]);
  const setUrlSearchParam = useSetUrlSearchParam();

  // 获取id对应的项目详情
  const { data: editingProject, isLoading } = useProject(Number(projectEditId));

  const close = () => {
    setUrlSearchParam({ projectCreated: "", projectEditId: "" });
  };
  const open = () => setSearchParams({ projectCreated: true });
  const startEdit = (id: number) => setProjectEditId({ projectEditId: id });

  return {
    projectModalOpen: projectCreated === "true" || Boolean(projectEditId),
    close,
    open,
    startEdit,
    editingProject,
    isLoading,
  };
};
