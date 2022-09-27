import { useState } from "react";
import RegisterScreen from "./RegisterScreen";
import LoginScreen from "./LoginScreen";

const UnauthenticatedApp = () => {
  // 切换登录与注册的标识
  const [isRegister, setIsRegister] = useState(false);

  const toggleRegister = () => {
    setIsRegister((prevState) => !prevState);
  };

  return (
    <>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      <button onClick={toggleRegister}>去{isRegister ? "登录" : "注册"}</button>
    </>
  );
};

export default UnauthenticatedApp;
