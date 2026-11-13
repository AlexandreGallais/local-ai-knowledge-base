---
title: "Test Context | Guide (part 3 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/test-context.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test Context | Guide (part 3 of 3)

### Default Fixture (Injected)

Since Vitest 3, you can provide different values in different projects. To enable this, pass `{ injected: true }` in the options. If the key is not specified in the project configuration, the default value will be used.

:::code-group

```ts
import { test as baseTest } from 'vitest'

const test = baseTest
  .extend('url', { injected: true }, '/default')

test('works correctly', ({ url }) => {
  // url is "/default" in "project-new"
  // url is "/full" in "project-full"
  // url is "/empty" in "project-empty"
})
```

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'project-new',
        },
      },
      {
        test: {
          name: 'project-full',
          provide: {
            url: '/full',
          },
        },
      },
      {
        test: {
          name: 'project-empty',
          provide: {
            url: '/empty',
          },
        },
      },
    ],
  },
})
```

### Overriding Fixture Values <Version>4.1.0</Version> {#overriding-fixture-values}

You can override fixture values for a specific suite and its children using `test.override`. This is useful when you need different fixture values for different test scenarios.

**Tip:**
Vitest will automatically inherit the options, if they are not provided when overriding. Note that you cannot override fixture's `scope` or `auto` options.

#### Builder Pattern (Recommended)

```ts
import { test as baseTest, describe, expect } from 'vitest'

const test = baseTest
  .extend('config', { port: 3000, host: 'localhost' })
  .extend('server', ({ config }) => `http://${config.host}:${config.port}`)

describe('production environment', () => {
  // Override with a new static value (chainable)
  test
    .override('config', { port: 8080, host: 'api.example.com' })

  test('uses production config', ({ server }) => {
    expect(server).toBe('http://api.example.com:8080')
  })
})

describe('with custom server', () => {
  // Override with a function that can access other fixtures
  test.override('server', ({ config }) => {
    return `https://${config.host}:${config.port}/v2`
  })

  test('uses custom server', ({ server }) => {
    expect(server).toBe('https://localhost:3000/v2')
  })
})

test('uses default values', ({ server }) => {
  expect(server).toBe('http://localhost:3000')
})
```

#### Chaining Multiple Overrides

`test.override` returns the test API, so you can chain multiple calls:

```ts
describe('production environment', () => {
  test
    .override('environment', 'production')
    .override('port', 8080)
    .override('debug', false)

  test('uses production settings', ({ environment, port, debug }) => {
    expect(environment).toBe('production')
    expect(port).toBe(8080)
    expect(debug).toBe(false)
  })
})
```

#### Object Syntax

You can also use object syntax to override multiple fixtures at once:

```ts
describe('different configuration', () => {
  test.override({
    config: { port: 4000, host: 'test.local' },
  })

  test('uses overwritten config', ({ config }) => {
    expect(config.port).toBe(4000)
  })
})
```

#### With Cleanup

When overwriting with a function, you can use `onCleanup` just like in `test.extend`:

```ts
describe('with custom database', () => {
  test.override('database', async ({ config }, { onCleanup }) => {
    const db = await createTestDatabase(config)
    onCleanup(() => db.drop())
    return db
  })

  test('uses custom database', ({ database }) => {
    // Uses the overwritten database
  })
})
```

#### Nested Scopes

Overrides are inherited by nested suites and can be overwritten again:

```ts
describe('level 1', () => {
  test.override('value', 'one')

  test('uses level 1 value', ({ value }) => {
    expect(value).toBe('one')
  })

  describe('level 2', () => {
    test.override('value', 'two')

    test('uses level 2 value', ({ value }) => {
      expect(value).toBe('two')
    })
  })

  test('still uses level 1 value', ({ value }) => {
    expect(value).toBe('one')
  })
})
```

**Warning:**
Note that you cannot introduce new fixtures inside `test.override`. Extend the test context with `test.extend` instead.

**Info:**
`test.scoped` is deprecated in favor of `test.override`. The `test.scoped` API still works but will be removed in a future version.

### Type-Safe Hooks

When using `test.extend`, the extended `test` object provides type-safe hooks that are aware of the extended context:

```ts
const test = baseTest
  .extend('counter', { value: 0, increment() { this.value++ } })

// Unlike global hooks, these hooks are aware of the extended context
test.beforeEach(({ counter }) => {
  counter.increment()
})

test.afterEach(({ counter }) => {
  console.log('Final count:', counter.value)
})
```

#### Suite-Level Hooks with Fixtures <Version>4.1.0</Version> {#suite-level-hooks}

The extended `test` object also provides `beforeAll`, `afterAll`, and `aroundAll` hooks that can access file-scoped and worker-scoped fixtures:

```ts
const test = baseTest
  .extend('config', { scope: 'file' }, () => loadConfig())
  .extend('database', { scope: 'file' }, async ({ config }, { onCleanup }) => {
    const db = await createDatabase(config)
    onCleanup(() => db.close())
    return db
  })

// Access file-scoped fixtures in suite-level hooks
test.aroundAll(async (runSuite, { database }) => {
  await database.transaction(runSuite)
})

test.beforeAll(async ({ database }) => {
  await database.createUsers()
})

test.afterAll(async ({ database }) => {
  await database.removeUsers()
})
```

**IMPORTANT**
Suite-level hooks (`beforeAll`, `afterAll`, `aroundAll`) **must be called on the `test` object returned from `test.extend()`** to have access to the extended fixtures. Using the global `beforeAll`/`afterAll`/`aroundAll` functions will not have access to your custom fixtures:

```ts
import { test as baseTest, beforeAll } from 'vitest'

const test = baseTest
  .extend('database', { scope: 'file' }, async ({}, { onCleanup }) => {
    const db = await createDatabase()
    onCleanup(() => db.close())
    return db
  })

// ❌ WRONG: Global beforeAll doesn't have access to 'database'
beforeAll(({ database }) => {
  // Error: 'database' is undefined
})

// ✅ CORRECT: Use test.beforeAll to access fixtures
test.beforeAll(({ database }) => {
  // 'database' is available
})
```

This applies to all suite-level hooks: `beforeAll`, `afterAll`, and `aroundAll`.

**Tip:**
Suite-level hooks can only access **file-scoped** and **worker-scoped** fixtures, including `auto` fixtures. Test-scoped fixtures are not available in these hooks because they run outside the context of individual tests. If you try to access a test-scoped fixture in a suite-level hook, Vitest will throw an error.

```ts
const test = baseTest
  .extend('testFixture', () => 'test-scoped')
  .extend('fileFixture', { scope: 'file' }, () => 'file-scoped')

// ❌ Error: test-scoped fixtures not available in beforeAll
test.beforeAll(({ testFixture }) => {})

// ✅ Works: file-scoped fixtures are available
test.beforeAll(({ fileFixture }) => {})
```
