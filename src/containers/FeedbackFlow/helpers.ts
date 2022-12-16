import { Feedback, FeedbackList } from "../types/Feedback";
import { EMAIL_REGEX } from "./components/FeedbackForm/constants";
import { ALL_FIELDS, Field } from "./components/FeedbackForm/data";
import { INITIAL_RATINGS_DISTRIBUTION } from "./data";
import { FieldId, FormErrors, FormValues } from "./types";

export const isEmailInvalid = (fieldType: Field["type"], value: string) => {
  return fieldType === "email" && !new RegExp(EMAIL_REGEX).test(value);
};

interface ValidateFieldsOptions {
  formValues: FormValues;
  formErrors: FormErrors;
  setFieldError: (field: FieldId, message: string) => void;
}

export const validateFields = ({
  formValues,
  formErrors,
  setFieldError,
}: ValidateFieldsOptions) => {
  let isValid = true;

  Object.keys(ALL_FIELDS).forEach((field) => {
    const value = formValues[field as FieldId];
    const fieldConfig = ALL_FIELDS[field as FieldId];

    if (fieldConfig.required && !value) {
      isValid = false;
      setFieldError(field as FieldId, "This field is required");
    } else if (isEmailInvalid(fieldConfig.type, value.toString())) {
      isValid = false;
      setFieldError(field as FieldId, "A valid email address is required");
    } else if (formErrors[field as FieldId]) {
      setFieldError(field as FieldId, "");
    }
  });

  return isValid;
};

const getRatingsDistribution = (feedbackList: FeedbackList) =>
  feedbackList.reduce<Record<string, number>>(
    (acc, { rating }) => {
      const ratingStr = rating.toString();

      acc[ratingStr] = acc[ratingStr] ? (acc[ratingStr] += 1) : 1;

      return acc;
    },
    { ...INITIAL_RATINGS_DISTRIBUTION }
  );

const getAverageRating = (feedbackList: FeedbackList) => {
  const ratingsTotal = feedbackList.reduce((acc, currFeedback) => {
    return (acc += currFeedback.rating);
  }, 0);
  const averageRating = ratingsTotal / feedbackList.length;
  const roundToHalfInteger = Math.round(averageRating * 2) / 2;

  return roundToHalfInteger;
};

export const getFeedbackMeta = (feedbackList: FeedbackList) => {
  return {
    dateSortedList: feedbackList.sort(
      (prev, current) => current.date.valueOf() - prev.date.valueOf()
    ),
    averageRating: getAverageRating(feedbackList),
    ratingsDistribution: getRatingsDistribution(feedbackList),
  };
};
