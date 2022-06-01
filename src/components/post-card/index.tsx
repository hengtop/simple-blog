import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextWrapper,
  CardContainer,
  TitleWrapper,
  InfoWrapper,
  InfoItem,
  NavTitle,
} from "./style";
import DateRangeIcon from "@mui/icons-material/DateRange";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";

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
      <InfoWrapper>
        <InfoItem>
          <DateRangeIcon fontSize="inherit" />
          <TextWrapper>{articleInfo.publishTime || 2022 - 11 - 11}</TextWrapper>
        </InfoItem>
        <InfoItem>
          <TextSnippetIcon fontSize="inherit" />
          <TextWrapper>{articleInfo?.count || 202022}</TextWrapper>
        </InfoItem>
        <InfoItem>
          <HourglassBottomIcon fontSize="inherit" />
          <TextWrapper> 1min</TextWrapper>
        </InfoItem>
      </InfoWrapper>
    </CardContainer>
  );
});
