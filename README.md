# Checkout.com Front End Challenge

**Collecting Customer Feedback**

We want to build a web application to collect and display customer feedback.

**We have put together some initial wireframes below:**

<img width="430" alt="Screenshot 2022-12-14 at 11 32 26" src="https://user-images.githubusercontent.com/33296316/207584427-2b266f44-e14c-4409-925e-0d71885fa0d9.png">

## Detailed Requirements

The application should allow a customer to:

1. Write a review for a product (name, email, rating 1 to 5 stars and leave a comment).
   1. All fields are required and must be validated prior to form submission. Use your judgment on sensible validation.
2. Following submission of feedback, the user should be transitioned to a second page where they can see a chart showing the distribution of ratings and most recent comments (you can use any library available for charting).
3. The user can go back to submit more feedback. Going back should present the user with
   an empty form.

## Guidelines

Kindly create a public repository on GitHub and provide your recruitment manager with a link.

### Technologies

The only constraint is that your solution must use React. Otherwise you are free to make use of
any technology (toolchains, component libraries, etc.) you are comfortable with.
What we value at Checkout.com

### Documentation

The right amount of documentation is the one that explains what a project does, how to operate
and why certain choices were made. Also, what’s left to improve and why.

### Code Architecture

Code should be easy to read and change. Consider folder structure, component breakdown,
general separation of concerns, ease of testing and keeping things simple for the reader.

### Tests

Software Engineers at Checkout.com are responsible for building, testing, deploying and
operating our software. For this exercise, we’re not looking for full test coverage, but we are
looking for a good demonstration of how you test. You should ensure there are enough tests
included to demonstrate your knowledge and ensure the application works as expected.

### User Experience

We’re looking for a functional user interface, enhanced by thoughtful user experience that
adapts gracefully to different screen sizes and devices.

---

## Getting Started

Install dependencies via `yarn install`.

To run this application in dev mode:

1. Run the application via `yarn start`.

To build the production bundle:

1. Build the application via `yarn build`.

To test the application:

1. Run integration tests via `yarn test`.

## Rationale

### Data Handling & Formatting

Comments, form values and errors are stored in local state, providing a simple and effective means of accessing and manipulating data for this application. Whilst comments are added to the `FeedbackList` array in chronological order; an additional date property is added to each feedback item to ensure comments can maintain chronological order if new entries were to be merged with entries from an external source.

### Performance

State is located in the lowest common parent components to minimise unnecessary re-renders. Step components are lazy loaded using React's `lazy` API to split up the application bundle into asynchronously loaded chunks.

### Testing

Integration testing is implemented through the use of Jest and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro), allowing this application to be tested in a way that closely reflects how I expect the end-user to use it. RTL also provides a much cleaner and more developer-friendly style of implementing tests minimizing reference to low-level API's and significantly improving the readability of tests.

### User Interface

The UI for this application is intentionally minimal, particularly concerning displaying feedback data. Large amounts of data and metrics should be easy to comprehend and interpret. Material UI components are used to enhance the base styling of elements.

### User Experience & Accessibility

The application gracefully adapts across all device sizes. Form elements are appropriately labelled to assist completion, and validation is applied to guide users through the successful completion of the form.

Appropriate implementation of accessibility best practices is implemented throughout. The application is fully keyboard navigable from form to results and back again. Chart implementation has an additional aria-label applied to ensure the `canvas` element does not hinder assistive technologies.

Additional aggregated rating information is displayed to provider users an overall average rating of the product, providing more contextual information to improve their understanding of how the 'product/service' is viewed more broadly.

### Potential Improvements

If I were to iterate on this solution and implement improvements, I would consider the following points:

- Implement a regression test via Cypress.
  - This would provide the most confidence that this feature works from start to finish and no regressions are introduced across subsequent development cycles.
- Add sort ordering on comments by date (most recent/oldest) and rating (highest/lowest)
  - This could improve the UX of the application to allow users to discover more relevant comments relating to their experience.
- Implement validation library i.e. `react-hook-form`
  - To offload the complexity and technical overhead of manually managing multiple validations per field. More scalable solution for complex validations and improved UX (onBlur validation) to provide earlier feedback on errors.
- UI design
  - While simplicity is often a key component to an effective user experience, the general UI design of this application could be enhanced with the support of a UI designer.
