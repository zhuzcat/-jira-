import styled from "@emotion/styled";
import React from "react";
import { Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";

// 获取当前页面的二级路由
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

const ProjectScreen = () => {
  const routeType = useRouteType();

  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key={"kanban"}>
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to="epic">任务栏</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Outlet />
      </Main>
    </Container>
  );
};

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
  width: 16rem;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
  flex: 1;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
`;

export default ProjectScreen;
