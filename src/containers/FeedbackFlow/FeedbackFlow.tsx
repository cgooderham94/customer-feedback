import { Typography } from "@mui/material";
import React, { useState } from "react";
import { FeedbackForm } from "./components";
import { FEEDBACK_FLOW_CONTENT } from "./constants";

interface Feedback {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

type FeedbackList = Feedback[];

const { heading } = FEEDBACK_FLOW_CONTENT;

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>([
    {
      name: "Joe Bloggs",
      email: "joe@bloggs.com",
      rating: 5,
      comment: "Fantastic product! Thanks.",
    },
    {
      name: "Jack Sparrow",
      email: "jack@sparrow.com",
      rating: 4,
      comment: "Nicely refined product. Great customer service.",
    },
  ]);

  return (
    <div>
      <Typography variant="h4" component="h1">
        {heading}
      </Typography>

      <FeedbackForm />

      <ul>
        {feedbackList.map(({ name, email, rating, comment }) => (
          <li>
            <div>Name: {name}</div>
            <div>Email: {email}</div>
            <div>Rating: {rating}</div>
            <div>Comment: {comment}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};
