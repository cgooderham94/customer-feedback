import React, {
  type Dispatch,
  type SetStateAction,
  type SyntheticEvent,
  useState,
} from "react";
import {
  type FeedbackList,
  type FeedbackSteps,
  FEEDBACK_STEPS,
} from "../../types/Feedback";
import { INITIAL_FORM_ERRORS, INITIAL_FORM_VALUES } from "../data";
import { validateFields } from "../helpers";
import type { FieldId, FormErrors, FormValues } from "../types";

interface UseFeedbackFormParams {
  feedbackList: FeedbackList;
  setFeedbackList: Dispatch<SetStateAction<FeedbackList>>;
  setFeedbackStep: Dispatch<SetStateAction<FeedbackSteps>>;
}

export const useFeedbackForm = ({
  feedbackList,
  setFeedbackList,
  setFeedbackStep,
}: UseFeedbackFormParams) => {
  const [formValues, setFormValues] = useState<FormValues>({
    ...INITIAL_FORM_VALUES,
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({
    ...INITIAL_FORM_ERRORS,
  });

  const { name, email, rating, comment } = formValues;

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

    const date = new Date().toUTCString();

    setFeedbackList([
      ...feedbackList,
      { name, email, rating, comment, dateUtc: date },
    ]);
    setFeedbackStep(FEEDBACK_STEPS.RESULTS);
    resetFields();
  };

  return {
    formErrors,
    formValues,
    handleSubmit,
    setFormValues,
  };
};
