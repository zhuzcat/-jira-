import { useMutation, useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";
import { QueryKey } from "react-query";
import {
  useAddConfig,
  useEditConfig,
  useDeleteConfig,
} from "./use-optimistic-option";

export const useTasks = (params?: Partial<Task>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};

// 添加任务
export const useAddTask = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 编辑任务
export const useEditTask = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, {
        data: params,
        method: "PATCH",
      }),
    useEditConfig(queryKey)
  );
};

// 删除任务
export const useDeleteTask = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks/${params.id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};

// 获取单个项目的信息
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(["tasks", { id }], () => client(`tasks/${id}`), {
    // 在id不是undefined的时候发送请求
    enabled: Boolean(id),
  });
};
