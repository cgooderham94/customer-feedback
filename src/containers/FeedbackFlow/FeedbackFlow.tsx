import { Typography } from "@mui/material";
import React, { SyntheticEvent, useState } from "react";
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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");

  const canSubmit = name && email && rating && comment;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!canSubmit) return alert("Please check all fields before submitting.");

    setFeedbackList([...feedbackList, { name, email, rating, comment }]);
  };

  return (
    <div>
      <Typography variant="h4" component="h1">
        {heading}
      </Typography>

      <FeedbackForm
        {...{
          name,
          setName,
          email,
          setEmail,
          rating,
          setRating,
          comment,
          setComment,
          handleSubmit,
        }}
      />

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
    </div>
  );
};
