import { useHttp } from "./http";
import { Project } from "screens/project-list/list";
import { QueryKey, useMutation, useQuery, useQueryClient } from "react-query";
import { useProjectParam } from "screens/project-list/utils";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./use-optimistic-option";

export const useProjects = (params?: Partial<Project>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<Project[]>(["projects", params], () =>
    client("projects", { data: params })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

// 获取单个项目的信息
export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      // 在id不是undefined的时候发送请求
      enabled: Boolean(id),
    }
  );
};
