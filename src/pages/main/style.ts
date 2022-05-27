import styled from "@emotion/styled";

export const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
  //background-color: rgb(239, 240, 244);
  background-color: #fff;
  overflow: hidden;
`;

export const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  align-content: space-between;
  height: 4rem;
  box-sizing: border-box;
  padding: 0 2.5rem;
`;

export const OutletContainer = styled.main`
  height: calc(100vh - 4rem);
  max-width: 768px;
  margin: 4rem auto 0;
  padding: 2.5rem 1.75rem;
  background-color: #ccc;
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div``;
