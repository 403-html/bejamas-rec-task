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
2. I turned on the reporter to `dot` and `html`, so you can see the test results in the terminal output and in the `test-results` directory (by default it's gitignored, but for sake of the task I added it to the repo).
3. It should be small recruitment task, so I didn't built any sophisticated utils/used external services (more about it in assumptions/limitations).
4. I used the Page Object Model design pattern to create a separate page object for the Netlify website. This allows for better organization and maintainability of the test code.
5. I created three suite files, for test cases specified in the task. Each suite file contains one or more test cases (in assumptions I wrote why there might be more) that are related to the specific functionality of the Netlify website.
   1. `newsletter.spec.ts` - contains test cases related to the newsletter subscription form
   2. `sitemap.spec.ts` - contains test cases related to the sitemap visibility and crawling
   3. `404.spec.ts` - contains test cases related to checking if all links on the page are working and not returning 404 errors
6. I created custom `test` fixture to handle locators and actions for the Netlify website. It's located in the `fixtures/base.ts`. I extended the `test` fixture to include `netlify` page object, which allows for easy access to the page object methods and locators in the test cases.
7. Normally locators (names of test attributes) place would be in some shared location between frontend and tests (so we won't repeat locators in both places), but for the sake of simplicity I created it in page object.
8. Data (like static text, urls, etc.) is stored in the `data` folder (divided by usage). This will allow for easy modification and maintenance of the test data without changing the test code.
9. Crawlability and sitemap.xml verification is done by checking the `robots.txt` file and the `noindex` meta tag. For this I lifted requesting to the page by "request" method to the page object, so I can reuse it in the test cases. Not new API class because not needed + we don't use Netlify API.

## Assumptions/Limitations

- Test cases were writtien with contradictory assertions (_"Test form submission with valid data"_ and _"Test form validation with invalid data"_), so I had to split them into three separate test cases (one invalid as empty, and one as non-valid email) in one test suite.
  - The test cases for invalid or missing data aren't fully functional. While the page does not visibly react to invalid input, a corresponding DOM element is created correctly. This appears to be an issue on the Netlify side. For the purpose of this task, I verified the creation of the DOM element and skipped the visual validation of the error message.
  - The positive test case is somewhat limited, as I cannot provide a fully working example. This is due to two main reasons:
    - The form doesn't accept the `example.com` domain (commonly used for testing, as per RFC 2606). Attempts to submit the form with `example.com` resulted in errors such as `SUBMIT_WITH_VALIDATION_ERROR` in the network logs, `ERR_BLOCKED_BY_CLIENT` in the console, and the error message `Please enter a valid email address.` in the DOM. Using a personal or production email for testing would not be appropriate. I also tried using other non-existent domains like `null.local`, but they were similarly rejected. So the positive test case is limited to verifying that the form can be subbmitted with a valid email address, but I cannot provide assertions for the success message, backend response or email confirmation.
    - This could be "bypassed" (I hope) with email testing service (like `inbucket`), which would require a custom domain/resources to simulate email functionality – so I didn't do it. Also it wasn't in sent task to do it – it was assuming everything is working as expected, so I didn't want to add any additional complexity to the task. I just wanted to show that I can write tests and that I can use Playwright for it.
- Test cases didn't have specific return values, so I assumed that system under test is working correctly (which by looking at my limitations I've noticed my assumption was far from true) and returns expected values, and I used them as assertions.
- Task didn't specify if it should be done available for mobile devices, so I used the default Playwright's viewport size.
- Task didn't specify if any permissions for browser are required, so I assumed that no permissions are required.
- One of limitations is that Netlify website is production website, so they strip away locators. So I had to use locating elements by DOM structure/stripping ids/etc (mostly xpath). This is not a good practice (much better would be, if they'd have test attributes), but I had to do it for the sake of the task.
- "Case" of checking links if they don't return 404 specify all pages, but I assumed that it should be done for the homepage only (Netfliy website has tons of pages, so it would too much work to do it for all of them – missing the point of the recruitment task), to crawl all links and check them.
- "Case" for crawling and sitemap.xml specify few checks which are distinct from each other, so I have split them into separate test cases in one test suite.
  - Same for `Verify that important pages are crawlable` - not specified which pages are "important" for business, so I assumed that it should be done for the homepage only. Be specific.
- "Case" of sitemap.xml and crawlability verification (task about `noindex` meta tag) specifies that it should be done for all pages, but I assumed that it should be done for the homepage only (Netfliy website has tons of pages, so it would too much work to do it for all of them – missing the point of the recruitment task). Also it's not good idea to have it such test on e2e layer as it should be done on integration level.
  - Same for `Verify that important pages are crawlable` - not specified which pages are "important" for business, so I assumed that it should be done for the homepage only. Also this doesn't say what makes page crawlable, so I assume we want to have basic coverage of robots.txt, http header (success code, that page works) and no meta tag noindex. So in this test suite I checked if the page is crawlable by checking if it has no meta tag noindex, if has robots.txt and if it returns success code (200) in the http header. This means our page is crawlable.
- Task didn't specify if it should be done for which browsers/devices/versions of browsers, so I assumed that it should be done for the latest version of Chrome and Firefox (as Playwright supports them out of the box on init).