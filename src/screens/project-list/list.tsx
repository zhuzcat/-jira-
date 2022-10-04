import { Table, TableProps } from "antd";
import { User } from "types/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useEditProject } from "utils/projects";

export interface Project {
  id: number;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  users: User[];
  reload: () => void;
}

const List = ({ users, reload, ...props }: ListProps) => {
  // 通过函数柯里化 定义pin项目的方法
  const { mutate } = useEditProject();
  const pinProject = (id: number) => (pin: boolean) =>
    mutate({ id, pin }).then(reload);

  return (
    <div>
      <Table
        rowKey={"id"}
        pagination={false}
        {...props}
        columns={[
          {
            title: <Pin checked disabled />,
            key: "pin",
            render(value, project) {
              return (
                <Pin
                  checked={project.pin}
                  onCheckedChange={pinProject(project.id)}
                />
              );
            },
          },
          {
            title: "名称",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return <Link to={String(project.id)}>{project.name}</Link>;
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
