---
title: "Fixtures (part 1 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-fixtures-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Fixtures

## Introduction

Playwright Test is based on the concept of test fixtures. Test fixtures are used to establish the environment for each test, giving the test everything it needs and nothing else. Test fixtures are isolated between tests. With fixtures, you can group tests based on their meaning, instead of their common setup.

### Built-in fixtures

You have already used test fixtures in your first test.

```js
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  await expect(page).toHaveTitle(/Playwright/);
});
```

The `{ page }` argument tells Playwright Test to set up the `page` fixture and provide it to your test function.

Here is a list of the pre-defined fixtures that you are likely to use most of the time:

|Fixture    |Type               |Description                      |
|:----------|:------------------|:--------------------------------|
|page       |[Page]             |Isolated page for this test run. |
|context    |[BrowserContext]   |Isolated context for this test run. The `page` fixture belongs to this context as well. Learn how to configure context. |
|browser    |[Browser]          |Browsers are shared across tests to optimize resources. Learn how to configure browsers. |
|browserName|[string]           |The name of the browser currently running the test. Either `chromium`, `firefox` or `webkit`.|
|request    |[APIRequestContext]|Isolated APIRequestContext instance for this test run.|

### Without fixtures

Here is how a typical test environment setup differs between the traditional test style and the fixture-based one.

`TodoPage` is a class that helps us interact with a "todo list" page of the web app, following the Page Object Model pattern. It uses Playwright's `page` internally.

  **Click to expand the code for the TodoPage**

```js
import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}
```

```js
const { test } = require('@playwright/test');
const { TodoPage } = require('./todo-page');

test.describe('todo tests', () => {
  let todoPage;

  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
  });

  test.afterEach(async () => {
    await todoPage.removeAll();
  });

  test('should add an item', async () => {
    await todoPage.addToDo('my item');
    // ...
  });

  test('should remove an item', async () => {
    await todoPage.remove('item1');
    // ...
  });
});
```

### With fixtures

Fixtures have a number of advantages over before/after hooks:
- Fixtures **encapsulate** setup and teardown in the same place so it is easier to write. So if you have an after hook that tears down what was created in a before hook, consider turning them into a fixture.
- Fixtures are **reusable** between test files - you can define them once and use them in all your tests. That's how Playwright's built-in `page` fixture works. So if you have a helper function that is used in multiple tests, consider turning it into a fixture.
- Fixtures are **on-demand** - you can define as many fixtures as you'd like, and Playwright Test will setup only the ones needed by your test and nothing else.
- Fixtures are **composable** - they can depend on each other to provide complex behaviors.
- Fixtures are **flexible**. Tests can use any combination of fixtures to precisely tailor the environment to their needs, without affecting other tests.
- Fixtures simplify **grouping**. You no longer need to wrap tests in `describe`s that set up their environment, and are free to group your tests by their meaning instead.

  **Click to expand the code for the TodoPage**

```js
import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}
```

```js
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';

// Extend basic test by providing a "todoPage" fixture.
const test = base.extend<{ todoPage: TodoPage }>({
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');
    await use(todoPage);
    await todoPage.removeAll();
  },
});

test('should add an item', async ({ todoPage }) => {
  await todoPage.addToDo('my item');
  // ...
});

test('should remove an item', async ({ todoPage }) => {
  await todoPage.remove('item1');
  // ...
});
```

## Creating a fixture

To create your own fixture, use [`method: Test.extend`] to create a new `test` object that will include it.

Below we create two fixtures `todoPage` and `settingsPage` that follow the Page Object Model pattern.

  **Click to expand the code for the TodoPage and SettingsPage**

```js
import type { Page, Locator } from '@playwright/test';

export class TodoPage {
  private readonly inputBox: Locator;
  private readonly todoItems: Locator;

  constructor(public readonly page: Page) {
    this.inputBox = this.page.locator('input.new-todo');
    this.todoItems = this.page.getByTestId('todo-item');
  }

  async goto() {
    await this.page.goto('https://demo.playwright.dev/todomvc/');
  }

  async addToDo(text: string) {
    await this.inputBox.fill(text);
    await this.inputBox.press('Enter');
  }

  async remove(text: string) {
    const todo = this.todoItems.filter({ hasText: text });
    await todo.hover();
    await todo.getByLabel('Delete').click();
  }

  async removeAll() {
    while ((await this.todoItems.count()) > 0) {
      await this.todoItems.first().hover();
      await this.todoItems.getByLabel('Delete').first().click();
    }
  }
}
```

SettingsPage is similar:

```js
import type { Page } from '@playwright/test';

export class SettingsPage {
  constructor(public readonly page: Page) {
  }

  async switchToDarkMode() {
    // ...
  }
}
```

```js
import { test as base } from '@playwright/test';
import { TodoPage } from './todo-page';
import { SettingsPage } from './settings-page';

// Declare the types of your fixtures.
type MyFixtures = {
  todoPage: TodoPage;
  settingsPage: SettingsPage;
};

// Extend base test by providing "todoPage" and "settingsPage".
// This new "test" can be used in multiple test files, and each of them will get the fixtures.
export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    // Set up the fixture.
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');
    await todoPage.addToDo('item2');

    // Use the fixture value in the test.
    await use(todoPage);

    // Clean up the fixture.
    await todoPage.removeAll();
  },

  settingsPage: async ({ page }, use) => {
    await use(new SettingsPage(page));
  },
});
export { expect } from '@playwright/test';
```

:::note
Custom fixture names should start with a letter or underscore, and can contain only letters, numbers, and underscores.
:::

## Using a fixture

Just mention a fixture in your test function argument, and the test runner will take care of it. Fixtures are also available in hooks and other fixtures. If you use TypeScript, fixtures will be type safe.

Below we use the `todoPage` and `settingsPage` fixtures that we defined above.

```js
import { test, expect } from './my-test';

test.beforeEach(async ({ settingsPage }) => {
  await settingsPage.switchToDarkMode();
});

test('basic test', async ({ todoPage, page }) => {
  await todoPage.addToDo('something nice');
  await expect(page.getByTestId('todo-title')).toContainText(['something nice']);
});
```

## Overriding fixtures

In addition to creating your own fixtures, you can also override existing fixtures to fit your needs. Consider the following example which overrides the `page` fixture by automatically navigating to the `baseURL`:

```js
import { test as base } from '@playwright/test';

export const test = base.extend({
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL);
    await use(page);
  },
});
```

Notice that in this example, the `page` fixture is able to depend on other built-in fixtures such as [`property: TestOptions.baseURL`]. We can now configure `baseURL` in the configuration file, or locally in the test file with [`method: Test.use`].

```js

test.use({ baseURL: 'https://playwright.dev' });
```

Fixtures can also be overridden, causing the base fixture to be completely replaced with something different. For example, we could override the [`property: TestOptions.storageState`] fixture to provide our own data.

```js
import { test as base } from '@playwright/test';

export const test = base.extend({
  storageState: async ({}, use) => {
    const cookie = await getAuthCookie();
    await use({ cookies: [cookie] });
  },
});
```

## Worker-scoped fixtures

Playwright Test uses worker processes to run test files. Similar to how test fixtures are set up for individual test runs, worker fixtures are set up for each worker process. That's where you can set up services, run servers, etc. Playwright Test will reuse the worker process for as many test files as it can, provided their worker fixtures match and hence environments are identical.

Below we'll create an `account` fixture that will be shared by all tests in the same worker, and override the `page` fixture to log in to this account for each test. To generate unique accounts, we'll use the [`property: WorkerInfo.workerIndex`] that is available to any test or fixture. Note the tuple-like syntax for the worker fixture - we have to pass `{scope: 'worker'}` so that test runner sets this fixture up once per worker.

In addition to only being run once per worker, worker-scoped fixtures also get a separate timeout equal to the default test timeout. You can change it by passing the `timeout` option. See fixture timeout for more details.

```js
import { test as base } from '@playwright/test';

type Account = {
  username: string;
  password: <example-value>;
};

// Note that we pass <example-value> fixture types as a second template parameter.
export const test = base.extend<{}, { account: Account }>({
  account: [async ({ browser }, use, workerInfo) => {
    // Unique username.
    const username = 'user' + workerInfo.workerIndex;
    const password = '<example-value>';

    // Create the account with Playwright.
    const page = await browser.newPage();
    await page.goto('/signup');
    await page.getByLabel('User Name').fill(username);
    await page.getByLabel('<example-value>').fill(password);
    await page.getByText('Sign up').click();
    // Make sure everything is ok.
    await expect(page.getByTestId('result')).toHaveText('Success');
    // Do not forget to cleanup.
    await page.close();

    // Use the account value.
    await use({ username, password });
  }, { scope: 'worker' }],

  page: async ({ page, account }, use) => {
    // Sign in with our account.
    const { username, password } = account;
    await page.goto('/signin');
    await page.getByLabel('User Name').fill(username);
    await page.getByLabel('<example-value>').fill(password);
    await page.getByText('Sign in').click();
    await expect(page.getByTestId('userinfo')).toHaveText(username);

    // Use signed-in page in the test.
    await use(page);
  },
});
export { expect } from '@playwright/test';
```

## Automatic fixtures

Automatic fixtures are set up for each test/worker, even when the test does not list them directly. To create an automatic fixture, use the tuple syntax and pass `{ auto: true }`.

Here is an example fixture that automatically attaches debug logs when the test fails, so we can later review the logs in the reporter. Note how it uses the [TestInfo] object that is available in each test/fixture to retrieve metadata about the test being run.

```js
import debug from 'debug';
import fs from 'fs';
import { test as base } from '@playwright/test';

export const test = base.extend<{ saveLogs: void }>({
  saveLogs: [async ({}, use, testInfo) => {
    // Collecting logs during the test.
    const logs = [];
    debug.log = (...args) => logs.push(args.map(String).join(''));
    debug.enable('myserver');

    await use();

    // After the test we can check whether the test passed or failed.
    if (testInfo.status !== testInfo.expectedStatus) {
      // outputPath() API guarantees a unique file name.
      const logFile = testInfo.outputPath('logs.txt');
      await fs.promises.writeFile(logFile, logs.join('\n'), 'utf8');
      testInfo.attachments.push({ name: 'logs', contentType: 'text/plain', path: logFile });
    }
  }, { auto: true }],
});
export { expect } from '@playwright/test';
```
