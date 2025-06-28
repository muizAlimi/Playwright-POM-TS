// pages/BasePage.ts
// ------------------------------------------------------------
// BasePage (abstract)
// ------------------------------------------------------------
// • Stores one Playwright `Page` instance.
// • `page` is protected, so only subclasses (e.g., LoginPage)
//   can use it.  Test files cannot access it directly.
// • Low-level helpers (`click`, `fill`, …) are also protected,
//   forcing tests to rely on high-level page actions.
// ------------------------------------------------------------

import { Page, Locator, expect } from '@playwright/test';

export abstract class BasePage {
  /**
   * Browser tab reference.
   *   protected  → visible to subclasses, hidden from tests
   *   readonly   → cannot be reassigned after construction
   */
  constructor(protected readonly page: Page) {}

  /* ========== Core navigation (protected) ========== */
  /** Visit an app path such as '/login'. */
  protected async goToUrl(path: string) {
    await this.page.goto(path);
  }

  /* ========== Low-level helpers (protected) ========== */
  protected async basePageClick(sel: string | Locator) {
    await this.toLocator(sel).click();
  }

  protected async basePageFill(sel: string | Locator, value: string) {
    await this.toLocator(sel).fill(value);
  }

  protected async basePageExpectVisible(sel: string | Locator) {
    await expect(this.toLocator(sel)).toBeVisible();
  }

  /* ========== Utility ========== */
  /** Accepts a raw selector or Locator and always returns a Locator. */
  protected toLocator(sel: string | Locator): Locator {
    return typeof sel === 'string' ? this.page.locator(sel) : sel;
  }
}
