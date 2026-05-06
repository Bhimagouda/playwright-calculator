import {test, expect} from '@playwright/test';
import {CalculatorPage} from '../pages/CalculatorPage';

test('check calculator title', async ({page}) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.goto();
    await expect(page).toHaveTitle('Scientific Calculator');
})

