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

const SearchPanel = ({ users, param, setParam }: SearchPanelProps) => {
  return (
    <Form css={{ marginBottom: "2rem" }} layout="inline">
      <Form.Item>
        <Input
          value={param.name}
          placeholder="项目名"
          type="text"
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <Select
          defaultValue={""}
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        >
          <>
            <Select.Option key={""} value={""}>
              负责人
            </Select.Option>
            {users.map((item) => {
              return (
                <Select.Option key={item.id} value={item.id}>
                  {item.name}
                </Select.Option>
              );
            })}
          </>
        </Select>
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;
