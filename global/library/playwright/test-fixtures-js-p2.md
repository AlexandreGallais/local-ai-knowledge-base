---
title: "Fixtures (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-fixtures-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Fixtures (part 2 of 2)

## Fixture timeout

Fixture is considered to be a part of a test, and so its setup and teardown running time counts towards the test timeout. Therefore, a slow fixture may cause test timeouts. You can set a separate larger timeout for such a fixture, and keep the overall test timeout small.

```js
import { test as base, expect } from '@playwright/test';

const test = base.extend<{ slowFixture: string }>({
  slowFixture: [async ({}, use) => {
    // ... perform a slow operation ...
    await use('hello');
  }, { timeout: 60000 }]
});

test('example test', async ({ slowFixture }) => {
  // ...
});
```

Unlike regular test-scoped fixtures, each worker-scoped fixture has its own timeout, equal to the test timeout. You can change the timeout for a worker-scoped fixture in the same way.

## Fixtures-options

Playwright Test supports running multiple test projects that can be configured separately. You can use "option" fixtures to make your configuration options declarative and type safe. Learn more about parameterizing tests.

Below we'll create a `defaultItem` option in addition to the `todoPage` fixture from other examples. This option will be set in the configuration file. Note the tuple syntax and `{ option: true }` argument.

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

// Declare your options to type-check your configuration.
export type MyOptions = {
  defaultItem: string;
};
type MyFixtures = {
  todoPage: TodoPage;
};

// Specify both option and fixture types.
export const test = base.extend<MyOptions & MyFixtures>({
  // Define an option and provide a default value.
  // We can later override it in the config.
  defaultItem: ['Something nice', { option: true }],

  // Our "todoPage" fixture depends on the option.
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
    await todoPage.removeAll();
  },
});
export { expect } from '@playwright/test';
```

We can now use the `todoPage` fixture as usual, and set the `defaultItem` option in the configuration file.

```js
import { defineConfig } from '@playwright/test';
import type { MyOptions } from './my-test';

export default defineConfig<MyOptions>({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'wellbeing',
      use: { defaultItem: 'Exercise!' },
    },
  ]
});
```

**Array as an option value**

If the value of your option is an array, for example `[{ name: 'Alice' }, { name: 'Bob' }]`, you'll need to wrap it into an extra array when providing the value. This is best illustrated with an example.

```js
type Person = { name: string };
const test = base.extend<{ persons: Person[] }>({
  // Declare the option, default value is an empty array.
  persons: [[], { option: true }],
});

// Option value is an array of persons.
const actualPersons = [{ name: 'Alice' }, { name: 'Bob' }];
test.use({
  // CORRECT: Wrap the value into an array and pass the scope.
  persons: [actualPersons, { scope: 'test' }],
});

test.use({
  // WRONG: passing an array value directly will not work.
  persons: actualPersons,
});
```

**Reset an option**

You can reset an option to the value defined in the config file by setting it to `undefined`. Consider the following config that sets a `baseURL`:

```js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    baseURL: 'https://playwright.dev',
  },
});
```

You can now configure `baseURL` for a file, and also opt-out for a single test.

```js
import { test } from '@playwright/test';

// Configure baseURL for this file.
test.use({ baseURL: 'https://playwright.dev/docs/intro' });

test('check intro contents', async ({ page }) => {
  // This test will use "https://playwright.dev/docs/intro" base url as defined above.
});

test.describe(() => {
  // Reset the value to a config-defined one.
  test.use({ baseURL: undefined });

  test('can navigate to intro from the home page', async ({ page }) => {
    // This test will use "https://playwright.dev" base url as defined in the config.
  });
});
```

If you would like to completely reset the value to `undefined`, use a long-form fixture notation.

```js
import { test } from '@playwright/test';

// Completely unset baseURL for this file.
test.use({
  baseURL: [async ({}, use) => use(undefined), { scope: 'test' }],
});

test('no base url', async ({ page }) => {
  // This test will not have a base url.
});
```

## Execution order

Each fixture has a setup and teardown phase before and after the `await use()` call in the fixture. Setup is executed before the test/hook requiring it is run, and teardown is executed when the fixture is no longer being used by the test/hook.

Fixtures follow these rules to determine the execution order:
* When fixture A depends on fixture B: B is always set up before A and torn down after A.
* Non-automatic fixtures are executed lazily, only when the test/hook needs them.
* Test-scoped fixtures are torn down after each test, while worker-scoped fixtures are only torn down when the worker process executing tests is torn down.

Consider the following example:

```js
import { test as base } from '@playwright/test';

const test = base.extend<{
  testFixture: string,
  autoTestFixture: string,
  unusedFixture: string,
}, {
  workerFixture: string,
  autoWorkerFixture: string,
}>({
  workerFixture: [async ({ browser }) => {
    // workerFixture setup...
    await use('workerFixture');
    // workerFixture teardown...
  }, { scope: 'worker' }],

  autoWorkerFixture: [async ({ browser }) => {
    // autoWorkerFixture setup...
    await use('autoWorkerFixture');
    // autoWorkerFixture teardown...
  }, { scope: 'worker', auto: true }],

  testFixture: [async ({ page, workerFixture }) => {
    // testFixture setup...
    await use('testFixture');
    // testFixture teardown...
  }, { scope: 'test' }],

  autoTestFixture: [async () => {
    // autoTestFixture setup...
    await use('autoTestFixture');
    // autoTestFixture teardown...
  }, { scope: 'test', auto: true }],

  unusedFixture: [async ({ page }) => {
    // unusedFixture setup...
    await use('unusedFixture');
    // unusedFixture teardown...
  }, { scope: 'test' }],
});

test.beforeAll(async () => { /* ... */ });
test.beforeEach(async ({ page }) => { /* ... */ });
test('first test', async ({ page }) => { /* ... */ });
test('second test', async ({ testFixture }) => { /* ... */ });
test.afterEach(async () => { /* ... */ });
test.afterAll(async () => { /* ... */ });
```

Normally, if all tests pass and no errors are thrown, the order of execution is as following.
* worker setup and `beforeAll` section:
  * `browser` setup because it is required by `autoWorkerFixture`.
  * `autoWorkerFixture` setup because automatic worker fixtures are always set up before anything else.
  * `beforeAll` runs.
* `first test` section:
  * `autoTestFixture` setup because automatic test fixtures are always set up before test and `beforeEach` hooks.
  * `page` setup because it is required in `beforeEach` hook.
  * `beforeEach` runs.
  * `first test` runs.
  * `afterEach` runs.
  * `page` teardown because it is a test-scoped fixture and should be torn down after the test finishes.
  * `autoTestFixture` teardown because it is a test-scoped fixture and should be torn down after the test finishes.
* `second test` section:
  * `autoTestFixture` setup because automatic test fixtures are always set up before test and `beforeEach` hooks.
  * `page` setup because it is required in `beforeEach` hook.
  * `beforeEach` runs.
  * `workerFixture` setup because it is required by `testFixture` that is required by the `second test`.
  * `testFixture` setup because it is required by the `second test`.
  * `second test` runs.
  * `afterEach` runs.
  * `testFixture` teardown because it is a test-scoped fixture and should be torn down after the test finishes.
  * `page` teardown because it is a test-scoped fixture and should be torn down after the test finishes.
  * `autoTestFixture` teardown because it is a test-scoped fixture and should be torn down after the test finishes.
* `afterAll` and worker teardown section:
  * `afterAll` runs.
  * `workerFixture` teardown because it is a workers-scoped fixture and should be torn down once at the end.
  * `autoWorkerFixture` teardown because it is a workers-scoped fixture and should be torn down once at the end.
  * `browser` teardown because it is a workers-scoped fixture and should be torn down once at the end.

A few observations:
* `page` and `autoTestFixture` are set up and torn down for each test, as test-scoped fixtures.
* `unusedFixture` is never set up because it is not used by any tests/hooks.
* `testFixture` depends on `workerFixture` and triggers its setup.
* `workerFixture` is lazily set up before the second test, but torn down once during worker shutdown, as a worker-scoped fixture.
* `autoWorkerFixture` is set up for `beforeAll` hook, but `autoTestFixture` is not.

## Combine custom fixtures from multiple modules

You can merge test fixtures from multiple files or modules:

```js
import { mergeTests } from '@playwright/test';
import { test as dbTest } from 'database-test-utils';
import { test as a11yTest } from 'a11y-test-utils';

export const test = mergeTests(dbTest, a11yTest);
```

```js
import { test } from './fixtures';

test('passes', async ({ database, page, a11y }) => {
  // use database and a11y fixtures.
});
```

## Box fixtures

Usually, custom fixtures are reported as separate steps in the UI mode, Trace Viewer and various test reports. They also appear in error messages from the test runner. For frequently used fixtures, this can mean lots of noise. You can stop the fixtures steps from being shown in the UI by "boxing" it.

```js
import { test as base } from '@playwright/test';

export const test = base.extend({
  helperFixture: [async ({}, use, testInfo) => {
    // ...
  }, { box: true }],
});
```

This is useful for non-interesting helper fixtures. For example, an automatic fixture that sets up some common data can be safely hidden from a test report.

You can also mark the fixture as `box: 'self'` to only hide that particular fixture, but include all the steps inside the fixture in the test report.

## Custom fixture title

Instead of the usual fixture name, you can give fixtures a custom title that will be shown in test reports and error messages.

```js
import { test as base } from '@playwright/test';

export const test = base.extend({
  innerFixture: [async ({}, use, testInfo) => {
    // ...
  }, { title: 'my fixture' }],
});
```

## Adding global beforeEach/afterEach hooks

[`method: Test.beforeEach`] and [`method: Test.afterEach`] hooks run before/after each test declared in the same file and same [`method: Test.describe`] block (if any). If you want to declare hooks that run before/after each test globally, you can declare them as auto fixtures like this:

```js
import { test as base } from '@playwright/test';

export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {
    // This code runs before every test.
    await page.goto('http://localhost:8000');
    await use();
    // This code runs after every test.
    console.log('Last URL:', page.url());
  }, { auto: true }],  // automatically starts for every test.
});
```

And then import the fixtures in all your tests:

```js
import { test } from './fixtures';
import { expect } from '@playwright/test';

test('basic', async ({ page }) => {
  expect(page).toHaveURL('http://localhost:8000');
  await page.goto('https://playwright.dev');
});
```

## Adding global beforeAll/afterAll hooks

[`method: Test.beforeAll`] and [`method: Test.afterAll`] hooks run before/after all tests declared in the same file and same [`method: Test.describe`] block (if any), once per worker process. If you want to declare hooks
that run before/after all tests in every file, you can declare them as auto fixtures with `scope: 'worker'` as follows:

```js
import { test as base } from '@playwright/test';

export const test = base.extend<{}, { forEachWorker: void }>({
  forEachWorker: [async ({}, use) => {
    // This code runs before all the tests in the worker process.
    console.log(`Starting test worker ${test.info().workerIndex}`);
    await use();
    // This code runs after all the tests in the worker process.
    console.log(`Stopping test worker ${test.info().workerIndex}`);
  }, { scope: 'worker', auto: true }],  // automatically starts for every worker.
});
```

And then import the fixtures in all your tests:

```js
import { test } from './fixtures';
import { expect } from '@playwright/test';

test('basic', async ({ }) => {
  // ...
});
```
Note that the fixtures will still run once per worker process, but you don't need to redeclare them in every file.
