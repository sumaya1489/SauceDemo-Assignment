import { test, expect } from '@playwright/test';
import LoginPage from '../pages/LoginPage.js';
import ProductsPage from '../pages/ProductsPage.js';
import ShoppingCartPage from '../pages/ShoppingCartPage.js';
import CheckoutPage from '../pages/CheckoutPage.js';

test.describe('SauceDemo Test', () => {

  //Login Tests
  test('Successful login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await page.pause();
  });

  test('Invalid login - wrong password', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('standard_user', 'wrong_password');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await page.pause();
  });

  test('Empty login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('', '');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await page.pause();
  });

  test('SQL injection login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login("' OR 1=1 --", 'random');
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    await page.pause();
  });

  test('Locked user login', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await page.goto('/');
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(page.locator('[data-test="error"]')).toContainText('locked');
    await page.pause();
  });

  //Complete Flow
  test('Complete purchase flow test', async ({ page }) => {

    const loginPage = new LoginPage(page);
    const productsPage = new ProductsPage(page);
    const shoppingCartPage = new ShoppingCartPage(page);
    const checkoutPage = new CheckoutPage(page);

    //Login
    await page.goto('/');
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory/);
    await page.pause();

    
    //SORTING SECTION


    // Name A → Z
    await productsPage.sortProducts('Name (A to Z)');
    let names = await productsPage.getAllProductNames();
    let sortedNames = [...names].sort();
    expect(names).toEqual(sortedNames);
    await page.pause();

    // Name Z → A
    await productsPage.sortProducts('Name (Z to A)');
    names = await productsPage.getAllProductNames();
    sortedNames = [...names].sort().reverse();
    expect(names).toEqual(sortedNames);
    await page.pause();

    // Price Low → High
    await productsPage.sortProducts('Price (low to high)');
    let prices = await productsPage.getAllProductPrices();
    let sortedPrices = [...prices].sort((a, b) => a - b);
    expect(prices).toEqual(sortedPrices);
    await page.pause();

    // Price High → Low
    await productsPage.sortProducts('Price (high to low)');
    prices = await productsPage.getAllProductPrices();
    sortedPrices = [...prices].sort((a, b) => b - a);
    expect(prices).toEqual(sortedPrices);
    await page.pause();


    //CART + CHECKOUT


    // Add product
    await productsPage.addProductToCart('sauce-labs-backpack');
    expect(await shoppingCartPage.isProductInCart('Sauce Labs Backpack')).toBeTruthy();
    await page.pause();

    // Go to cart
    await productsPage.goToShoppingCart();
    await page.pause();

    // Verify product
    await page.goto('/inventory.html');
    const productToVerify = 'Sauce Labs Backpack';
    await productsPage.verifyProductOnPage(productToVerify);
    expect(await productsPage.isProductDisplayed(productToVerify)).toBeTruthy();
    await page.pause();

    // Checkout
    await productsPage.goToShoppingCart();
    await shoppingCartPage.checkout();
    await checkoutPage.fillCheckoutInformation('Sumaya', 'Yeacin', '123456');
    await page.pause();

    // Verify order
    await checkoutPage.verifyOrderSummary('Sauce Labs Backpack');
    await page.pause();

    // Complete purchase
    await checkoutPage.completePurchase();
    await page.pause();

    // Final validation
    expect(await checkoutPage.isPurchaseSuccessful()).toBeTruthy();
    await page.pause();
  });

});