import { Modal, Form, Input, Button } from "antd";
import { useForm } from "antd/es/form/Form";
import TaskTypeSelect from "components/task-type-select";
import UserSelect from "components/user-select";
import { useEffect } from "react";
import { useDeleteTask, useEditTask } from "utils/task";
import { useTaskModal, useTaskQueryKey } from "./utils";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const TaskModal = () => {
  const [form] = useForm();
  const { editingTask, close, editingTaskId } = useTaskModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTaskQueryKey()
  );
  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());

  // 取消编辑
  const onCancel = () => {
    close();
    form.resetFields();
  };

  // 确认编辑
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  // 确认删除
  const confirmDelete = () => {
    close();
    Modal.confirm({
      okText: "确认",
      cancelText: "取消",
      title: "确认删除吗",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  // 在editingTaskId改变时修改表单内容
  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender
      onCancel={onCancel}
      onOk={onOk}
      okText="确认"
      cancelText="取消"
      confirmLoading={editLoading}
      title="编辑任务"
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label="任务名"
          name="name"
          rules={[{ required: true, message: "任务名不能为空" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOption="经办人" />
        </Form.Item>

        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect defaultOption="类型" />
        </Form.Item>

        <div style={{ textAlign: "right" }}>
          <Button
            style={{ fontSize: "14px" }}
            size={"small"}
            onClick={confirmDelete}
          >
            删除
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default TaskModal;
