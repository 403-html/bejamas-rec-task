import { test } from "../fixtures/base";
import { expect } from "@playwright/test";
import { staticContent } from "../data/static-content";
import { testData } from "../data/test-data";

test.describe("Newsletter", () => {
  test.beforeEach(async ({ netlifyPage }) => {
    await netlifyPage.goto();
    await expect(netlifyPage.locators.newsletter.input).toBeAttached();
    netlifyPage.locators.newsletter.input.scrollIntoViewIfNeeded();
    await expect(netlifyPage.locators.newsletter.subheader).toBeVisible();
    await expect(netlifyPage.locators.newsletter.subheader).toHaveText(
      staticContent.newsletter.subheader,
    );
    await expect(netlifyPage.locators.newsletter.input).toBeVisible();
    await expect(netlifyPage.locators.newsletter.subscribeButton).toBeVisible();
    await expect(netlifyPage.locators.newsletter.subscribeButton).toHaveText(
      staticContent.newsletter.subscribeButton,
    );
  });

  test("should newsletter be possible to subscribe", async ({
    netlifyPage,
  }) => {
    await netlifyPage.locators.newsletter.input.fill(
      testData.newsletter.validEmail,
    );
    await expect(netlifyPage.locators.newsletter.input).toHaveValue(
      testData.newsletter.validEmail,
    );
    await netlifyPage.locators.newsletter.subscribeButton.click();
    // NOTE: it should show success message, but it doesn't work with test data (more in README.md)
  });
  test("should newsletter throw error on non-email input (non-email)", async ({
    netlifyPage,
  }) => {
    await netlifyPage.locators.newsletter.input.fill(
      testData.newsletter.emptyEmail,
    );
    await expect(netlifyPage.locators.newsletter.input).toHaveValue(
      testData.newsletter.emptyEmail,
    );
    await netlifyPage.locators.newsletter.subscribeButton.click();
    // NOTE: it should show error message, but visually it doesn't work (more in README.md), so only check if it is present in DOM
    await expect(netlifyPage.locators.newsletter.errorMessage).toHaveText(
      staticContent.newsletter.emptyErrorMessage,
    );
  });
  test("should newsletter throw error on empty input (empty)", async ({
    netlifyPage,
  }) => {
    await netlifyPage.locators.newsletter.input.fill(
      testData.newsletter.nonValidEmail,
    );
    await expect(netlifyPage.locators.newsletter.input).toHaveValue(
      testData.newsletter.nonValidEmail,
    );
    await netlifyPage.locators.newsletter.subscribeButton.click();
    // NOTE: it should show error message, but visually it doesn't work (more in README.md), so only check if it is present in DOM
    await expect(netlifyPage.locators.newsletter.errorMessage).toHaveText(
      staticContent.newsletter.nonValidEmailErrorMessage,
    );
  });
});
