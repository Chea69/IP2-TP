import { test, expect } from '@playwright/test';

test('login with valid credentials', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page).toHaveURL(/inventory.html/);
  await expect(page.getByText('Products')).toBeVisible();
});

test('login fails with wrong password', async ({ page }) => {
  test.setTimeout(60000);

  await page.goto('https://www.saucedemo.com/', {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('wrong_password');
  await page.getByRole('button', { name: /login/i }).click();

  await expect(page.locator('[data-test="error"]'))
    .toContainText('Username and password do not match');
});