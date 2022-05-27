import React, { memo } from "react";
import { useAuth } from "context/auth";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const { logout } = useAuth();

  //其他逻辑

  return (
    <div>
      内容区
      <button onClick={logout}>退出</button>
    </div>
  );
});
