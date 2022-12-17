import React, { ReactElement, useMemo, useState } from "react";
import { Container } from "@mui/system";
import { FeedbackList, FeedbackSteps, FEEDBACK_STEPS } from "../types/Feedback";
import { FeedbackForm } from "./components";
import { FeedbackResults } from "./components/FeedbackResults/FeedbackResults";
import { Box } from "@mui/material";
import { useFeedbackForm } from "./hooks/useFeedbackForm";
import { getFeedbackMeta } from "./helpers";
import { INITIAL_FEEDBACK_LIST } from "./data";

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>(
    INITIAL_FEEDBACK_LIST
  );
  const [feedbackStep, setFeedbackStep] = useState<FeedbackSteps>(
    FEEDBACK_STEPS.FORM
  );

  const { formErrors, formValues, handleBack, handleSubmit, setFormValues } =
    useFeedbackForm({ feedbackList, setFeedbackList, setFeedbackStep });

  const { averageRating, dateSortedList, ratingsDistribution } = useMemo(
    () => getFeedbackMeta(feedbackList),
    [feedbackList]
  );

  const formSteps: Record<FeedbackSteps, ReactElement> = {
    FORM: (
      <FeedbackForm
        {...{
          formValues,
          setFormValues,
          formErrors,
          handleSubmit,
        }}
      />
    ),
    RESULTS: (
      <FeedbackResults
        {...{
          averageRating,
          feedbackList: dateSortedList,
          handleBack,
          ratingsDistribution,
        }}
      />
    ),
  };

  return (
    <Box padding="2rem 0">
      <Container>{formSteps[feedbackStep]}</Container>
    </Box>
  );
};
