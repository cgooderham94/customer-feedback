import { ChartOptions } from "chart.js";

export const FEEDBACK_RESULTS_CONTENT = {
  heading: "Feedback Results",
  commentsHeading: "Latest Comments",
  backBtn: "Go Back",
};

export const CHART_OPTIONS: ChartOptions<"bar"> = {
  responsive: true,
  scales: {
    x: {
      title: {
        display: true,
        text: "Customer Ratings",
      },
    },
    y: {
      ticks: {
        stepSize: 1,
      },
    },
  },
};
