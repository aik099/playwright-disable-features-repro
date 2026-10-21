import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    { name: 'default', use: { ...devices['Desktop Chrome'] } },
    {
      name: 'with --disable-features=WebOTP',
      use: { ...devices['Desktop Chrome'], launchOptions: { args: ['--disable-features=WebOTP'] } },
    },
  ],
});
