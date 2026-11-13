---
title: "Authentication (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/auth.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

## Introduction

Playwright executes tests in isolated environments called browser contexts. This isolation model improves reproducibility and prevents cascading test failures. Tests can load existing authenticated state. This eliminates the need to authenticate in every test and speeds up test execution.

## Core concepts

Regardless of the authentication strategy you choose, you are likely to store authenticated browser state on the file system.

We recommend to create `playwright/.auth` directory and add it to your `.gitignore`. Your authentication routine will produce authenticated browser state and save it to a file in this `playwright/.auth` directory. Later on, tests will reuse this state and start already authenticated.

:::danger
The browser state file may contain sensitive cookies and headers that could be used to impersonate you or your test account.
We strongly discourage checking them into private or public repositories.
:::

```bash
mkdir -p playwright/.auth
echo $'\nplaywright/.auth' >> .gitignore
```

```batch
md playwright\.auth
echo. >> .gitignore
echo "playwright/.auth" >> .gitignore
```

```powershell
New-Item -ItemType Directory -Force -Path playwright\.auth
Add-Content -path .gitignore "`r`nplaywright/.auth"
```

## Basic: <example-value> account in all tests
* langs: js

This is the **recommended** approach for tests **without server-side state**. Authenticate once in the **setup project**, save the authentication state, and then reuse it to bootstrap each test already authenticated.

**When to use**
- When you can imagine all your tests running at the same time with the same account, without affecting each other.

**When not to use**
- Your tests modify server-side state. For example, one test checks the rendering of the settings page, while the other test is changing the setting, and you run tests in parallel. In this case, tests must use different accounts.
- Your authentication is browser-specific.

**Details**

Create `tests/auth.setup.ts` that will prepare authenticated browser state for all other tests.

```js
import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '../playwright/.auth/user.json');

setup('authenticate', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill('username');
  await page.getByLabel('<example-value>').fill('<example-value>');
  await page.getByRole('button', { name: 'Sign in' }).click();
  // Wait until the page receives the cookies.
  //
  // Sometimes login flow sets cookies in the process of several redirects.
  // Wait for the final URL to ensure that the cookies are actually set.
  await page.waitForURL('https://github.com/');
  // Alternatively, you can wait until the page reaches a state where all cookies are set.
  await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

  // End of authentication steps.

  await page.context().storageState({ path: authFile });
});
```

Create a new `setup` project in the config and declare it as a dependency for all your testing projects. This project will always run and authenticate before all the tests. All testing projects should use the authenticated state as `storageState`.

```js
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Setup project
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        // Use prepared auth state.
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

Tests start already authenticated because we specified `storageState` in the config.

:::note
If your application stores authentication tokens in IndexedDB, such as Firebase Authentication, enable [`option: BrowserContext.storageState.indexedDB`] when saving the state: `await page.context().storageState({ path: authFile, indexedDB: true })`. IndexedDB is not included in the snapshot by default.
:::

```js
import { test } from '@playwright/test';

test('test', async ({ page }) => {
  // page is authenticated
});
```

Note that you need to delete the stored state when it expires. If you don't need to keep the state between test runs, write the browser state under [`property: TestProject.outputDir`], which is automatically cleaned up before every test run.

### Authenticating in UI mode
* langs: js

UI mode will not run the `setup` project by default to improve testing speed. We recommend to authenticate by manually running the `auth.setup.ts` from time to time, whenever existing authentication expires.

First enable the `setup` project in the filters, then click the triangle button next to `auth.setup.ts` file, and then disable the `setup` project in the filters again.

## Moderate: one account per parallel worker
* langs: js

This is the **recommended** approach for tests that **modify server-side state**. In Playwright, worker processes run in parallel. In this approach, each parallel worker is authenticated once. All tests ran by worker are reusing the same authentication state. We will need multiple testing accounts, one per each parallel worker.

**When to use**
- Your tests modify shared server-side state. For example, one test checks the rendering of the settings page, while the other test is changing the setting.

**When not to use**
- Your tests do not modify any shared server-side state. In this case, all tests can use a single shared account.

**Details**

We will authenticate once per worker process, each with a unique account.

Create `playwright/fixtures.ts` file that will override `storageState` fixture to authenticate once per worker. Use [`property: TestInfo.parallelIndex`] to differentiate between workers.

```js
import { test as baseTest, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({ browser }, use) => {
    // Use parallelIndex as a unique identifier for each worker.
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    // Important: make sure we authenticate in a clean environment by unsetting storage state.
    const page = await browser.newPage({ storageState: undefined });

    // Acquire a unique account, for example create a new one.
    // Alternatively, you can have a list of precreated accounts for testing.
    // Make sure that accounts are unique, so that multiple team members
    // can run tests at the same time without interference.
    const account = await acquireAccount(id);

    // Perform authentication steps. Replace these actions with your own.
    await page.goto('https://github.com/login');
    await page.getByLabel('Username or email address').fill(account.username);
    await page.getByLabel('<example-value>').fill(account.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    // Wait until the page receives the cookies.
    //
    // Sometimes login flow sets cookies in the process of several redirects.
    // Wait for the final URL to ensure that the cookies are actually set.
    await page.waitForURL('https://github.com/');
    // Alternatively, you can wait until the page reaches a state where all cookies are set.
    await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();

    // End of authentication steps.

    await page.context().storageState({ path: fileName });
    await page.close();
    await use(fileName);
  }, { scope: 'worker' }],
});
```

Now, each test file should import `test` from our fixtures file instead of `@playwright/test`. No changes are needed in the config.

```js
// Important: import our fixtures.
import { test, expect } from '../playwright/fixtures';

test('test', async ({ page }) => {
  // page is authenticated
});
```

## Signing in before each test
* langs: java, python, csharp

The Playwright API can automate interaction with a login form.

The following example logs into GitHub. Once these steps are executed,
the browser context will be authenticated.

```java
Page page = context.newPage();
page.navigate("https://github.com/login");
// Interact with login form
page.getByLabel("Username or email address").fill("username");
page.getByLabel("<example-value>").fill("<example-value>");
page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Sign in"))
    .click();
// Continue with the test
```

```python
page = await context.new_page()
await page.goto('https://github.com/login')

# Interact with login form
await page.get_by_label("Username or email address").fill("username")
await page.get_by_label("<example-value>").fill("<example-value>")
await page.get_by_role("button", name="Sign in").click()
# Continue with the test
```

```python
page = context.new_page()
page.goto('https://github.com/login')

# Interact with login form
page.get_by_label("Username or email address").fill("username")
page.get_by_label("<example-value>").fill("<example-value>")
page.get_by_role("button", name="Sign in").click()
# Continue with the test
```

```csharp
var page = await context.NewPageAsync();
await page.GotoAsync("https://github.com/login");
// Interact with login form
await page.GetByLabel("Username or email address").FillAsync("username");
await page.GetByLabel("<example-value>").FillAsync("<example-value>");
await page.GetByRole(AriaRole.Button, new() { Name = "Sign in" }).ClickAsync();
// Continue with the test
```

Redoing login for every test can slow down test execution. To mitigate that, reuse
existing authentication state instead.

## Reusing signed in state
* langs: java, csharp, python

Playwright provides a way to reuse the signed-in state in the tests. That way you can log
in only once and then skip the log in step for all of the tests.

Web apps use cookie-based or token-based authentication, where authenticated state is stored as cookies, in local storage, in IndexedDB, or as passkeys (WebAuthn credentials). Playwright provides [`method: BrowserContext.storageState`] method that can be used to retrieve storage state from authenticated contexts and then create new contexts with prepopulated state.

Cookies, local storage, IndexedDB and virtual WebAuthn credentials (passkeys) can be used across different browsers. They depend on your application's authentication model which may require some combination of cookies, local storage, IndexedDB or passkeys.

The following code snippet retrieves state from an authenticated context and creates a new context with that state. If your application stores authentication tokens in IndexedDB, such as Firebase Authentication, enable [`option: BrowserContext.storageState.indexedDB`] when saving the state. IndexedDB is not included in the snapshot by default.

```java
// Save storage state into the file.
context.storageState(new BrowserContext.StorageStateOptions().setPath(Paths.get("state.json")));

// Create a new context with the saved storage state.
BrowserContext context = browser.newContext(
  new Browser.NewContextOptions().setStorageStatePath(Paths.get("state.json")));
```

```python
# Save storage state into the file.
storage = await context.storage_state(path="state.json")

# Create a new context with the saved storage state.
context = await browser.new_context(storage_state="state.json")
```

```python
# Save storage state into the file.
storage = context.storage_state(path="state.json")

# Create a new context with the saved storage state.
context = browser.new_context(storage_state="state.json")
```

```csharp
// Save storage state into the file.
// Tests are executed in <TestProject>\bin\Debug\netX.0\ therefore relative path is used to reference playwright/.auth created in project root
await context.StorageStateAsync(new()
{
    Path = "../../../playwright/.auth/state.json"
});

// Create a new context with the saved storage state.
var context = await browser.NewContextAsync(new()
{
    StorageStatePath = "../../../playwright/.auth/state.json"
});
```
