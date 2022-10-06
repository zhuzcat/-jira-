/** @jsxImportSource @emotion/react */
import { Form, Input } from "antd";
import { User } from "types/user";
import { Project } from "types/project";
import UserSelect from "components/user-select";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
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
        <UserSelect
          value={param.personId}
          defaultOption="负责人"
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
};
export default SearchPanel;
