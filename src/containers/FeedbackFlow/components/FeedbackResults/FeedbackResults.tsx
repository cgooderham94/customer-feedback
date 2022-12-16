import React, { type FC } from "react";
import { Button, Grid, Rating, Typography } from "@mui/material";
import { CHART_OPTIONS, FEEDBACK_RESULTS_CONTENT } from "./constants";
import { CHART_LABELS } from "../../data";
import type { FeedbackList } from "../../../types/Feedback";
import { Box } from "@mui/system";
import { CommentCard } from "../";
import { getPluralised } from "./helpers";
import {
  type ChartData,
  Bar,
  Chart,
  CategoryScale,
  BarElement,
  LinearScale,
} from "../../../../components/BarChart/BarChart";
import { blue } from "@mui/material/colors";

interface FeedbackResultsProps {
  averageRating: number;
  feedbackList: FeedbackList;
  handleBack: () => void;
  ratingsDistribution: Record<string, number>;
}

const { heading, commentsHeading, backBtn } = FEEDBACK_RESULTS_CONTENT;

Chart.register(LinearScale, CategoryScale, BarElement);

export const FeedbackResults: FC<FeedbackResultsProps> = ({
  averageRating,
  feedbackList,
  handleBack,
  ratingsDistribution,
}) => {
  const chartData: ChartData<"bar"> = {
    labels: CHART_LABELS,
    datasets: [
      {
        data: Object.values(ratingsDistribution),
        backgroundColor: blue["500"],
      },
    ],
  };

  const resultsCount = getPluralised(feedbackList.length, "Rating");
  const averageRatingStr = getPluralised(averageRating, "Star");

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

      <Box display="flex" alignItems="center" gap="0.5rem">
        <Typography variant="subtitle1" component="p" display="flex">
          ({resultsCount})
        </Typography>
        {averageRatingStr}
        <Rating value={averageRating} precision={0.5} readOnly />
      </Box>

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
