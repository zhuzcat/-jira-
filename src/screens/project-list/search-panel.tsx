/** @jsxImportSource @emotion/react */
import { Form, Input, Select } from "antd";
import { User } from "types/user";

interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}

const SearchPanel = () => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input placeholder="项目名" type="text" />
      </Form.Item>
      <Form.Item>
        <Select>
          <Select.Option value="">负责人</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;
