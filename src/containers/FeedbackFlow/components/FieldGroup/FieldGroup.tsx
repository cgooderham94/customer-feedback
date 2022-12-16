import { TextField } from "@mui/material";
import React, {
  type Dispatch,
  type FC,
  type SetStateAction,
  type SyntheticEvent,
} from "react";
import { RatingInput } from "../../../../components";
import { TextArea } from "../../../../components/TextArea/TextArea";
import type { FormErrors, FormValues } from "../../types";
import type { Field, FieldId } from "../FeedbackForm/data";

interface FieldGroupProps {
  values: FormValues;
  setFormValues: Dispatch<SetStateAction<FormValues>>;
  errors: FormErrors;
  onFieldChange: (fieldId: FieldId) => (e: SyntheticEvent) => void;
  fields: Field[];
}

export const FieldGroup: FC<FieldGroupProps> = ({
  values,
  setFormValues,
  errors,
  onFieldChange,
  fields,
}) => {
  const handleRating = (e: SyntheticEvent, newValue: number | null) =>
    setFormValues({ ...values, rating: newValue || 0 });

  return (
    <>
      {fields.map(({ label, id, type }) => {
        const baseProps = { type, label, id, key: id };

        switch (type) {
          case "textarea":
            return (
              <TextArea
                {...{
                  ...baseProps,
                  value: values[id],
                  error: errors[id],
                  onChange: onFieldChange(id),
                }}
              />
            );
          case "rating":
            return (
              <RatingInput
                {...{
                  ...baseProps,
                  value: values[id] as number,
                  onChange: handleRating,
                  errorMessage: errors[id],
                }}
              />
            );
          default:
            return (
              <TextField
                {...{
                  ...baseProps,
                  variant: "outlined",
                  value: values[id],
                  error: !!errors[id],
                  helperText: errors[id],
                  onChange: onFieldChange(id),
                  fullWidth: true,
                }}
              />
            );
        }
      })}
    </>
  );
};