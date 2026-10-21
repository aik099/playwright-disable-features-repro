import { test, expect } from '@playwright/test';

// Playwright disables ThirdPartyStoragePartitioning (#32230), so an iframe of
// b.test inside a.test shares localStorage with b.test opened as a top-level page.
test('cross-site iframe shares storage with its first-party site', async ({ page }) => {
  await page.route('https://a.test/', route => route.fulfill({ contentType: 'text/html', body: '<iframe src="https://b.test/"></iframe>' }));
  await page.route('https://b.test/', route => route.fulfill({ contentType: 'text/html', body: '<p>b</p>' }));

  await page.goto('https://b.test/');
  await page.evaluate(() => localStorage.setItem('k', 'first-party value'));

  await page.goto('https://a.test/');
  const frame = page.frame({ url: 'https://b.test/' })!;
  expect(await frame.evaluate(() => localStorage.getItem('k'))).toBe('first-party value');
});
