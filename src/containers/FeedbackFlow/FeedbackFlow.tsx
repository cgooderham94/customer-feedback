import React, { ReactElement, SyntheticEvent, useState } from "react";
import { FeedbackList, FeedbackSteps, FEEDBACK_STEPS } from "../types/Feedback";
import { FeedbackForm } from "./components";
import { FeedbackResults } from "./components/FeedbackResults/FeedbackResults";

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
  const [feedbackStep, setFeedbackStep] = useState<FeedbackSteps>(
    FEEDBACK_STEPS.FORM
  );

  const canSubmit = name && email && rating && comment;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!canSubmit) return alert("Please check all fields before submitting.");

    setFeedbackList([...feedbackList, { name, email, rating, comment }]);
    setFeedbackStep(FEEDBACK_STEPS.RESULTS);
  };

  const formSteps: Record<FeedbackSteps, ReactElement> = {
    FORM: (
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
    ),
    RESULTS: <FeedbackResults />,
  };

  return (
    <div>
      {formSteps[feedbackStep]}

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
