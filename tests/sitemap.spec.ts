import { test } from "../fixtures/base";
import { expect } from "@playwright/test";
import { staticContent } from "../data/static-content";
import { testData } from "../data/test-data";

test.describe("Sitemap/Crawlability", () => {
  test("should sitemap.xml be accessible", async ({ netlifyPage }) => {
    const response = await netlifyPage.requestToPage("/sitemap.xml");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe("application/xml");
  });
  test("should robots.txt be accessible", async ({ netlifyPage }) => {
    const response = await netlifyPage.requestToPage("/robots.txt");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toBe(
      "text/plain; charset=UTF-8",
    );
    const robotsContent = await response.text();
    expect(robotsContent).toBe(testData.robots);
  });
  test("should homepage not have noindex meta tag", async ({ netlifyPage }) => {
    await netlifyPage.goto("/");
    const noIndexMetaTag = netlifyPage.page.locator(
      netlifyPage.locators.meta.noIndex,
    );
    await expect(noIndexMetaTag).not.toBeAttached();
  });
});
