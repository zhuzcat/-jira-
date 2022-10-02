import { Table, TableProps } from "antd";
import { User } from "types/user";
import dayjs from "dayjs";

export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
}

const List = ({ users, ...props }: ListProps) => {
  const a: any = undefined;
  return (
    <div>
      {a.aa}
      <Table
        rowKey={"id"}
        pagination={false}
        {...props}
        columns={[
          {
            title: "名称",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return project.name;
            },
          },
          {
            title: "部门",
            key: "organization",
            dataIndex: "organization",
          },
          {
            title: "负责人",
            key: "personId",
            render(value, project) {
              return (
                <span>
                  {users.find((user) => user.id === project.personId)?.name ||
                    "未知"}
                </span>
              );
            },
          },
          {
            title: "创建时间",
            key: "created",
            render(value, project) {
              return (
                <span>
                  {project.created
                    ? dayjs(project.created).format("YYYY-MM-DD")
                    : "无"}
                </span>
              );
            },
          },
        ]}
      />
    </div>
  );
};
export default List;
