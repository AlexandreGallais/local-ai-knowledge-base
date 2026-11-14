---
title: "class expression"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/operators/class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# class expression

The **`class`** keyword can be used to define a class inside an expression.

You can also define classes using the `class` declaration.

```js
const Rectangle = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  area() {
    return this.height * this.width;
  }
};

console.log(new Rectangle(5, 8).area());
// Expected output: 40
```

## Syntax

```js
class {
  // class body
}
class name {
  // class body
}
```

> **Note:**
> An expression statement cannot begin with the keyword `class` to avoid ambiguity with a `class` declaration. The `class` keyword only begins an expression when it appears in a context that cannot accept statements.

## Description

A `class` expression is very similar to, and has almost the same syntax as, a `class` declaration. As with `class` declarations, the body of a `class` expression is executed in strict mode. The main difference between a `class` expression and a `class` declaration is the _class name_, which can be omitted in `class` expressions to create _anonymous_ classes. Class expressions allow you to redefine classes, while redeclaring a class using `class` declarations throws a `SyntaxError`. See also the chapter about classes for more information.

## Examples

### A basic class expression

This is just an anonymous class expression which you can refer to using the variable `Foo`.

```js
const Foo = class {
  constructor() {}
  bar() {
    return "Hello World!";
  }
};

const instance = new Foo();
instance.bar(); // "Hello World!"
Foo.name; // "Foo"
```

### Named class expressions

If you want to refer to the current class inside the class body, you can create a _named class expression_. The name is only visible within the scope of the class expression itself.

```js
const Foo = class NamedFoo {
  constructor() {}
  whoIsThere() {
    return NamedFoo.name;
  }
};
const bar = new Foo();
bar.whoIsThere(); // "NamedFoo"
NamedFoo.name; // ReferenceError: NamedFoo is not defined
Foo.name; // "NamedFoo"
```

## See also

- `class`
- `Classes`
