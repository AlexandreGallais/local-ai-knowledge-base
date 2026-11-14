---
title: "prefer-logical-operator-over-ternary"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/prefer-logical-operator-over-ternary.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# prefer-logical-operator-over-ternary

📝 Prefer using a logical operator over a ternary.

💼 This rule is enabled in the following configs: ✅ `recommended`, ☑️ `unopinionated`.

🔧💡 This rule is automatically fixable by the `--fix` CLI option and manually fixable by editor suggestions.

Disallow ternary operators when simpler logical operator alternatives exist.

For patterns such as `foo ? foo : bar`, the rule provides suggestions instead of automatic fixes because either `Logical OR` (`||`) or the nullish coalescing operator (`??`) may be appropriate.

For explicit nullish-check ternaries, this rule only suggests `??` when the source code itself proves nullish intent. It does not report arbitrary `foo || bar` expressions. TypeScript users who want type-aware `||` checks should use `@typescript-eslint/prefer-nullish-coalescing`.

The rule also handles ternaries with exactly one constant boolean branch, including simple `const` aliases. With TypeScript type information, it also recognizes identifiers whose types are exactly `true` or `false`, including declared and imported identifiers.

- `condition ? true : expression` becomes `Boolean(condition) || expression`.
- `condition ? false : expression` becomes `!condition && expression`.
- `condition ? expression : false` becomes `Boolean(condition) && expression`.
- `condition ? expression : true` becomes `!condition || expression`.

`Boolean()` is omitted when the condition is known boolean. The other branch must be known boolean.

These cases are reported without a fix in TypeScript, in JavaScript parsed with TypeScript services, or when they contain comments. TypeScript rewrites can change narrowing, inferred types, or overload selection, even when using `!!` instead of `Boolean()`. This check is skipped inside `with` statements. Ternaries with two constant boolean branches are also skipped; use ESLint's `no-unneeded-ternary` for two boolean literals.

## Examples

```js
// ❌
value ? true : Boolean(fallback());

// ✅
Boolean(value) || Boolean(fallback());
```

```js
// ❌
value ? Boolean(fallback()) : false;

// ✅
Boolean(value) && Boolean(fallback());
```

In TypeScript, use `!!` when the other branch relies on truthiness narrowing. `Boolean()` does not preserve that narrowing.

```ts
declare const constraint: object | undefined;
declare function visit(value: object): boolean;

// ❌
constraint ? visit(constraint) : false;

// ✅
!!constraint && visit(constraint);
```

```js
// ❌
foo ? foo : bar;

// ✅
foo ?? bar;

// ✅
foo || bar;
```

```js
// ❌
foo.bar ? foo.bar : foo.baz

// ✅
foo.bar ?? foo.baz
```

```js
// ❌
foo?.bar ? foo.bar : baz

// ✅
foo?.bar ?? baz
```

```js
// ❌
!bar ? foo : bar;

// ✅
bar ?? foo;
```

```js
// ❌
foo == null ? bar : foo;

// ✅
foo ?? bar;
```

```js
// ❌
foo === null || foo === undefined ? bar : foo;

// ✅
foo ?? bar;
```

```js
// ❌
foo !== null && foo !== undefined ? foo : bar;

// ✅
foo ?? bar;
```

```js
// ❌
foo == null ? undefined : foo.bar;

// ✅
foo?.bar;
```

```js
// ✅
foo ? bar : baz;
```
