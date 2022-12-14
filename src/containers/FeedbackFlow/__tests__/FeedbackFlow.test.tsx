import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FeedbackFlow } from "../FeedbackFlow";

const renderComponent = () => render(<FeedbackFlow />);

describe("FeedbackFlow", () => {
  it("displays feedback form step as default", () => {
    renderComponent();

    expect(
      screen.getByRole("heading", { name: /feedback form/i })
    ).toBeInTheDocument();

    const form = screen.getByRole("form", { name: /feedback form/i });

    expect(form).toBeInTheDocument();

    const withinForm = within(form);

    expect(withinForm.getByLabelText(/name/i)).toBeInTheDocument();
    expect(withinForm.getByLabelText(/email/i)).toBeInTheDocument();
    expect(withinForm.getByLabelText(/rating/i)).toBeInTheDocument();
    expect(withinForm.getByLabelText(/comment/i)).toBeInTheDocument();

    expect(
      withinForm.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  it("new comment can be seen on FeedbackResults step when form is successfully submitted", () => {
    renderComponent();

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

    const nameVal = "Test Person";
    userEvent.type(nameField, nameVal);
    expect(nameField).toHaveValue(nameVal);

    const emailVal = "test@person.com";
    userEvent.type(emailField, emailVal);
    expect(emailField).toHaveValue(emailVal);

    const ratingVal = 4;
    userEvent.type(ratingField, `{${ratingVal}}`);
    expect(ratingField).toHaveValue(ratingVal);

    const commentVal = "The product is really simple to use. Thanks.";
    userEvent.type(commentField, commentVal);
    expect(commentField).toHaveValue(commentVal);

    const submitBtn = withinForm.getByRole("button", { name: /submit/i });
    expect(submitBtn).toBeInTheDocument();
    userEvent.click(submitBtn);

    expect(form).not.toBeInTheDocument();

    expect(
      screen.getByRole("heading", { name: /feedback results/i })
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(nameVal, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(emailVal, "i"))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(ratingVal.toString(), "i"))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(commentVal, "i"))).toBeInTheDocument();
  });

  it("shows validation errors when form fields are not correctly completed", () => {});

  describe("FeedbackResults step", () => {
    it("displays list of past feedback", () => {});

    it("displays distribution chart of past ratings", () => {});

    it("allows user to go back to FeedbackForm with reset values", () => {});
  });
});
