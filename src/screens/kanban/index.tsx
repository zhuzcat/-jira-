import styled from "@emotion/styled";
import { useDocumentTitle } from "utils";
import { useKanbans } from "utils/kanban";
import KanbanColumns from "./kanban-colums";
import SearchPanel from "./search-panel";
import { useKanbanSearchParams, useProjectById } from "./utils";

const KanbanScreen = () => {
  useDocumentTitle("看板列表");

  const { data: kanbans } = useKanbans(useKanbanSearchParams());
  const { data: currentProject } = useProjectById();

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <Container>
        {kanbans?.map((kanban) => {
          return <KanbanColumns kanban={kanban} key={kanban.id} />;
        })}
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 3rem;
`;

export default KanbanScreen;
