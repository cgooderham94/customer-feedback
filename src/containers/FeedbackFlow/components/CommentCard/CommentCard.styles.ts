import { styled } from "@mui/system";
import { Card as MuiCard, Rating as MuiRating } from "@mui/material";

export const Card = styled(MuiCard)`
  padding: 1rem;
  flex-grow: 1;
`;

export const Rating = styled(MuiRating)`
  margintop: 0.25rem;
`;
