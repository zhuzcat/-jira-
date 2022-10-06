import { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import UserSelect from "components/user-select";
import { useAddProject, useEditProject } from "utils/projects";
import { useProjectModal, useProjectsQueryKey } from "./utils";
import styled from "@emotion/styled";

const ProjectDrawer = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectModal();
  // 在没有project的时候为添加
  const useProjectMutation = editingProject ? useEditProject : useAddProject;

  // 获取异步mutate来判断是否成功关闭窗口
  const {
    mutateAsync,
    isLoading: mutateLoading,
    error,
  } = useProjectMutation(useProjectsQueryKey());
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    close();
    form.resetFields();
  };

  // 在编辑的项目改变时 修改form值
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "添加项目";

  return (
    <Drawer
      forceRender
      width={"100%"}
      open={projectModalOpen}
      onClose={closeModal}
    >
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form
              form={form}
              layout="vertical"
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label="项目名称"
                name="name"
                rules={[{ required: true, message: "项目名称不能为空" }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>

              <Form.Item
                label="所属部门"
                name="organization"
                rules={[{ required: true, message: "所属部门不能为空" }]}
              >
                <Input placeholder="请输入所属部门" />
              </Form.Item>

              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOption="负责人" />
              </Form.Item>

              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  loading={mutateLoading}
                  type="primary"
                  htmlType="submit"
                >
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 80vh;
`;

export default ProjectDrawer;
