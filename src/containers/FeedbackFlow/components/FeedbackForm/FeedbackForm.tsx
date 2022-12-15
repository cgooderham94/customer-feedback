import {
  Grid,
  TextField,
  Typography,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import { Box } from "@mui/system";
import { Dispatch, FC, SetStateAction, SyntheticEvent } from "react";
import { FEEDBACK_FORM_CONTENT } from "./constants";
import { FieldId, FIELD_CONFIG } from "./data";
import {
  Form,
  FormControlExpanded,
  OutlinedInputExpanded,
  outlinedTextareaStyles,
  SubmitButton,
} from "./FeedbackForm.styles";
import { RatingInput } from "../../../../components";
import { FormErrors, FormValues } from "../../types";

interface FeedbackFormProps {
  formErrors: FormErrors;
  formValues: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  handleSubmit: (e: SyntheticEvent) => void;
}

const { heading } = FEEDBACK_FORM_CONTENT;

const {
  fieldGroups: { leftCol: leftFieldGroup, rightCol: rightFieldGroup },
} = FIELD_CONFIG;

export const FeedbackForm: FC<FeedbackFormProps> = ({
  formErrors,
  formValues,
  setFormValues,
  handleSubmit,
}) => {
  const handleFieldValue = (fieldId: FieldId) => (e: SyntheticEvent) => {
    const {
      // @ts-ignore
      target: { value },
    } = e;

    const newValues = { ...formValues, [fieldId]: value };

    setFormValues(newValues);
  };

  const handleRating = (e: SyntheticEvent, newValue: number | null) =>
    setFormValues({ ...formValues, rating: newValue || 0 });

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography id="form-heading" variant="h4" component="h1">
        {heading}
      </Typography>

      <Form onSubmit={handleSubmit} noValidate aria-labelledby="form-heading">
        <Grid container flexWrap={{ sm: "nowrap" }} gap="1rem">
          <Grid container item flexDirection="column" gap="1rem" xs={12} md={5}>
            {leftFieldGroup.map(({ label, id, type }) => {
              return type === "rating" ? (
                <RatingInput
                  key={id}
                  label={label}
                  field={{
                    value: formValues[id] as number,
                    id: id,
                    name: id,
                    precision: 1,
                    onChange: handleRating,
                  }}
                  errorMessage={formErrors[id]}
                />
              ) : (
                <TextField
                  {...{
                    id,
                    label,
                    type,
                    variant: "outlined",
                    value: formValues[id],
                    error: !!formErrors[id],
                    helperText: formErrors[id],
                    onChange: handleFieldValue(id),
                    fullWidth: true,
                    key: id,
                  }}
                />
              );
            })}
          </Grid>
          <Grid item xs={12} md={7}>
            {rightFieldGroup.map(({ label, id, type }) => (
              <FormControlExpanded variant="outlined" key={id}>
                <InputLabel htmlFor={id}>{label}</InputLabel>
                <OutlinedInputExpanded
                  {...{
                    id,
                    label,
                    type,
                    value: formValues[id],
                    error: !!formErrors[id],
                    onChange: handleFieldValue(id),
                    fullWidth: true,
                    multiline: true,
                    minRows: 1,
                    sx: { height: "100%" },
                    inputProps: {
                      style: outlinedTextareaStyles,
                    },
                  }}
                />
                <FormHelperText error>{formErrors[id]}</FormHelperText>
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
