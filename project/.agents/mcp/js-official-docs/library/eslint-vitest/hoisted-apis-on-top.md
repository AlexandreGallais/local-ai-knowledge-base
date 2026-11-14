---
title: "vitest/hoisted-apis-on-top"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/hoisted-apis-on-top.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/hoisted-apis-on-top

📝 Enforce hoisted APIs to be on top of the file.

⚠️ This rule _warns_ in the 🌐 `all` config.

💡 This rule is manually fixable by editor suggestions.

## Rule Details

This rule disallows using APIs which are hoisted by vitest in positions where they look like runtime code.

Examples of **incorrect** code for this rule:

```js
if (condition) {
  vi.mock('some-module', () => {})
}
```

```js
if (condition) {
  vi.unmock('some-module', () => {})
}
```

```js
if (condition) {
  vi.hoisted(() => {})
}
```

```js
describe('suite', () => {
  it('test', async () => {
    vi.mock('some-module', () => {})

    const sm = await import('some-module')
    // ...
  })
})
```

Examples of **correct** code for this rule:

```js
vi.mock('some-module', () => {})

describe('suite', () => {
  it('test', async () => {
    const sm = await import('some-module')
    // ...
  })
})
```

```js
vi.unmock(() => {})

if (condition) {
  // ...
}
```

```js
vi.hoisted(() => {})

if (condition) {
  // ...
}
```
