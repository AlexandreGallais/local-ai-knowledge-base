---
title: "Assertions (part 2 of 2)"
tool: "playwright"
version: "1.65"
source: "https://github.com/microsoft/playwright/blob/a1f35e1955976e84411f9c10358228a80b763ebe/docs/src/test-assertions-js.md"
commit: "a1f35e1955976e84411f9c10358228a80b763ebe"
license: "Apache-2.0"
---

# Assertions (part 2 of 2)

## Add custom matchers using expect.extend

You can extend Playwright assertions by providing custom matchers. These matchers will be available on the `expect` object.

In this example we add a custom `toHaveAmount` function. Custom matcher should return a `pass` flag indicating whether the assertion passed, and a `message` callback that's used when the assertion fails.

```js
import { expect as baseExpect } from '@playwright/test';
import type { Locator } from '@playwright/test';

export { test } from '@playwright/test';

export const expect = baseExpect.extend({
  async toHaveAmount(locator: Locator, expected: number, options?: { timeout?: number }) {
    const assertionName = 'toHaveAmount';
    let pass: <example-value>;
    let matcherResult: any;
    try {
      const expectation = this.isNot ? baseExpect(locator).not : baseExpect(locator);
      await expectation.toHaveAttribute('data-amount', String(expected), options);
      pass = true;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = false;
    }

    if (this.isNot) {
      pass <example-value>;
    }

    const message = pass
      ? () => this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Locator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '')
      : () =>  this.utils.matcherHint(assertionName, undefined, undefined, { isNot: this.isNot }) +
          '\n\n' +
          `Locator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          (matcherResult ? `Received: ${this.utils.printReceived(matcherResult.actual)}` : '');

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});
```

Now we can use `toHaveAmount` in the test.

```js
import { test, expect } from './fixtures';

test('amount', async () => {
  await expect(page.locator('.cart')).toHaveAmount(4);
});
```

### Generic custom matchers

TypeScript cannot carry a type parameter from the matcher implementation to the call site. If the matcher is generic over the received value, its type parameter becomes `unknown` when you call the matcher on `expect`.

To get the type of the received value in the matcher arguments, declare the matcher signature in the `PlaywrightTest.Matchers` interface. Its second type parameter `T` is the type of the value passed to `expect`. Note that a generic matcher also needs an explicit `this` parameter type to access `this.utils` and other matcher state.

```js
import { expect as baseExpect } from '@playwright/test';
import type { ExpectMatcherState } from '@playwright/test';

export const expect = baseExpect.extend({
  toSatisfy<T>(this: ExpectMatcherState, received: T, predicate: (value: T) => boolean) {
    const pass = predicate(received);
    return {
      message: () => `expected ${this.utils.printReceived(received)} to satisfy the predicate`,
      pass,
    };
  },
});

declare global {
  namespace PlaywrightTest {
    interface Matchers<R, T = unknown> {
      toSatisfy(predicate: (value: T) => boolean): R;
    }
  }
}
```

Now the `value` argument has the type of the received value.

```js
import { test, expect } from './fixtures';

test('generic matcher', async () => {
  expect('hello').toSatisfy(value => value.startsWith('h'));
  expect(42).toSatisfy(value => value > 40);
});
```

### Compatibility with expect library

:::note
Do not confuse Playwright's `expect` with the `expect` library. The latter is not fully integrated with Playwright test runner, so make sure to use Playwright's own `expect`.
:::

### Combine custom matchers from multiple modules

You can combine custom matchers from multiple files or modules.

```js
import { mergeTests, mergeExpects } from '@playwright/test';
import { test as dbTest, expect as dbExpect } from 'database-test-utils';
import { test as a11yTest, expect as a11yExpect } from 'a11y-test-utils';

export const expect = mergeExpects(dbExpect, a11yExpect);
export const test = mergeTests(dbTest, a11yTest);
```

```js
import { test, expect } from './fixtures';

test('passes', async ({ database }) => {
  await expect(database).toHaveDatabaseUser('admin');
});
```
