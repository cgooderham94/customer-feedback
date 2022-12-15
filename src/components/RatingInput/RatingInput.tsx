import React, { FC, ReactNode } from "react";
import { Typography, Rating, RatingProps, Box } from "@mui/material";

interface RatingInputProps {
  label: ReactNode;
  field: RatingProps;
}

export const RatingInput: FC<RatingInputProps> = ({
  label,
  field: { id, value, onChange },
}) => (
  <Box>
    <Typography variant="subtitle1" component="legend" marginBottom="0.5rem">
      {label}
    </Typography>
    <Rating value={value} id={id} name={id} precision={1} onChange={onChange} />
  </Box>
);
