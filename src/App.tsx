import React from "react";
import { useAuth } from "context/auth-context";
import AuthenticatedApp from "authenticated-app";
import UnauthenticatedApp from "unauthenticated-app";
import { ErrorBoundary } from "components/error-boundary";
import { FullPageErrorFallBack } from "components/lib";
import "./App.css";

function App() {
  const { user } = useAuth();

  return (
    <div className="App">
      <ErrorBoundary fallBackRender={FullPageErrorFallBack}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
