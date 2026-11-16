import { Page, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export type SortOption = 'az' | 'za' | 'lohi' | 'hilo';

export class InventoryPage extends BasePage {
  readonly path = '/inventory.html';
  readonly title: Locator;
  readonly items: Locator;
  readonly sortDropdown: Locator;

  constructor(page: Page) {
    super(page);
    this.title = page.locator('.title');
    this.items = page.locator('.inventory_item');
    this.sortDropdown = page.getByTestId('product-sort-container');
  }

  private item(name: string): Locator {
    return this.items.filter({ hasText: name });
  }

  async addToCart(...names: string[]): Promise<void> {
    for (const name of names) {
      await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
    }
  }

  async removeFromCart(name: string): Promise<void> {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: SortOption): Promise<void> {
    await this.sortDropdown.selectOption(option);
  }

  async prices(): Promise<number[]> {
    const texts = await this.page.locator('.inventory_item_price').allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async names(): Promise<string[]> {
    return this.page.locator('.inventory_item_name').allTextContents();
  }
}
