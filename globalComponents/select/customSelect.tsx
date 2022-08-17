import React from "react";
import { Select } from "antd";
const { Option } = Select;

type OptionsType = {
  key: string;
  value: string | number;
  name: React.ReactNode | React.ReactNode[];
  disabled?: boolean;
};

interface ICustomSelect {
  options: OptionsType[];
  defaultValue?: string | number;
  value?: string | number;
  style?: React.CSSProperties;
  onChange: (e: any) => any;
}

const CustomSelect: React.FC<ICustomSelect> = ({ options, ...props }) => {
  return (
    <Select {...props}>
      {options.map((option) => {
        return (
          <Option
            value={option.key}
            disabled={option.disabled}
            key={option.key}
          >
            {option.name}
          </Option>
        );
      })}
    </Select>
  );
};
export default CustomSelect;
