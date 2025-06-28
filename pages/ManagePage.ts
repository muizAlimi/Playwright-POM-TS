// pages/ManagePage.ts
// -------------------------------------------------------------
// This is a factory for page objects, which allows lazy loading
// of page objects.  It is a common pattern in Page Object Model
// (POM) to centralise page object creation.
// ─────────────────────────────────────────────────────────────
// In a large suite, a test might use only LoginPage.  With lazy
// getters we avoid building SecurePage / CheckboxesPage unless
// the test actually touches them.
// ─────────────────────────────────────────────────────────────
// Trade-off: lazy getters add a bit of boilerplate code
//  For smaller projects you could use *eager* construction instead, they will be instantiated
//  immediately when the ManagePage is created
//  this.loginPage = new LoginPage(page); 
//  this.securePage = new SecurePage(page);
//  this.checkboxesPage = new CheckboxesPage(page);
//
// Lazy getters are better for larger projects
// where you want to avoid unnecessary page object instantiation.
// ─────────────────────────────────────────────────────────────

import { Page } from '@playwright/test';
import { LoginPage } from './LoginPage';
import { SecurePage } from './SecurePage';
import { CheckboxesPage } from './CheckboxesPage';

export default class ManagePage {
    constructor(private readonly page: Page) { }

    // private caches (undefined until first access)
    private _login?: LoginPage;
    private _secure?: SecurePage;
    private _checkboxes?: CheckboxesPage;

    /** Lazy + cached instance of LoginPage */
    get loginPage(): LoginPage {
        if (!this._login) {
            this._login = new LoginPage(this.page);
        }
        return this._login;
    }

    /** Lazy + cached instance of SecurePage */
    get securePage(): SecurePage {
        if (!this._secure) {
            this._secure = new SecurePage(this.page);
        }
        return this._secure;
    }

    /** Lazy + cached instance of CheckboxesPage */
    get checkboxesPage(): CheckboxesPage {
        if (!this._checkboxes) {
            this._checkboxes = new CheckboxesPage(this.page);
        }
        return this._checkboxes;
    }
}
