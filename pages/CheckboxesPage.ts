// ─────────────────────────────────────────────────────────────
// PAGE OBJECT:  CheckboxesPage  ( /checkboxes )
// STYLE 1 — CENTRALISED LOCATORS
// -------------------------------------------------------------
// WHY CHOOSE THIS STYLE?
// • The page has MULTIPLE elements reused across many actions.
// • Slightly faster: Playwright creates each Locator only once.
//
// TRADE-OFFS
// • More boilerplate (field declarations + constructor).
//
// Rule of thumb:  ≥ 6 reusable elements  → centralise them.
// ─────────────────────────────────────────────────────────────

import { BasePage } from './BasePage';
import type { Locator } from '@playwright/test';
import { expect } from '@playwright/test';

export class CheckboxesPage extends BasePage {
    // initialise reusable locators for checkboxes
    // (these are used in multiple methods)
    protected readonly firstBox: Locator;
    protected readonly secondBox: Locator;

    constructor(page) {
        super(page); // call BasePage constructor                                           
        // define locators for checkboxes
        this.firstBox = page.locator('form#checkboxes input').nth(0);
        this.secondBox = page.locator('form#checkboxes input').nth(1);
    }

    /** Navigate to page and verify form is visible. */
    async open() {
        await this.goToUrl('/checkboxes');
        // inlince locator is used here to verify the form is visible
        const form = this.page.locator('form#checkboxes');
        await this.basePageExpectVisible(form);
    }

    async checkFirst() { 
        // playwright method `check` is used to check the checkbox
        await this.firstBox.check(); 
    }

    async uncheckSecond() { 
        // playwright method `uncheck` is used to uncheck the checkbox
        await this.secondBox.uncheck(); 
    }

    /** Validate expected checked / unchecked state. */
    async assertState(first: boolean, second: boolean) {
        await expect(this.firstBox).toBeChecked({ checked: first });
        await expect(this.secondBox).toBeChecked({ checked: second });
    }
}
