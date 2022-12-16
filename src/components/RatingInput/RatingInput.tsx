import React, { type FC, type ReactNode } from "react";
import {
  Typography,
  Rating,
  RatingProps,
  FormHelperText,
  FormControl,
} from "@mui/material";

interface RatingInputProps {
  label: ReactNode;
  id: RatingProps["id"];
  value: RatingProps["value"];
  onChange: RatingProps["onChange"];
  errorMessage?: string;
}

export const RatingInput: FC<RatingInputProps> = ({
  label,
  id,
  value,
  onChange,
  errorMessage,
}) => (
  <FormControl key={id}>
    <Typography variant="subtitle1" component="legend" marginBottom="0.5rem">
      {label}
    </Typography>
    <Rating value={value} id={id} name={id} precision={1} onChange={onChange} />
    <FormHelperText error margin="dense">
      {errorMessage}
    </FormHelperText>
  </FormControl>
);
