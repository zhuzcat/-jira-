import { useQuery } from "react-query";
import { Kanban } from "types/kanban";
import { useHttp } from "./http";
import { QueryKey } from "react-query";
import { useMutation } from "react-query";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-option";

export const useKanbans = (params?: Partial<Kanban>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<Kanban[]>(["kanbans", params], () =>
    client("kanbans", { data: params })
  );
};

// 添加看板
export const useAddKanban = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 删除看板
export const useDeleteKanban = (queryKey: QueryKey) => {
  // 使用useHttp发送请求
  const client = useHttp();

  return useMutation(
    (params: Partial<Kanban>) =>
      client(`kanbans/${params.id}`, { method: "DELETE" }),
    useDeleteConfig(queryKey)
  );
};
