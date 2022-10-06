import styled from "@emotion/styled";
import { ScreenContainer } from "components/lib";
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
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <Container>
        {kanbans?.map((kanban) => {
          return <KanbanColumns kanban={kanban} key={kanban.id} />;
        })}
      </Container>
    </ScreenContainer>
  );
};

const Container = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export default KanbanScreen;
