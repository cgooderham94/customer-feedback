import { screen, within, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const expectRatingField = () => {
  const label = screen.getByText(/rating \(1-5 stars\)/i, {
    selector: "legend",
  });
  expect(label).toBeInTheDocument();

  const oneStar = screen.getByRole("radio", { name: /1 star/i });
  const twoStars = screen.getByRole("radio", { name: /2 stars/i });
  const threeStars = screen.getByRole("radio", { name: /3 stars/i });
  const fourStars = screen.getByRole("radio", { name: /4 stars/i });
  const fiveStars = screen.getByRole("radio", { name: /5 stars/i });

  expect(oneStar).toBeInTheDocument();
  expect(twoStars).toBeInTheDocument();
  expect(threeStars).toBeInTheDocument();
  expect(fourStars).toBeInTheDocument();
  expect(fiveStars).toBeInTheDocument();
};

interface ExpectSubmitFeedbackOptions {
  name: string;
  email: string;
  rating: number;
  comment: string;
}

export const expectSubmitFeedback = async ({
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
  const commentField = withinForm.getByLabelText(/comment/i);

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(commentField).toBeInTheDocument();
  expectRatingField();

  userEvent.type(nameField, name);
  expect(nameField).toHaveValue(name);

  userEvent.type(emailField, email);
  expect(emailField).toHaveValue(email);

  const ratingStr = rating > 1 ? `${rating} Stars` : "1 Star";
  const starRadio = screen.getByRole("radio", {
    name: new RegExp(ratingStr, "i"),
  });

  fireEvent.click(starRadio);
  expect(starRadio).toBeChecked();

  userEvent.type(commentField, comment);
  expect(commentField).toHaveValue(comment);

  const submitBtn = withinForm.getByRole("button", { name: /submit/i });
  expect(submitBtn).toBeInTheDocument();
  userEvent.click(submitBtn);

  expect(form).not.toBeInTheDocument();
};
