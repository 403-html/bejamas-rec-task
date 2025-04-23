import { test as base } from "@playwright/test";
import { NetlifyPage } from "./netlify.page";

type Fixtures = {
  netlifyPage: NetlifyPage;
};

export const test = base.extend<Fixtures>({
  netlifyPage: async ({ page }, use) => {
    const netlifyPage = new NetlifyPage(page);
    await use(netlifyPage);
  },
});
