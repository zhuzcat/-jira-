import { useQuery } from "react-query";
import { User } from "types/user";
import { useHttp } from "./http";

export const useUser = (params?: Partial<User>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  return useQuery<User[]>(["users", params], () =>
    client("users", { data: params })
  );
};
