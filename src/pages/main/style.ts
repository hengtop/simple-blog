import styled from "@emotion/styled";
import AppBar from "@mui/material/AppBar";

export const MainContainer = styled.div(
  ({ background }: { background: { default: string; paper: string } }) => ({
    width: "100%",
    height: "100vh",
    backgroundColor: background.default,
    overflow: "auto",
    backgroundImage:
      "linear-gradient(rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.05))",
  }),
);

export const HeaderContainer = styled(AppBar)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  height: 4rem;
  box-sizing: border-box;
  padding: 0 2.5rem;
  box-shadow: none;
  background-image: linear-gradient(
    rgba(255, 255, 255, 0.05),
    rgba(255, 255, 255, 0.05)
  );
`;

export const OutletContainer = styled.main`
  box-sizing: border-box;
  height: calc(100vh - 4rem);
  max-width: 1368px;
  margin: 4rem auto 0;
  padding: 2.5rem 1.75rem;
`;

export const HeaderLeft = styled.div``;

export const HeaderRight = styled.div``;
