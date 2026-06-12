import { test, expect, Page } from '@playwright/test';

async function login(page: Page) {
  await page.goto('https://www.saucedemo.com/');
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: /login/i }).click();
}

test('add product to cart', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: /add to cart/i }).first().click();

  await expect(page.locator('.shopping_cart_badge')).toHaveText('1');
});

test('view cart page', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart.html/);
  await expect(page.getByText('Your Cart')).toBeVisible();
});

test('remove item from cart', async ({ page }) => {
  await login(page);

  await page.getByRole('button', { name: /add to cart/i }).first().click();
  await page.locator('.shopping_cart_link').click();

  await page.getByRole('button', { name: /remove/i }).click();

  await expect(page.locator('.shopping_cart_badge')).toHaveCount(0);
});