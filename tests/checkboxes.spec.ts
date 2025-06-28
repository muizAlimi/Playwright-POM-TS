import { test } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

/*
  Demonstrates the centralised-locators style page object
  (CheckboxesPage) plus the lazy factory.
*/

test.describe('Checkbox demo page', () => {
  let mp: ManagePage;

  test.beforeEach(({ page }) => {
    mp = new ManagePage(page);
  });

  test('Check first box, uncheck second box', async () => {
    await mp.checkboxesPage.open();        // /checkboxes

    // tick first / untick second using explicit helpers
    await mp.checkboxesPage.checkFirst();
    await mp.checkboxesPage.uncheckSecond();

    // final verification of state
    await mp.checkboxesPage.assertState(true, false);
  });
});
