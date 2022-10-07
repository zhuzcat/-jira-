import { Button } from "antd";
import List from "./list";
import SearchPanel from "./search-panel";
import { useDebounce, useDocumentTitle } from "utils";
import { useProjects } from "utils/projects";
import { useUser } from "utils/users";
import { useProjectModal, useProjectParam } from "./utils";
import { ErrorBox, Row, ScreenContainer } from "components/lib";

const ProjectList = () => {
  // 定义标题
  useDocumentTitle("项目列表");

  const { open } = useProjectModal();

  const [param, setParam] = useProjectParam();
  // 通过防抖的方式设置参数
  const { isLoading, data: list, error } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();
  return (
    <ScreenContainer>
      <Row between marginBottom={2}>
        <h1>项目列表</h1>
        <Button onClick={open}>创建项目</Button>
      </Row>
      <SearchPanel param={param} setParam={setParam} users={users || []} />
      <ErrorBox error={error} />
      <List loading={isLoading} dataSource={list || []} users={users || []} />
    </ScreenContainer>
  );
};

export default ProjectList;
