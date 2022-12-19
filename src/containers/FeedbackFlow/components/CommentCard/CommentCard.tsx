import { type FC } from "react";
import { ListItem, ListItemText, Typography } from "@mui/material";
import { Rating } from "./CommentCard.styles";
import { Box } from "@mui/system";

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
    <Box display="flex" flexDirection="column" gap="0.5rem">
      <Box display="flex" flexDirection="column" gap="0.25rem">
        <div>{email}</div>
        <Rating value={rating} size="small" readOnly />
      </Box>
      <Typography variant="body1">{comment}</Typography>
    </Box>
  </ListItem>
);
