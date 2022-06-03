import React, { memo, ReactNode } from "react";

import { TextWrapper, InfoWrapper, InfoItem } from "./style";

interface InfoListType {
  icon: ReactNode;
  title: string;
  value: any;
}
export default memo(function Index({ list }: { list: InfoListType[] }) {
  //props/state

  //redux hooks

  //other hooks

  //其他逻辑

  return (
    <InfoWrapper>
      {list.map((item, index) => (
        <InfoItem key={index} title={item.value}>
          {item.icon}
          <TextWrapper>{item.value}</TextWrapper>
        </InfoItem>
      ))}
    </InfoWrapper>
  );
});
