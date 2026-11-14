---
title: "Disallow unsafe optional next calls (rxjs-x/no-unsafe-subject-next)"
tool: "rxjs-x"
version: "1.0"
source: "https://github.com/JasonWeinzierl/eslint-plugin-rxjs-x/blob/f7f9e1f72be9fc25c35de69d052af38a828a9c85/docs/rules/no-unsafe-subject-next.md"
commit: "f7f9e1f72be9fc25c35de69d052af38a828a9c85"
license: "MIT"
---

# Disallow unsafe optional `next` calls (`rxjs-x/no-unsafe-subject-next`)

💼 This rule is enabled in the following configs: ✅ `recommended`, 🔒 `strict`.

💭 This rule requires type information.

This rule effects failures if `next` is called without an argument and the subject's value type is not `void`.

In RxJS version 6, the `next` method's `value` parameter was optional, but a value should always be specified for subjects with non-`void` element types.
RxJS version 7 changed the `value` parameter to mandatory.

## Rule details

Examples of **incorrect** code for this rule:

```ts
const subject = new Subject<number>();
subject.next();
```

Examples of **correct** code for this rule:

```ts
const subject = new Subject<void>();
subject.next();
```

```ts
const subject = new Subject<number>();
subject.next(0);
```

## When Not To Use It

If you don't care about sending `undefined` to subjects, then you don't need this rule.
Alternatively, you may rely on TypeScript to enforce the `value` parameter,
which was made mandatory in RxJS version 7.

Type checked lint rules are more powerful than traditional lint rules, but also require configuring type checked linting.

## Resources

- Rule source
- Test source
