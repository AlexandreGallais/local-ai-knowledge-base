---
title: "Snapshot | Guide (part 1 of 2)"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/snapshot.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Snapshot

**Tip:**
For a beginner-friendly introduction to snapshot testing, see the Snapshot Testing tutorial.

<CourseLink href="https://vueschool.io/lessons/snapshots-in-vitest?friend=vueuse">Learn Snapshot by video from Vue School</CourseLink>

Snapshot tests are a very useful tool whenever you want to make sure the output of your functions does not change unexpectedly.

When using snapshot, Vitest will take a snapshot of the given value, then compare it to a reference snapshot file stored alongside the test. The test will fail if the two snapshots do not match: either the change is unexpected, or the reference snapshot needs to be updated to the new version of the result.

## Use Snapshots

To snapshot a value, you can use the `toMatchSnapshot()` from `expect()` API:

```ts
import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchSnapshot()
})
```

The first time this test is run, Vitest creates a snapshot file that looks like this:

```js
// Vitest Snapshot v1, https://vitest.dev/guide/snapshot.html

exports['toUpperCase 1'] = '"FOOBAR"'
```

The snapshot artifact should be committed alongside code changes, and reviewed as part of your code review process. On subsequent test runs, Vitest will compare the rendered output with the previous snapshot. If they match, the test will pass. If they don't match, either the test runner found a bug in your code that should be fixed, or the implementation has changed and the snapshot needs to be updated.

Vitest stores a serialized representation of the received value. Snapshot rendering is powered by `@vitest/pretty-format`. `snapshotFormat` allows configuring general snapshot formatting behavior in Vitest. For further customization, you can implement your own custom serializers or custom snapshot matchers.

**Warning:**
When using Snapshots with async concurrent tests, `expect` from the local Test Context must be used to ensure the right test is detected.

## Inline Snapshots

Similarly, you can use the `toMatchInlineSnapshot()` to store the snapshot inline within the test file.

```ts
import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchInlineSnapshot()
})
```

Instead of creating a snapshot file, Vitest will modify the test file directly to update the snapshot as a string:

```ts
import { expect, it } from 'vitest'

it('toUpperCase', () => {
  const result = toUpperCase('foobar')
  expect(result).toMatchInlineSnapshot('"FOOBAR"')
})
```

This allows you to see the expected output directly without jumping across different files.

**Warning:**
When using Snapshots with async concurrent tests, `expect` from the local Test Context must be used to ensure the right test is detected.

## Updating Snapshots

When the received value doesn't match the snapshot, the test fails and shows you the difference between them. When the snapshot change is expected, you may want to update the snapshot from the current state.

In watch mode, you can press the `u` key in the terminal to update the failed snapshot directly.

Or you can use the `--update` or `-u` flag in the CLI to make Vitest update snapshots.

```bash
vitest -u
```

### CI behavior

By default, Vitest does not write snapshots in CI (`process.env.CI` is truthy) and any snapshot mismatches, missing snapshots, and obsolete snapshots fail the run. See `update` for the details.

An **obsolete snapshot** is a snapshot entry (or snapshot file) that no longer matches any collected test. This usually happens after removing or renaming tests.

## File Snapshots

When calling `toMatchSnapshot()`, we store all snapshots in a formatted snap file. That means we need to escape some characters (namely the double-quote `"` and backtick `` ` ``) in the snapshot string. Meanwhile, you might lose the syntax highlighting for the snapshot content (if they are in some language).

In light of this, we introduced `toMatchFileSnapshot()` to explicitly match against a file. This allows you to assign any file extension to the snapshot file, and makes them more readable.

```ts
import { expect, it } from 'vitest'

it('render basic', async () => {
  const result = renderHTML(h('div', { class: 'foo' }))
  await expect(result).toMatchFileSnapshot('./test/basic.output.html')
})
```

It will compare with the content of `./test/basic.output.html`. And can be written back with the `--update` flag.

**Warning:**
Do not use a snapshot path managed by Vitest, such as `__snapshots__/basic.test.ts.snap`, with `toMatchFileSnapshot`. Choose a separate file path pattern for file snapshots.

## Visual Snapshots

For visual regression testing of UI components and pages, Vitest provides built-in support through browser mode with the `toMatchScreenshot()` assertion:

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('button looks correct', async () => {
  const button = page.getByRole('button')
  await expect(button).toMatchScreenshot('primary-button')
})
```

This captures screenshots and compares them against reference images to detect unintended visual changes. Learn more in the Visual Regression Testing guide.

## ARIA Snapshots <Experimental /> <Version>4.1.4</Version> {#aria-snapshots}

ARIA snapshots capture the accessibility tree of a DOM element and compare it against a stored template. Based on Playwright's ARIA snapshots, they provide a semantic alternative to visual regression testing — asserting structure and meaning rather than pixels.

For example, given this HTML:

```html
<nav aria-label="Main">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
```

You can assert its accessibility tree:

```ts
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'

test('navigation structure', async () => {
  await expect.element(page.getByRole('navigation')).toMatchAriaInlineSnapshot(`
    - navigation "Main":
      - link "Home":
        - /url: /
      - link "About":
        - /url: /about
  `)
})
```

See the dedicated ARIA Snapshots guide for syntax details, retry behavior in Browser Mode, and file vs. inline snapshot examples. See `toMatchAriaSnapshot` and `toMatchAriaInlineSnapshot` for the full API reference.

## Custom Serializer

You can add your own logic to alter how your snapshots are serialized. Like Jest, Vitest has default serializers for built-in JavaScript types, HTML elements, ImmutableJS and for React elements.

You can explicitly add custom serializer by using `expect.addSnapshotSerializer` API.

```ts
expect.addSnapshotSerializer({
  serialize(val, config, indentation, depth, refs, printer) {
    // `printer` is a function that serializes a value using existing plugins.
    return `Pretty foo: ${printer(
      val.foo,
      config,
      indentation,
      depth,
      refs,
    )}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
})
```

We also support snapshotSerializers option to implicitly add custom serializers.

```ts
import { SnapshotSerializer } from 'vitest'

export default {
  serialize(val, config, indentation, depth, refs, printer) {
    // `printer` is a function that serializes a value using existing plugins.
    return `Pretty foo: ${printer(
      val.foo,
      config,
      indentation,
      depth,
      refs,
    )}`
  },
  test(val) {
    return val && Object.prototype.hasOwnProperty.call(val, 'foo')
  },
} satisfies SnapshotSerializer
```

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    snapshotSerializers: ['path/to/custom-serializer.ts'],
  },
})
```

After adding a test like this:

```ts
test('foo snapshot test', () => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
  }

  expect(bar).toMatchSnapshot()
})
```

You will get the following snapshot:

```
Pretty foo: Object {
  "x": 1,
  "y": 2,
}
```

## Custom Snapshot Matchers <Experimental /> <Version>4.1.3</Version> {#custom-snapshot-matchers}

You can build custom snapshot matchers using the composable functions exposed on `Snapshots` from `vitest`. These let you transform values before snapshotting while preserving full snapshot lifecycle support (creation, update, inline rewriting).

```ts
import { expect, test, Snapshots } from 'vitest'

const { toMatchFileSnapshot, toMatchInlineSnapshot, toMatchSnapshot } = Snapshots

expect.extend({
  toMatchTrimmedSnapshot(received: string, length: number) {
    return toMatchSnapshot.call(this, received.slice(0, length))
  },
  toMatchTrimmedInlineSnapshot(received: string, inlineSnapshot?: string) {
    return toMatchInlineSnapshot.call(this, received.slice(0, 10), inlineSnapshot)
  },
  async toMatchTrimmedFileSnapshot(received: string, file: string) {
    return toMatchFileSnapshot.call(this, received.slice(0, 10), file)
  },
})

test('file snapshot', () => {
  // create __snapshots__/demo.test.ts with
  // > exports[`file snapshot 1`] = `"extra long"`
  expect('extra long string oh my gerd').toMatchTrimmedSnapshot(10)
})

test('inline snapshot', () => {
  expect('super long string oh my gerd').toMatchTrimmedInlineSnapshot(`"super long"`)
})

test('raw file snapshot', async () => {
  // create raw-file.txt with:
  // > crazy long
  await expect('crazy long string oh my gerd').toMatchTrimmedFileSnapshot('./raw-file.txt')
})
```

The composables return `{ pass, message }` so you can further customize the error:

```ts
import { Snapshots } from 'vitest'

const { toMatchSnapshot } = Snapshots

expect.extend({
  toMatchTrimmedSnapshot(received: string, length: number) {
    const result = toMatchSnapshot.call(this, received.slice(0, length))
    return { ...result, message: () => `Trimmed snapshot failed: ${result.message()}` }
  },
})
```

**Warning:**
For inline snapshot matchers, the snapshot argument must be the last parameter (or second-to-last when using property matchers). Vitest rewrites the last string argument in the source code, so custom arguments before the snapshot work, but custom arguments after it are not supported.

**Tip:**
File snapshot matchers must be `async` — `toMatchFileSnapshot` returns a `Promise`. Remember to `await` the result in the matcher and in your test.

**Warning:**
When custom inline snapshot matcher is asynchronous, Vitest cannot automatically infer the call location for inline snapshot rewriting. You must capture the call site by setting the `'error'` flag on the chai assertion object:

```ts
import { expect, chai, Snapshots } from 'vitest'

const { toMatchInlineSnapshot } = Snapshots

expect.extend({
  async toMatchTransformedInlineSnapshot(received: string, inlineSnapshot?: string) {
    // capture call site synchronously at the top of matcher implementation
    chai.util.flag(this.assertion, 'error', new Error())
    const transformed = await transform(received)
    return toMatchInlineSnapshot.call(this, transformed, inlineSnapshot)
  },
})
```

For TypeScript, augment the `Matchers<R, T>` interface:

```ts
import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toMatchTrimmedSnapshot: (length: number) => R
    toMatchTrimmedInlineSnapshot: (inlineSnapshot?: string) => R
    toMatchTrimmedFileSnapshot: (file: string) => Promise<void>
  }
}
```

**Tip:**
See Extending Matchers for more on `expect.extend` and custom matcher conventions.
