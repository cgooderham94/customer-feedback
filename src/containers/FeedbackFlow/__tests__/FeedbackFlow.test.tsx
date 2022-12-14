import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FeedbackFlow } from "../FeedbackFlow";
import { expectSubmitFeedback } from "./helpers";

const NAME = "Test Person";
const EMAIL = "test@person.com";
const RATING = 4;
const COMMENT = "Fantastic product.";

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

    expectSubmitFeedback({
      name: NAME,
      email: EMAIL,
      rating: RATING,
      comment: COMMENT,
    });

    expect(
      screen.getByRole("heading", { name: /feedback results/i })
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(NAME, "i"))).toBeInTheDocument();
    expect(screen.getByText(new RegExp(EMAIL, "i"))).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(RATING.toString(), "i"))
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(COMMENT, "i"))).toBeInTheDocument();
  });

  it("shows validation errors when form fields are not correctly completed", () => {});

  describe("FeedbackResults step", () => {
    it("displays list of past feedback", () => {
      renderComponent();

      expectSubmitFeedback({
        name: NAME,
        email: EMAIL,
        rating: RATING,
        comment: COMMENT,
      });
    });

    it("displays distribution chart of past ratings", () => {});

    it("allows user to go back to FeedbackForm with reset values", () => {
      renderComponent();

      expectSubmitFeedback({
        name: NAME,
        email: EMAIL,
        rating: RATING,
        comment: COMMENT,
      });

      const backBtn = screen.getByRole("button", { name: /go back/i });

      expect(backBtn).toBeInTheDocument();
      userEvent.click(backBtn);

      expect(
        screen.getByRole("form", { name: /feedback form/i })
      ).toBeInTheDocument();

      expect(screen.getByLabelText(/name/i)).toHaveValue("");
      expect(screen.getByLabelText(/email/i)).toHaveValue("");
      expect(screen.getByLabelText(/rating/i)).toHaveValue(null);
      expect(screen.getByLabelText(/comment/i)).toHaveValue("");
    });
  });
});
