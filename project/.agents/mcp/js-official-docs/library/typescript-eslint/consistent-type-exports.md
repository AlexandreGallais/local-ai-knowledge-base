---
title: "consistent-type-exports"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/consistent-type-exports.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# consistent-type-exports

TypeScript allows specifying a `type` keyword on exports to indicate that the export exists only in the type system, not at runtime.
This allows transpilers to drop exports without knowing the types of the dependencies.

> See Blog > Consistent Type Exports and Imports: Why and How for more details.

## Examples

**❌ Incorrect**

```ts
interface ButtonProps {
  onClick: () => void;
}

class Button implements ButtonProps {
  onClick = () => console.log('button!');
}

export { Button, ButtonProps };
```

**✅ Correct**

```ts
interface ButtonProps {
  onClick: () => void;
}

class Button implements ButtonProps {
  onClick = () => console.log('button!');
}

export { Button };
export type { ButtonProps };
```

## Options

### `fixMixedExportsWithInlineTypeSpecifier`

If you are using a TypeScript version less than 4.5, then you will not be able to use this option.

For example the following code:

```ts
const x = 1;
type T = number;

export { x, T };
```

With `{fixMixedExportsWithInlineTypeSpecifier: true}` will be fixed to:

```ts
const x = 1;
type T = number;

export { x, type T };
```

With `{fixMixedExportsWithInlineTypeSpecifier: false}` will be fixed to:

```ts
const x = 1;
type T = number;

export type { T };
export { x };
```

## When Not To Use It

If you use `--isolatedModules` the compiler would error if a type is not re-exported using `export type`.
This rule may be less useful in those cases.

If you specifically want to use both export kinds for stylistic reasons, or don't wish to enforce one style over the other, you can avoid this rule.

However, keep in mind that inconsistent style can harm readability in a project.
We recommend picking a single option for this rule that works best for your project.
