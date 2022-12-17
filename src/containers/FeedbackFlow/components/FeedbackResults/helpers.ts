import { FEEDBACK_RESULTS_CONTENT } from "./constants";

const { chartLabelPrepend, star } = FEEDBACK_RESULTS_CONTENT;

export const getPluralised = (count: number, baseWord: string) => {
  const baseStr = `${count} ${baseWord}`;
  const plural = count > 1 ? "s" : "";

  return [baseStr, plural].join("");
};

export const getChartAriaLabel = (
  ratingsDistribution: Record<string, number>
) => {
  const values = Object.values(ratingsDistribution);
  const ratingValuesStr = values
    .map((value, index) => `${value} - ${getPluralised(index + 1, star)}`)
    .join(", ");

  return [chartLabelPrepend, ratingValuesStr].join(" ");
};
