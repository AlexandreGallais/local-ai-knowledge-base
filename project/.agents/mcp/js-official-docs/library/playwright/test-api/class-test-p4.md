---
title: "class: Test (part 4 of 4)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-api/class-test.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# class: Test (part 4 of 4)

## method: Test.skip
* since: v1.10

Skip a test. Playwright will not run the test past the `test.skip()` call.

Skipped tests are not supposed to be ever run. If you intend to fix the test, use [`method: Test.fixme`] instead.

To declare a skipped test:
* `test.skip(title, body)`
* `test.skip(title, details, body)`

To skip a test at runtime:
* `test.skip(condition, description)`
* `test.skip(callback, description)`
* `test.skip()`
* `test.skip(description)`

**Usage**

You can declare a skipped test, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test.skip('never run', async ({ page }) => {
  // ...
});
```

If your test should be skipped in some configurations, but not all, you can skip the test inside the test body based on some condition. We recommend passing a `description` argument in this case. Playwright will run the test, but abort it immediately after the `test.skip` call.

```js
import { test, expect } from '@playwright/test';

test('Safari-only test', async ({ page, browserName }) => {
  test.skip(browserName !== 'webkit', 'This feature is Safari-only');
  // ...
});
```

You can skip all tests in a file or [`method: Test.describe`] group based on some condition with a single `test.skip(callback, description)` call.

```js
import { test, expect } from '@playwright/test';

test.skip(({ browserName }) => browserName !== 'webkit', 'Safari-only');

test('Safari-only test 1', async ({ page }) => {
  // ...
});
test('Safari-only test 2', async ({ page }) => {
  // ...
});
```

You can also call `test.skip()` without a condition inside the test body to always skip the test, optionally with a `description`. However, we recommend using `test.skip(title, body)` instead.

```js
import { test, expect } from '@playwright/test';

test('less readable', async ({ page }) => {
  test.skip('Not implemented yet');
  // ...
});
```

### param: Test.skip.title
* since: v1.10
- `title` ?<[string]>

Test title.

### param: Test.skip.details
* since: v1.42
- `details` ?<[Object]>
  - `tag` ?<[string]|[Array]<[string]>>
  - `annotation` ?<[Object]|[Array]<[Object]>>
    - `type` <[string]>
    - `description` ?<[string]>

See [`method: Test.(call)`] for test details description.

### param: Test.skip.body
* since: v1.10
- `body` ?<[function]\([Fixtures], [TestInfo]\)>

Test body that takes one or two arguments: an object with fixtures and optional [TestInfo].

### param: Test.skip.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "skipped" when the condition is `true`.

### param: Test.skip.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "skipped", based on test fixtures. Test or tests are marked as "skipped" when the return value is `true`.

### param: Test.skip.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.

## method: Test.slow
* since: v1.10

Marks a test as "slow". Slow test will be given triple the default timeout.

Note that [`method: Test.slow`] cannot be used in a `beforeAll` or `afterAll` hook. Use [`method: Test.setTimeout`] instead.

* `test.slow()`
* `test.slow(description)`
* `test.slow(condition, description)`
* `test.slow(callback, description)`

**Usage**

You can mark a test as slow by calling `test.slow()` inside the test body.

```js
import { test, expect } from '@playwright/test';

test('slow test', async ({ page }) => {
  test.slow();
  // ...
});
```

If your test is slow in some configurations, but not all, you can mark it as slow based on a condition. We recommend passing a `description` argument in this case.

```js
import { test, expect } from '@playwright/test';

test('slow in Safari', async ({ page, browserName }) => {
  test.slow(browserName === 'webkit', 'This feature is slow in Safari');
  // ...
});
```

You can mark all tests in a file or [`method: Test.describe`] group as "slow" based on some condition by passing a callback.

```js
import { test, expect } from '@playwright/test';

test.slow(({ browserName }) => browserName === 'webkit', 'all tests are slow in Safari');

test('slow in Safari 1', async ({ page }) => {
  // ...
});
test('fail in Safari 2', async ({ page }) => {
  // ...
});
```

### param: Test.slow.condition
* since: v1.10
- `condition` ?<[boolean]>

Test is marked as "slow" when the condition is `true`.

### param: Test.slow.callback
* since: v1.10
- `callback` ?<[function]\([Fixtures]\):[boolean]>

A function that returns whether to mark as "slow", based on test fixtures. Test or tests are marked as "slow" when the return value is `true`.

### param: Test.slow.description
* since: v1.10
- `description` ?<[string]>

Optional description that will be reflected in a test report.

## async method: Test.step
* since: v1.10
- returns: <[any]>

Declares a test step that is shown in the report.

**Usage**

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await test.step('Log in', async () => {
    // ...
  });

  await test.step('Outer step', async () => {
    // ...
    // You can nest steps inside each other.
    await test.step('Inner step', async () => {
      // ...
    });
  });
});
```

**Details**

The method returns the value returned by the step callback.

```js
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  const user = await test.step('Log in', async () => {
    // ...
    return 'john';
  });
  expect(user).toBe('john');
});
```

**Decorator**

You can use TypeScript method decorators to turn a method into a step.
Each call to the decorated method will show up as a step in the report.

```js
function step(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + '.' + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    }, { box: true });
  };
}

class LoginPage {
  constructor(readonly page: Page) {}

  @step
  async login() {
    const account = { username: '<example-value>', password: '<example-value>' };
    await this.page.getByLabel('Username or email address').fill(account.username);
    await this.page.getByLabel('<example-value>').fill(account.password);
    await this.page.getByRole('button', { name: 'Sign in' }).click();
    await expect(this.page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  }
}

test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();
});
```

**Boxing**

When something inside a step fails, you would usually see the error pointing to the exact action that failed. For example, consider the following login step:

```js
async function login(page) {
  await test.step('login', async () => {
    const account = { username: '<example-value>', password: '<example-value>' };
    await page.getByLabel('Username or email address').fill(account.username);
    await page.getByLabel('<example-value>').fill(account.password);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
  });
}

test('example', async ({ page }) => {
  await page.goto('https://github.com/login');
  await login(page);
});
```

```txt
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  ... error details omitted ...

   8 |     await page.getByRole('button', { name: 'Sign in' }).click();
>  9 |     await expect(page.getByRole('button', { name: 'View profile and more' })).toBeVisible();
     |                                                                               ^
  10 |   });
```

As we see above, the test may fail with an error pointing inside the step. If you would like the error to highlight the "login" step instead of its internals, use the `box` option. An error inside a boxed step points to the step call site.

```js
async function login(page) {
  await test.step('login', async () => {
    // ...
  }, { box: true });  // Note the "box" option here.
}
```

```txt
Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
  ... error details omitted ...

  14 |   await page.goto('https://github.com/login');
> 15 |   await login(page);
     |         ^
  16 | });
```

You can also create a TypeScript decorator for a boxed step, similar to a regular step decorator above:

```js
function boxedStep(target: Function, context: ClassMethodDecoratorContext) {
  return function replacementMethod(...args: any) {
    const name = this.constructor.name + '.' + (context.name as string);
    return test.step(name, async () => {
      return await target.call(this, ...args);
    }, { box: true });  // Note the "box" option here.
  };
}

class LoginPage {
  constructor(readonly page: Page) {}

  @boxedStep
  async login() {
    // ....
  }
}

test('example', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login();  // <-- Error will be reported on this line.
});
```

### param: Test.step.title
* since: v1.10
- `title` <[string]>

Step name.

### param: Test.step.body
* since: v1.10
- `body` <[function]\([TestStepInfo]\):[Promise]<[any]>>

Step body.

### option: Test.step.box
* since: v1.39
- `box` <boolean>

Whether to box the step in the report. Defaults to `false`. When the step is boxed, errors thrown from the step internals point to the step call site. See below for more details.

### option: Test.step.location
* since: v1.48
- `location` <[Location]>

Specifies a custom location for the step to be shown in test reports and trace viewer. By default, location of the [`method: Test.step`] call is shown.

### option: Test.step.params
* since: v1.63
- `params` <[Object]<[string], [any]>>

Arbitrary serializable parameters describing the step. They are reported to the reporters as `testStep.params` and are shown in the trace viewer.

### option: Test.step.subtitle
* since: v1.63
- `subtitle` <[string]>

Step subtitle that complements the title, for example the target of the step. It is reported to the reporters as `testStep.subtitle` and is shown next to the title in test reports and the trace viewer.

## async method: Test.step.skip
* since: v1.50
- returns: <[void]>

Mark a test step as "skip" to temporarily disable its execution, useful for steps that are currently failing and planned for a near-term fix. Playwright will not run the step. See also [`method: TestStepInfo.skip#2`].

We recommend [`method: TestStepInfo.skip#1`] instead.

**Usage**

You can declare a skipped step, and Playwright will not run it.

```js
import { test, expect } from '@playwright/test';

test('my test', async ({ page }) => {
  // ...
  await test.step.skip('not yet ready', async () => {
    // ...
  });
});
```

### param: Test.step.skip.title
* since: v1.50
- `title` <[string]>

Step name.

### param: Test.step.skip.body
* since: v1.50
- `body` <[function]\(\):[Promise]<[any]>>

Step body.

### option: Test.step.skip.box
* since: v1.50
- `box` <boolean>

Whether to box the step in the report. Defaults to `false`. When the step is boxed, errors thrown from the step internals point to the step call site. See below for more details.

### option: Test.step.skip.location
* since: v1.50
- `location` <[Location]>

Specifies a custom location for the step to be shown in test reports and trace viewer. By default, location of the [`method: Test.step`] call is shown.

### option: Test.step.skip.params
* since: v1.63
- `params` <[Object]<[string], [any]>>

Arbitrary serializable parameters describing the step. They are reported to the reporters as `testStep.params` and are shown in the trace viewer.

### option: Test.step.skip.subtitle
* since: v1.63
- `subtitle` <[string]>

Step subtitle that complements the title, for example the target of the step. It is reported to the reporters as `testStep.subtitle` and is shown next to the title in test reports and the trace viewer.

### option: Test.step.skip.timeout
* since: v1.50
- `timeout` <[float]>

Maximum time in milliseconds for the step to finish. Defaults to `0` (no timeout).

### option: Test.step.timeout
* since: v1.50
- `timeout` <[float]>

The maximum time, in milliseconds, allowed for the step to complete. If the step does not complete within the specified timeout, the [`method: Test.step`] method will throw a [TimeoutError]. Defaults to `0` (no timeout).

## method: Test.use
* since: v1.10

Specifies options or fixtures to use in a single test file or a [`method: Test.describe`] group. Most useful to set an option, for example set `locale` to configure `context` fixture.

**Usage**

```js
import { test, expect } from '@playwright/test';

test.use({ locale: 'en-US' });

test('test with locale', async ({ page }) => {
  // Default context and page have locale as specified
});
```

**Details**

`test.use` can be called either in the global scope or inside `test.describe`. It is an error to call it within `beforeEach` or `beforeAll`.

It is also possible to override a fixture by providing a function.

```js
import { test, expect } from '@playwright/test';

test.use({
  locale: async ({}, use) => {
    // Read locale from some configuration file.
    const locale = await fs.promises.readFile('test-locale', 'utf-8');
    await use(locale);
  },
});

test('test with locale', async ({ page }) => {
  // Default context and page have locale as specified
});
```

### param: Test.use.fixtures
* since: v1.10
- `options` <[TestOptions]>

An object with local options.
