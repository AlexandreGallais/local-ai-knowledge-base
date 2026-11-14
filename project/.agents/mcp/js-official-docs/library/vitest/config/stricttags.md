---
title: "strictTags | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/stricttags.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# strictTags <Version>4.1.0</Version> {#stricttags}

- **Type:** `boolean`
- **Default:** `true`
- **CLI:** `--strict-tags`, `--no-strict-tags`

Should Vitest throw an error if test has a `tag` that is not defined in the config to avoid silently doing something surprising due to mistyped names (applying the wrong configuration or skipping the test due to a `--tags-filter` flag).

Note that Vitest will always throw an error if `--tags-filter` flag defines a tag not present in the config.

For example, this test will throw an error because the tag `fortnend` has a typo (it should be `frontend`):

::: code-group

```js
test('renders a form', { tags: ['fortnend'] }, () => {
  // ...
})
```

```js
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    tags: [
      { name: 'frontend' },
    ],
  },
})
```
