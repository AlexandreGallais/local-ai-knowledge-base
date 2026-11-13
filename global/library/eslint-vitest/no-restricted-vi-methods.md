---
title: "vitest/no-restricted-vi-methods"
tool: "eslint-vitest"
version: "1.6"
source: "https://github.com/vitest-dev/eslint-plugin-vitest/blob/c5df1054a25044a7ca5baf07461b7aee1f15f5f2/docs/rules/no-restricted-vi-methods.md"
commit: "c5df1054a25044a7ca5baf07461b7aee1f15f5f2"
license: "MIT"
---

# vitest/no-restricted-vi-methods

📝 Disallow specific `vi.` methods.

⚠️ This rule _warns_ in the 🌐 `all` config.

You may wish to restrict the use of specific `vi` methods.

## Rule details

This rule checks for the usage of specific methods on the `vi` object, which
can be used to disallow certain patterns such as spies and mocks.

## Options

Restrictions are expressed in the form of a map, with the value being either a
string message to be shown, or `null` if a generic default message should be
used.

By default, this map is empty, meaning no `vi` methods are banned.

For example:

```json
{
  "vitest/no-restricted-vi-methods": [
    "error",
    {
      "advanceTimersByTime": null,
      "spyOn": "Don't use spies"
    }
  ]
}
```

Examples of **incorrect** code for this rule with the above configuration

```js
vi.useFakeTimers()
it('calls the callback after 1 second via advanceTimersByTime', () => {
  // ...

  vi.advanceTimersByTime(1000)

  // ...
})

test('plays video', () => {
  const spy = vi.spyOn(video, 'play')

  // ...
})
```
