import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
}

// Challenge 1
test('locked out user shows error message', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('locked_out_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('locked out');
});

// Challenge 2
test('sort products price low to high', async ({ page }) => {
  await login(page);

  await page.locator('[data-test="product-sort-container"]').selectOption('lohi');

  const prices = await page.locator('.inventory_item_price').allTextContents();
  const numbers = prices.map(price => Number(price.replace('$', '')));

  for (let i = 0; i < numbers.length - 1; i++) {
    expect(numbers[i]).toBeLessThanOrEqual(numbers[i + 1]);
  }
});

// Challenge 3
test('logout returns user to login page', async ({ page }) => {
  await login(page);

  await page.locator('#react-burger-menu-btn').click();
  await expect(page.locator('#logout_sidebar_link')).toBeVisible();
  await page.locator('#logout_sidebar_link').click();

  await expect(page).toHaveURL('https://www.saucedemo.com/');
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});