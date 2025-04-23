import type { Page } from "@playwright/test";

const locators = {
  newsletter: {
    subheader: "//section[contains(@class, 'newsletter-form')]//h2",
    input:
      "//section[contains(@class, 'newsletter-form')]//input[@type='email']",
    subscribeButton:
      "//section[contains(@class, 'newsletter-form')]//input[@type='submit']",
    errorMessage:
      "//section[contains(@class, 'newsletter-form')]//label[contains(@class, 'hs-error-msg')]",
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
    this.url = "https://www.netlify.com";
  }

  /**
   * Navigates the browser to the specified slug appended to the Netlify's URL.
   *
   * @param slug - The path to navigate to, relative to the base URL. Defaults to "/".
   *               Example: "/about" will navigate to `${this.url}/about`.
   * @returns A promise that resolves when the navigation is complete.
   */
  async goto(slug: string = "/") {
    await this.page.goto(`${this.url}${slug}`);
  }

  async requestToPage(
    slug: string = "/",
    options: { method?: string; data?: any } = {},
  ) {
    const { method = "GET", data } = options;
    const response = await this.page.request.fetch(`${this.url}${slug}`, {
      method,
      data,
    });
    return response;
  }
}
