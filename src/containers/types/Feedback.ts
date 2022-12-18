export interface Feedback {
  name: string;
  email: string;
  rating: number;
  comment: string;
  dateUtc: string;
}

export type FeedbackList = Feedback[];

export const FEEDBACK_STEPS = {
  FORM: "FORM",
  RESULTS: "RESULTS",
} as const;

export type FeedbackSteps = typeof FEEDBACK_STEPS[keyof typeof FEEDBACK_STEPS];
