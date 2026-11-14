---
title: "Mocking Globals"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/mocking/globals.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# Mocking Globals

You can mock global variables that are not present with `jsdom` or `node` by using `vi.stubGlobal` helper. It will put the value of the global variable into a `globalThis` object.

By default, Vitest does not reset these globals, but you can turn on the `unstubGlobals` option in your config to restore the original values after each test or call `vi.unstubAllGlobals()` manually.

```ts
import { vi } from 'vitest'

const IntersectionObserverMock = vi.fn(class {
  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn()
  unobserve = vi.fn()
})

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// now you can access it as `IntersectionObserver` or `window.IntersectionObserver`
```
