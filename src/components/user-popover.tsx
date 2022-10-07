import { Popover, List, Typography } from "antd";
import styled from "@emotion/styled";
import { useUser } from "utils/users";

const UserPopover = () => {
  // 获取收藏项目列表
  const { data: users, refetch } = useUser();
  // popover的内容
  const content = (
    <ContainerContent>
      <Typography.Text type="secondary">组员列表</Typography.Text>
      <List>
        {users?.map((user) => {
          return (
            <List.Item key={user.id}>
              <List.Item.Meta title={user.name} />
            </List.Item>
          );
        })}
      </List>
    </ContainerContent>
  );

  return (
    <Popover
      onVisibleChange={() => refetch()}
      placement="bottom"
      content={content}
    >
      <span>组员</span>
    </Popover>
  );
};

const ContainerContent = styled.div`
  min-width: 30rem;
`;

export default UserPopover;
