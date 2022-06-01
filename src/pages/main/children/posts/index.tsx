import React, { memo, useCallback, useState } from "react";
import { useMount } from "hooks";
import { service } from "network";
import { awaitHandle } from "utils";
import PostCard from "components/post-card";
import { PostContainer } from "./style";
import Container from "components/container";

interface ArticleParamsType {
  id?: number;
  title: string;
  context: string;
  publishTime?: string;
  type: number;
  categoryIds: number[];
  count?: number;
}

export default memo(function Index() {
  //props/state
  const [articleLists, setArticleLists] = useState<ArticleParamsType[]>([]);

  //redux hooks

  //other hooks
  const client = service.useHttp();
  useMount(
    useCallback(() => {
      getArticleList();
    }, []),
  );

  const getArticleList = useCallback(async () => {
    const [data, err] = await awaitHandle(client("/articleList"));
    if (err) {
      alert(err);
    } else {
      setArticleLists(data);
    }
  }, []);

  //其他逻辑

  return (
    <PostContainer>
      <Container>
        {articleLists.map((item) => {
          return <PostCard key={item.id} articleInfo={item} />;
        })}
      </Container>
    </PostContainer>
  );
});
