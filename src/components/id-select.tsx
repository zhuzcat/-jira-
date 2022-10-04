import React from "react";
import { Select } from "antd";

type SelectProps = React.ComponentProps<typeof Select>;

// 定义id选择器的props接口 需要将antd中Select的相关项排除掉
interface IdSelectProps
  extends Omit<SelectProps, "value" | "onChange" | "options"> {
  value: string | number | null | undefined;
  onChange: (value?: number) => void;
  options?: { name: string; id: number }[];
  defaultValue?: string;
}

const IdSelect = ({
  value,
  onChange,
  options,
  defaultValue,
  ...restProps
}: IdSelectProps) => {
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange(toNumber(value) || undefined)}
      {...restProps}
    >
      {defaultValue && <Select.Option value={0}>{defaultValue}</Select.Option>}
      {options?.map((item) => {
        return (
          <Select.Option key={toNumber(item.id)} value={toNumber(item.id)}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default IdSelect;

// 将其它类型的转换为数字
const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value));
