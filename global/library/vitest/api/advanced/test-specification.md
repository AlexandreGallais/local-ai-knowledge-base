---
title: "TestSpecification"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/api/advanced/test-specification.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# TestSpecification

The `TestSpecification` class describes what module to run as a test and its parameters.

You can only create a specification by calling `createSpecification` method on a test project:

```ts
const specification = project.createSpecification(
  resolve('./example.test.ts'),
  {
    testLines: [20, 40],
    testNamePattern: /hello world/,
    testIds: ['1223128da3_0_0_0', '1223128da3_0_0'],
    testTagsFilter: ['frontend and backend'],
  } // optional test filters
)
```

`createSpecification` expects resolved module identifier. It doesn't auto-resolve the file or check that it exists on the file system.

## taskId

Test module's identifier.

## project

This references the `TestProject` that the test module belongs to.

## moduleId

The ID of the module in Vite's module graph. Usually, it's an absolute file path using posix separator:

```ts
'C:/Users/Documents/project/example.test.ts' // ✅
'/Users/mac/project/example.test.ts' // ✅
'C:\\Users\\Documents\\project\\example.test.ts' // ❌
```

## testModule

Instance of `TestModule` associated with the specification. If test wasn't queued yet, this will be `undefined`.

## pool {#pool}

The `pool` in which the test module will run.

**Danger:**
It's possible to have multiple pools in a single test project with `typecheck.enabled`. This means it's possible to have several specifications with the same `moduleId` but different `pool`. In later versions, the project will only support a single pool.

## testLines

This is an array of lines in the source code where the test files are defined. This field is defined only if the `createSpecification` method received an array.

Note that if there is no test on at least one of the lines, the whole suite will fail. An example of a correct `testLines` configuration:

::: code-group

```ts
const specification = project.createSpecification(
  resolve('./example.test.ts'),
  [3, 8, 9],
)
```

```ts
import { test, describe } from 'vitest'

test('verification works')

describe('a group of tests', () => { // [!code error]
  // ...

  test('nested test')
  test.skip('skipped test')
})
```

## testNamePattern <Version>4.1.0</Version> {#testnamepattern}

A regexp that matches the name of the test in this module. This value will override the global `testNamePattern` option if it's set.

## testIds <Version>4.1.0</Version> {#testids}

The ids of tasks inside of this specification to run.

## testNames <Version>5.1.0</Version> {#testnames}

The full names of the tests inside of this specification to run, including the parent suites separated with `>`.

## testTagsFilter <Version>4.1.0</Version> {#testtagsfilter}

The tags filter that a test must pass in order to be included in the run. Multiple filters are treated as `AND`.

## toJSON

```ts
function toJSON(): SerializedTestSpecification
```

`toJSON` generates a JSON-friendly object that can be consumed by the Browser Mode or Vitest UI.
