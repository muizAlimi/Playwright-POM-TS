// pages/SecurePage.ts
// PAGE OBJECT: SecurePage  (/secure) – INLINE LOCATORS

import { BasePage } from './BasePage';
import { expect }   from '@playwright/test';

export class SecurePage extends BasePage {
  /** Assert the logged-in banner is visible & contains text. */
  async assertMessage(expected: string) {
    const banner = this.page.locator('#flash');
    await this.basePageExpectVisible(banner);
    await expect(banner).toContainText(expected);
  }

  async getBannerText(): Promise<string> {
    // This is a low-level helper that returns the text of the success banner.
        return await this.page.locator('.flash.success').innerText();
    }

  /** Click Logout link and wait for redirect. */
  async logout() {
    // link text is 'Logout' on the demo site
    await this.page.getByRole('link', { name: 'Logout' }).click();
    await this.page.waitForURL('/login');
  }
}
