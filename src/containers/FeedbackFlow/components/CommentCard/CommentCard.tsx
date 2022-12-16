import { FC } from "react";
import { Rating } from "@mui/material";
import { Card } from "./CommentCard.styles";

interface CommentCardProps {
  email: string;
  rating: number;
  comment: string;
}

export const CommentCard: FC<CommentCardProps> = ({
  email,
  rating,
  comment,
}) => (
  <Card variant="outlined">
    <div>{email}</div>
    <Rating value={rating} readOnly />
    <div>{comment}</div>
  </Card>
);
