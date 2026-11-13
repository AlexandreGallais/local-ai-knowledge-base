---
title: "alias | Config"
tool: "vitest"
version: "5.1"
source: "https://github.com/vitest-dev/vitest/blob/7a3844954d8753fc0d5bed76a96ffd3a21716c22/docs/config/alias.md"
commit: "7a3844954d8753fc0d5bed76a96ffd3a21716c22"
license: "MIT"
---

# alias

- **Type:** `Record<string, string> | Array<{ find: string | RegExp, replacement: string, customResolver?: ResolverFunction | ResolverObject }>`

Define custom aliases when running inside tests. They will be merged with aliases from `resolve.alias`.

**Warning:**
Vitest uses Vite SSR primitives to run tests which has certain pitfalls.

1. Aliases affect only modules imported directly with an `import` keyword by an inlined module (all source code is inlined by default).
2. Vitest does not support aliasing `require` calls.
3. If you are aliasing an external dependency (e.g., `react` -> `preact`), you may want to alias the actual `node_modules` packages instead to make it work for externalized dependencies. Both Yarn and pnpm support aliasing via the `npm:` prefix.
