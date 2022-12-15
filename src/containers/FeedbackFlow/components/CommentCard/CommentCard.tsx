import { FC, ReactElement } from "react";
import { Grid, Rating } from "@mui/material";
import { Card } from "./CommentCard.styles";

interface CommentCardProps {
  key: ReactElement["key"];
  email: string;
  rating: number;
  comment: string;
}

export const CommentCard: FC<CommentCardProps> = ({
  key,
  email,
  rating,
  comment,
}) => (
  <Card key={key} variant="outlined">
    <div>{email}</div>
    <Rating value={rating} readOnly />
    <div>{comment}</div>
  </Card>
);
