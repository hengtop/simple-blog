import React, { memo } from "react";
import { useAuth } from "context/auth";

import UnauthenticatedApp from "./components/unauthenticated-app";
import AuthenticatedApp from "./components/authenticated-app";
import { Container } from "./style";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const { user } = useAuth();
  console.log(user);
  //其他逻辑

  return (
    <Container>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </Container>
  );
});
