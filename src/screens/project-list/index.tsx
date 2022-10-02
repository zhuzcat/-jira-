import { useState } from "react";
import { Typography } from "antd";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce } from "utils";
import { useProjects } from "utils/projects";
import { useUser } from "utils/users";

const ProjectList = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  // 通过防抖的方式设置参数
  const debounceParam = useDebounce(param, 200);
  const { isLoading, data: list, error } = useProjects(debounceParam);
  const { data: users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </Container>
  );
};

export default ProjectList;

const Container = styled.div`
  padding: 3.2rem;
`;
