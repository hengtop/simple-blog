import styled from "@emotion/styled";

export const CardContainer = styled.div`
  margin-bottom: 1rem;
`;

export const TitleWrapper = styled.div`
  font-size: 1.25rem;
  margin-bottom: 0.8rem;
  cursor: pointer;
`;

export const NavTitle = styled.span`
  &:hover {
    border-bottom: 1px solid;
  }
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`;

export const InfoItem = styled.span`
  color: rgb(108, 108, 108);
  display: flex;
  align-items: center;
  margin-right: 0.5rem;
`;

export const TextWrapper = styled.span`
  margin-left: 0.3rem;
`;
