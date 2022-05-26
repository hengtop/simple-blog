import { memo } from "react";
import { useParams } from "react-router-dom";

export default memo(function Index() {
  //props/state

  //redux hooks

  //other hooks
  const params = useParams();
  console.log(params);

  //其他逻辑

  return <div>单个文章{params.articleId}</div>;
});
