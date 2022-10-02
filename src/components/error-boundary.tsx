/* 
错误边界
*/
import React from "react";

// 定义props的类型
type FallBackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallBackRender: FallBackRender }>,
  { error: Error | null }
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { children, fallBackRender } = this.props;
    if (error) {
      return fallBackRender({ error });
    }
    return children;
  }
}
