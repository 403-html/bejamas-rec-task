import type { Page, Locator } from "@playwright/test";
import { locators } from "../data/locators";
import type { Locators } from "../data/locators";
import "dotenv/config";

export class NetlifyPage {
  readonly page: Page;
  readonly url: string;
  public locators: Pick<Locators, "newsletter" | "meta" | "fourofour">;

  constructor(page: Page) {
    this.page = page;
    this.url = process.env.BASE_URL as string;

    // Initialize locators as an empty object, otherwise TypeScript will complain
    // about the properties not being defined
    this.locators = {
      newsletter: {},
      meta: {},
      fourofour: {},
    } as Pick<Locators, "newsletter" | "meta" | "fourofour">;
    this.setupLocators();
  }

  private setupLocators() {
    this.locators.newsletter.input = this.page.locator(
      locators.newsletter.input,
    );
    this.locators.newsletter.subheader = this.page.locator(
      locators.newsletter.subheader,
    );
    this.locators.newsletter.subscribeButton = this.page.locator(
      locators.newsletter.subscribeButton,
    );
    this.locators.newsletter.errorMessage = this.page.locator(
      locators.newsletter.errorMessage,
    );

    this.locators.fourofour.title = this.page.locator(locators.fourofour.title);
    this.locators.fourofour.description = this.page.locator(
      locators.fourofour.description,
    );
    this.locators.fourofour.link = this.page.locator(locators.fourofour.link);

    this.locators.meta.noIndex = this.page.locator(locators.meta.noIndex);
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
