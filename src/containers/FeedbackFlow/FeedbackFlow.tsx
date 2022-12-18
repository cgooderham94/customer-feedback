import React, {
  type ReactElement,
  useMemo,
  useState,
  useCallback,
  lazy,
  Suspense,
} from "react";
import { Container } from "@mui/system";
import {
  type FeedbackList,
  type FeedbackSteps,
  FEEDBACK_STEPS,
} from "../types/Feedback";
import { Box } from "@mui/material";
import { getFeedbackMeta } from "./helpers";
import { INITIAL_FEEDBACK_LIST } from "./data";

const FeedbackForm = lazy(
  () => import("./components/FeedbackForm/FeedbackForm")
);

const FeedbackResults = lazy(
  () => import("./components/FeedbackResults/FeedbackResults")
);

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>(
    INITIAL_FEEDBACK_LIST
  );
  const [feedbackStep, setFeedbackStep] = useState<FeedbackSteps>(
    FEEDBACK_STEPS.FORM
  );

  const { averageRating, dateSortedList, ratingsDistribution } = useMemo(
    () => getFeedbackMeta(feedbackList),
    [feedbackList]
  );

  const handleBack = useCallback(
    () => setFeedbackStep(FEEDBACK_STEPS.FORM),
    [setFeedbackStep]
  );

  const formSteps: Record<FeedbackSteps, ReactElement> = {
    FORM: (
      <FeedbackForm
        {...{
          setFeedbackList,
          feedbackList,
          setFeedbackStep,
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
      <Suspense>
        <Container>{formSteps[feedbackStep]}</Container>
      </Suspense>
    </Box>
  );
};
