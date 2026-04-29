import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,  // tu jak bede chcial zmienic zeby bylo rownolegle

  // workers: 1,
 // workers: process.env.CI ? 1 : undefined,

  reporter: 'html',

  use: {
    baseURL: 'https://restful-booker.herokuapp.com',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'api',
      testMatch: /.*api.*\.spec\.ts/,
      use: {
        extraHTTPHeaders: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    },

    {
      name: 'chromium',
      testIgnore: /.*api.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
      },
    },

    {
      name: 'firefox',
      testIgnore: /.*api.*\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },

    {
      name: 'webkit',
      testIgnore: /.*api.*\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});