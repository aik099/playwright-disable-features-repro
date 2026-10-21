# `--disable-features` in `args` replaces Playwright's own list

```bash
npm install
npx playwright install chromium
npx playwright test
```

The test passes in the `default` project and fails in `with --disable-features=WebOTP`: passing an unrelated feature re-enables `ThirdPartyStoragePartitioning`, which Playwright disables by default.
