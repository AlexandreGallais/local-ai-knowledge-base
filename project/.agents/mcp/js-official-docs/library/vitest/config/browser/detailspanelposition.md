---
title: "browser.detailsPanelPosition | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/browser/detailspanelposition.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# browser.detailsPanelPosition

- **Type:** `'right' | 'bottom'`
- **Default:** `'right'`
- **CLI:** `--browser.detailsPanelPosition=bottom`, `--browser.detailsPanelPosition=right`

Controls the default position of the details panel in the Vitest UI when running browser tests.

- `'right'` - Shows the details panel on the right side with a horizontal split between the browser viewport and the details panel.
- `'bottom'` - Shows the details panel at the bottom with a vertical split between the browser viewport and the details panel.

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      detailsPanelPosition: 'bottom', // or 'right'
    },
  },
})
```

## Example

::: tabs
== bottom

== right
