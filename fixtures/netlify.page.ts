import type { Page } from "@playwright/test";
import "dotenv/config";

const locators = {
  newsletter: {
    subheader: "//section[contains(@class, 'newsletter-form')]//h2",
    input:
      "//section[contains(@class, 'newsletter-form')]//input[@type='email' and contains(@class, 'hs-input')]",
    subscribeButton:
      "//section[contains(@class, 'newsletter-form')]//input[@type='submit']",
    errorMessage:
      "//section[contains(@class, 'newsletter-form')]//label[contains(@class, 'hs-error-msg')]",
  },
  fourofour: {
    title: "//div[contains(@class, 'text-layer-wrapper')]//h1",
    description: "//div[contains(@class, 'text-layer-wrapper')]//p",
    link: "//div[contains(@class, 'text-layer-wrapper')]//a[contains(@class, '404-link')]",
  },
  meta: {
    noIndex: '//meta[@name="robots"][contains(@content, "noindex")]',
  },
};

export class NetlifyPage {
  readonly page: Page;
  readonly url: string;
  public locators: typeof locators = locators;

  constructor(page: Page) {
    this.page = page;
    this.url = process.env.BASE_URL as string;
  }

  /**
   * Navigates the browser to the specified slug appended to the Netlify's URL.
   *
   * @param slug - The path to navigate to, relative to the base URL. Defaults to "/".
   *               Example: "/about" will navigate to `${this.url}/about`.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(slug: string = "/") {
    if (!slug.startsWith("/") && slug.startsWith("http")) {
      await this.page.goto(slug);
      return;
    }
    await this.page.goto(`${this.url}${slug}`);
  }

  async requestToPage(
    slug: string = "/",
    options: { method?: string; data?: any } = {},
  ) {
    const { method = "GET", data } = options;
    if (!slug.startsWith("/") && slug.startsWith("http")) {
      const response = await this.page.request.fetch(slug, {
        method,
        data,
      });
      return response;
    }

    const response = await this.page.request.fetch(`${this.url}${slug}`, {
      method,
      data,
    });
    return response;
  }
}
