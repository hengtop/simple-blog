import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import { CardContainer, TitleWrapper, NavTitle } from "./style";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import InfoNav from "components/Info-nav";

interface ArticleParamsType {
  id?: number;
  title: string;
  context: string;
  publishTime?: string;
  type: number;
  categoryIds: number[];
  count?: number;
}

export default memo(function Index({
  articleInfo,
}: {
  articleInfo: ArticleParamsType;
}) {
  //props/state

  //redux hooks

  //other hooks
  const navigate = useNavigate();

  //其他逻辑

  return (
    <CardContainer>
      <TitleWrapper>
        <NavTitle onClick={() => navigate(`/article/${articleInfo.id}`)}>
          {articleInfo.title}
        </NavTitle>
      </TitleWrapper>
      <InfoNav
        list={[
          {
            icon: <DateRangeIcon fontSize="inherit" />,
            title: "发布时间",
            value: articleInfo.publishTime,
          },
          {
            icon: <TextSnippetIcon fontSize="inherit" />,
            title: "文章字数",
            value: articleInfo.count,
          },
          {
            icon: <HourglassBottomIcon fontSize="inherit" />,
            title: "阅读时间",
            value: "1min",
          },
        ]}
      />
    </CardContainer>
  );
});
