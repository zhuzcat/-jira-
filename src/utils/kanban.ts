import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";

export const useKanbans = (params?: Partial<Kanban>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};
