import React, { type FC } from "react";
import { Button, Card, Grid, Rating, Typography } from "@mui/material";
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

interface FeedbackResultsProps {
  feedbackList: FeedbackList;
  handleBack: () => void;
  ratingDistribution: Record<string, number>;
}

const { heading, commentsHeading } = FEEDBACK_RESULTS_CONTENT;

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

export const FeedbackResults: FC<FeedbackResultsProps> = ({
  feedbackList,
  handleBack,
  ratingDistribution,
}) => {
  const chartData: ChartData<"bar"> = {
    labels: CHART_LABELS,
    datasets: [
      {
        data: Object.values(ratingDistribution),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  return (
    <>
      <Typography variant="h4" component="h1">
        {heading}
      </Typography>

      <Button onClick={handleBack}>Go Back</Button>

      <Bar data={chartData} options={CHART_OPTIONS} />

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
          {feedbackList.map(({ name, email, rating, comment }, index) => (
            <Card
              key={index}
              variant="outlined"
              sx={{ padding: "1rem", flexGrow: 1 }}
            >
              <Grid container direction="column" gap="1rem">
                <Grid container gap="0.5rem">
                  <div>{email}</div>
                  <Rating value={rating} />
                </Grid>
                <div>{comment}</div>
              </Grid>
            </Card>
          ))}
        </Grid>
      </Grid>
    </>
  );
};
