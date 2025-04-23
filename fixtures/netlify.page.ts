import type { Page } from "@playwright/test";

export class NetlifyPage {
  readonly page: Page;
  readonly url: string;

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
}
