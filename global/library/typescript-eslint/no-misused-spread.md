---
title: "no-misused-spread"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-misused-spread.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-misused-spread

Spread syntax (`...`) is a JavaScript feature for creating an object with the joined properties of one or more other objects.
TypeScript allows spreading objects whose properties are not typically meant to be enumerated, such as arrays and class instances.

This rule disallows using the spread syntax on values whose types indicate doing so may cause unexpected behavior.
That includes the following cases:

- Spreading a `Promise` into an object.
  You probably meant to `await` it.
- Spreading a function without properties into an object.
  You probably meant to call it.
- Spreading an iterable (`Array`, `Map`, etc.) into an object.
  Iterable objects usually do not have meaningful enumerable properties and you probably meant to spread it into an array instead.
- Spreading a string into an array.
  String enumeration behaviors in JavaScript around encoded characters are often surprising.
- Spreading a `class` into an object.
  This copies all static own properties of the class, but none of the inheritance chain.
- Spreading a class instance into an object.
  This does not faithfully copy the instance because only its own properties are copied, but the inheritance chain is lost, including all its methods.

## Examples

**❌ Incorrect**

```ts
declare const promise: Promise<number>;
const spreadPromise = { ...promise };

declare function getObject(): Record<string, string>;
const getObjectSpread = { ...getObject };

declare const map: Map<string, number>;
const mapSpread = { ...map };

declare const userName: string;
const characters = [...userName];
```

```ts
declare class Box {
  value: number;
}
const boxSpread = { ...Box };

declare const instance: Box;
const instanceSpread = { ...instance };
```

**✅ Correct**

```ts
declare const promise: Promise<number>;
const spreadPromise = { ...(await promise) };

declare function getObject(): Record<string, string>;
const getObjectSpread = { ...getObject() };

declare const map: Map<string, number>;
const mapObject = Object.fromEntries(map);

declare const userName: string;
const characters = userName.split('');
```

## Options

### `allow`

This option takes the shared `TypeOrValueSpecifier` format.

Examples of a configuration for this option in a `file.ts` file:

```json
"@typescript-eslint/no-misused-spread": [
  "error",
  {
    "allow": [
      { "from": "file", "name": "BrandedString", "path": "file.ts" },
    ]
  }
]
```

**❌ Incorrect**

```ts
declare const unbrandedString: string;

const spreadUnbrandedString = [...unbrandedString];
```

**✅ Correct**

```ts
type BrandedString = string & { __brand: 'safe' };

declare const brandedString: BrandedString;

const spreadBrandedString = [...brandedString];
```

#### Examples

If you intentionally spread over strings, you can use `allow` to explicitly allowlist them:

```ts
/* eslint @typescript-eslint/no-misused-spread: {"allow":[{ "from": "lib", "name": "string" }]} */
declare const unbrandedString: string;

const spreadUnbrandedString = [...unbrandedString];
```

See the shared `TypeOrValueSpecifier` format for more information.

## When Not To Use It

If your application intentionally works with raw data in unusual ways, such as directly manipulating class prototype chains, you might not want this rule.

If your use cases for unusual spreads only involve a few types, you might consider using ESLint disable comments and/or the `allow` option instead of completely disabling this rule.

## Further Reading

- Strings Shouldn't Be Iterable By Default
