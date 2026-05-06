import {Page, Locator, expect} from '@playwright/test';

export class CalculatorPage {
  readonly page: Page;
  readonly display: Locator;

  constructor(page: Page) {
    this.page = page;
    this.display = page.locator('#display');
  }

  async goto() {
    await this.page.goto('');
    await expect(this.display).toBeVisible();
  }

  async press(label: string): Promise<void> {
    await this.page.getByRole('button', {name: label, exact: true}).click();
  }

  async clear(): Promise<void> {
    await this.press('C');
  }

  async equals(): Promise<void> {
    await this.press('=');
  }

  async sin(): Promise<void> {
    await this.press('sin');
  }

  async cos(): Promise<void> {
    await this.press('cos');
  }

  async tan(): Promise<void> {
    await this.press('tan');
  }

  async sqrt(): Promise<void> {
    await this.press('√');
  }

  async log(): Promise<void> {
    await this.press('log');
  }

  async pressValues(seq: string): Promise<void> {
    for (const ch of seq) {
      switch (ch) {
        case '*':
            await this.press('×');
            break;
        case '/':
            await this.press('÷');
            break;
        case '-':
            await this.press('−');
            break;
        case ' ':
            break;
        default:
            await this.press(ch);
      }
    }
  }

  async readDisplay(): Promise<string> {
    return (await this.display.inputValue()) ?? '';
  }

  async expectDisplay(expected: any): Promise<void> {
    await expect(this.display).toHaveValue(String(expected));
  }
}

