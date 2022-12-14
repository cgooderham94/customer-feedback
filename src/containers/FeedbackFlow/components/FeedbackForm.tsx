import { Button, TextField } from "@mui/material";
import { FEEDBACK_FORM_CONTENT } from "./constants";

const { name, email, rating, comment } = FEEDBACK_FORM_CONTENT;

export const FeedbackForm = () => (
  <form>
    <TextField id={name.id} label={name.label} />
    <TextField id={email.id} label={email.label} type="email" />
    <TextField id={rating.id} label={rating.label} type="number" />
    <TextField id={comment.id} label={comment.label} multiline />
    <Button type="submit" variant="contained">
      Submit
    </Button>
  </form>
);
