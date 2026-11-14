---
title: "no-import-type-side-effects"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-import-type-side-effects.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-import-type-side-effects

The `--verbatimModuleSyntax` compiler option causes TypeScript to do simple and predictable transpilation on import declarations.
Namely, it completely removes import declarations with a top-level `type` qualifier, and it removes any import specifiers with an inline `type` qualifier.

The latter behavior does have one potentially surprising effect in that in certain cases TS can leave behind a "side effect" import at runtime:

```ts
import { type A, type B } from 'mod';

// is transpiled to

import {} from 'mod';
// which is the same as
import 'mod';
```

For the rare case of needing to import for side effects, this may be desirable - but for most cases you will not want to leave behind an unnecessary side effect import.

## Examples

This rule enforces that you use a top-level `type` qualifier for imports when it only imports specifiers with an inline `type` qualifier

**❌ Incorrect**

```ts
import { type A } from 'mod';
import { type A as AA } from 'mod';
import { type A, type B } from 'mod';
import { type A as AA, type B as BB } from 'mod';
```

**✅ Correct**

```ts
import type { A } from 'mod';
import type { A as AA } from 'mod';
import type { A, B } from 'mod';
import type { A as AA, B as BB } from 'mod';

import T from 'mod';
import type T from 'mod';

import * as T from 'mod';
import type * as T from 'mod';

import { T } from 'mod';
import type { T } from 'mod';
import { T, U } from 'mod';
import type { T, U } from 'mod';
import { type T, U } from 'mod';
import { T, type U } from 'mod';

import T, { type U } from 'mod';
```

## When Not To Use It

If you're not using TypeScript 5.0's `verbatimModuleSyntax` option and your project is built with a bundler that manages import side effects for you, this rule may not be as useful for you.

## Related To

- `consistent-type-imports`
- `import/consistent-type-specifier-style`
- `import/no-duplicates` with `{"prefer-inline": true}`
