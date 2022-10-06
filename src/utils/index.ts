import { useEffect, useRef, useState } from "react";

// 判断是否是falsy类型的值
export const isFalsy = (value: unknown) => (value === 0 ? false : !value);

// 判断是否为空值
export const isVoid = (value: unknown) =>
  value === undefined || value === null || value === "";

// 删除对象中的空值
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {};
  }
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isVoid(value)) {
      delete result[key];
    }
  });
  return result;
};

// 组件挂载执行一次的钩子
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, []);
};

// 自定义防抖的钩子
export const useDebounce = <T>(value: T, delay?: number) => {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounceValue;
};

// 自定义修改标题的钩子
export const useDocumentTitle: (
  title: string,
  keeponUnmount?: boolean
) => void = (title, keeponUnmount = false) => {
  // const oldTitle = document.title;
  const oldTitle = useRef(document.title).current;

  useEffect(() => {
    document.title = title;
  }, [title]);

  useEffect(() => {
    return () => {
      if (keeponUnmount) {
        document.title = oldTitle;
      }
    };
  }, [oldTitle, keeponUnmount]);
};

// 重置路由
export const resetRouter = () =>
  (window.location.href = window.location.origin);

// 返回组件的挂载状态 如果已经挂载返回true 否则返回false
export const useMountedRef = () => {
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  });

  return mountedRef;
};

// 传入一个对象，和键集合，返回对应的对象中的键值对
export const subset = <
  O extends { [key in string]: unknown },
  K extends keyof O
>(
  obj: O,
  keys: K[]
) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(key as K)
  );
  return Object.fromEntries(filteredEntries) as Pick<O, K>;
};
