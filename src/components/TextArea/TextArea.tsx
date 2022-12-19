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
  placeholder?: InputProps["placeholder"];
  value: InputProps["value"];
  error: string;
  required?: InputProps["required"];
  maxLength?: number;
  onChange: InputProps["onChange"];
}

export const TextArea: FC<TextAreaProps> = ({
  id,
  label,
  placeholder,
  value,
  error,
  onChange,
  required,
  maxLength,
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
        placeholder,
        error: !!error,
        onChange: onChange,
        fullWidth: true,
        multiline: true,
        minRows: 1,
        required,
        inputProps: {
          style: outlinedTextareaStyles,
          maxLength,
        },
      }}
    />
    <FormHelperText error>{error}</FormHelperText>
  </FormControlExpanded>
);
