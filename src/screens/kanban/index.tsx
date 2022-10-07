import styled from "@emotion/styled";
import { Spin } from "antd";
import { ScreenContainer } from "components/lib";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import { useTasks } from "utils/task";
import CreateKanban from "./create-kanban";
import KanbanColumns from "./kanban-colums";
import SearchPanel from "./search-panel";
import TaskModal from "./task-modal";
import {
  useKanbanSearchParams,
  useProjectById,
  useTaskSearchParams,
} from "./utils";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: kanbans, isLoading: kanbanLoading } = useKanbans(
    useKanbanSearchParams()
  );
  const { data: currentProject } = useProjectById();
  const { isLoading: taskLoading } = useTasks(useTaskSearchParams());

  // 如果有在加载 就返回true
  const isLoaing = taskLoading || kanbanLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoaing ? (
        <Spin size="large" />
      ) : (
        <Container>
          {kanbans?.map((kanban, index) => {
            return <KanbanColumns kanban={kanban} key={kanban.id} />;
          })}
          <CreateKanban key="addKanban" />
        </Container>
      )}
      <TaskModal />
    </ScreenContainer>
  );
};

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;

export default KanbanScreen;
