import { useAuth } from "context/auth-context";

const AuthenticatedApp = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      {user?.name}
      <button onClick={logout}>退出登录</button>
    </div>
  );
};

export default AuthenticatedApp;
