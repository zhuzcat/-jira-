import { Popover, List, Typography, Divider } from "antd";
import styled from "@emotion/styled";
import { useProjects } from "utils/projects";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal } from "./utils";

const ProjectPopover = () => {
  const { open } = useProjectModal();
  // 获取收藏项目列表
  const { data: projects, refetch } = useProjects();

  const pinnedProjects = projects?.filter((project) => project.pin);

  // popover的内容
  const content = (
    <ContainerContent>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => {
          return (
            <List.Item key={project.id}>
              <List.Item.Meta title={project.name} />
            </List.Item>
          );
        })}
      </List>
      <Divider />
      <ButtonNoPadding type="link" onClick={open}>
        创建项目
      </ButtonNoPadding>
    </ContainerContent>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>项目</span>
    </Popover>
  );
};

const ContainerContent = styled.div`
  min-width: 30rem;
`;

export default ProjectPopover;
