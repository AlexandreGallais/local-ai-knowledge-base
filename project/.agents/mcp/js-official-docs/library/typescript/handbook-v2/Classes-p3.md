---
title: "Classes (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/handbook-v2/Classes.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Classes (part 3 of 3)

## Class Expressions

   Background Reading:
   Class expressions (MDN)

Class expressions are very similar to class declarations.
The only real difference is that class expressions don't need a name, though we can refer to them via whatever identifier they ended up bound to:

```ts
const someClass = class<Type> {
  content: Type;
  constructor(value: Type) {
    this.content = value;
  }
};

const m = new someClass("Hello, world");
```

## Constructor Signatures

JavaScript classes are instantiated with the `new` operator. Given the type of a class itself, the InstanceType utility type models this operation.

```ts
class Point {
  createdAt: number;
  x: number;
  y: number
  constructor(x: number, y: number) {
    this.createdAt = Date.now()
    this.x = x;
    this.y = y;
  }
}
type PointInstance = InstanceType<typeof Point>

function moveRight(point: PointInstance) {
  point.x += 5;
}

const point = new Point(3, 4);
moveRight(point);
point.x; // => 8
```

## `abstract` Classes and Members

Classes, methods, and fields in TypeScript may be _abstract_.

An _abstract method_ or _abstract field_ is one that hasn't had an implementation provided.
These members must exist inside an _abstract class_, which cannot be directly instantiated.

The role of abstract classes is to serve as a base class for subclasses which do implement all the abstract members.
When a class doesn't have any abstract members, it is said to be _concrete_.

Let's look at an example:

```ts
abstract class Base {
  abstract getName(): string;

  printName() {
    console.log("Hello, " + this.getName());
  }
}

const b = new Base();
```

We can't instantiate `Base` with `new` because it's abstract.
Instead, we need to make a derived class and implement the abstract members:

```ts
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  getName() {
    return "world";
  }
}

const d = new Derived();
d.printName();
```

Notice that if we forget to implement the base class's abstract members, we'll get an error:

```ts
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  // forgot to do anything
}
```

### Abstract Construct Signatures

Sometimes you want to accept some class constructor function that produces an instance of a class which derives from some abstract class.

For example, you might want to write this code:

```ts
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  getName() {
    return "";
  }
}
function greet(ctor: typeof Base) {
  const instance = new ctor();
  instance.printName();
}
```

TypeScript is correctly telling you that you're trying to instantiate an abstract class.
After all, given the definition of `greet`, it's perfectly legal to write this code, which would end up constructing an abstract class:

```ts
declare const greet: any, Base: any;
// Bad!
greet(Base);
```

Instead, you want to write a function that accepts something with a construct signature:

```ts
abstract class Base {
  abstract getName(): string;
  printName() {}
}
class Derived extends Base {
  getName() {
    return "";
  }
}
function greet(ctor: new () => Base) {
  const instance = new ctor();
  instance.printName();
}
greet(Derived);
greet(Base);
```

Now TypeScript correctly tells you about which class constructor functions can be invoked - `Derived` can because it's concrete, but `Base` cannot.

## Relationships Between Classes

In most cases, classes in TypeScript are compared structurally, the same as other types.

For example, these two classes can be used in place of each other because they're identical:

```ts
class Point1 {
  x = 0;
  y = 0;
}

class Point2 {
  x = 0;
  y = 0;
}

// OK
const p: Point1 = new Point2();
```

Similarly, subtype relationships between classes exist even if there's no explicit inheritance:

```ts
class Person {
  name: string;
  age: number;
}

class Employee {
  name: string;
  age: number;
  salary: number;
}

// OK
const p: Person = new Employee();
```

This sounds straightforward, but there are a few cases that seem stranger than others.

Empty classes have no members.
In a structural type system, a type with no members is generally a supertype of anything else.
So if you write an empty class (don't!), anything can be used in place of it:

```ts
class Empty {}

function fn(x: Empty) {
  // can't do anything with 'x', so I won't
}

// All OK!
fn(window);
fn({});
fn(fn);
```
