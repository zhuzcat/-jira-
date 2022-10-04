import { useEffect } from "react";
import { useAsync } from "./use-async";
import { useHttp } from "./http";
import { cleanObject } from "utils";
import { Project } from "screens/project-list/list";

export const useProjects = (params: Partial<Project>) => {
  // 获取发送请求的钩子
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();
  // 发送请求获取产品列表
  useEffect(() => {
    run(client("projects", { data: cleanObject(params) }), {
      retry: () => client("projects", { data: cleanObject(params) }),
    });
  }, [params, run, client]);
  return result;
};

export const useEditProject = () => {
  const { run, ...restAsync } = useAsync();
  const client = useHttp();
  const mutate = async (param: Partial<Project>) => {
    await run(
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      })
    );
  };
  return {
    mutate,
    restAsync,
  };
};
