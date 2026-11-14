---
title: "forceRerunTriggers | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/forcereruntriggers.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# forceRerunTriggers <CRoot />

- **Type:** `string[]`
- **Default:** `['**/package.json', '**/vitest.config.*', '**/vite.config.*']`

Glob pattern of file paths that will trigger the whole suite rerun. When paired with the `--changed` argument will run the whole test suite if the trigger is found in the git diff.

Useful if you are testing calling CLI commands, because Vite cannot construct a module graph:

```ts
test('execute a script', async () => {
  // Vitest cannot rerun this test, if content of `dist/index.js` changes
  await execa('node', ['dist/index.js'])
})
```

**Tip:**
Make sure that your files are not excluded by `server.watch.ignored`.
