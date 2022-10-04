import { Button, Dropdown, Menu } from "antd";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Routes, Navigate } from "react-router";
import { useAuth } from "context/auth-context";
import ProjectList from "screens/project-list";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";
import ProjectScreen from "screens/project";
import KanbanScreen from "screens/kanban";
import EpicScreen from "screens/epic";
import { resetRouter } from "utils";

const AuthenticatedApp = () => {
  return (
    <Container>
      <Header />
      <Main>
        <Router>
          <Routes>
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:projectId" element={<ProjectScreen />}>
              <Route path="kanban" element={<KanbanScreen />} />
              <Route path="epic" element={<EpicScreen />} />
              <Route index element={<Navigate to="kanban" />} />
            </Route>
            <Route index element={<Navigate to="projects" />} />
          </Routes>
        </Router>
      </Main>
    </Container>
  );
};

const Header = () => {
  const { user, logout } = useAuth();
  return (
    <PageHeader between>
      <PageLeft gap={2}>
        <Button type="link" onClick={resetRouter}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
        </Button>
        <h2>项目</h2>
        <h2>组员</h2>
      </PageLeft>
      <PageRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </PageRight>
    </PageHeader>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`;

const PageHeader = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;

const PageLeft = styled(Row)``;

const PageRight = styled.div``;

const Main = styled.main``;

export default AuthenticatedApp;
