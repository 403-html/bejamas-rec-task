# bejamas-rec-task

Evaluation task for QA automation engineer role

## Task

You are required to create automated tests for the [Netlify website](https://www.netlify.com/) using Playwright. Please implement the following [test cases](./TEST_CASES.md) (_please refer to [assumptions/limitations](#assumptionslimitations)_).

## Setup

1. Make sure you have Node.js >=18 and npm installed.
2. Clone the repository
   ```sh
   $ git clone git@github.com:403-html/bejamas-rec-task.git
   ```
3. Navigate to the project directory
   ```sh
   $ cd bejamas-rec-task
   ```
4. Install dependencies
   ```sh
   $ npm install
   ```
5. Install Playwright's default browsers (Firefox, Chromium, Webkit)
   ```sh
   $ npx playwright install
   ```

## Tests execution steps

1. Open terminal
2. Navigate to the project directory
3. [optional if not done already] [Setup project](#setup)
4. Run the command `npm run test` to execute the tests
5. Check the test results in the terminal output
6. Check the test results html report in the `playwright-results` directory

## Explanation of approach

1. I used Playwright to create the test cases. As specified in the task.
2. I turned on the reporter to `line` and `html`, so you can see the test results in the terminal output and in the `playwright-results` directory (by default it's gitignored, but for sake of the task I added it to the repo).
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
10. After using in few places, I realized that <https://www.netlify.com> could be a env variable, so I created a `BASE_URL` variable in the `.env` file.
11. After finishing MVP, I started cleaning up the code. First I started with dependency injection in the page object (passing locators to the constructor, not the test itself).

## Assumptions/Limitations

- Test cases were written with contradictory assertions (for example "Verify form submission with valid data" and "Verify form validation with invalid data"), so I split them into three separate test cases: one for empty input, one for invalid email input, and one for valid email input in a single test suite.
  - The test cases for invalid or missing data aren't fully functional. While the page does not visibly react to invalid input, a corresponding DOM element is created correctly. This appears to be an issue on the Netlify side. For the purpose of this task, I verified the creation of the DOM element and skipped the visual validation of the error message.
  - The positive test case is somewhat limited, as I cannot provide a fully working example. This is due to two main reasons:
    - The form doesn't accept the `example.com` domain (commonly used for testing, as per RFC 2606). Attempts to submit the form with `example.com` resulted in errors such as `SUBMIT_WITH_VALIDATION_ERROR` in the network logs, `ERR_BLOCKED_BY_CLIENT` in the console, and the error message `Please enter a valid email address.` in the DOM. Using a personal or production email for testing would not be appropriate. I also tried using other non-existent domains like `null.local`, but they were similarly rejected. So the positive test case is limited to verifying that the form can be submitted with a valid email address, but I cannot provide assertions for the success message, backend response, or email confirmation.
    - This could be "bypassed" (I hope, as I don't know internals of Netlify's homepage code) with an email testing service (like `inbucket`), which would require a custom domain/resources to simulate email functionality – so I didn't do it. Also, it wasn't specified in the task to do it – it was assumed everything is working as expected, so I didn't want to add any additional complexity to the task. I just wanted to show that I can write tests and that I can use Playwright for it.
- Test cases didn't have specific return values, so I assumed that the system under test is working correctly (which, based on my limitations, I've noticed my assumption was far from true) and returns expected values, and I used them as assertions.
- The task didn't specify if it should be available for mobile devices, so I used Playwright's default viewport size.
- The task didn't specify if any browser permissions are required, so I assumed that no permissions are required.
- One limitation is that the Netlify website is a production website, so they strip away locators. I had to locate elements by DOM structure/stripping IDs/etc. (mostly XPath). This is not a good practice (it would be better if they had test attributes), but I had to do it for the sake of the task.
- The test case "Verify that all links do not return 404 errors" specifies all pages, but I assumed that it should be done for the homepage only (the Netlify website has tons of pages, such case shouldn't be tested on e2e layer, rather on monitoring). I crawled all links on the homepage and created dynamic test suite to check them for sanity check.
- The test case "Verify sitemap.xml and crawlability" specifies a few checks that are distinct from each other, so I split them into separate test cases within one test suite.
  - Similarly, for "Verify that important pages are crawlable" – it doesn't specify which pages are "important" for the business, so I assumed that it should be done for the homepage only. Be specific.
- The test case "Verify sitemap.xml and crawlability" (task about the `noindex` meta tag) specifies that it should be done for all pages, but I assumed that it should be done for the homepage only (the Netlify website has tons of pages, so it would be too much work to do it for all of them). Also, it's not a good idea to have such a test on the end-to-end layer as it should be done on the integration level.
  - Similarly, for "Verify that important pages are crawlable" – it doesn't specify what makes a page crawlable, so I assumed we want to have basic coverage of `robots.txt`, HTTP headers (success code, indicating the page works), and the absence of a `noindex` meta tag. In this test suite, I checked if the page is crawlable by verifying that it has no `noindex` meta tag, has a `robots.txt` file, and returns a success code (200) in the HTTP header. This means the page is crawlable.
- The task didn't specify which browsers/devices/versions of browsers should be used, so I assumed it should be done for the latest versions of Chromium, Safari (webkit) and Firefox (as Playwright supports them out of the box on initialization).
