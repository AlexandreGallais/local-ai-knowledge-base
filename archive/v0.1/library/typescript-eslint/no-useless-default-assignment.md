---
title: "no-useless-default-assignment"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-useless-default-assignment.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-useless-default-assignment

Default parameters and default values are only used if the parameter or property is `undefined`.
That can happen when a value is missing, or when one is provided and set to `undefined`.
If a non-`undefined` value is guaranteed to be provided, then there is no need to define a default.

## Examples

**❌ Incorrect**

```ts
function Bar({ foo = '' }: { foo: string }) {
  return foo;
}

const { foo = '' } = { foo: 'bar' };

const [foo = ''] = ['bar'];

[1, 2, 3].map((a = 42) => a + 1);
```

**✅ Correct**

```ts
function Bar({ foo = '' }: { foo?: string }) {
  return foo;
}

const { foo = '' } = { foo: undefined };

const [foo = ''] = [undefined];

[1, 2, 3, undefined].map((a = 42) => a + 1);
```

## Options

### `allowRuleToRunWithoutStrictNullChecksIKnowWhatIAmDoing`

If this is set to `false`, then the rule will error on every file whose `tsconfig.json` does _not_ have the `strictNullChecks` compiler option (or `strict`) set to `true`.

Without `strictNullChecks`, TypeScript essentially erases `undefined` and `null` from the types. This means when this rule inspects the types from a variable, **it will not be able to tell that the variable might be `null` or `undefined`**, which essentially makes this rule useless.

## When Not To Use It

If you use default values defensively against runtime values that bypass type checking, or for documentation purposes, you may want to disable this rule.

In a few niche situations (e.g. express.js error handler functions), the runtime `.length` of a function may be important to you.
In these rare cases, take care not to apply this rule's suggestions, as removing a default value can change a function's `.length` value.
