import { useEffect } from "react";
import { User } from "types/user";
import { cleanObject } from "utils";
import { useHttp } from "./http";
import { useAsync } from "./use-async";

export const useUser = (param?: Partial<User>) => {
  const clinet = useHttp();
  const { run, ...result } = useAsync<User[]>();
  useEffect(() => {
    run(clinet("users", cleanObject(param || {})));
  }, [param]);

  return result;
};
