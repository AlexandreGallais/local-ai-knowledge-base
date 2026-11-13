---
title: "default-param-last"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/default-param-last.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# default-param-last

It adds support for optional parameters.

**❌ Incorrect**

```ts
function f(a = 0, b: number) {}
function f(a: number, b = 0, c: number) {}
function f(a: number, b?: number, c: number) {}
class Foo {
  constructor(
    public a = 10,
    private b: number,
  ) {}
}
class Foo {
  constructor(
    public a?: number,
    private b: number,
  ) {}
}
```

**✅ Correct**

```ts
function f(a = 0) {}
function f(a: number, b = 0) {}
function f(a: number, b?: number) {}
function f(a: number, b?: number, c = 0) {}
function f(a: number, b = 0, c?: number) {}
class Foo {
  constructor(
    public a,
    private b = 0,
  ) {}
}
class Foo {
  constructor(
    public a,
    private b?: number,
  ) {}
}
```
