// ─────────────────────────────────────────────────────────────
// PAGE OBJECT:  LoginPage  ( /login )
// STYLE 2 — INLINE LOCATORS
// -------------------------------------------------------------
// WHY CHOOSE THIS STYLE?
// • The page touches only a handful of elements.
// • You want minimum boilerplate: no constructor, no fields.
//
// TRADE-OFFS
// • If the selector '#username' is reused in 5 methods you'll repeat it 5 times (harder to refactor later).
// • Slightly slower if you reference the same selector many times, because Playwright re-parses it each call.
//
// Rule of thumb:  < 6 reusable elements  → inline is fine.
// ─────────────────────────────────────────────────────────────

import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class LoginPage extends BasePage {
    /* public business actions */
    async open() {
        await this.goToUrl('/login');
    }

    async login(user: string, pass: string) {
        // If you want to use inline locators, you can store them in a variable:
        const userField = this.page.locator('#username');
        // This is fill from Playwright's Locator API:
        await userField.fill(user);

        // You can also use the helper `fill` from BasePage:
        await this.basePageFill('#password', pass);

        // You can use inline locators directly:
        await this.page.locator('button[type=submit]').click();
        // Or use the helper `click` from BasePage:
        // await this.basePageClick('button[type=submit]');
    }

    async assertSuccess() {
        const banner = this.page.locator('#flash');
        await this.basePageExpectVisible(banner);                 // helper from BasePage
        await expect(banner).toContainText('You logged into a secure area!');
    }

    async assertError(expectedMessage: string) {
        await expect(this.page.locator('#flash')).toContainText(expectedMessage);
    }
}
