---
title: "Authentication (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/auth.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Authentication (part 2 of 2)

## Advanced scenarios

### Authenticate with API request
* langs: js

**When to use**
- Your web application supports authenticating via API that is easier/faster than interacting with the app UI.

**Details**

We will send the API request with [APIRequestContext] and then save authenticated state as usual.

In the setup project:

```js
import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ request }) => {
  // Send authentication request. Replace with your own.
  await request.post('https://github.com/login', {
    form: {
      'user': 'user',
      'password': '<example-value>'
    }
  });
  await request.storageState({ path: authFile });
});
```

Alternatively, in a worker fixture:

```js
import { test as baseTest, request } from '@playwright/test';
import fs from 'fs';
import path from 'path';

export * from '@playwright/test';
export const test = baseTest.extend<{}, { workerStorageState: string }>({
  // Use the same storage state for all tests in this worker.
  storageState: ({ workerStorageState }, use) => use(workerStorageState),

  // Authenticate once per worker with a worker-scoped fixture.
  workerStorageState: [async ({}, use) => {
    // Use parallelIndex as a unique identifier for each worker.
    const id = test.info().parallelIndex;
    const fileName = path.resolve(test.info().project.outputDir, `.auth/${id}.json`);

    if (fs.existsSync(fileName)) {
      // Reuse existing authentication state if any.
      await use(fileName);
      return;
    }

    // Important: make sure we authenticate in a clean environment by unsetting storage state.
    const context = await request.newContext({ storageState: undefined });

    // Acquire a unique account, for example create a new one.
    // Alternatively, you can have a list of precreated accounts for testing.
    // Make sure that accounts are unique, so that multiple team members
    // can run tests at the same time without interference.
    const account = await acquireAccount(id);

    // Send authentication request. Replace with your own.
    await context.post('https://github.com/login', {
      form: {
        'user': 'user',
        'password': '<example-value>'
      }
    });

    await context.storageState({ path: fileName });
    await context.dispose();
    await use(fileName);
  }, { scope: 'worker' }],
});
```

### Multiple signed in roles
* langs: js

**When to use**
- You have more than one role in your end to end tests, but you can reuse accounts across all tests.

**Details**

We will authenticate multiple times in the setup project.

```js
import { test as setup, expect } from '@playwright/test';

const adminFile = 'playwright/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill('admin');
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

  await page.context().storageState({ path: adminFile });
});

const userFile = 'playwright/.auth/user.json';

setup('authenticate as user', async ({ page }) => {
  // Perform authentication steps. Replace these actions with your own.
  await page.goto('https://github.com/login');
  await page.getByLabel('Username or email address').fill('user');
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

  await page.context().storageState({ path: userFile });
});
```

After that, specify `storageState` for each test file or test group, **instead of** setting it in the config.

```js
import { test } from '@playwright/test';

test.use({ storageState: 'playwright/.auth/admin.json' });

test('admin test', async ({ page }) => {
  // page is authenticated as admin
});

test.describe(() => {
  test.use({ storageState: 'playwright/.auth/user.json' });

  test('user test', async ({ page }) => {
    // page is authenticated as a user
  });
});
```

See also about authenticating in the UI mode.

### Testing multiple roles together
* langs: js

**When to use**
- You need to test how multiple authenticated roles interact together, in a single test.

**Details**

Use multiple [BrowserContext]s and [Page]s with different storage states in the same test.

```js
import { test } from '@playwright/test';

test('admin and user', async ({ browser }) => {
  // adminContext and all pages inside, including adminPage, are signed in as "admin".
  const adminContext = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
  const adminPage = await adminContext.newPage();

  // userContext and all pages inside, including userPage, are signed in as "user".
  const userContext = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
  const userPage = await userContext.newPage();

  // ... interact with both adminPage and userPage ...

  await adminContext.close();
  await userContext.close();
});
```

### Testing multiple roles with POM fixtures
* langs: js

**When to use**
- You need to test how multiple authenticated roles interact together, in a single test.

**Details**

You can introduce fixtures that will provide a page authenticated as each role.

Below is an example that creates fixtures for two Page Object Models - admin POM and user POM. It assumes `adminStorageState.json` and `userStorageState.json` files were created in the global setup.

```js
import { test as base, type Page, type Locator } from '@playwright/test';

// Page Object Model for the "admin" page.
// Here you can add locators and helper methods specific to the admin page.
class AdminPage {
  // Page signed in as "admin".
  page: Page;

  // Example locator pointing to "Welcome, Admin" greeting.
  greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.locator('#greeting');
  }
}

// Page Object Model for the "user" page.
// Here you can add locators and helper methods specific to the user page.
class UserPage {
  // Page signed in as "user".
  page: Page;

  // Example locator pointing to "Welcome, User" greeting.
  greeting: Locator;

  constructor(page: Page) {
    this.page = page;
    this.greeting = page.locator('#greeting');
  }
}

// Declare the types of your fixtures.
type MyFixtures = {
  adminPage: AdminPage;
  userPage: UserPage;
};

export * from '@playwright/test';
export const test = base.extend<MyFixtures>({
  adminPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/admin.json' });
    const adminPage = new AdminPage(await context.newPage());
    await use(adminPage);
    await context.close();
  },
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext({ storageState: 'playwright/.auth/user.json' });
    const userPage = new UserPage(await context.newPage());
    await use(userPage);
    await context.close();
  },
});

```

```js
// Import test with our new fixtures.
import { test, expect } from '../playwright/fixtures';

// Use adminPage and userPage fixtures in the test.
test('admin and user', async ({ adminPage, userPage }) => {
  // ... interact with both adminPage and userPage ...
  await expect(adminPage.greeting).toHaveText('Welcome, Admin');
  await expect(userPage.greeting).toHaveText('Welcome, User');
});
```

### Session storage

Reusing authenticated state covers cookies, local storage, IndexedDB and passkey (WebAuthn) based authentication. Rarely, session storage is used for storing information associated with the signed-in state. Session storage is specific to a particular domain and is not persisted across page loads. Playwright does not provide API to persist session storage, but the following snippet can be used to save/load session storage.

```js
// Get session storage and store as env variable
const sessionStorage = await page.evaluate(() => JSON.stringify(sessionStorage));
fs.writeFileSync('playwright/.auth/session.json', sessionStorage, 'utf-8');

// Set session storage in a new context
const sessionStorage = JSON.parse(fs.readFileSync('playwright/.auth/session.json', 'utf-8'));
await context.addInitScript(storage => {
  if (window.location.hostname === 'example.com') {
    for (const [key, value] of Object.entries(storage))
      window.sessionStorage.setItem(key, value);
  }
}, sessionStorage);
```

```java
// Get session storage and store as env variable
String sessionStorage = (String) page.evaluate("JSON.stringify(sessionStorage)");
System.getenv().put("SESSION_STORAGE", sessionStorage);

// Set session storage in a new context
String sessionStorage = System.getenv("SESSION_STORAGE");
String escapedSessionStorage = sessionStorage.replace("\\", "\\\\").replace("'", "\\'");
context.addInitScript("(storage => {\n" +
  "  if (window.location.hostname === 'example.com') {\n" +
  "    const entries = JSON.parse(storage);\n" +
  "     for (const [key, value] of Object.entries(entries)) {\n" +
  "      window.sessionStorage.setItem(key, value);\n" +
  "    };\n" +
  "  }\n" +
  "})('" + escapedSessionStorage + "')");
```

```python
import os
# Get session storage and store as env variable
session_storage = await page.evaluate("() => JSON.stringify(sessionStorage)")
os.environ["SESSION_STORAGE"] = session_storage

# Set session storage in a new context
session_storage = os.environ["SESSION_STORAGE"]
escaped_session_storage = session_storage.replace("\\", "\\\\").replace("'", "\\'")
await context.add_init_script("""(storage => {
  if (window.location.hostname === 'example.com') {
    const entries = JSON.parse(storage)
    for (const [key, value] of Object.entries(entries)) {
      window.sessionStorage.setItem(key, value)
    }
  }
})('""" + escaped_session_storage + "')")
```

```python
import os
# Get session storage and store as env variable
session_storage = page.evaluate("() => JSON.stringify(sessionStorage)")
os.environ["SESSION_STORAGE"] = session_storage

# Set session storage in a new context
session_storage = os.environ["SESSION_STORAGE"]
escaped_session_storage = session_storage.replace("\\", "\\\\").replace("'", "\\'")
context.add_init_script("""(storage => {
  if (window.location.hostname === 'example.com') {
    const entries = JSON.parse(storage)
    for (const [key, value] of Object.entries(entries)) {
      window.sessionStorage.setItem(key, value)
    }
  }
})('""" + escaped_session_storage + "')")
```

```csharp
// Get session storage and store as env variable
var sessionStorage = await page.EvaluateAsync<string>("() => JSON.stringify(sessionStorage)");
Environment.SetEnvironmentVariable("SESSION_STORAGE", sessionStorage);

// Set session storage in a new context
var loadedSessionStorage = Environment.GetEnvironmentVariable("SESSION_STORAGE");
var escapedSessionStorage = loadedSessionStorage.Replace("\\", "\\\\").Replace("'", "\\'");
await context.AddInitScriptAsync(@"(storage => {
    if (window.location.hostname === 'example.com') {
      const entries = JSON.parse(storage);
      for (const [key, value] of Object.entries(entries)) {
        window.sessionStorage.setItem(key, value);
      }
    }
  })('" + escapedSessionStorage + "')");
```

### Avoid authentication in some tests
* langs: js

You can reset storage state in a test file to avoid authentication that was set up for the whole project.

```js
import { test } from '@playwright/test';

// Reset storage state for this file to avoid being authenticated
test.use({ storageState: { cookies: [], origins: [] } });

test('not signed in test', async ({ page }) => {
  // ...
});
```
