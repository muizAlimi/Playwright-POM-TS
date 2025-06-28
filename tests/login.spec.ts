import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

/*
  Covers:
  • happy-path login (valid creds)
  • negative login (invalid creds)
  • usage of both LoginPage (inline-locator style)and SecurePage (also inline style)
*/

test.describe('Login flow on the-internet.herokuapp.com', () => {
    let mp: ManagePage;

    test.beforeEach(({ page }) => {
        mp = new ManagePage(page);                 // inject one Playwright tab
    });

    test('Login with VALID credentials', async () => {
        await mp.loginPage.open();                 // /login
        await mp.loginPage.login('tomsmith', 'SuperSecretPassword!');
        await mp.loginPage.assertSuccess();        // green banner from LoginPage

        // extra cross-page assertion via SecurePage
        await mp.securePage.assertMessage('You logged into a secure area!');

        // optional: raw check via getter method
        const bannerText = await mp.securePage.getBannerText();
        expect(bannerText).toContain('You logged into a secure area!');
    });

    test('Login with INVALID credentials', async () => {
        await mp.loginPage.open();
        await mp.loginPage.login('badUser', 'badPass');
        await mp.loginPage.assertError('Your username is invalid!');
    });
});
