import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";

const ProjectList = () => {
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel />
      <List />
    </Container>
  );
};

export default ProjectList;

const Container = styled.div`
  padding: 3.2rem;
`;
