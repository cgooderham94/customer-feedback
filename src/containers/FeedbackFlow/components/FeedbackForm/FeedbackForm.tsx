import { Button, TextField, Typography } from "@mui/material";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { FEEDBACK_FORM_CONTENT } from "./constants";

interface FeedbackFormProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  rating: number | null;
  setRating: Dispatch<SetStateAction<null | number>>;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: SyntheticEvent) => void;
}

const {
  heading,
  name: nameField,
  email: emailField,
  rating: ratingField,
  comment: commentField,
} = FEEDBACK_FORM_CONTENT;

export const FeedbackForm: FC<FeedbackFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  rating,
  setRating,
  comment,
  setComment,
  handleSubmit,
}) => {
  const handleFieldValue = (
    e: ChangeEvent,
    setValue: Dispatch<SetStateAction<any>>
  ) => {
    const {
      // @ts-ignore
      target: { value },
    } = e;

    setValue(value);
  };

  const handleName = (e: ChangeEvent) => handleFieldValue(e, setName);
  const handleEmail = (e: ChangeEvent) => handleFieldValue(e, setEmail);
  const handleRating = (e: ChangeEvent) => handleFieldValue(e, setRating);
  const handleComment = (e: ChangeEvent) => handleFieldValue(e, setComment);

  return (
    <div>
      <Typography id="form-heading" variant="h4" component="h1">
        {heading}
      </Typography>

      <form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <TextField
          id={nameField.id}
          label={nameField.label}
          onChange={handleName}
        />
        <TextField
          id={emailField.id}
          label={emailField.label}
          type="email"
          onChange={handleEmail}
        />
        <TextField
          id={ratingField.id}
          label={ratingField.label}
          type="number"
          onChange={handleRating}
        />
        <TextField
          id={commentField.id}
          label={commentField.label}
          multiline
          onChange={handleComment}
        />
        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
    </div>
  );
};
