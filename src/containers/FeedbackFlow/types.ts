export interface FormValues {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export type FieldId = keyof FormValues;

export type FormErrors = Record<FieldId, string>;
