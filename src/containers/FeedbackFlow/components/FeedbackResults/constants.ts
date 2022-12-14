import { ChartOptions } from "chart.js";

export const FEEDBACK_RESULTS_CONTENT = {
  heading: "Feedback Results",
  commentsHeading: "Latest Comments",
};

export const CHART_OPTIONS: ChartOptions = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: "Ratings",
    },
  },
  scales: {
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};
