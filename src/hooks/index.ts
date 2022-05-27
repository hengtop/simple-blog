import { useEffect } from "react";

// 对于之灾组件挂载完后执行的逻辑进行封装
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback();
  }, [callback]);
};
