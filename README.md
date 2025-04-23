# bejamas-rec-task

Evaluation task for QA automation engineer role

## Task

You are required to create automated tests for the [Netlify website](https://www.netlify.com/) using Playwright. Please implement the following [test cases](./TEST_CASES.md) (_please refer to [assumptions/limitations](#assumptionslimitations)_).

## Setup

1. Make sure you have Node.js >=18 and npm installed.
2. Clone the repository
3. Navigate to the project directory
4. Install dependencies
5. Install Playwright browsers

## Tests execution steps

1. Open terminal
2. Navigate to the project directory
3. [optional if not done already] [Setup project](#setup)
4. Run the command `npm test` to execute the tests
5. Check the test results in the terminal output
6. Check the test results in the `test-results` directory

## Explanation of approach

1. I used Playwright to create the test cases. As specified in the task.
2. I used the Page Object Model design pattern to create a separate page object for the Netlify website. This allows for better organization and maintainability of the test code.
3. I separated test cases into different test suites to improve readability and maintainability.
4. I created custom `test` fixture to handle locators and actions for the Netlify website. It's located in the `fixtures/base.ts`. I extended the `test` fixture to include `netlify` page object, which allows for easy access to the page object methods and locators in the test cases.
5. I created seprate place in project directory for locators (`locators/netlify.ts`). Normally it would be in some shared location between frontend and tests (so we won't repeat locators in both places), but for the sake of simplicity I created it in the test project directory.
6. I created three suite files, for test cases specified in the task. Each suite file contains one or more test cases (in assumptions I wrote why there might be more) that are related to the specific functionality of the Netlify website.

## Assumptions/Limitations

- Test cases were writtien with contradictory assertions (_"Test form submission with valid data"_ and _"Test form validation with invalid data"_), so I had to split them into two separate test cases in one test suite.
- Test cases didn't have specifc test data, so I used some random data for the tests.
- Test cases didn't have specific return values, so I assumed that system under test is working correctly and returns expected values, and I used them as assertions.
- Task didn't specify if it should be done available for mobile devices, so I used the default viewport size (1280x720).
- Task didn't specify if any permissions for browser are required, so I assumed that no permissions are required.
- One of limitations is that Netlify website is production website, so they strip away locators. So I had to use locating elements by DOM structure/stripping ids/etc. This is not a good practice (much better would be, if they'd have test attributes), but I had to do it for the sake of the task.
