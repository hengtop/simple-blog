import type { BaseSyntheticEvent } from "react";
import React, { memo, useCallback, useState, useMemo, useEffect } from "react";
import { useParams } from "react-router-dom";
import { service } from "network";
import { awaitHandle } from "utils";
import { useMount } from "hooks";
import { useTheme } from "@mui/material/styles";
import showdownHighlight from "showdown-highlight";
import showdown from "showdown";
import { PhotoSlider } from "react-photo-view";

import Container from "components/container";
import {
  ArticleWrapper,
  ArticleTitle,
  NavWrapper,
  ArticlContext,
} from "./style";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InfoNav from "components/Info-nav";
import Navigation from "components/NavigationContainer";
import md2Navigate from "utils/md2Navigate";
import "react-photo-view/dist/react-photo-view.css";

interface ArticleParamsType {
  id?: number;
  title: string;
  context: string;
  publishTime?: string;
  type: number;
  categoryIds: number[];
  count?: number;
}

interface DataType {
  key: number | string;
  src?: string;
}
const converter = new showdown.Converter({
  ghCompatibleHeaderId: true, //生成兼容github风格的标头id
  strikethrough: true, //支持删除del标签生成
  tables: true, //开启表格语法支持
  smoothLivePrevie: true,
  smartIndentationFix: true,
  extensions: [
    showdownHighlight({
      pre: true,
    }),
  ],
});

export default memo(function Index() {
  //props/state
  const [article, setArticle] = useState<ArticleParamsType>();
  const [imageList, setImageList] = useState<DataType[]>([]);
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(false);

  //redux hooks

  //other hooks
  const theme = useTheme();
  const client = service.useHttp();
  const params = useParams();
  useMount(
    useCallback(() => {
      getArticleById();
    }, []),
  );

  useEffect(() => {
    handleImageList();
  }, [article]);

  //获取文章中的img图片
  const handleImageList = () => {
    const list: DataType[] = [];
    document.querySelectorAll(".articleHtml img").forEach((item, index) => {
      list.push({
        key: index,
        src: (item as HTMLImageElement).src,
      });
    });
    console.log(list);
    setImageList(list);
  };

  const articleHtml = useMemo(() => {
    return {
      __html: converter.makeHtml(article?.context ?? ""),
    };
  }, [article]);

  //其他逻辑
  const getArticleById = useCallback(async () => {
    const [data, err] = await awaitHandle(
      client(`/articleList/${params.articleId}`),
    );
    if (err) {
      console.log(err);
      return;
    }
    setArticle(data);
  }, []);

  //处理文本点击，比如图片预览
  const textClickHandle = (e: BaseSyntheticEvent) => {
    if (e.target.nodeName === "IMG") {
      //获取图片索引
      const index = imageList.findIndex((item) => {
        return item.src === e.target.src;
      });
      setIndex(index);
      setVisible(true);
    }
  };

  return (
    <Container>
      <ArticleWrapper>
        <>
          <ArticleTitle>{article?.title}</ArticleTitle>
          {article && (
            <InfoNav
              list={[
                {
                  icon: <DateRangeIcon fontSize="inherit" />,
                  title: "发布时间",
                  value: article?.publishTime,
                },
                {
                  icon: <TextSnippetIcon fontSize="inherit" />,
                  title: "文章字数",
                  value: article?.count,
                },
                {
                  icon: <HourglassBottomIcon fontSize="inherit" />,
                  title: "阅读时间",
                  value: "1min",
                },
              ]}
            />
          )}
        </>

        <ArticlContext
          onClick={textClickHandle}
          className={`articleHtml ${
            theme.palette.mode === "dark" ? "dark-active" : "light-active"
          }`}
          dangerouslySetInnerHTML={articleHtml}
        ></ArticlContext>
      </ArticleWrapper>
      <NavWrapper>
        <Navigation domRenderObjArr={md2Navigate(articleHtml.__html)} />
      </NavWrapper>
      <PhotoSlider
        images={imageList}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </Container>
  );
});
