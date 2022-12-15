import { FormErrors, FormValues } from "./types";

export const INITIAL_FEEDBACK_LIST = [];

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

export const CHART_LABELS = [1, 2, 3, 4, 5];

export const INITIAL_RATINGS_DISTRIBUTION = {
  "1": 0,
  "2": 0,
  "3": 0,
  "4": 0,
  "5": 0,
};
