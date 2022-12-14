import React, { type FC } from "react";
import { Button, Typography } from "@mui/material";
import { FEEDBACK_RESULTS_CONTENT } from "./constants";
import type { FeedbackList } from "../../../types/Feedback";

interface FeedbackResultsProps {
  feedbackList: FeedbackList;
  handleBack: () => void;
}

const { heading, commentsHeading } = FEEDBACK_RESULTS_CONTENT;

export const FeedbackResults: FC<FeedbackResultsProps> = ({
  feedbackList,
  handleBack,
}) => {
  return (
    <>
      <Typography variant="h4" component="h1">
        {heading}
      </Typography>

      <Button onClick={handleBack}>Go Back</Button>

      <section aria-labelledby="comments-heading">
        <Typography variant="h5" component="h2" id="comments-heading">
          {commentsHeading}
        </Typography>

        <ul>
          {feedbackList.map(({ name, email, rating, comment }, index) => (
            <li key={index}>
              <div>Name: {name}</div>
              <div>Email: {email}</div>
              <div>Rating: {rating}</div>
              <div>Comment: {comment}</div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
