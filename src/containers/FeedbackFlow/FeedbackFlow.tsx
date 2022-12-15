import React, { ReactElement, SyntheticEvent, useMemo, useState } from "react";
import { Container } from "@mui/system";
import { FeedbackList, FeedbackSteps, FEEDBACK_STEPS } from "../types/Feedback";
import { FeedbackForm } from "./components";
import { FeedbackResults } from "./components/FeedbackResults/FeedbackResults";
import {
  INITIAL_FEEDBACK_LIST,
  INITIAL_FORM_ERRORS,
  INITIAL_FORM_VALUES,
  INITIAL_RATINGS_DISTRIBUTION,
} from "./data";
import type { FormErrors, FormValues, FieldId } from "./types";

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

  const canSubmit = name && email && rating && comment;

  const ratingDistribution = useMemo(
    () =>
      feedbackList.reduce<Record<string, number>>(
        (acc, { rating }) => {
          const ratingStr = rating.toString();

          acc[ratingStr] = acc[ratingStr] ? (acc[ratingStr] += 1) : 1;

          return acc;
        },
        { ...INITIAL_RATINGS_DISTRIBUTION }
      ),
    [feedbackList]
  );

  const feedbackListSorted = useMemo(
    () =>
      feedbackList.sort(
        (prev, current) => current.date.valueOf() - prev.date.valueOf()
      ),
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

    Object.keys(formValues).forEach((field) => {
      if (!formValues[field as FieldId]) {
        handleFieldError(field as FieldId, `This field is required`);
      } else {
        if (formErrors[field as FieldId]) {
          handleFieldError(field as FieldId, "");
        }
      }
    });

    if (!canSubmit) return;

    const date = new Date();

    setFeedbackList([...feedbackList, { name, email, rating, comment, date }]);
    setFeedbackStep(FEEDBACK_STEPS.RESULTS);
    resetFields();
  };

  console.log("Feedback list", feedbackList);

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
          feedbackList: feedbackListSorted,
          handleBack,
          ratingDistribution,
        }}
      />
    ),
  };

  return <Container>{formSteps[feedbackStep]}</Container>;
};
