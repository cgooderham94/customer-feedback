import { render, screen, within } from "@testing-library/react";
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

  it("proceeds to FeedbackResults step when form is successfully submitted", () => {});

  it("shows validation errors when form fields are not correctly completed", () => {});

  describe("FeedbackResults step", () => {
    it("displays list of past feedback", () => {});

    it("displays distribution chart of past ratings", () => {});

    it("allows user to go back to FeedbackForm with reset values", () => {});
  });
});
