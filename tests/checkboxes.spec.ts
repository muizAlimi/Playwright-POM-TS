import { test } from '@playwright/test';
import ManagePage from '../pages/ManagePage';

test.describe('Checkboxes Page', () => {
  // Declare a variable to hold the ManagePage instance
  let mp: ManagePage;

  // Fresh instance of ManagePage ensures each test starts with a clean state
  test.beforeEach(({ page }) => {
    mp = new ManagePage(page);
  });

  test('Check the first box and uncheck the second', async () => {
    await mp.checkboxesPage.openCheckboxesPage();
    await mp.checkboxesPage.checkFirstCheckbox();
    await mp.checkboxesPage.uncheckSecondCheckbox();
    await mp.checkboxesPage.assertCheckboxesState(true, false);
  });

  test('Uncheck both checkboxes', async () => {
    await mp.checkboxesPage.openCheckboxesPage();
    await mp.checkboxesPage.uncheckFirstCheckbox();
    await mp.checkboxesPage.uncheckSecondCheckbox();
    await mp.checkboxesPage.assertCheckboxesState(false, false);
  });
});