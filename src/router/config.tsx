import React, { lazy, Suspense } from "react";

type lazyPropsType = () => Promise<{ default: React.ComponentType }>;
interface propsType {
  importRoute: lazyPropsType;
}

interface CustomRouterObjectType<T = any> {
  element?: (() => Promise<T>) | React.ReactNode;
  caseSensitive?: boolean;
  children?: CustomRouterObjectType<T>[];
  index?: boolean;
  path?: string;
}

const routes: CustomRouterObjectType[] = [
  {
    path: "/*",
    element: () => import("pages/main"),
    children: [
      { path: "", element: () => import("pages/main/children/posts") },
      {
        path: "class/:classId",
        element: () => import("pages/main/children/class"),
      },
      {
        path: "article/:articleId",
        element: () => import("pages/main/children/article"),
      },
      {
        path: "admin",
        element: () => import("pages/main/children/admin"),
      },
      {
        path: "*",
        element: () => import("pages/main/children/error/404"),
      },
    ],
  },
];

//定义自动包裹Suspense函数
function LazyElement(props: propsType) {
  const { importRoute } = props;
  const LazyComponent = lazy(importRoute);
  return (
    <Suspense fallback={<div>加载中</div>}>
      <LazyComponent />
    </Suspense>
  );
}

// 处理routes 如果element是懒加载，要包裹Suspense
function dealRoutes(routesArr: CustomRouterObjectType[]) {
  if (routesArr && Array.isArray(routesArr) && routesArr.length > 0) {
    routesArr.forEach((route) => {
      if (route.element && typeof route.element == "function") {
        const importRoute = route.element as lazyPropsType;
        route.element = <LazyElement importRoute={importRoute} />;
      }
      if (route.children) {
        dealRoutes(route.children);
      }
    });
  }
}
dealRoutes(routes);

export { routes };
