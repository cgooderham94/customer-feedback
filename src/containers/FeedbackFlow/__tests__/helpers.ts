import { screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

interface ExpectSubmitFeedbackOptions {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export const expectSubmitFeedback = ({
  name,
  email,
  rating,
  comment,
}: ExpectSubmitFeedbackOptions) => {
  expect(
    screen.getByRole("heading", { name: /feedback form/i })
  ).toBeInTheDocument();

  const form = screen.getByRole("form", { name: /feedback form/i });

  expect(form).toBeInTheDocument();

  const withinForm = within(form);

  const nameField = withinForm.getByLabelText(/name/i);
  const emailField = withinForm.getByLabelText(/email/i);
  const ratingField = withinForm.getByLabelText(/rating \(1-5 stars\)/i);
  const commentField = withinForm.getByLabelText(/comment/i);

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(ratingField).toBeInTheDocument();
  expect(commentField).toBeInTheDocument();

  userEvent.type(nameField, name);
  expect(nameField).toHaveValue(name);

  userEvent.type(emailField, email);
  expect(emailField).toHaveValue(email);

  userEvent.type(ratingField, `{${rating}}`);
  expect(ratingField).toHaveValue(rating);

  userEvent.type(commentField, comment);
  expect(commentField).toHaveValue(comment);

  const submitBtn = withinForm.getByRole("button", { name: /submit/i });
  expect(submitBtn).toBeInTheDocument();
  userEvent.click(submitBtn);

  expect(form).not.toBeInTheDocument();
};
