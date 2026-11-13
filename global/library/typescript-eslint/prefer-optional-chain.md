---
title: "prefer-optional-chain"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/prefer-optional-chain.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# prefer-optional-chain

`?.` optional chain expressions provide `undefined` if an object is `null` or `undefined`.
Because the optional chain operator _only_ chains when the property value is `null` or `undefined`, it is much safer than relying upon logical AND operator chaining `&&`; which chains on any _truthy_ value.
It is also often less code to use `?.` optional chaining than `&&` truthiness checks.

This rule reports on code where an `&&` operator can be safely replaced with `?.` optional chaining.

## Examples

**❌ Incorrect**

```ts
foo && foo.a && foo.a.b && foo.a.b.c;
foo && foo['a'] && foo['a'].b && foo['a'].b.c;
foo && foo.a && foo.a.b && foo.a.b.method && foo.a.b.method();

// With empty objects
(((foo || {}).a || {}).b || {}).c;
(((foo || {})['a'] || {}).b || {}).c;

// With negated `or`s
!foo || !foo.bar;
!foo || !foo[bar];
!foo || !foo.bar || !foo.bar.baz || !foo.bar.baz();

// this rule also supports converting chained strict nullish checks:
foo.a !== null && foo.a !== undefined && foo.a.b;
```

**✅ Correct**

```ts
foo?.a?.b?.c;
foo?.['a']?.b?.c;
foo?.a?.b?.method?.();

foo?.a?.b?.c?.d?.e;

!foo?.bar;
!foo?.[bar];
!foo?.bar?.baz?.();

foo?.a != null;
```

## Options

In the context of the descriptions below a "loose boolean" operand is any operand that implicitly coerces the value to a boolean.
Specifically the argument of the not operator (`!loose`) or a bare value in a logical expression (`loose && looser`).

### `allowPotentiallyUnsafeFixesThatModifyTheReturnTypeIKnowWhatImDoing`

When this option is `true`, the rule will provide an auto-fixer for cases where the return type of the expression would change. For example for the expression `!foo || foo.bar` the return type of the expression is `true | T`, however for the equivalent optional chain `foo?.bar` the return type of the expression is `undefined | T`. Thus changing the code from a logical expression to an optional chain expression has altered the type of the expression.

In some cases this distinction _may_ matter - which is why these fixers are considered unsafe - they may break the build! For example in the following code:

```ts
declare const foo: { bar: boolean } | null | undefined;
declare function acceptsBoolean(arg: boolean): void;

// ✅ typechecks successfully as the expression only returns `boolean`
acceptsBoolean(foo != null && foo.bar);

// ❌ typechecks UNSUCCESSFULLY as the expression returns `boolean | undefined`
acceptsBoolean(foo?.bar);
```

This style of code isn't super common - which means having this option set to `true` _should_ be safe in most codebases. However we default it to `false` due to its unsafe nature. We have provided this option for convenience because it increases the autofix cases covered by the rule. If you set option to `true` the onus is entirely on you and your team to ensure that each fix is correct and safe and that it does not break the build.

When this option is `false` unsafe cases will have suggestion fixers provided instead of auto-fixers - meaning you can manually apply the fix using your IDE tooling.

### `checkAny`

Examples of code for this rule with `{ checkAny: true }`:

**❌ Incorrect**

```ts
declare const thing: any;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: any;

thing?.toString();
```

### `checkUnknown`

Examples of code for this rule with `{ checkUnknown: true }`:

**❌ Incorrect**

```ts
declare const thing: unknown;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: unknown;

thing?.toString();
```

### `checkString`

Examples of code for this rule with `{ checkString: true }`:

**❌ Incorrect**

```ts
declare const thing: string;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: string;

thing?.toString();
```

### `checkNumber`

Examples of code for this rule with `{ checkNumber: true }`:

**❌ Incorrect**

```ts
declare const thing: number;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: number;

thing?.toString();
```

### `checkBoolean`

**Note:**

This rule intentionally ignores the following case:

```ts
declare const x: false | { a: string };
x && x.a;
!x || x.a;
```

The boolean expression narrows out the non-nullish falsy cases - so converting the chain to `x?.a` would introduce a type error.

Examples of code for this rule with `{ checkBoolean: true }`:

**❌ Incorrect**

```ts
declare const thing: true;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: true;

thing?.toString();
```

### `checkBigInt`

Examples of code for this rule with `{ checkBigInt: true }`:

**❌ Incorrect**

```ts
declare const thing: bigint;

thing && thing.toString();
```

**✅ Correct**

```ts
declare const thing: bigint;

thing?.toString();
```

### `requireNullish`

Examples of code for this rule with `{ requireNullish: true }`:

**❌ Incorrect**

```ts
declare const thing1: string | null;
thing1 && thing1.toString();
```

**✅ Correct**

```ts
declare const thing1: string | null;
thing1?.toString();

declare const thing2: string;
thing2 && thing2.toString();
```

## When Not To Use It

If your project is not accurately typed, such as if it's in the process of being converted to TypeScript or is susceptible to trade-offs in control flow analysis, it may be difficult to enable this rule for particularly non-type-safe areas of code.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- TypeScript 3.7 Release Notes
- Optional Chaining Proposal
