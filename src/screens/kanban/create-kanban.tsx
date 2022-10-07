import { Input } from "antd";
import { useState } from "react";
import { useAddKanban } from "utils/kanban";
import { Container } from "./kanban-colums";
import { useKanbanQueryKey, useProjectIdUrl } from "./utils";

const CreateKanban = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdUrl();
  const { mutateAsync: addKanban } = useAddKanban(useKanbanQueryKey());

  // 按下回车提交
  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <Input
        size="large"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onPressEnter={submit}
        placeholder="新建看板名称"
      />
    </Container>
  );
};

export default CreateKanban;
