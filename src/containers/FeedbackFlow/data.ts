import type { FeedbackList } from "../types/Feedback";
import { FEEDBACK_RESULTS_CONTENT } from "./components/FeedbackResults/constants";
import type { FormErrors, FormValues } from "./types";

const { starLabels } = FEEDBACK_RESULTS_CONTENT;

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

export const CHART_LABELS = Object.values(starLabels);

export const INITIAL_RATINGS_DISTRIBUTION = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
};
