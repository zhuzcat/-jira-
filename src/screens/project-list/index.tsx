import { Typography } from "antd";
import List from "./list";
import SearchPanel from "./search-panel";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { useUser } from "utils/users";
import { useProjectParam } from "./utils";

const ProjectList = () => {
  // 定义标题
  useDocumentTitle("项目列表");

  const [param, setParam] = useProjectParam();
  // 通过防抖的方式设置参数
  const {
    isLoading,
    data: list,
    error,
    retry,
  } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        reload={retry}
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
      />
    </Container>
  );
};

export default ProjectList;

const Container = styled.div`
  padding: 3.2rem;
`;
