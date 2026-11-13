---
title: "no-unused-vars"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unused-vars.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unused-vars

It adds support for TypeScript features, such as types.

## Options

This rule extension provides the following additional options.

### `enableAutofixRemoval`

#### `enableAutofixRemoval.imports`

Whether to enable automatic removal of unused imports.

When this is set to `false` (the default) the rule will only provide **_suggestion fixers_** for unused imports.
When this is set to `true` the rule will provide an **_automatic fixer_**.

Note: If all specifiers of an import declaration are unused then the entire import declaration will be removed.

Many codebases assume that all modules are side-effect free -- meaning that removing an import has no effect on runtime behavior.
In such codebases, it is generally safe to automatically remove unused imports.

If your codebase relies on side-effects caused by importing modules, you should leave this option set to `false`.

## FAQs

### What benefits does this rule have over TypeScript?

TypeScript provides `noUnusedLocals` and `noUnusedParameters` compiler options that can report errors on unused local variables or parameters, respectively.
Those compiler options can be convenient to use if you don't want to set up ESLint and typescript-eslint.
However:

- These lint rules are more configurable than TypeScript's compiler options.
  - For example, the `varsIgnorePattern` option can customize what names are always allowed to be exempted. TypeScript hardcodes its exemptions to names starting with `_`.
    If you would like to emulate the TypeScript style of exempting names starting with `_`, you can use this configuration (this includes errors as well):
    ```json
    {
      "rules": {
        "@typescript-eslint/no-unused-vars": [
          "error",
          {
            "args": "all",
            "argsIgnorePattern": "^_",
            "caughtErrors": "all",
            "caughtErrorsIgnorePattern": "^_",
            "destructuredArrayIgnorePattern": "^_",
            "varsIgnorePattern": "^_",
            "ignoreRestSiblings": true
          }
        ]
      }
    }
    ```
- ESLint can be configured within lines, files, and folders. TypeScript compiler options are linked to their TSConfig file.
- Many projects configure TypeScript's reported errors to block builds more aggressively than ESLint complaints. Blocking builds on unused variables can be inconvenient.

We generally recommend using `@typescript-eslint/no-unused-vars` to flag unused locals and parameters instead of TypeScript.

**Tip:**
Editors such as VS Code will still generally "grey out" unused variables even if `noUnusedLocals` and `noUnusedParameters` are not enabled in a project.

Also see similar rules provided by ESLint:

- `no-unused-private-class-members`
- `no-unused-labels`

### Why does this rule report variables used only for types?

This rule does not count type-only uses when determining whether a variable is used.
Declaring variables only to use them for types adds code and runtime complexity.
The variables are never actually used at runtime.
They can be misleading to readers of the code.

**typeof Variables**

For example, if a variable is only used for `typeof`, this rule will report:

```ts
const box = {
  //  ~~~
  //  'box' is assigned a value but only used as a type.
  value: 123,
};

export type Box = typeof box;
```

Instead, it's often cleaner and less code to write out the types directly:

```ts
export interface Box {
  value: number;
}
```

**Zod Schemas**

For example, if a Zod schema variable is only used for `typeof`, this rule will report:

```ts
import { z } from 'zod';

const schema = z.object({
  //  ~~~~~~
  //  'schema' is assigned a value but only used as a type.
  value: z.number(),
});

export type Box = z.infer<typeof schema>;
```

Instead, it's often cleaner and less code to write out the types directly:

```ts
export interface Box {
  value: number;
}
```

If you find yourself writing runtime values only for types, consider refactoring your code to declare types directly.

### Why are variables reported as unused despite being referenced by @link in JSDoc?

JSDoc references are not supported by typescript-eslint.
You can use a rule such as `jsdoc/no-undefined-types` to resolve variables as used in JSDoc comments.

```ts
import type { Box } from './Box';
//            ~~~
//            'Box' is defined but never used.

/**
 * @see {@link Box}
 */
export function getBox() {}
```
