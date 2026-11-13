---
title: "Static initialization blocks"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/classes/static_initialization_blocks/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Static initialization blocks

**Static initialization blocks** are declared within a `class`. They contain statements to be evaluated during class initialization. This permits more flexible initialization logic than `static` properties, such as using `try...catch` or setting multiple fields from a single value. Initialization is performed in the context of the current class declaration, with access to private state, which allows the class to share information of its private elements with other classes or functions declared in the same scope (analogous to "friend" classes in C++).

```js
class ClassWithStaticInitializationBlock {
  static staticProperty1 = "Property 1";
  static staticProperty2;
  static {
    this.staticProperty2 = "Property 2";
  }
}

console.log(ClassWithStaticInitializationBlock.staticProperty1);
// Expected output: "Property 1"
console.log(ClassWithStaticInitializationBlock.staticProperty2);
// Expected output: "Property 2"
```

## Syntax

```js
class ClassWithSIB {
  static {
    // …
  }
}
```

## Description

Without static initialization blocks, complex static initialization might be achieved by calling a static method after the class declaration:

```js
class MyClass {
  static init() {
    // Access to private static fields is allowed here
  }
}

MyClass.init();
```

However, this approach exposes an implementation detail (the `init()` method) to the user of the class. On the other hand, any initialization logic declared outside the class does not have access to private static fields. Static initialization blocks allow arbitrary initialization logic to be declared within the class and executed during class evaluation.

A `class` can have any number of `static {}` initialization blocks in its class body.
These are evaluated, along with any interleaved static field initializers, in the order they are declared.
Any static initialization of a super class is performed first, before that of its sub classes.

The scope of the variables declared inside the static block is local to the block. This includes `var`, `function`, `const`, and `let` declarations. `var` declarations will not be hoisted out of the static block.

```js
var y = "Outer y";

class A {
  static field = "Inner y";
  static {
    // var y only hoisted inside block
    console.log(y); // undefined <-- not 'Outer y'

    var y = this.field;
  }
}

// var y defined in static block is not hoisted
// outside the block
console.log(y); // 'Outer y'
```

The `this` inside a static block refers to the constructor object of the class.
`super.property` can be used to access static properties of the super class.
Note however that it is a syntax error to call `super()` in a class static initialization block, or to use the `arguments` object.

The statements are evaluated synchronously. You cannot use `await` or `yield` in this block. (Think of the initialization statements as being implicitly wrapped in a function.)

The scope of the static block is nested _within_ the lexical scope of the class body, and can access private names declared within the class without causing a syntax error.

Static field initializers and static initialization blocks are evaluated one-by-one. The initialization block can refer to field values above it, but not below it. All static methods are added beforehand and can be accessed, although calling them may not behave as expected if they refer to fields below the current block.

> **Note:**
> This is more important with private static fields, because accessing a non-initialized private field throws a `TypeError`, even if the private field is declared below. (If the private field is not declared, it would be an early `SyntaxError`.)

A static initialization block may not have decorators (the class itself may).

## Examples

### Multiple blocks

The code below demonstrates a class with static initialization blocks and interleaved static field initializers.
The output shows that the blocks and fields are evaluated in execution order.

```js
class MyClass {
  static field1 = console.log("static field1");
  static {
    console.log("static block1");
  }
  static field2 = console.log("static field2");
  static {
    console.log("static block2");
  }
}
// 'static field1'
// 'static block1'
// 'static field2'
// 'static block2'
```

Note that any static initialization of a super class is performed first, before that of its sub classes.

### Using this and super

The `this` inside a static block refers to the constructor object of the class.
This code shows how to access a public static field.

```js
class A {
  static field = "static field";
  static {
    console.log(this.field);
  }
}
// 'static field'
```

The `super.property` syntax can be used inside a `static` block to reference static properties of a super class.

```js
class A {
  static field = "static field";
}

class B extends A {
  static {
    console.log(super.field);
  }
}
// 'static field'
```

### Access to private elements

This example below shows how access can be granted to a private instance field of a class from an object outside the class (example from the v8.dev blog):

```js
let getDPrivateField;

class D {
  #privateField;
  constructor(v) {
    this.#privateField = v;
  }
  static {
    getDPrivateField = (d) => d.#privateField;
  }
}

console.log(getDPrivateField(new D("private"))); // 'private'
```

## See also

- Using classes guide
- Classes
- `static`
- `class`
- Class static initialization blocks on v8.dev (2021)
- ES2022 feature: class static initialization blocks by Dr. Axel Rauschmayer (2021)
