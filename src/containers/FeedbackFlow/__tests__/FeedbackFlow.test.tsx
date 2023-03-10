import { fireEvent, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FeedbackFlow } from "../FeedbackFlow";
import { expectSubmitFeedback } from "./helpers";
import "../../../components/BarChart/BarChart";
import "../data";

jest.mock("../../../components/BarChart/BarChart", () => ({
  Chart: {
    register: () => null,
  },
  Bar: () => null,
}));

jest.mock("../data.ts", () => ({
  ...jest.requireActual("../data.ts"),
  INITIAL_FEEDBACK_LIST: [
    {
      name: "Kimberley Atkinson",
      email: "kim@atkinson.com",
      rating: 5,
      comment: "Excellent product, excellent service!",
      date: new Date(),
    },
    {
      name: "David King",
      email: "david@king.com",
      rating: 3,
      comment:
        "Took some time to get things up and running but product worked well thereafter.",
      date: new Date(),
    },
  ],
}));

const NAME = "Test Person";
const EMAIL = "test@person.com";
const RATING = 4;
const COMMENT = "Fantastic product.";
const ratingStr = RATING > 1 ? `${RATING} Stars` : "1 Star";

const renderComponent = () => render(<FeedbackFlow />);

describe("FeedbackFlow", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays feedback form step as default", async () => {
    renderComponent();

    expect(
      await screen.findByRole("heading", { name: /feedback form/i })
    ).toBeInTheDocument();

    const form = screen.getByRole("form", { name: /feedback form/i });

    expect(form).toBeInTheDocument();

    const withinForm = within(form);

    expect(withinForm.getByLabelText(/name/i)).toBeInTheDocument();
    expect(withinForm.getByLabelText(/email/i)).toBeInTheDocument();
    expect(
      withinForm.getByText(/rating/i, { selector: "legend" })
    ).toBeInTheDocument();
    expect(withinForm.getByLabelText(/comment/i)).toBeInTheDocument();

    expect(
      withinForm.getByRole("button", { name: /submit/i })
    ).toBeInTheDocument();
  });

  it("new comment can be seen on FeedbackResults step when form is successfully submitted", async () => {
    renderComponent();

    await expectSubmitFeedback({
      name: NAME,
      email: EMAIL,
      rating: RATING,
      comment: COMMENT,
    });

    expect(
      await screen.findByRole("heading", { name: /feedback results/i })
    ).toBeInTheDocument();

    expect(screen.getByText(new RegExp(EMAIL, "i"))).toBeInTheDocument();
    expect(
      screen.getAllByRole("img", { name: new RegExp(ratingStr, "i") })[1]
    ).toBeInTheDocument();
    expect(screen.getByText(new RegExp(COMMENT, "i"))).toBeInTheDocument();
  });

  describe("form validation", () => {
    it("shows required field errors when form fields are not filled in", async () => {
      renderComponent();

      const form = await screen.findByRole("form", { name: /feedback form/i });
      const withinForm = within(form);
      const requiredRegex = /this field is required/i;

      expect(form).toBeInTheDocument();

      const submitBtn = withinForm.getByRole("button", { name: /submit/i });

      expect(submitBtn).toBeInTheDocument();
      userEvent.click(submitBtn);

      expect(screen.getAllByText(requiredRegex)).toHaveLength(4);

      const name = screen.getByRole("textbox", { name: /name/i });
      const email = screen.getByRole("textbox", { name: /email/i });
      const fiveStars = screen.getByRole("radio", { name: /5 stars/i });
      const comment = screen.getByRole("textbox", { name: /comment/i });

      userEvent.type(name, NAME);
      userEvent.click(submitBtn);

      expect(screen.getAllByText(requiredRegex)).toHaveLength(3);

      userEvent.type(email, EMAIL);
      userEvent.click(submitBtn);

      expect(screen.getAllByText(requiredRegex)).toHaveLength(2);

      fireEvent.click(fiveStars);
      userEvent.click(submitBtn);

      expect(screen.getByText(requiredRegex)).toBeInTheDocument();

      userEvent.type(comment, COMMENT);
      userEvent.click(submitBtn);

      expect(
        screen.queryByRole("form", { name: /feedback form/i })
      ).not.toBeInTheDocument();
    });

    it("shows email error when email value is invalid", async () => {
      renderComponent();

      const form = await screen.findByRole("form", { name: /feedback form/i });
      const withinForm = within(form);

      expect(form).toBeInTheDocument();

      const submitBtn = withinForm.getByRole("button", { name: /submit/i });
      const email = screen.getByRole("textbox", { name: /email/i });

      userEvent.type(email, "invalidemailaddress");
      userEvent.click(submitBtn);

      expect(
        screen.getByText(/a valid email address is required/i)
      ).toBeInTheDocument();
    });
  });

  describe("feedback results", () => {
    it("display ratings distribution chart", async () => {
      renderComponent();

      await expectSubmitFeedback({
        name: NAME,
        email: EMAIL,
        rating: RATING,
        comment: COMMENT,
      });

      expect(
        screen.getByRole("graphics-document", {
          name: /distribution of ratings. 0 - 1 star, 0 - 2 stars, 1 - 3 stars, 1 - 4 stars, 1 - 5 stars/i,
        })
      ).toBeInTheDocument();

      expect(screen.getByText(/\(3 ratings\) 4 stars/i)).toBeInTheDocument();
    });

    it("displays list of past feedback", async () => {
      renderComponent();

      await expectSubmitFeedback({
        name: NAME,
        email: EMAIL,
        rating: RATING,
        comment: COMMENT,
      });

      expect(screen.getByText(/kim@atkinson.com/i)).toBeInTheDocument();
      expect(
        screen.getByText(/excellent product, excellent service!/i)
      ).toBeInTheDocument();

      expect(screen.getByText(/david@king.com/i)).toBeInTheDocument();
      expect(
        screen.getByText(
          /took some time to get things up and running but product worked well thereafter./i
        )
      ).toBeInTheDocument();

      expect(screen.getByText(new RegExp(EMAIL, "i"))).toBeInTheDocument();
      expect(
        screen.getAllByRole("img", { name: new RegExp(ratingStr, "i") })[1]
      ).toBeInTheDocument();
      expect(screen.getByText(new RegExp(COMMENT, "i"))).toBeInTheDocument();
    });

    it("allows user to go back to FeedbackForm with reset values", async () => {
      renderComponent();

      await expectSubmitFeedback({
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
      expect(screen.getByText(/no stars selected/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/comment/i)).toHaveValue("");
    });
  });
});
