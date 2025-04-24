import { test } from "../fixtures/base";
import { expect } from "@playwright/test";
import { staticContent } from "../data/static-content";
import { extractLinks } from "../utils/extract-links";
import "dotenv/config";

test.describe("404 links", () => {
  let allHomepageLinks: string[] = [];
  test.beforeAll(async ({ browser }) => {
    const netlifyPage = await browser.newPage({
      baseURL: process.env.BASE_URL,
    });
    await netlifyPage.goto("/");
    allHomepageLinks = await extractLinks(
      netlifyPage,
      process.env.BASE_URL as string,
    );
  });

  test("should have working 404 page", async ({ netlifyPage }) => {
    await netlifyPage.goto("/nonexistent-page");
    await expect(netlifyPage.locators.fourofour.title).toHaveText(
      staticContent.fourofour.title,
    );
    await expect(netlifyPage.locators.fourofour.description).toContainText(
      staticContent.fourofour.description,
    );
    await expect(netlifyPage.locators.fourofour.link).toHaveText(
      staticContent.fourofour.linkText,
    );
    await expect(netlifyPage.locators.fourofour.link).toHaveAttribute(
      "href",
      staticContent.fourofour.linkUrl,
    );
  });

  test("should have working all links on homepage", async ({ netlifyPage }) => {
    test.setTimeout(60 * 1000);
    await netlifyPage.goto();
    for (const link of allHomepageLinks) {
      const response = await netlifyPage.requestToPage(link);
      expect(response.status()).not.toBe(404);
    }
  });
});
