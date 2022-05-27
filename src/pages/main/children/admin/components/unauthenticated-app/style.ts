import styled from "@emotion/styled";
import LoadingButton from "@mui/lab/LoadingButton";
import Card from "@mui/material/Card";

export const FullWidthButton = styled(LoadingButton)`
  margin: 1rem 0;
  width: 100%;
`;

export const Title = styled.h1`
  font-weight: 400;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 1rem;
`;

export const LoginContainer = styled.div`
  margin-top: 4rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CustomCard = styled(Card)`
  width: 30rem;
  height: 35rem;
  padding: 3.2rem 4rem;
  box-sizing: border-box;
  border: unset;

  @media screen and (max-width: 480px) {
    padding: 3.2rem 2rem;
  }
`;
