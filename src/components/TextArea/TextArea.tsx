import { type FC, type ReactNode } from "react";
import { FormHelperText, InputLabel, type InputProps } from "@mui/material";
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
  required?: InputProps["required"];
  onChange: InputProps["onChange"];
}

export const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  value,
  error,
  onChange,
  required,
}) => (
  <FormControlExpanded variant="outlined" key={id}>
    <InputLabel htmlFor={id} required={required}>
      {label}
    </InputLabel>
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
        required,
        inputProps: {
          style: outlinedTextareaStyles,
        },
      }}
    />
    <FormHelperText error>{error}</FormHelperText>
  </FormControlExpanded>
);
