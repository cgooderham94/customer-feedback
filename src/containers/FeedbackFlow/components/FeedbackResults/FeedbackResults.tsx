import React from "react";
import { Typography } from "@mui/material";
import { FEEDBACK_RESULTS_CONTENT } from "./constants";

const { heading } = FEEDBACK_RESULTS_CONTENT;

export const FeedbackResults = () => {
  return (
    <Typography variant="h4" component="h1">
      {heading}
    </Typography>
  );
};
