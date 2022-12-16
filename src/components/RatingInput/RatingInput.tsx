import React, { type FC, type ReactNode } from "react";
import {
  Box,
  Typography,
  Rating,
  RatingProps,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

interface RatingInputProps {
  label?: ReactNode;
  id: RatingProps["id"];
  value: RatingProps["value"];
  onChange: RatingProps["onChange"];
  errorMessage?: string;
}

const LABELS = ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"];

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
    <Box display="flex" flexWrap="wrap" gap="0.5rem">
      <Rating
        value={value}
        id={id}
        name={id}
        precision={1}
        onChange={onChange}
      />
      <Typography sx={visuallyHidden}>
        {!!value
          ? [LABELS[value - 1], "Selected"].join(" ")
          : "No Stars Selected"}
      </Typography>
    </Box>
    <FormHelperText error margin="dense">
      {errorMessage}
    </FormHelperText>
  </FormControl>
);
