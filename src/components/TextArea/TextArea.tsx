import { FormHelperText, InputLabel, InputProps } from "@mui/material";
import { FC, ReactNode } from "react";
import {
  FormControlExpanded,
  OutlinedInputExpanded,
  outlinedTextareaStyles,
} from "./TextArea.styles";

interface TextAreaProps {
  id: string;
  label: ReactNode;
  value: InputProps["value"];
  error: string;
  onChange: InputProps["onChange"];
}

export const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  value,
  error,
  onChange,
}) => (
  <FormControlExpanded variant="outlined" key={id}>
    <InputLabel htmlFor={id}>{label}</InputLabel>
    <OutlinedInputExpanded
      {...{
        id,
        label,
        type: "textarea",
        value,
        error: !!error,
        onChange: onChange,
        fullWidth: true,
        multiline: true,
        minRows: 1,
        inputProps: {
          style: outlinedTextareaStyles,
        },
      }}
    />
    <FormHelperText error>{error}</FormHelperText>
  </FormControlExpanded>
);
