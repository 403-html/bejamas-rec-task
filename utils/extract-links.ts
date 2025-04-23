import { Page } from "@playwright/test";

export const extractLinks = async (page: Page, baseURL: string): Promise<string[]> => {
  const links = await page.locator("a").all();
    const allLinkHrefs = await Promise.all(
      links.map((link) => link.getAttribute("href")),
    );
    
    const validHrefs = allLinkHrefs.reduce(
      (acc: string[], href: string | null) => {
        if (href && !href.startsWith("#") && !href.startsWith("mailto:")) {
          if (href.startsWith("/")) {
            acc.push(`${baseURL}${href}`);
          } else {
            acc.push(href);
          }
        }
        return acc;
      },
      [],
    );
    return [...new Set(validHrefs)];
}