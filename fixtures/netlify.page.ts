import type { Page } from "@playwright/test";
import { locators } from "../data/locators";
import "dotenv/config";

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

  /**
   * Sends an HTTP request to a specified page and returns the response.
   *
   * @param slug - The path or URL to send the request to. Defaults to "/".
   *               If the slug starts with "http", it is treated as a full URL.
   * @param options - An optional object containing request options:
   *   - `method` (string): The HTTP method to use (e.g., "GET", "POST"). Defaults to "GET".
   *   - `data` (any): The payload to send with the request, if applicable.
   * @returns A Promise resolving to the response of the request.
   */
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
