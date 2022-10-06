import { Button, Input } from "antd";
import { Row } from "components/lib";
import TaskTypeSelect from "components/task-type-select";
import UserSelect from "components/user-select";
import { useSetUrlSearchParam } from "utils/url";
import { useTaskSearchParams } from "./utils";

const SearchPanel = () => {
  // 获取参数
  const searchParam = useTaskSearchParams();
  const setUrlParam = useSetUrlSearchParam();
  const reset = () =>
    setUrlParam({
      name: undefined,
      processorId: undefined,
      typeId: undefined,
    });

  return (
    <Row marginBottom={2} gap={2}>
      <Input
        style={{ width: "20rem" }}
        value={searchParam.name}
        placeholder="任务名"
        onChange={(e) => setUrlParam({ name: e.target.value })}
      />

      <UserSelect
        value={searchParam.processorId}
        defaultOption="经办人"
        onChange={(value) => setUrlParam({ processorId: value })}
      />

      <TaskTypeSelect
        value={searchParam.typeId}
        defaultOption="类型"
        onChange={(value) => setUrlParam({ typeId: value })}
      />

      <Button onClick={reset}>清除筛选器</Button>
    </Row>
  );
};

export default SearchPanel;
