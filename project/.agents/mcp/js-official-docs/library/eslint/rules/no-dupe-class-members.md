---
title: "no-dupe-class-members"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-dupe-class-members.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-dupe-class-members

If there are declarations of the same name in class members, the last declaration overwrites other declarations silently.
It can cause unexpected behaviors.

```js
class Foo {
  bar() { console.log("hello"); }
  bar() { console.log("goodbye"); }
}

const foo = new Foo();
foo.bar(); // goodbye
```

## Rule Details

This rule is aimed to flag the use of duplicate names in class members.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-dupe-class-members: "error"*/

class A {
  bar() { }
  bar() { }
}

class B {
  bar() { }
  get bar() { }
}

class C {
  bar;
  bar;
}

class D {
  bar;
  bar() { }
}

class E {
  static bar() { }
  static bar() { }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-dupe-class-members: "error"*/

class A {
  bar() { }
  qux() { }
}

class B {
  get bar() { }
  set bar(value) { }
}

class C {
  bar;
  qux;
}

class D {
  bar;
  qux() { }
}

class E {
  static bar() { }
  bar() { }
}
```

This rule additionally supports TypeScript type syntax. It has support for TypeScript's method overload definitions.

Examples of **correct** TypeScript code for this rule:

**Correct:**

```ts
/* eslint no-dupe-class-members: "error" */

class A {
	foo(value: string): void;
	foo(value: number): void;
	foo(value: string | number) {} // ✅ This is the actual implementation.
}
```

## Options

This rule has no options.

## When Not To Use It

This rule should not be used in ES3/5 environments.

In ES2015 (ES6) or later, if you don't want to be notified about duplicate names in class members, you can safely disable this rule.
