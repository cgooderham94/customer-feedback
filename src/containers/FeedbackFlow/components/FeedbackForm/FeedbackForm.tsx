import {
  Grid,
  TextField,
  Typography,
  InputLabel,
  useMediaQuery,
  Rating,
} from "@mui/material";
import { Box } from "@mui/system";
import {
  ChangeEvent,
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
} from "react";
import { FEEDBACK_FORM_CONTENT } from "./constants";
import { FieldId, FIELD_CONFIG } from "./data";
import {
  Form,
  FormControlExpanded,
  OutlinedInputExpanded,
  SubmitButton,
} from "./FeedbackForm.styles";

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

const {
  fieldGroups: { leftCol: leftFieldGroup, rightCol: rightFieldGroup },
} = FIELD_CONFIG;

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
    e: SyntheticEvent,
    setValue: Dispatch<SetStateAction<any>>
  ) => {
    const {
      // @ts-ignore
      target: { value },
    } = e;

    setValue(value);
  };

  const handleName = (e: SyntheticEvent) => handleFieldValue(e, setName);
  const handleEmail = (e: SyntheticEvent) => handleFieldValue(e, setEmail);
  const handleRating = (e: SyntheticEvent, newValue: number) =>
    setRating(newValue);
  const handleComment = (e: SyntheticEvent) => handleFieldValue(e, setComment);

  const fieldState: Record<
    FieldId,
    { value: any; setter: (e: SyntheticEvent, newValue?: any) => void }
  > = {
    name: {
      value: name,
      setter: handleName,
    },
    email: {
      value: email,
      setter: handleEmail,
    },
    rating: {
      value: rating,
      setter: handleRating,
    },
    comment: {
      value: comment,
      setter: handleComment,
    },
  };

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography id="form-heading" variant="h4" component="h1">
        {heading}
      </Typography>

      <Form onSubmit={handleSubmit} aria-labelledby="form-heading">
        <Grid container flexWrap={{ sm: "nowrap" }} gap="1rem">
          <Grid container flexDirection="column" gap="1rem" xs={12} md={5}>
            {leftFieldGroup.map(({ label, id, type, required }) => {
              return type === "rating" ? (
                <>
                  <Typography variant="subtitle1" component="legend">
                    {label}
                  </Typography>
                  <Rating
                    value={fieldState[id].value}
                    id={id}
                    name={id}
                    precision={1}
                    onChange={fieldState[id].setter}
                  />
                </>
              ) : (
                <TextField
                  {...{
                    id,
                    label,
                    required,
                    type,
                    value: fieldState[id].value,
                    onChange: fieldState[id].setter,
                    fullWidth: true,
                    key: id,
                  }}
                />
              );
            })}
          </Grid>
          <Grid xs={12} md={7}>
            {rightFieldGroup.map(({ label, id, type, required }) => (
              <FormControlExpanded variant="outlined" key={id}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInputExpanded
                  {...{
                    id,
                    label,
                    required,
                    type,
                    value: fieldState[id].value,
                    onChange: fieldState[id].setter,
                    fullWidth: true,
                    multiline: true,
                    sx: { height: "100%" },
                  }}
                />
              </FormControlExpanded>
            ))}
          </Grid>
        </Grid>

        <Box marginLeft={{ sm: "auto" }} width={{ xs: "100%", sm: "auto" }}>
          <SubmitButton variant="contained" size="large" fullWidth>
            Submit
          </SubmitButton>
        </Box>
      </Form>
    </Box>
  );
};
