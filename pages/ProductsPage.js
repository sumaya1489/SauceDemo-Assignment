export default class ProductsPage {
  constructor(page) {
    this.page = page;

    this.sortDropdown = '[data-test="product-sort-container"]';
    this.productNames = '.inventory_item_name';
    this.productPrices = '.inventory_item_price';
  }

  async sortProducts(optionText) {
    await this.page.selectOption(this.sortDropdown, { label: optionText });
  }

  async getAllProductNames() {
    const names = await this.page.locator(this.productNames).allTextContents();
    return names.map(name => name.trim());
  }

  async getAllProductPrices() {
    const pricesText = await this.page.locator(this.productPrices).allTextContents();

    return pricesText.map(price =>
      parseFloat(price.replace('$', '').trim())
    );
  }

  async addProductToCart(productId) {
    await this.page.click(`[data-test="add-to-cart-${productId}"]`);
  }

  async goToShoppingCart() {
    await this.page.click('.shopping_cart_link');
  }

  async verifyProductOnPage(productName) {
    await this.page.locator(this.productNames, { hasText: productName }).first().waitFor();
  }

  async isProductDisplayed(productName) {
    return await this.page.locator(this.productNames, { hasText: productName }).isVisible();
  }
}