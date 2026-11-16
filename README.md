# Playwright + TypeScript Test Automation Framework

A production-style test automation framework built with **Playwright Test** and **TypeScript**, covering UI and API testing against public demo apps ([SauceDemo](https://www.saucedemo.com) and [Restful Booker](https://restful-booker.herokuapp.com)).

## Highlights

- **Page Object Model** with a shared `BasePage`
- **Custom fixtures** — pages and an authenticated API client injected into tests; a `loggedIn` fixture skips repetitive login steps
- **API testing** with a typed `BookingClient` (auth, create, read, update, patch, delete)
- **Data-driven tests** from JSON / TypeScript test data
- **Multi-environment config** via `TEST_ENV=qa|staging|prod`
- **Tags** (`@smoke`, `@regression`) for selective runs
- **Cross-browser + mobile** projects (Chromium, Firefox, Pixel 7)
- **Reports**: HTML, JUnit XML, screenshots, videos and traces on failure
- **CI**: GitHub Actions matrix per project, type-check step, report artifacts

## Structure

```
playwright-ts-framework/
├── src/
│   ├── api/BookingClient.ts
│   ├── config/env.ts
│   ├── data/            # users.json, checkout.ts
│   ├── fixtures/test-fixtures.ts
│   └── pages/           # BasePage, LoginPage, InventoryPage, CartPage, CheckoutPage
├── tests/
│   ├── api/booking.spec.ts
│   └── ui/              # login, inventory, checkout specs
├── playwright.config.ts
└── .github/workflows/playwright.yml
```

## Getting started

```bash
npm install
npx playwright install
npm test                  # everything
npm run test:smoke        # @smoke only
npm run test:api          # API project only
TEST_ENV=staging npm test # pick environment
npm run lint              # TypeScript type check
npm run report
```

## Example

```ts
test('order completes', async ({ loggedIn, cartPage, checkoutPage }) => {
  await loggedIn.addToCart('Sauce Labs Backpack');
  await loggedIn.goToCart();
  await cartPage.checkout();
  await checkoutPage.fillCustomer({ firstName: 'Asha', lastName: 'Rao', postalCode: '605001' });
  await checkoutPage.finish();
  await expect(checkoutPage.completeHeader).toHaveText('Thank you for your order!');
});
```
