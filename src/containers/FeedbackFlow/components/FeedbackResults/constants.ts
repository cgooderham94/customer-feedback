import { ChartOptions } from "chart.js";

export const FEEDBACK_RESULTS_CONTENT = {
  heading: "Feedback Results",
  commentsHeading: "Latest Comments",
  backBtn: "Go Back",
  chartLabelPrepend: "Distribution of ratings.",
  star: "Star",
  starLabels: {
    one: "1 Star",
    two: "2 Stars",
    three: "3 Stars",
    four: "4 Stars",
    five: "5 Stars",
  },
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
