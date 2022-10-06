import { useQuery } from "react-query";
import { TaskType } from "types/task-type";
import { useHttp } from "./http";

export const useTaskType = (params?: Partial<TaskType>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<TaskType[]>(["taskTypes"], () => client("taskTypes"));
};
