---
title: "provide | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/provide.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# provide

- **Type:** `Partial<ProvidedContext>`

Define values that can be accessed inside your tests using `inject` method.

:::code-group

```ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    provide: {
      API_KEY: '123',
    },
  },
})
```

```ts
import { expect, inject, test } from 'vitest'

test('api key is defined', () => {
  expect(inject('API_KEY')).toBe('123')
})
```

**Warning:**
Properties have to be strings and values need to be serializable because this object will be transferred between different processes.

**Tip:**
If you are using TypeScript, you will need to augment `ProvidedContext` type for type safe access:

```ts
declare module 'vitest' {
  export interface ProvidedContext {
    API_KEY: <example-value>
  }
}

// mark this file as a module so augmentation works correctly
export {}
```
