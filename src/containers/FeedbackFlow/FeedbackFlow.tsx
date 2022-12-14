import React, { ReactElement, SyntheticEvent, useMemo, useState } from "react";
import { FeedbackList, FeedbackSteps, FEEDBACK_STEPS } from "../types/Feedback";
import { FeedbackForm } from "./components";
import { FeedbackResults } from "./components/FeedbackResults/FeedbackResults";
import { INITIAL_FEEDBACK_LIST, INITIAL_RATINGS_DISTRIBUTION } from "./data";

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>(
    INITIAL_FEEDBACK_LIST
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [feedbackStep, setFeedbackStep] = useState<FeedbackSteps>(
    FEEDBACK_STEPS.FORM
  );

  const canSubmit = name && email && rating && comment;

  const ratingDistribution = useMemo(
    () =>
      feedbackList.reduce<Record<string, number>>(
        (acc, { rating }) => {
          console.log("Feedback list reduce");

          const ratingStr = rating.toString();

          acc[ratingStr] = acc[ratingStr] ? (acc[ratingStr] += 1) : 1;

          return acc;
        },
        { ...INITIAL_RATINGS_DISTRIBUTION }
      ),
    [feedbackList]
  );

  console.log("ratings dist", ratingDistribution);

  const resetFields = () => {
    setName("");
    setEmail("");
    setRating(null);
    setComment("");
  };

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    if (!canSubmit) return alert("Please check all fields before submitting.");

    setFeedbackList([...feedbackList, { name, email, rating, comment }]);
    setFeedbackStep(FEEDBACK_STEPS.RESULTS);
    resetFields();
  };

  const handleBack = () => setFeedbackStep(FEEDBACK_STEPS.FORM);

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
    RESULTS: (
      <FeedbackResults {...{ feedbackList, handleBack, ratingDistribution }} />
    ),
  };

  return formSteps[feedbackStep];
};
