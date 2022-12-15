import { OutlinedTextFieldProps, TextFieldProps } from "@mui/material";

export type FieldId = "name" | "email" | "rating" | "comment";

export interface Field extends Omit<OutlinedTextFieldProps, "variant"> {
  id: FieldId;
}

interface FieldConfig {
  fieldGroups: {
    [key in "leftCol" | "rightCol"]: Field[];
  };
}

export const FIELD_CONFIG: FieldConfig = {
  fieldGroups: {
    leftCol: [
      {
        label: "Name",
        id: "name",
        type: "text",
      },
      {
        label: "Email",
        id: "email",
        type: "email",
      },
      {
        label: "Rating (1-5 stars)",
        id: "rating",
        type: "rating",
      },
    ],
    rightCol: [
      {
        label: "Comment",
        id: "comment",
        type: "textarea",
      },
    ],
  },
};
