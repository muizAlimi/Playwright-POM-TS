
// BasePage stores Playwright `Page` instance. Class is protected, so only extending classes can access it.
import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  // BasePage is an abstract class, so it cannot be instantiated directly.
  // It is designed to be extended by other page classes.
  constructor(protected readonly page: Page) { }

  /* ========== Navigation ========== */
  // Navigate to a specific URL path.
  protected async goToUrl(path: string) {
    await this.page.goto(path);
  }

  /* ========== Low-level helpers (protected) ========== */
  // These methods are intended for use by extending classes only.
  protected async basePageClick(selector: string | Locator) {
    await this.toLocator(selector).click();
  }

  protected async basePageFill(selector: string | Locator, value: string) {
    await this.toLocator(selector).fill(value);
  }

  protected async basePageExpectVisible(selector: string | Locator) {
    await expect(this.toLocator(selector)).toBeVisible();
  }

  /* ========== Utility ========== */
  // This method is used to convert a string selector into a Locator.
  protected toLocator(selector: string | Locator): Locator {
    return typeof selector === 'string'
      ? this.page.locator(selector)   // if string selector received → create a Locator
      : selector;                     // else already a Locator → return unchanged
  }

}