import styled from "styled-components";
import { Button } from "@mui/material";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const SubmitButton = styled(Button).attrs({
  type: "submit",
})`
  margin-left: auto;
`;
