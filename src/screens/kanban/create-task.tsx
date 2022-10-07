import { Card, Input } from "antd";
import { useEffect, useState } from "react";
import { useAddTask } from "utils/task";
import { useProjectIdUrl, useTaskQueryKey } from "./utils";

const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");
  const [inputMode, setInputMode] = useState(false);
  const projectId = useProjectIdUrl();
  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());

  const submit = async () => {
    await addTask({ name, projectId, kanbanId });
    setInputMode(false);
  };

  const toggle = () => {
    setInputMode((mode) => !mode);
  };

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+添加业务</div>;
  }

  return (
    <Card>
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={toggle}
        onPressEnter={submit}
        placeholder="业务名称"
      />
    </Card>
  );
};

export default CreateTask;
