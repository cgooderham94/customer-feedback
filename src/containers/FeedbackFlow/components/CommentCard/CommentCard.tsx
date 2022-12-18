import React, { type FC, memo } from "react";
import { Card, Rating } from "./CommentCard.styles";

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
    <Rating value={rating} size="small" readOnly />
    <div>{comment}</div>
  </Card>
);
