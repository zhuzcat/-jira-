import { Dropdown, Menu, Modal, Table, TableProps } from "antd";
import { User } from "types/user";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useDeleteProject, useEditProject } from "utils/projects";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./utils";

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
}

const List = ({ users, ...props }: ListProps) => {
  // 通过函数柯里化 定义pin项目的方法
  const { mutate } = useEditProject(useProjectsQueryKey());
  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin });

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
          {
            render(value, project) {
              return <More project={project} />;
            },
          },
        ]}
      />
    </div>
  );
};

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();

  const { mutate } = useDeleteProject(useProjectsQueryKey());
  const confirmDelete = (id: number) => {
    Modal.confirm({
      title: "确定删除这个项目吗？",
      content: "点击确认删除",
      okText: "确认",
      onOk: () => {
        mutate({ id });
      },
    });
  };

  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"}>
            <ButtonNoPadding type="link" onClick={() => startEdit(project.id)}>
              编辑
            </ButtonNoPadding>
          </Menu.Item>
          <Menu.Item key={"delete"}>
            <ButtonNoPadding
              type="link"
              onClick={() => confirmDelete(project.id)}
            >
              删除
            </ButtonNoPadding>
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};

export default List;
