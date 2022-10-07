import { Button, Modal, List } from "antd";
import { ScreenContainer } from "components/lib";
import { useState } from "react";
import { useProjectById } from "screens/kanban/utils";
import { useDeleteEpic, useEpics } from "utils/epic";
import { useTasks } from "utils/task";
import { useEpicSearchParams, useEpicsQueryKey } from "./utils";
import { Epic } from "types/epic";
import { Row } from "components/lib";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { CreateEpic } from "./create-epic";
import { useDocumentTitle } from "utils";

const EpicScreen = () => {
  // 设置标题
  useDocumentTitle("任务栏列表");

  const { data: currentProject } = useProjectById();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicsQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `确定删除项目组：${epic.name}`,
      content: "点击确定删除",
      okText: "确定",
      onOk() {
        deleteEpic({ id: epic.id });
      },
    });
  };

  return (
    <ScreenContainer>
      <Row between>
        <h1>{currentProject?.name}</h1>
        <Button onClick={() => setEpicCreateOpen(true)}>添加任务组</Button>
      </Row>
      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={(epic) => {
          return (
            <List.Item key={epic.id}>
              <List.Item.Meta
                title={
                  <Row between={true}>
                    <span>{epic.name}</span>
                    <Button
                      onClick={() => confirmDeleteEpic(epic)}
                      type={"link"}
                    >
                      删除
                    </Button>
                  </Row>
                }
                description={
                  <div>
                    <div>
                      开始时间：{dayjs(epic.start).format("YYYY-MM-DD")}
                    </div>
                    <div>结束时间：{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                  </div>
                }
              ></List.Item.Meta>
              <div>
                {tasks
                  ?.filter((task) => task.epicId === epic.id)
                  .map((task) => (
                    <div>
                      <Link
                        to={`/projects/${currentProject?.id}/kanban?editingTaskId=${task.id}`}
                        key={task.id}
                      >
                        {task.name}
                      </Link>
                    </div>
                  ))}
              </div>
            </List.Item>
          );
        }}
      ></List>
      <CreateEpic
        visible={epicCreateOpen}
        onClose={() => setEpicCreateOpen(false)}
      />
    </ScreenContainer>
  );
};

export default EpicScreen;
