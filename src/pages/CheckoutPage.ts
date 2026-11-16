import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';
import { Customer } from '../data/checkout';

export class CheckoutPage extends BasePage {
  readonly path = '/checkout-step-one.html';
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly postalCode: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly itemPrices: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly completeHeader: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    super(page);
    this.firstName = page.getByTestId('firstName');
    this.lastName = page.getByTestId('lastName');
    this.postalCode = page.getByTestId('postalCode');
    this.continueButton = page.getByTestId('continue');
    this.finishButton = page.getByTestId('finish');
    this.itemPrices = page.locator('.cart_item .inventory_item_price');
    this.subtotal = page.locator('.summary_subtotal_label');
    this.tax = page.locator('.summary_tax_label');
    this.total = page.locator('.summary_total_label');
    this.completeHeader = page.locator('.complete-header');
    this.error = page.getByTestId('error');
  }

  async fillCustomer(customer: Customer): Promise<void> {
    await this.firstName.fill(customer.firstName);
    await this.lastName.fill(customer.lastName);
    await this.postalCode.fill(customer.postalCode);
    await this.continueButton.click();
  }

  private static money(text: string | null): number {
    const match = text?.match(/\$([\d.]+)/);
    if (!match) throw new Error(`No amount found in "${text}"`);
    return Number(match[1]);
  }

  async summary(): Promise<{ items: number[]; subtotal: number; tax: number; total: number }> {
    const items = (await this.itemPrices.allTextContents()).map((t) => CheckoutPage.money(t));
    return {
      items,
      subtotal: CheckoutPage.money(await this.subtotal.textContent()),
      tax: CheckoutPage.money(await this.tax.textContent()),
      total: CheckoutPage.money(await this.total.textContent()),
    };
  }

  async finish(): Promise<void> {
    await this.finishButton.click();
  }
}
