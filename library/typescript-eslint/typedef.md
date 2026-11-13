---
title: "typedef"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/typedef.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# typedef

**Caution:**

This is an old, deprecated rule.
It will be removed in a future major version of typescript-eslint.

Requiring type annotations unnecessarily can be cumbersome to maintain and generally reduces code readability.
TypeScript is often better at inferring types than easily written type annotations would allow.

**Instead of enabling `typedef`, it is generally recommended to use the `--noImplicitAny` and `--strictPropertyInitialization` compiler options to enforce type annotations only when useful.**

TypeScript cannot always infer types for all places in code.
Some locations require type annotations for their types to be inferred.

This rule can enforce type annotations in locations regardless of whether they're required.
This is typically used to maintain consistency for element types that sometimes require them.

```ts
class ContainsText {
  // There must be a type annotation here to infer the type
  delayedText: string;

  // `typedef` requires a type annotation here to maintain consistency
  immediateTextExplicit: string = 'text';

  // This is still a string type because of its initial value
  immediateTextImplicit = 'text';
}
```

> To enforce type definitions existing on call signatures, use `explicit-function-return-type`, or `explicit-module-boundary-types`.

## Options

For example, with the following configuration:

```json
{
  "rules": {
    "@typescript-eslint/typedef": [
      "error",
      {
        "arrowParameter": true,
        "variableDeclaration": true
      }
    ]
  }
}
```

- Type annotations on arrow function parameters are required
- Type annotations on variables are required

### `arrayDestructuring`

Examples of code with `{ "arrayDestructuring": true }`:

**❌ Incorrect**

```ts
const [a] = [1];
const [b, c] = [1, 2];
```

**✅ Correct**

```ts
const [a]: number[] = [1];
const [b]: [number] = [2];
const [c, d]: [boolean, string] = [true, 'text'];

for (const [key, val] of new Map([['key', 1]])) {
}
```

### `arrowParameter`

Examples of code with `{ "arrowParameter": true }`:

**❌ Incorrect**

```ts
const logsSize = size => console.log(size);

['hello', 'world'].map(text => text.length);

const mapper = {
  map: text => text + '...',
};
```

**✅ Correct**

```ts
const logsSize = (size: number) => console.log(size);

['hello', 'world'].map((text: string) => text.length);

const mapper = {
  map: (text: string) => text + '...',
};
```

### `memberVariableDeclaration`

Examples of code with `{ "memberVariableDeclaration": true }`:

**❌ Incorrect**

```ts
class ContainsText {
  delayedText;
  immediateTextImplicit = 'text';
}
```

**✅ Correct**

```ts
class ContainsText {
  delayedText: string;
  immediateTextImplicit: string = 'text';
}
```

### `objectDestructuring`

Examples of code with `{ "objectDestructuring": true }`:

**❌ Incorrect**

```ts
const { length } = 'text';
const [b, c] = Math.random() ? [1, 2] : [3, 4];
```

**✅ Correct**

```ts
const { length }: { length: number } = 'text';
const [b, c]: [number, number] = Math.random() ? [1, 2] : [3, 4];

for (const { key, val } of [{ key: 'key', val: 1 }]) {
}
```

### `parameter`

Examples of code with `{ "parameter": true }`:

**❌ Incorrect**

```ts
function logsSize(size): void {
  console.log(size);
}

const doublesSize = function (size): number {
  return size * 2;
};

const divider = {
  curriesSize(size): number {
    return size;
  },
  dividesSize: function (size): number {
    return size / 2;
  },
};

class Logger {
  log(text): boolean {
    console.log('>', text);
    return true;
  }
}
```

**✅ Correct**

```ts
function logsSize(size: number): void {
  console.log(size);
}

const doublesSize = function (size: number): number {
  return size * 2;
};

const divider = {
  curriesSize(size: number): number {
    return size;
  },
  dividesSize: function (size: number): number {
    return size / 2;
  },
};

class Logger {
  log(text: boolean): boolean {
    console.log('>', text);
    return true;
  }
}
```

### `propertyDeclaration`

Examples of code with `{ "propertyDeclaration": true }`:

**❌ Incorrect**

```ts
type Members = {
  member;
  otherMember;
};
```

**✅ Correct**

```ts
type Members = {
  member: boolean;
  otherMember: string;
};
```

### `variableDeclaration`

Examples of code with `{ "variableDeclaration": true }`:

**❌ Incorrect**

```ts
const text = 'text';
let initialText = 'text';
let delayedText;
```

**✅ Correct**

```ts
const text: string = 'text';
let initialText: string = 'text';
let delayedText: string;
```

### `variableDeclarationIgnoreFunction`

Examples of code with `{ "variableDeclaration": true, "variableDeclarationIgnoreFunction": true }`:

**❌ Incorrect**

```ts
const text = 'text';
```

**✅ Correct**

```ts
const a = (): void => {};
const b = function (): void {};
const c: () => void = (): void => {};

class Foo {
  a = (): void => {};
  b = function (): void {};
  c: () => void = (): void => {};
}
```

## When Not To Use It

If you are using stricter TypeScript compiler options, particularly `--noImplicitAny` and/or `--strictPropertyInitialization`, you likely don't need this rule.

In general, if you do not consider the cost of writing unnecessary type annotations reasonable, then do not use this rule.

## Further Reading

- TypeScript Type System
- Type Inference
