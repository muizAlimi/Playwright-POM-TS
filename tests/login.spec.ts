import { test, expect } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Login flow', () => {
    let mp: ManagePage;

    // Before each test, create a new ManagePage (and thus new page objects)
    test.beforeEach(({ page }) => {
        mp = new ManagePage(page);
    });

    test('should login with valid credentials', async () => {
        await mp.loginPage.openLoginPage();
        // Enter valid credentials and submit
        await mp.loginPage.userLogin('tomsmith', 'SuperSecretPassword!');
        // Assert successful login on secure page
        await mp.securePage.assertSuccess();
    });

    test('should show error for invalid credentials', async () => {
        await mp.loginPage.openLoginPage();
        // Enter invalid credentials and submit
        await mp.loginPage.userLogin('badUser', 'badPass');
        // Assert error message is shown
        await mp.loginPage.assertFailedUsername();
    });
});
