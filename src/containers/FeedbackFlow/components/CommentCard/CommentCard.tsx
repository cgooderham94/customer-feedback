import React, { type FC } from "react";
import { ListItem, ListItemText } from "@mui/material";
import { Rating } from "./CommentCard.styles";

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
  <ListItem>
    <ListItemText>
      <div>{email}</div>
      <Rating value={rating} size="small" readOnly />
      <div>{comment}</div>
    </ListItemText>
  </ListItem>
);
