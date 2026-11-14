---
title: "restrict-template-expressions"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/restrict-template-expressions.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# restrict-template-expressions

JavaScript automatically converts an object to a string in a string context, such as when concatenating it with a string using `+` or embedding it in a template literal using `${}`.
The default `toString()` method of objects uses the format `"[object Object]"`, which is often not what was intended.
This rule reports on values used in a template literal string that aren't strings, optionally allowing other data types that provide useful stringification results.

**Note:**

The default settings of this rule intentionally do not allow objects with a custom `toString()` method to be used in template literals, because the stringification result may not be user-friendly.

For example, arrays have a custom `toString()` method, which only calls `join()` internally, which joins the array elements with commas. This means that (1) array elements are not necessarily stringified to useful results (2) the commas don't have spaces after them, making the result not user-friendly. The best way to format arrays is to use `Intl.ListFormat`, which even supports adding the "and" conjunction where necessary.
You must explicitly call `object.toString()` if you want to use this object in a template literal, or turn on the `allowArray` option to specifically allow arrays.
The `no-base-to-string` rule can be used to guard this case against producing `"[object Object]"` by accident.

## Examples

**❌ Incorrect**

```ts
const arg1 = [1, 2];
const msg1 = `arg1 = ${arg1}`;

const arg2 = { name: 'Foo' };
const msg2 = `arg2 = ${arg2 || null}`;
```

**✅ Correct**

```ts
const arg = 'foo';
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'default'}`;

const stringWithKindProp: string & { _kind?: 'MyString' } = 'foo';
const msg3 = `stringWithKindProp = ${stringWithKindProp}`;
```

## Options

### `allowNumber`

Examples of additional **correct** code for this rule with `{ allowNumber: true }`:

```ts
const arg = 123;
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'zero'}`;
```

This option controls both numbers and BigInts.

We recommend avoiding using this option if you use any floating point numbers.
Although `` `${1}` `` evaluates to `'1'`, `` `${0.1 + 0.2}` `` evaluates to `'0.30000000000000004'`.
Consider using `.toFixed()` or `.toPrecision()` instead.

### `allowBoolean`

Examples of additional **correct** code for this rule with `{ allowBoolean: true }`:

```ts
const arg = true;
const msg1 = `arg = ${arg}`;
const msg2 = `arg = ${arg || 'not truthy'}`;
```

### `allowAny`

Examples of additional **correct** code for this rule with `{ allowAny: true }`:

```ts
const user = JSON.parse('{ "name": "foo" }');
const msg1 = `arg = ${user.name}`;
const msg2 = `arg = ${user.name || 'the user with no name'}`;
```

### `allowNullish`

Examples of additional **correct** code for this rule with `{ allowNullish: true }`:

```ts
const arg = condition ? 'ok' : null;
const msg1 = `arg = ${arg}`;
```

### `allowRegExp`

Examples of additional **correct** code for this rule with `{ allowRegExp: true }`:

```ts
const arg = new RegExp('foo');
const msg1 = `arg = ${arg}`;
```

```ts
const arg = /foo/;
const msg1 = `arg = ${arg}`;
```

### `allowNever`

Examples of additional **correct** code for this rule with `{ allowNever: true }`:

```ts
const arg = 'something';
const msg1 = typeof arg === 'string' ? arg : `arg = ${arg}`;
```

### `allowArray`

This option recursively checks the type of each array element, so an error is reported if any element has an unacceptable type.

Examples of additional **correct** code for this rule with `{ allowArray: true }`:

```ts
const arg = ['foo', 'bar'];
const msg1 = `arg = ${arg}`;
```

### `allow`

This option takes the shared `TypeOrValueSpecifier` format.

Examples of additional **correct** code for this rule with the default option `{ allow: [{ from: 'lib', name: 'Error' }, { from: 'lib', name: 'URL' }, { from: 'lib', name: 'URLSearchParams' }] }`:

```ts
const error = new Error();
const msg1 = `arg = ${error}`;
```

## When Not To Use It

If you're not worried about incorrectly stringifying non-string values in template literals, then you likely don't need this rule.

## Related To

- `no-base-to-string`
- `restrict-plus-operands`
