import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { subset, cleanObject } from "utils";
import { URLSearchParamsInit } from "react-router-dom";

/* 
  返回页面url中，指定键的参数值
*/
export const useUrlQueryParam = <K extends string>(keys: K[]) => {
  const [searchParam] = useSearchParams();
  const setSearchParam = useSetUrlSearchParam();
  const [stateKeys] = useState(keys);

  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParam), stateKeys) as {
          [key in K]: string;
        },
      [searchParam, stateKeys]
    ),
    (params: Partial<{ [key in K]: unknown }>) => {
      return setSearchParam(params);
    },
  ] as const;
};

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParam] = useSearchParams();
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit;
    return setSearchParam(o);
  };
};
