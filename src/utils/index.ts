import { useEffect, useState } from "react";

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
