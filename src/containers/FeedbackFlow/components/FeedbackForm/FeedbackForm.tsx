import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FEEDBACK_FORM_CONTENT } from "./constants";
import { FIELD_CONFIG } from "./data";
import { Form, SubmitButton } from "./FeedbackForm.styles";
import type { FieldId } from "../../types";
import { FieldGroup } from "../FieldGroup/FieldGroup";
import { FeedbackList, FeedbackSteps } from "../../../types/Feedback";
import { useFeedbackForm } from "../../hooks/useFeedbackForm";

interface FeedbackFormProps {
  feedbackList: FeedbackList;
  setFeedbackList: Dispatch<SetStateAction<FeedbackList>>;
  setFeedbackStep: Dispatch<SetStateAction<FeedbackSteps>>;
}

const { heading, submit } = FEEDBACK_FORM_CONTENT;

const { leftCol: leftFieldGroup, rightCol: rightFieldGroup } = FIELD_CONFIG;

const FeedbackForm: FC<FeedbackFormProps> = ({
  feedbackList,
  setFeedbackList,
  setFeedbackStep,
}) => {
  const handleFieldChange = (fieldId: FieldId) => (e: SyntheticEvent) => {
    const {
      // @ts-ignore
      target: { value },
    } = e;

    const newValues = { ...formValues, [fieldId]: value };

    setFormValues(newValues);
  };

  const { formErrors, formValues, handleSubmit, setFormValues } =
    useFeedbackForm({ feedbackList, setFeedbackList, setFeedbackStep });

  return (
    <Box display="flex" flexDirection="column" gap="1rem">
      <Typography id="form-heading" variant="h4" component="h1">
        {heading}
      </Typography>

      <Form onSubmit={handleSubmit} noValidate aria-labelledby="form-heading">
        <Grid container flexWrap={{ sm: "nowrap" }} gap="1rem">
          <Grid container item flexDirection="column" gap="1rem" xs={12} md={5}>
            <FieldGroup
              values={formValues}
              setFormValues={setFormValues}
              errors={formErrors}
              onFieldChange={handleFieldChange}
              fields={leftFieldGroup}
            />
          </Grid>
          <Grid item xs={12} md={7}>
            <FieldGroup
              values={formValues}
              setFormValues={setFormValues}
              errors={formErrors}
              onFieldChange={handleFieldChange}
              fields={rightFieldGroup}
            />
          </Grid>
        </Grid>

        <Box marginLeft={{ sm: "auto" }} width={{ xs: "100%", sm: "auto" }}>
          <SubmitButton variant="contained" size="large" fullWidth>
            {submit}
          </SubmitButton>
        </Box>
      </Form>
    </Box>
  );
};

export default FeedbackForm;
