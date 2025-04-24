export const locators = {
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