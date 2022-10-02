import styled from "@emotion/styled";
import { Spin, Typography } from "antd";

// row样式
export const Row = styled.div<{
  gap?: number | undefined;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? "space-between" : undefined)};
  margin-bottom: ${(props) => props.marginBottom + "rem"};
  > * {
    /* 不影响垂直居中 */
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${(props) =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

// 全屏样式
const FullPageDiv = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

// 全屏loading的组件
export const FullPageLoading = () => {
  return (
    <FullPageDiv>
      <Spin />
    </FullPageDiv>
  );
};

// 全屏展示错误信息的组件
export const FullPageErrorFallBack = ({ error }: { error: Error | null }) => {
  return (
    <FullPageDiv>
      <Typography.Text type="danger">{error?.message}</Typography.Text>
    </FullPageDiv>
  );
};
