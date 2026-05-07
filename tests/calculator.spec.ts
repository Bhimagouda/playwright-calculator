import {test, expect} from '@playwright/test';
import {CalculatorPage} from '../pages/CalculatorPage';

test('check calculator title', async ({page}) => {
    const calculatorPage = new CalculatorPage(page);
    await calculatorPage.goto();
    await expect(page).toHaveTitle('Scientific Calculator');
})

test.describe('check addition operations', () => {
    const cases: Array<[string, number]> = [
        ['0+0', 0],
        ['1+1', 2],
        ['12+32', 44],
        ['9+1', 10],
        ['100+250', 350]
    ];

    for (const [expression, expected] of cases) {
        test(`${expression} = ${expected}`, async ({page}) => {
            const calculatorPage = new CalculatorPage(page);
            await calculatorPage.goto();
            await calculatorPage.pressValues(expression);
            await calculatorPage.equals();
            await calculatorPage.expectDisplay(expected);
        })
    }
})

test.describe('check subtraction operations', () => {
    const cases: Array<[string, number]> = [
        ['0-0', 0],
        ['1-1', 0],
        ['32-12', 20],
        ['100-250', -150]
    ];

    for (const [expression, expected] of cases) {
        test(`${expression} = ${expected}`, async ({page}) => {
            const calculatorPage = new CalculatorPage(page);
            await calculatorPage.goto();
            await calculatorPage.pressValues(expression);
            await calculatorPage.equals();
            await calculatorPage.expectDisplay(expected);
        })
    }
})

test.describe('check multiplication operations', () => {
    const cases: Array<[string, number]> = [
        ['0*0', 0],
        ['1*1', 1],
        ['12*32', 384],
        ['9*1', 9],
        ['100*250', 25000]
    ];

    for (const [expression, expected] of cases) {
        test(`${expression} = ${expected}`, async ({page}) => {
            const calculatorPage = new CalculatorPage(page);
            await calculatorPage.goto();
            await calculatorPage.pressValues(expression);
            await calculatorPage.equals();
            await calculatorPage.expectDisplay(expected);
        })
    }
})

test.describe('check division operations', () => {
    const cases: Array<[string, number]> = [
        ['0/1', 0],
        ['1/1', 1],
        ['32/12', 2.6666666666666665],
        ['100/250', 0.4]
    ];

    for (const [expression, expected] of cases) {
        test(`${expression} = ${expected}`, async ({page}) => {
            const calculatorPage = new CalculatorPage(page);
            await calculatorPage.goto();
            await calculatorPage.pressValues(expression);
            await calculatorPage.equals();
            await calculatorPage.expectDisplay(expected);
        })
    }
})

test.describe('check inputs are displayed correctly', () => {
    for (const digit of ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']) {
        test(`digit "${digit}" appears on the display`, async ({ page }) => {
            const calc = new CalculatorPage(page);
            await calc.goto();
            await calc.press(digit);
            await calc.expectDisplay(digit);
        });
    }
})

test.describe('check square root operations', () => {
    const cases: Array<[string, number]> = [
        ['0', 0],
        ['1', 1],
        ['4', 2],
        ['9', 3],
        ['16', 4],
    ];

    for (const [input, expected] of cases) {
        test(`${input} = ${expected}`, async ({ page }) => {
            const calc = new CalculatorPage(page);
            await calc.goto();
            await calc.pressValues(input);
            await calc.sqrt();
            await calc.expectDisplay(expected);
        });
    }
});

test('sin(0) = 0', async ({ page }) => {
    const calc = new CalculatorPage(page);
    await calc.goto();
    await calc.pressValues('0');
    await calc.sin();
    await calc.expectDisplay(0);
});

test('cos(0) = 1', async ({ page }) => {
    const calc = new CalculatorPage(page);
    await calc.goto();
    await calc.pressValues('0');
    await calc.cos();
    await calc.expectDisplay(1);
});

test('tan(0) = 0', async ({ page }) => {
    const calc = new CalculatorPage(page);
    await calc.goto();
    await calc.pressValues('0');
    await calc.tan();
    await calc.expectDisplay(0);
});

test('log(1) = 0', async ({ page }) => {
    const calc = new CalculatorPage(page);
    await calc.goto();
    await calc.pressValues('1');
    await calc.log();
    await calc.expectDisplay(0);
});
