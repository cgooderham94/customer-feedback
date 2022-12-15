import React, { type FC } from "react";
import { Button, Grid, Rating, Typography } from "@mui/material";
import { CHART_OPTIONS, FEEDBACK_RESULTS_CONTENT } from "./constants";
import { CHART_LABELS } from "../../data";
import type { FeedbackList } from "../../../types/Feedback";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  ChartData,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Box } from "@mui/system";
import { CommentCard } from "../";

interface FeedbackResultsProps {
  feedbackList: FeedbackList;
  handleBack: () => void;
  ratingsDistribution: Record<string, number>;
}

const { heading, commentsHeading, backBtn } = FEEDBACK_RESULTS_CONTENT;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export const FeedbackResults: FC<FeedbackResultsProps> = ({
  feedbackList,
  handleBack,
  ratingsDistribution,
}) => {
  const chartData: ChartData<"bar"> = {
    labels: CHART_LABELS,
    datasets: [
      {
        data: Object.values(ratingsDistribution),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const resultsCount = feedbackList.length;
  const resultsCountStr =
    resultsCount > 1 ? `${resultsCount} Ratings` : `${resultsCount} Rating`;

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        flexWrap="wrap"
      >
        <Typography variant="h4" component="h1">
          {heading}
        </Typography>

        <Button onClick={handleBack} variant="outlined">
          {backBtn}
        </Button>
      </Box>

      <Bar data={chartData} options={CHART_OPTIONS} />

      <Typography variant="subtitle1">{resultsCountStr}</Typography>

      <Grid
        component="section"
        container
        flexDirection="column"
        gap="1rem"
        aria-labelledby="comments-heading"
      >
        <Typography variant="h5" component="h2" id="comments-heading">
          {commentsHeading}
        </Typography>

        <Grid container gap="1rem" flexDirection="column">
          {feedbackList.map(({ email, rating, comment }, index) => (
            <CommentCard {...{ key: index, email, rating, comment }} />
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};
