---
title: "promise-done"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/guide/examples/promise-done.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# promise-done

```js
it('should work', (done) => {  // [!code --]
it('should work', () => new Promise(done => { // [!code ++]
  // ...
  done()
}) // [!code --]
})) // [!code ++]
```
