import { useCallback, useState } from "react";
import { useMountedRef } from "utils";

interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

export const useAsync = <T>(initialState?: State<T>) => {
  // 获取当前组件的状态
  const mountedRef = useMountedRef();

  const [state, setState] = useState({
    ...defaultInitialState,
    ...initialState,
  });

  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback((data: T) => {
    setState({
      data,
      error: null,
      stat: "success",
    });
  }, []);

  const setError = useCallback((error: Error) => {
    setState({
      data: null,
      error,
      stat: "error",
    });
  }, []);

  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error("请传入Promise类型数据");
      }
      // 如果传入了retry的方法，就
      if (runConfig?.retry) {
        setRetry(() => () => {
          run(runConfig.retry(), runConfig);
        });
      }
      // 使用setState的函数式写法避免无限循环
      setState((prevState) => ({ ...prevState, stat: "loading" }));
      return promise
        .then((data) => {
          if (mountedRef.current) setData(data);
          return data;
        })
        .catch((error) => {
          setError(error);
          return error;
        });
    },
    [mountedRef, setData, setError, setRetry]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    retry,
    ...state,
  };
};
