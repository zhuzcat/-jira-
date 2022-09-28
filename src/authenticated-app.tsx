import { Dropdown, Menu } from "antd";
import { useAuth } from "context/auth-context";
import ProjectList from "screens/project-list";
import { Row } from "components/lib";
import styled from "@emotion/styled";
import { ReactComponent as SoftwareLogo } from "assets/software-logo.svg";

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <Container>
      <PageHeader between>
        <PageLeft gap={2}>
          <SoftwareLogo width={"18rem"} color={"rgb(38, 132, 255)"} />
          <h2>项目</h2>
          <h2>组员</h2>
        </PageLeft>
        <PageRight>
          <Dropdown
            overlay={
              <Menu>
                <Menu.Item key={"logout"}>
                  <a onClick={logout}>登出</a>
                </Menu.Item>
              </Menu>
            }
          >
            <a onClick={(e) => e.preventDefault()}>Hi, {user?.name}</a>
          </Dropdown>
        </PageRight>
      </PageHeader>
      <Main>
        <ProjectList />
      </Main>
    </Container>
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
