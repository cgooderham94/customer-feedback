import { Button, TextField } from "@mui/material";
import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
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
}

const {
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
}) => {
  const handleFieldValue = (
    e: ChangeEvent,
    setValue: Dispatch<SetStateAction<any>>
  ) => {
    const {
      target: { value },
    } = e;

    setValue(value);
  };

  const handleName = (e: ChangeEvent) => handleFieldValue(e, setName);
  const handleEmail = (e: ChangeEvent) => handleFieldValue(e, setEmail);
  const handleRating = (e: ChangeEvent) => handleFieldValue(e, setRating);
  const handleComment = (e: ChangeEvent) => handleFieldValue(e, setComment);

  console.log("Field values", name, email, rating, comment);

  return (
    <form>
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
  );
};
