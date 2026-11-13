---
title: "restrict-plus-operands"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/restrict-plus-operands.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# restrict-plus-operands

TypeScript allows `+` adding together two values of any type(s).
However, adding values that are not the same type and/or are not the same primitive type is often a sign of programmer error.

This rule reports when a `+` operation combines two values of different types, or a type that is not `bigint`, `number`, or `string`.

## Examples

**❌ Incorrect**

```ts
let foo = 1n + 1;
let fn = (a: string, b: never) => a + b;
```

**✅ Correct**

```ts
let foo = 1n + 1n;
let fn = (a: string, b: string) => a + b;
```

## Options

**Caution:**
We generally recommend against using these options, as they limit which varieties of incorrect `+` usage can be checked.
This in turn severely limits the validation that the rule can do to ensure that resulting strings and numbers are correct.

Safer alternatives to using the `allow*` options include:

- Using variadic forms of logging APIs to avoid needing to `+` values.
  ```ts
  // Remove this line
  console.log('The result is ' + true);
  // Add this line
  console.log('The result is', true);
  ```
- Using `.toFixed()` to coerce numbers to well-formed string representations:
  ```ts
  const number = 1.123456789;
  const result = 'The number is ' + number.toFixed(2);
  // result === 'The number is 1.12'
  ```
- Calling `.toString()` on other types to mark explicit and intentional string coercion:
  ```ts
  const arg = '11';
  const regex = /[0-9]/;
  const result =
    'The result of ' +
    regex.toString() +
    '.test("' +
    arg +
    '") is ' +
    regex.test(arg).toString();
  // result === 'The result of /[0-9]/.test("11") is true'
  ```

### `allowAny`

Examples of code for this rule with `{ allowAny: true }`:

**❌ Incorrect**

```ts
let fn = (a: number, b: []) => a + b;
let fn = (a: string, b: []) => a + b;
```

**✅ Correct**

```ts
let fn = (a: number, b: any) => a + b;
let fn = (a: string, b: any) => a + b;
```

### `allowBoolean`

Examples of code for this rule with `{ allowBoolean: true }`:

**❌ Incorrect**

```ts
let fn = (a: number, b: unknown) => a + b;
let fn = (a: string, b: unknown) => a + b;
```

**✅ Correct**

```ts
let fn = (a: number, b: boolean) => a + b;
let fn = (a: string, b: boolean) => a + b;
```

### `allowNullish`

Examples of code for this rule with `{ allowNullish: true }`:

**❌ Incorrect**

```ts
let fn = (a: number, b: unknown) => a + b;
let fn = (a: number, b: never) => a + b;
let fn = (a: string, b: unknown) => a + b;
let fn = (a: string, b: never) => a + b;
```

**✅ Correct**

```ts
let fn = (a: number, b: undefined) => a + b;
let fn = (a: number, b: null) => a + b;
let fn = (a: string, b: undefined) => a + b;
let fn = (a: string, b: null) => a + b;
```

### `allowNumberAndString`

Examples of code for this rule with `{ allowNumberAndString: true }`:

**❌ Incorrect**

```ts
let fn = (a: number, b: unknown) => a + b;
let fn = (a: number, b: never) => a + b;
```

**✅ Correct**

```ts
let fn = (a: number, b: string) => a + b;
let fn = (a: number, b: number | string) => a + b;
let fn = (a: bigint, b: string) => a + b;
```

### `allowRegExp`

Examples of code for this rule with `{ allowRegExp: true }`:

**❌ Incorrect**

```ts
let fn = (a: number, b: RegExp) => a + b;
```

**✅ Correct**

```ts
let fn = (a: string, b: RegExp) => a + b;
```

### `skipCompoundAssignments`

Examples of code for this rule with `{ skipCompoundAssignments: false }`:

**❌ Incorrect**

```ts
let foo: bigint = 0n;
foo += 1;

let bar: number[] = [1];
bar += 1;
```

**✅ Correct**

```ts
let foo: bigint = 0n;
foo += 1n;

let bar: number = 1;
bar += 1;
```

## When Not To Use It

If you don't mind a risk of `"[object Object]"` or incorrect type coercions in your values, then you will not need this rule.

## Related To

- `no-base-to-string`
- `restrict-template-expressions`

## Further Reading

- `Object.prototype.toString()` MDN documentation
