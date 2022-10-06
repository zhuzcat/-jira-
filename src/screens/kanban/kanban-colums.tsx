import { Card } from "antd";
import { Kanban } from "types/kanban";
import { useTasks } from "utils/task";
import { useTaskType } from "utils/task-type";
import { useTaskSearchParams } from "./utils";
import styled from "@emotion/styled";

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

const KanbanColumns = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTaskSearchParams());
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TasksContainer>
        {tasks?.map((task) => (
          <Card key={task.id} style={{ marginBottom: "0.5rem" }}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
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
