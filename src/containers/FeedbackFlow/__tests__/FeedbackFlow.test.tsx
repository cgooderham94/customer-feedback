import { FeedbackFlow } from "../FeedbackFlow";

describe("FeedbackFlow", () => {
  it("displays feedback form step as default");

  it("proceeds to FeedbackResults step when form is successfully submitted");

  it("shows validation errors when form fields are not correctly completed");

  describe("FeedbackResults step", () => {
    it("displays list of past feedback");

    it("displays distribution chart of past ratings");

    it("allows user to go back to FeedbackForm with reset values");
  });
});
