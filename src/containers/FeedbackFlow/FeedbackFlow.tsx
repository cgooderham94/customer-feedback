import React, { ReactElement, SyntheticEvent, useMemo, useState } from "react";
import { Container } from "@mui/system";
import { FeedbackList, FeedbackSteps, FEEDBACK_STEPS } from "../types/Feedback";
import { FeedbackForm } from "./components";
import { FeedbackResults } from "./components/FeedbackResults/FeedbackResults";
import {
  INITIAL_FEEDBACK_LIST,
  INITIAL_FORM_ERRORS,
  INITIAL_FORM_VALUES,
} from "./data";
import type { FormErrors, FormValues, FieldId } from "./types";
import { Box } from "@mui/material";
import { getFeedbackMeta, validateFields } from "./helpers";

export const FeedbackFlow = () => {
  const [feedbackList, setFeedbackList] = useState<FeedbackList>(
    INITIAL_FEEDBACK_LIST
  );
  const [formValues, setFormValues] = useState<FormValues>({
    ...INITIAL_FORM_VALUES,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    ...INITIAL_FORM_ERRORS,
  });
  const [feedbackStep, setFeedbackStep] = useState<FeedbackSteps>(
    FEEDBACK_STEPS.FORM
  );

  const { name, email, rating, comment } = formValues;

  const { averageRating, dateSortedList, ratingsDistribution } = useMemo(
    () => getFeedbackMeta(feedbackList),
    [feedbackList]
  );

  const resetFields = () => {
    setFormValues({ ...INITIAL_FORM_VALUES });
    setFormErrors({ ...INITIAL_FORM_ERRORS });
  };

  const handleFieldError = (field: FieldId, message: string) =>
    setFormErrors((prevErrors) => ({ ...prevErrors, [field]: message }));

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const isValid = validateFields({
      formErrors,
      setFieldError: handleFieldError,
      formValues,
    });

    if (!isValid) return;

    const date = new Date();

    setFeedbackList([...feedbackList, { name, email, rating, comment, date }]);
    setFeedbackStep(FEEDBACK_STEPS.RESULTS);
    resetFields();
  };

  const handleBack = () => setFeedbackStep(FEEDBACK_STEPS.FORM);

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
