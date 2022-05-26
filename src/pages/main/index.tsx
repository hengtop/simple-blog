import { memo } from "react";
import { Outlet } from "react-router-dom";

export default memo(function index() {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <div>
      <h2>主页</h2>
      <Outlet />
    </div>
  );
});
