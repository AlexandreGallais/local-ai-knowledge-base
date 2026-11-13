---
title: "Test Context | Guide (part 2 of 3)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/test-context.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Test Context | Guide (part 2 of 3)

## Extend Test Context

Vitest allows you to extend the test context with custom fixtures using `test.extend`.

The `test.extend` method lets you create a custom test API with fixtures - reusable values that are automatically set up and torn down for your tests. Vitest supports two syntaxes: the builder pattern (recommended) and the object syntax (Playwright-compatible).

### Builder Pattern <Version>4.1.0</Version> {#builder-pattern}

The builder pattern is the recommended way to define fixtures because it provides automatic type inference. TypeScript infers the type of each fixture from its return value, so you don't need to declare types manually.

```ts
import { test as baseTest } from 'vitest'

export const test = baseTest
  // Simple value - type is inferred as { port: number; host: string }
  .extend('config', { port: 3000, host: 'localhost' })
  // Function fixture - type is inferred from return value
  .extend('server', async ({ config }) => {
    // TypeScript knows config is { port: number; host: string }
    return `http://${config.host}:${config.port}`
  })
```

Then use it in your tests:

```ts
import { expect } from 'vitest'
import { test } from './my-test.js'

test('server uses correct port', ({ config, server }) => {
  // TypeScript knows the types:
  // - config is { port: number; host: string }
  // - server is string
  expect(server).toBe('http://localhost:3000')
  expect(config.port).toBe(3000)
})
```

#### Setup and Cleanup with `onCleanup`

For fixtures that need setup or cleanup logic, use a function. The `onCleanup` callback registers teardown logic that runs after the fixture's scope ends:

```ts
import { test as baseTest } from 'vitest'

export const test = baseTest
  .extend('tempFile', async ({}, { onCleanup }) => {
    const filePath = `/tmp/test-${Date.now()}.txt`
    await fs.writeFile(filePath, 'test data')

    // Register cleanup - runs after test completes
    onCleanup(async () => {
      await fs.unlink(filePath)
    })

    return filePath
  })
```

For more complex examples:

```ts
const test = baseTest
  .extend('database', { scope: 'file' }, async ({}, { onCleanup }) => {
    const db = await createDatabase()
    await db.connect()

    onCleanup(async () => {
      await db.disconnect()
    })

    return db
  })
  .extend('user', async ({ database }, { onCleanup }) => {
    const user = await database.createTestUser()

    onCleanup(async () => {
      await database.deleteUser(user.id)
    })

    return user
  })
```

**Warning:**
The `onCleanup` function can only be called **once per fixture**. If you need multiple cleanup operations, either combine them into a single cleanup function, or split your fixture into multiple smaller fixtures:

```ts
// ❌ This will throw an error
const test = baseTest
  .extend('resources', async ({}, { onCleanup }) => {
    const a = await acquireA()
    onCleanup(() => releaseA(a))

    const b = await acquireB()
    onCleanup(() => releaseB(b)) // Error: onCleanup can only be called once

    return { a, b }
  })

// ✅ Split into separate fixtures (recommended)
const test = baseTest
  .extend('resourceA', async ({}, { onCleanup }) => {
    const a = await acquireA()
    onCleanup(() => releaseA(a))
    return a
  })
  .extend('resourceB', async ({}, { onCleanup }) => {
    const b = await acquireB()
    onCleanup(() => releaseB(b))
    return b
  })
```

Splitting into separate fixtures is the recommended approach as it provides better isolation and makes dependencies explicit.

#### Fixture Options

The second argument to `.extend()` accepts options:

```ts
const test = baseTest
  // Automatic fixture - runs for every test even if not used
  .extend('metrics', { auto: true }, ({}, { onCleanup }) => {
    const metrics = new MetricsCollector()
    metrics.start()
    onCleanup(() => metrics.stop())
    return metrics
  })
  // Worker-scoped fixture - initialized once per worker
  .extend('config', { scope: 'worker' }, () => {
    return loadConfig()
  })
  // File-scoped fixture - initialized once per file
  .extend('database', { scope: 'file' }, async ({ config }, { onCleanup }) => {
    const db = await createDatabase(config)
    onCleanup(() => db.close())
    return db
  })
  // Injected fixture - can be overridden via config
  .extend('baseUrl', { injected: true }, () => {
    return 'http://localhost:3000'
  })
```

For test-scoped fixtures (the default), you can omit the options:

```ts
const test = baseTest
  .extend('simple', () => 'value')
```

#### Accessing Other Fixtures

Each fixture can access previously defined fixtures via its first parameter. This works for both function and non-function fixtures:

```ts
const test = baseTest
  .extend('config', { apiUrl: 'https://api.example.com', port: 3000 })
  .extend('client', ({ config }) => {
    // TypeScript knows config is { apiUrl: string; port: number }
    return new ApiClient(config.apiUrl)
  })
  .extend('user', async ({ client }) => {
    // TypeScript knows client is ApiClient
    return await client.getCurrentUser()
  })
```

#### Object Syntax (Playwright-Compatible)

Vitest also supports a Playwright-compatible object syntax. This is useful if you're migrating from Playwright or prefer defining all fixtures at once:

```ts
import { test as baseTest } from 'vitest'

export const test = baseTest.extend({
  page: async ({}, use) => {
    // setup the fixture before each test function
    const page = await browser.newPage()

    // use the fixture value
    await use(page)

    // cleanup the fixture after each test function
    await page.close()
  },
  baseUrl: 'http://localhost:3000'
})
```

The key <example-value> from the builder pattern is the `use()` callback pattern for cleanup:

```ts
// Object syntax: cleanup code goes AFTER use()
const test = baseTest.extend({
  database: async ({}, use) => {
    const db = await createDatabase()
    await db.connect()

    await use(db) // Test runs here

    // Cleanup after the test
    await db.disconnect()
  }
})

// Builder pattern: cleanup is registered with onCleanup()
const test = baseTest
  .extend('database', async ({}, { onCleanup }) => {
    const db = await createDatabase()
    await db.connect()

    onCleanup(() => db.disconnect())

    return db // Test runs after this returns
  })
```

**Info:**
With the object syntax, you need to provide types manually as a generic parameter since TypeScript cannot infer them from the `use()` callback:

```ts
const test = baseTest.extend<{
  page: Page
  baseUrl: string
}>({
  page: async ({}, use) => {
    const page = await browser.newPage()
    await use(page)
    await page.close()
  },
  baseUrl: 'http://localhost:3000'
})
```

#### Tuple Syntax for Options

With the object syntax, use a tuple to specify fixture options:

```ts
const test = baseTest.extend({
  // Auto fixture
  fixture: [
    async ({}, use) => {
      setup()
      await use()
      teardown()
    },
    { auto: true }
  ],
  // Scoped fixture
  database: [
    async ({}, use) => {
      const db = await createDatabase()
      await use(db)
      await db.close()
    },
    { scope: 'file' }
  ],
  // Injected fixture
  url: [
    '/default',
    { injected: true }
  ],
})
```

### Fixture Initialization

Vitest runner will smartly initialize your fixtures and inject them into the test context based on usage.

```ts
import { test as baseTest } from 'vitest'

const test = baseTest
  .extend('database', async () => {
    console.log('database initializing')
    return createDatabase()
  })
  .extend('cache', async () => {
    return createCache()
  })

// database will not run
test('no fixtures needed', () => {})
test('only cache', ({ cache }) => {})

// database will run
test('needs database', ({ database }) => {})
```

**Warning:**
When using `test.extend()` with fixtures, you should always use the object destructuring pattern `{ database }` to access context both in fixture function and test function.

```ts
test('context must be destructured', (context) => { // [!code --]
  expect(context.database).toBeDefined()
})

test('context must be destructured', ({ database }) => { // [!code ++]
  expect(database).toBeDefined()
})
```

### Extending Extended Tests

You can extend an already extended test to add more fixtures:

```ts
import { test as dbTest } from './my-test.js'

export const test = dbTest
  .extend('user', ({ database }) => {
    return database.createUser()
  })
```

With the object syntax:

```ts
import { test as dbTest } from './my-test.js'

export const test = dbTest.extend({
  admin: async ({ database }, use) => {
    const admin = await database.createAdmin()
    await use(admin)
    await database.deleteUser(admin.id)
  }
})
```

### Mixing Both Syntaxes

You can combine both approaches. The builder pattern can be chained after object-based extensions:

```ts
const test = baseTest
  // Object syntax for simple fixtures
  .extend<{ apiKey: <example-value> }>({
    apiKey: '<example-value>',
  })
  // Builder pattern for complex fixtures with inference
  .extend('<example-value>', ({ apiKey }) => {
    // TypeScript knows apiKey is string
    return new ApiClient(apiKey)
  })
```

### Fixture Scopes <Version>3.2.0</Version> {#fixture-scopes}

By default, fixtures are initialized for each test. You can change this with the `scope` option to share fixtures across tests.

**Warning:**
By default any fixture without a scope is treated as a `test` fixture. This means that you cannot use it inside `worker` and `file` scopes. If you wish to access it there, consider specifying a scope manually:

```ts
test
  .extend('port', { scope: 'worker' }, 5000)
  .extend('db', { scope: 'worker' }, async ({ port }) => {
    return createDb(port)
  })
```

Note that you cannot override non-test fixtures inside `describe` blocks:

```ts
test.describe('a nested suite', () => {
  test.override('port', { scope: 'worker' }, 3000) // throws an error
})
```

Consider overriding it on the top level of the module, or by using `injected` option and providing the value in the project config.

Also note that in non-isolate mode overriding a `worker` fixture will affect the fixture value in all test files running after it was overridden.

#### Test Scope (Default)

Test-scoped fixtures are created fresh for each test:

```ts
const test = baseTest
  .extend('counter', () => {
    return { value: 0 }
  })

test('first test', ({ counter }) => {
  counter.value++
  expect(counter.value).toBe(1)
})

test('second test', ({ counter }) => {
  // Fresh instance, value is 0 again
  expect(counter.value).toBe(0)
})
```

Test-scoped fixtures have access to the built-in test context (`task`, `expect`, `skip`, etc.):

```ts
const test = baseTest
  .extend('testInfo', ({ task }) => {
    return { name: task.name }
  })
```

#### File Scope

File-scoped fixtures are initialized once per test file:

```ts
const test = baseTest
  .extend('database', { scope: 'file' }, async ({}, { onCleanup }) => {
    const db = await createDatabase()
    onCleanup(() => db.close())
    return db
  })

test('first test', ({ database }) => {
  // Uses the same database instance
})

test('second test', ({ database }) => {
  // Same database instance as first test
})
```

#### Worker Scope

Worker-scoped fixtures are initialized once per worker process:

```ts
const test = baseTest
  .extend('config', { scope: 'worker' }, () => {
    return await loadExpensiveConfig()
  })
```

**Info:**
By default, every file runs in a separate worker, so `file` and `worker` scopes work the same way. However, if you disable isolation, then the number of workers is limited by `maxWorkers`, and worker-scoped fixtures will be shared across files running in the same worker.

When running tests in `vmThreads` or `vmForks`, `scope: 'worker'` works the same way as `scope: 'file'` because each file has its own VM context.

#### Scope Hierarchy

Fixtures can only access other fixtures from the same or higher (longer-lived) scopes:

| Fixture Scope | Can Access                                                             |
| ------------- | ---------------------------------------------------------------------- |
| `worker`      | Only other worker fixtures                                             |
| `file`        | Worker + file fixtures                                                 |
| `test`        | Worker + file + test fixtures + test context |

```ts
const test = baseTest
  .extend('config', { scope: 'worker' }, () => {
    return { apiUrl: 'https://api.example.com' }
  })
  .extend('database', { scope: 'file' }, async ({ config }, { onCleanup }) => {
    // ✅ File fixture can access worker fixture
    const db = await createDatabase(config.apiUrl)
    onCleanup(() => db.close())
    return db
  })
  .extend('user', async ({ database, task }) => {
    // ✅ Test fixture can access file fixture AND test context
    return await database.createUser(task.name)
  })
```

**Tip:**
Only test-scoped fixtures have access to the built-in test context (`task`, `expect`, `skip`, etc.). Worker and file fixtures run outside of any specific test, so test-specific properties are not available to them.

If you need the file path in a file-scoped fixture, use `expect.getState().testPath` instead.

#### Type-Safe Scope Access <Version>3.2.0</Version> {#type-safe-scope-access}

With the builder pattern, TypeScript automatically enforces scope-based access rules. If you try to access a test-scoped fixture from a file-scoped fixture, you'll get a compile-time error.

If you're using the object syntax and want the same type safety, you can use the `$worker`, `$file`, and `$test` keys to explicitly declare which fixtures belong to which scope:

```ts
const test = baseTest.extend<{
  $worker: { config: Config }
  $file: { database: Database }
  $test: { user: User }
}>({
  config: [async ({}, use) => {
    await use(loadConfig())
  }, { scope: 'worker' }],

  database: [async ({ config }, use) => {
    const db = await createDatabase(config)
    await use(db)
    await db.close()
  }, { scope: 'file' }],

  user: async ({ database }, use) => {
    const user = await database.createUser()
    await use(user)
    await database.deleteUser(user.id)
  },
})
```

This provides the same compile-time safety as the builder pattern, catching scope violations at build time rather than runtime.
