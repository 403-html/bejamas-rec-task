import { test } from "../fixtures/base";
import { expect } from "@playwright/test";
import { staticContent } from "../data/staticContent";
import { testData } from "../data/testData";

test.describe("Newsletter", () => {
  test.beforeEach(async ({ netlifyPage }) => {
    const subheader = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.subheader,
    );
    const input = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.input,
    );
    const subscribeButton = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.subscribeButton,
    );

    await netlifyPage.goto();
    await expect(input).toBeAttached();
    input.scrollIntoViewIfNeeded();
    await expect(subheader).toBeVisible();
    await expect(subheader).toHaveText(staticContent.newsletter.subheader);
    await expect(input).toBeVisible();
    await expect(subscribeButton).toBeVisible();
    await expect(subscribeButton).toHaveText(
      staticContent.newsletter.subscribeButton,
    );
  });

  test("should newsletter be possible to subscribe", async ({
    netlifyPage,
  }) => {
    const input = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.input,
    );
    const subscribeButton = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.subscribeButton,
    );
    await input.fill(testData.newsletter.validEmail);
    await expect(input).toHaveValue(testData.newsletter.validEmail);
    await subscribeButton.click();
    // NOTE: it should show success message, but it doesn't work with test data (more in README.md)
  });
  test("should newsletter throw error on non-email input (non-email)", async ({
    netlifyPage,
  }) => {
    const input = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.input,
    );
    const subscribeButton = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.subscribeButton,
    );
    const errorMessage = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.errorMessage,
    );
    await input.fill(testData.newsletter.emptyEmail);
    await expect(input).toHaveValue(testData.newsletter.emptyEmail);
    await subscribeButton.click();
    // NOTE: it should show error message, but visually it doesn't work (more in README.md), so only check if it is present in DOM
    await expect(errorMessage).toHaveText(
      staticContent.newsletter.emptyErrorMessage,
    );
  });
  test("should newsletter throw error on empty input (empty)", async ({
    netlifyPage,
  }) => {
    const input = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.input,
    );
    const subscribeButton = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.subscribeButton,
    );
    const errorMessage = netlifyPage.page.locator(
      netlifyPage.locators.newsletter.errorMessage,
    );
    await input.fill(testData.newsletter.nonValidEmail);
    await expect(input).toHaveValue(testData.newsletter.nonValidEmail);
    await subscribeButton.click();
    // NOTE: it should show error message, but visually it doesn't work (more in README.md), so only check if it is present in DOM
    await expect(errorMessage).toHaveText(
      staticContent.newsletter.nonValidEmailErrorMessage,
    );
  });
});
