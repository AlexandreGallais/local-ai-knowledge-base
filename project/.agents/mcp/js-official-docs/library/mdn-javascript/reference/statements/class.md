---
title: "class"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/class/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# class

The **`class`** declaration creates a binding of a new class to a given name.

You can also define classes using the `class` expression.

```js
class Polygon {
  constructor(height, width) {
    this.area = height * width;
  }
}

console.log(new Polygon(4, 3).area);
// Expected output: 12
```

## Syntax

```js
class name {
  // class body
}
class name extends otherName {
  // class body
}
```

## Description

The class body of a class declaration is executed in strict mode. The `class` declaration is very similar to `let`:

- `class` declarations are scoped to blocks as well as functions.
- `class` declarations can only be accessed after the place of declaration is reached (see temporal dead zone). For this reason, `class` declarations are commonly regarded as non-hoisted (unlike function declarations).
- `class` declarations do not create properties on `globalThis` when declared at the top level of a script (unlike function declarations).
- `class` declarations cannot be redeclared by any other declaration in the same scope.

Outside the class body, `class` declarations can be re-assigned like `let`, but you should avoid doing so. Within the class body, the binding is constant like `const`.

```js
class Foo {
  static {
    Foo = 1; // TypeError: Assignment to constant variable.
  }
}

class Foo2 {
  bar = (Foo2 = 1); // TypeError: Assignment to constant variable.
}

class Foo3 {}
Foo3 = 1;
console.log(Foo3); // 1
```

## Examples

### A class declaration

In the following example, we first define a class named `Rectangle`, then extend it to create a class named `FilledRectangle`.

Note that `super()`, used in the `constructor`, can only be used in constructors, and _must_ be called _before_ the `this` keyword can be used.

```js
class Rectangle {
  constructor(height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }
}

class FilledRectangle extends Rectangle {
  constructor(height, width, color) {
    super(height, width);
    this.name = "Filled rectangle";
    this.color = color;
  }
}
```

## See also

- `function`
- `class` expression
- Classes
