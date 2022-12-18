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

Comments, form values and errors are stored in local state providing a simple and effective means of accessing and manipulating data for this application. Whilst comments would be added to the `FeedbackList` array in chronological order, an additional date property is added to each feedback item to ensure comments can maintain chronological order if they were to be fetched from an external source.

### Performance

### Testing

Integration testing is implemented through the use of Jest and [React Testing Library (RTL)](https://testing-library.com/docs/react-testing-library/intro), allowing this application to be tested in a way that closely reflects how I expect the end-user to use it. RTL also provides a much cleaner and more developer-friendly style of implementing tests minimizing reference to low-level API's and significantly improving the readibility of tests.

### User Interface

The UI for this application is intentionally minimal, particularly with respect to displaying feedback data. Large amounts of data and metrics should be easy to comprehend and interpret.

### User Experience & Accessibility

The application gracefully adapts across all device sizes. Form elements are appropriately labelled to assist completion and validation is applied to guide users through successful completion of the form.

Appropriate implementation of accessibility best practices are implemented throughout. Application is fully keyboard navigable from form to results and back again. Chart implementation has additional aria-label applied to ensure assistive technologies are not hindered by the `canvas` element.

Additional aggregated ratings information is displayed to provider user on overall average rating of product, providiing more contextual information to improve their understanding of how the 'product/service' is viewed more broadly.

### Potential Improvements

If I were to iterate on this solution and implement improvements, I would consider the following points:

- Implement a regression test via Cypress.
  - This would provide the most confidence that this feature works from start to finish and no regressions are introduced across subsequent development cycles.
- Add sort ordering on comments by date (most recent/oldest) and rating (highest/lowest)
  - This could improve the UX of the application to allow users to discover more relevant comments relating to their experience.
- Implement validation library
  - To offload complexity and technical overhead of managing multiple validations per-field manually. More scalable solution for complex validations.
- Consider abstracting state into context.
  - Form values are passed down two levels. This is the maximum no. of levels I'm prepared to pass props. Further abstraction/refactoring _could_ require a context to eliminate prop drilling.
- UI design
  - While simplicity is often a key component to an effective user experience, the general UI design of this application could be enhanced with the support of a UI designer.

## TODO

- [ ] Complete Documentation
- [ ] Add installation/setup steps
- [ ] Check performance
- [ ] Nit tidying
- [ ] Consider general UI
