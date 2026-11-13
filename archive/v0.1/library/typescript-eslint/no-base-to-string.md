---
title: "no-base-to-string"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-base-to-string.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-base-to-string

JavaScript will call `toString()` on an object when it is converted to a string, such as when concatenated with a string (`expr + ''`), when interpolated into template literals (`${expr}`), or when passed as an argument to the String constructor (`String(expr)`).
The default Object `.toString()` and `toLocaleString()` use the format `"[object Object]"`, which is often not what was intended.
This rule reports on stringified values that aren't primitives and don't define a more useful `.toString()` or `toLocaleString()` method.

> Note that `Function` provides its own `.toString()` and `toLocaleString()` that return the function's code.
> Functions are not flagged by this rule.

## Examples

**❌ Incorrect**

```ts
// Passing an object or class instance to string concatenation:
'' + {};

class MyClass {}
const value = new MyClass();
value + '';

// Interpolation and manual .toString() and `toLocaleString()` calls too:
`Value: ${value}`;
String({});
({}).toString();
({}).toLocaleString();

// Stringifying objects or instances in an array with the `Array.prototype.join`.
[{}, new MyClass()].join('');
```

**✅ Correct**

```ts
// These types all have useful .toString() and `toLocaleString()` methods
'Text' + true;
`Value: ${123}`;
`Arrays too: ${[1, 2, 3]}`;
(() => {}).toString();
String(42);
(() => {}).toLocaleString();

// Defining a custom .toString class is considered acceptable
class CustomToString {
  toString() {
    return 'Hello, world!';
  }
}
`Value: ${new CustomToString()}`;

const literalWithToString = {
  toString: () => 'Hello, world!',
};

`Value: ${literalWithToString}`;
```

## Alternatives

Consider using `JSON.stringify` when you want to convert non-primitive things to string for logging, debugging, etc.

```typescript
declare const o: object;
const errorMessage = 'Found unexpected value: ' + JSON.stringify(o);
```

## Options

### `ignoredTypeNames`

This is useful for types whose type definitions do not declare `toString()` or `toLocaleString()`, even though the values have a useful implementation at runtime.
This can happen in older versions of TypeScript, where types like `RegExp`, `URL`, and `URLSearchParams` were missing those declarations.

The following patterns are considered correct with the default options:

```ts
`${/regex/}`;
'' + /regex/;
/regex/.toString();
let value = /regex/;
value.toString();
let text = `${value}`;
String(/regex/);

'' + new Error('error');
`${new URL('https://example.com')}`;
String(new URLSearchParams({ key: 'value' }));
```

### `checkUnknown`

The following patterns are considered incorrect with the options `{ checkUnknown: true }`:

```ts
declare const x: unknown;
String(x);
```

## When Not To Use It

If you don't mind a risk of `"[object Object]"` or incorrect type coercions in your values, then you will not need this rule.

## Related To

- `restrict-plus-operands`
- `restrict-template-expressions`

## Further Reading

- `Object.prototype.toString()` MDN documentation
- `Object.prototype.toLocaleString()` MDN documentation
- Microsoft/TypeScript Add missing toString declarations for base types that have them
