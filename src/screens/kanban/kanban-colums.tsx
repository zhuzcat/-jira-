import { Card, Dropdown, Menu, Modal } from "antd";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskType } from "utils/task-type";
import { useKanbanQueryKey, useTaskModal, useTaskSearchParams } from "./utils";
import styled from "@emotion/styled";
import CreateTask from "./create-task";
import { Task } from "types/task";
import Mark from "components/mark";
import { useDeleteKanban } from "utils/kanban";
import { ButtonNoPadding, Row } from "components/lib";
import React from "react";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskType();
  const name = taskTypes?.find((item) => item.id === id)?.name;
  const bugIcon = "https://imooc-jira.vercel.app/static/media/bug.5d8e8fd5.svg";
  const taskIcon =
    "https://imooc-jira.vercel.app/static/media/task.69774797.svg";
  if (!name) {
    return null;
  }
  return <img alt={"task-icon"} src={name === "task" ? taskIcon : bugIcon} />;
};

// 将任务卡片单独分离出来
const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTaskModal();
  const { name: keyword } = useTaskSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      key={task.id}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
    >
      <p>
        <Mark name={task.name} keyword={keyword || ""} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const KanbanColumns = React.forwardRef<HTMLDivElement, { kanban: Kanban }>(
  ({ kanban, ...props }: { kanban: Kanban }, ref) => {
    const { data: allTasks } = useTasks(useTaskSearchParams());
    const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

    return (
      <Container ref={ref} {...props}>
        <Row between>
          <h3>{kanban.name}</h3>
          <More kanban={kanban} key={kanban.id}></More>
        </Row>
        <TasksContainer>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          <CreateTask key={"addTask"} kanbanId={kanban.id} />
        </TasksContainer>
      </Container>
    );
  }
);

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey());

  // 删除确认框
  const confirmDelete = (id: number) => {
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确认删除吗？",
      onOk() {
        return deleteKanban({ id });
      },
    });
  };

  // dropdown的overlay
  const overlay = (
    <Menu>
      <Menu.Item key="delete-kanban">
        <ButtonNoPadding type="link" onClick={() => confirmDelete(kanban.id)}>
          删除
        </ButtonNoPadding>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={overlay}>
      <ButtonNoPadding type="link">...</ButtonNoPadding>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default KanbanColumns;
