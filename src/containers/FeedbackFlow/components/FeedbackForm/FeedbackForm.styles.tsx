import styled from "styled-components";
import {
  Button,
  FormControl,
  OutlinedInput,
  styled as styledMui,
} from "@mui/material";

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const FormControlExpanded = styledMui(FormControl)`
  width: 100%;
  height: 100%;
`;

export const OutlinedInputExpanded = styledMui(OutlinedInput)`
  height: 100%;
`;

export const outlinedTextareaStyles = { height: "100%" };

export const SubmitButton = styled(Button).attrs({
  type: "submit",
})`
  margin-left: auto;
`;
