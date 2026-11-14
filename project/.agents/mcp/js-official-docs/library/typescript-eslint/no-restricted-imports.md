---
title: "no-restricted-imports"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-restricted-imports.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-restricted-imports

**Deprecated**

As of ESLint v9.37.0, the base `eslint/no-restricted-imports` rule supports TypeScript import syntaxes (`import type`, inline `type` specifiers, and `import x = require(...)`).
There is no longer any need to use this extension rule.

It adds support for type import syntaxes:

- `import type X from "..."`
- `import { type X } from "..."`
- `import x = require("...")`

## Options

This rule adds the following options:

### `allowTypeImports`

Whether to allow type-only imports for a path.
Default: `false`.

You can specify this option for a specific path or pattern as follows:

```jsonc
{
  "rules": {
    "@typescript-eslint/no-restricted-imports": [
      "error",
      {
        "paths": [
          {
            "name": "import-foo",
            "message": "Please use import-bar instead.",
            "allowTypeImports": true,
          },
          {
            "name": "import-baz",
            "message": "Please use import-quux instead.",
            "allowTypeImports": true,
          },
        ],
      },
    ],
  },
}
```

Whether to allow Type-Only Imports.

Examples of code with the above config:

**❌ Incorrect**

```ts
import foo from 'import-foo';
export { Foo } from 'import-foo';

import baz from 'import-baz';
export { Baz } from 'import-baz';
```

**✅ Correct**

```ts
import { foo } from 'other-module';

import type foo from 'import-foo';
export type { Foo } from 'import-foo';

import type baz from 'import-baz';
export type { Baz } from 'import-baz';
```
