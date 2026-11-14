---
title: "Continuous Integration (part 1 of 3)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/ci.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Continuous Integration

## Introduction

Playwright tests can be executed in CI environments. We have created sample
configurations for common CI providers.

3 steps to get your tests running on CI:

1. **Ensure CI agent can run browsers**: Use our Docker image
   in Linux agents or install your dependencies using the CLI.
1. **Install Playwright**:
   ```bash
   # Install NPM packages
   npm ci

   # Install Playwright browsers and dependencies
   npx playwright install --with-deps
   ```
   ```bash
   pip install playwright
   playwright install --with-deps
   ```
   ```bash
   mvn exec:java -e -D exec.mainClass=com.microsoft.playwright.CLI -D exec.args="install --with-deps"
   ```
   ```bash
   dotnet build
   pwsh bin/Debug/netX/playwright.ps1 install --with-deps
   ```

1. **Run your tests**:
   ```bash
   npx playwright test
   ```
   ```bash
   pytest
   ```
   ```bash
   mvn test
   ```
   ```bash
   dotnet test
   ```

## Workers
* langs: js

We recommend setting workers to "1" in CI environments to prioritize stability and reproducibility. Running tests sequentially ensures each test gets the full system resources, avoiding potential conflicts. However, if you have a powerful self-hosted CI system, you may enable parallel tests. For wider parallelization, consider sharding - distributing tests across multiple CI jobs.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Opt out of parallel tests on CI.
  workers: process.env.CI ? 1 : undefined,
});
```

## Global timeout
* langs: js

Always set a global timeout in CI. By default a test run has no upper bound, so a suite that hangs, or that slowly grows past the job limit of your CI provider, is killed by the runner mid-run and does not produce the test report.

With [`property: TestConfig.globalTimeout`] set, Playwright stops the run itself.

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Fail the run after an hour, so that the reporters still produce a report.
  globalTimeout: 60 * 60 * 1000,
});
```

The examples below therefore do not set a job-level timeout such as `timeout-minutes` in GitHub Actions. If you do add one, keep it comfortably above `globalTimeout`, so that Playwright always stops first.
