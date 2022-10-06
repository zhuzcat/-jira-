import { useQuery } from "react-query";
import { Task } from "types/task";
import { useHttp } from "./http";

export const useTasks = (params?: Partial<Task>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<Task[]>(["tasks", params], () =>
    client("tasks", { data: params })
  );
};
