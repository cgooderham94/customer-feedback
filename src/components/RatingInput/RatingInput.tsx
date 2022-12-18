import React, { type FC, type ReactNode } from "react";
import {
  Box,
  Typography,
  Rating,
  type RatingProps,
  FormHelperText,
  FormControl,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { RATING_INPUT_CONTENT } from "./constants";

interface RatingInputProps {
  label?: ReactNode;
  id: RatingProps["id"];
  value: RatingProps["value"];
  errorMessage?: string;
  required?: boolean;
  onChange: RatingProps["onChange"];
}

const { selected, noStars, starLabels } = RATING_INPUT_CONTENT;

export const RatingInput: FC<RatingInputProps> = ({
  label,
  id,
  value,
  errorMessage,
  required,
  onChange,
}) => {
  const formattedLabel = required ? `${label} *` : label;
  const formattedDescription = !!value
    ? [starLabels[value - 1], selected].join(" ")
    : noStars;

  return (
    <FormControl key={id}>
      <Typography variant="subtitle1" component="legend" marginBottom="0.5rem">
        {formattedLabel}
      </Typography>
      <Box display="flex" flexWrap="wrap" gap="0.5rem">
        <Rating
          value={value}
          id={id}
          name={id}
          precision={1}
          onChange={onChange}
        />
        <Typography sx={visuallyHidden}>{formattedDescription}</Typography>
      </Box>
      <FormHelperText error margin="dense">
        {errorMessage}
      </FormHelperText>
    </FormControl>
  );
};
