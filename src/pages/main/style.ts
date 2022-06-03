import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";

export const MainContainer = styled.div(
  ({ background }: { background: { default: string; paper: string } }) => ({
    width: "100%",
    height: "auto",
    backgroundColor: background.default,
  }),
);

export const HeaderContainer = styled(AppBar)`
  max-width: 786px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  box-sizing: border-box;
  box-shadow: none;
  background-image: unset;
  @media (max-width: 786px) {
    padding: 0 1rem;
  }
`;

export const OutletContainer = styled.main`
  box-sizing: border-box;
  min-height: 100vh;
  max-width: 1368px;
  margin: 0 auto;
  padding: 2.5rem 1.75rem;
  padding-top: 6rem;
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div``;
