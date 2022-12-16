import { FeedbackList } from "../types/Feedback";
import { FormErrors, FormValues } from "./types";

export const INITIAL_FEEDBACK_LIST: FeedbackList = [];

export const INITIAL_FORM_VALUES: FormValues = {
  name: "",
  email: "",
  rating: 0,
  comment: "",
};

export const INITIAL_FORM_ERRORS: FormErrors = {
  name: "",
  email: "",
  rating: "",
  comment: "",
};

export const CHART_LABELS = [
  "1 Star",
  "2 Stars",
  "3 Stars",
  "4 Stars",
  "5 Stars",
];

export const INITIAL_RATINGS_DISTRIBUTION = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
};
