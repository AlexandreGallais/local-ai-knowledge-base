---
title: "vitest/prefer-to-have-been-called-times"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/prefer-to-have-been-called-times.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/prefer-to-have-been-called-times

📝 Suggest using `toHaveBeenCalledTimes()`.

⚠️ This rule _warns_ in the 🌐 `all` config.

🔧 This rule is automatically fixable by the `--fix` CLI option.

In order to have a better failure message, `toHaveBeenCalledTimes` should be
used instead of directly checking the length of `mock.calls`.

## Rule details

This rule triggers a warning if `toHaveLength` is used to assert the number of
times a mock is called.

> **Note:**
>
> This rule should ideally be paired with
> `prefer-to-have-length`

The following patterns are considered warnings:

```js
expect(someFunction.mock.calls).toHaveLength(1)
expect(someFunction.mock.calls).toHaveLength(0)

expect(someFunction.mock.calls).not.toHaveLength(1)
```

The following patterns are not warnings:

```js
expect(someFunction).toHaveBeenCalledTimes(1)
expect(someFunction).toHaveBeenCalledTimes(0)

expect(someFunction).not.toHaveBeenCalledTimes(0)

expect(uncalledFunction).not.toBeCalled()

expect(method.mock.calls[0][0]).toStrictEqual(value)
```
