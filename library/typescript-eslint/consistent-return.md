---
title: "consistent-return"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/consistent-return.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# consistent-return

It adds support for functions that return `void` or `Promise<void>`.

**warning**
If possible, it is recommended to use tsconfig's `noImplicitReturns` option rather than this rule. `noImplicitReturns` is powered by TS's type information and control-flow analysis so it has better coverage than this rule.

**❌ Incorrect**

```ts
function foo(): undefined {}
function bar(flag: boolean): undefined {
  if (flag) return foo();
  return;
}

async function baz(flag: boolean): Promise<undefined> {
  if (flag) return;
  return foo();
}
```

**✅ Correct**

```ts
function foo(): void {}
function bar(flag: boolean): void {
  if (flag) return foo();
  return;
}

async function baz(flag: boolean): Promise<void | number> {
  if (flag) return 42;
  return;
}
```
