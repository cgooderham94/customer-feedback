import { OutlinedTextFieldProps } from "@mui/material";

export type FieldId = "name" | "email" | "rating" | "comment";

export interface Field extends Omit<OutlinedTextFieldProps, "variant"> {
  id: FieldId;
}

export const ALL_FIELDS: Record<FieldId, Field> = {
  name: {
    label: "Name",
    id: "name",
    type: "text",
    required: true,
  },
  email: {
    label: "Email",
    id: "email",
    type: "email",
    required: true,
  },
  rating: {
    label: "Rating (1-5 stars)",
    id: "rating",
    type: "rating",
    required: true,
  },
  comment: {
    label: "Comment",
    id: "comment",
    type: "textarea",
    required: true,
  },
};

export const FIELD_CONFIG = {
  leftCol: [ALL_FIELDS["name"], ALL_FIELDS["email"], ALL_FIELDS["rating"]],
  rightCol: [ALL_FIELDS["comment"]],
};
