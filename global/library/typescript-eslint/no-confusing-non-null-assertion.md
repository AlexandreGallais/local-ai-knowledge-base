---
title: "no-confusing-non-null-assertion"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-confusing-non-null-assertion.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-confusing-non-null-assertion

Using a non-null assertion (`!`) next to an assignment or equality check (`=` or `==` or `===`) creates code that is confusing as it looks similar to an inequality check (`!=` `!==`).

```typescript
a! == b; // a non-null assertion(`!`) and an equals test(`==`)
a !== b; // not equals test(`!==`)
a! === b; // a non-null assertion(`!`) and a triple equals test(`===`)
```

Using a non-null assertion (`!`) next to an in test (`in`) or an instanceof test (`instanceof`) creates code that is confusing since it may look like the operator is negated, but it is actually not.

```typescript
a! in b; // a non-null assertion(`!`) and an in test(`in`)
a !in b; // also a non-null assertion(`!`) and an in test(`in`)
!(a in b); // a negated in test

a! instanceof b; // a non-null assertion(`!`) and an instanceof test(`instanceof`)
a !instanceof b; // also a non-null assertion(`!`) and an instanceof test(`instanceof`)
!(a instanceof b); // a negated instanceof test
````

This rule flags confusing `!` assertions and suggests either removing them or wrapping the asserted expression in `()` parenthesis.

## Examples

**❌ Incorrect**

```ts
interface Foo {
  bar?: string;
  num?: number;
}

const foo: Foo = getFoo();
const isEqualsBar = foo.bar! == 'hello';
const isEqualsNum = 1 + foo.num! == 2;
```

**✅ Correct**

```ts
interface Foo {
  bar?: string;
  num?: number;
}

const foo: Foo = getFoo();
const isEqualsBar = foo.bar == 'hello';
const isEqualsNum = (1 + foo.num!) == 2;
```

## When Not To Use It

If you don't care about this confusion, then you will not need this rule.

## Further Reading

- `Issue: Easy misunderstanding: "! ==="` in TypeScript repo
