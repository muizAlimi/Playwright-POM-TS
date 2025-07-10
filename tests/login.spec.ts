import { test, expect } from '../fixtures/pom.fixture';

// We are using the Playwright fixture to access the page object manager (PomManager)
// This allows us to write cleaner and more maintainable tests by encapsulating page interactions within page objects.
// There is no need for beforeEach for pm. Instead, we directly use the `pm` fixture in each test to access the necessary page objects.
// The `validUser` fixture provides a valid user object for authentication tests.
test.describe('Login flow', () => {
  test('logs in with valid user', async ({ pm, validUser }) => {
    await pm.loginPage.openLoginPage();
    await pm.loginPage.userLogin(validUser.username, validUser.password);
    await pm.securePage.assertSuccess();
  });

  test('shows error on invalid user', async ({ pm }) => {
    await pm.loginPage.openLoginPage();
    await pm.loginPage.userLogin('badUser', 'wrongPass');
    await pm.loginPage.assertFailedUsername();

    // Using the expect assertion directly from the fixture.
    // This is a quick way to check visibility of an element without needing to create a dedicated getter in specific page object.
    // We added a `locator` method in BasePage to allow quick access to elements.
    await expect(pm.loginPage.locator('#flash')).toBeVisible();
  });
});
