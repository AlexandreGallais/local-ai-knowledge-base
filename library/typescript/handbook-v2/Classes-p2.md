---
title: "Classes (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/handbook-v2/Classes.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Classes (part 2 of 3)

## Member Visibility

You can use TypeScript to control whether certain methods or properties are visible to code outside the class.

### `public`

The default visibility of class members is `public`.
A `public` member can be accessed anywhere:

```ts
class Greeter {
  public greet() {
    console.log("hi!");
  }
}
const g = new Greeter();
g.greet();
```

Because `public` is already the default visibility modifier, you don't ever _need_ to write it on a class member, but might choose to do so for style/readability reasons.

### `protected`

`protected` members are only visible to subclasses of the class they're declared in.

```ts
class Greeter {
  public greet() {
    console.log("Hello, " + this.getName());
  }
  protected getName() {
    return "hi";
  }
}

class SpecialGreeter extends Greeter {
  public howdy() {
    // OK to access protected member here
    console.log("Howdy, " + this.getName());
    //                          ^^^^^^^^^^^^^^
  }
}
const g = new SpecialGreeter();
g.greet(); // OK
g.getName();
```

#### Exposure of `protected` members

Derived classes need to follow their base class contracts, but may choose to expose a subtype of base class with more capabilities.
This includes making `protected` members `public`:

```ts
class Base {
  protected m = 10;
}
class Derived extends Base {
  // No modifier, so default is 'public'
  m = 15;
}
const d = new Derived();
console.log(d.m); // OK
```

Note that `Derived` was already able to freely read and write `m`, so this doesn't meaningfully alter the "security" of this situation.
The main thing to note here is that in the derived class, we need to be careful to repeat the `protected` modifier if this exposure isn't intentional.

#### Cross-hierarchy `protected` access

TypeScript doesn't allow accessing `protected` members of a sibling class in a class hierarchy:

```ts
class Base {
  protected x: number = 1;
}
class Derived1 extends Base {
  protected x: number = 5;
}
class Derived2 extends Base {
  f1(other: Derived2) {
    other.x = 10;
  }
  f2(other: Derived1) {
    other.x = 10;
  }
}
```

This is because accessing `x` in `Derived2` should only be legal from `Derived2`'s subclasses, and `Derived1` isn't one of them.
Moreover, if accessing `x` through a `Derived1` reference is illegal (which it certainly should be!), then accessing it through a base class reference should never improve the situation.

See also Why Can’t I Access A Protected Member From A Derived Class? which explains more of C#'s reasoning on the same topic.

### `private`

`private` is like `protected`, but doesn't allow access to the member even from subclasses:

```ts
class Base {
  private x = 0;
}
const b = new Base();
// Can't access from outside the class
console.log(b.x);
```

```ts
class Base {
  private x = 0;
}
class Derived extends Base {
  showX() {
    // Can't access in subclasses
    console.log(this.x);
  }
}
```

Because `private` members aren't visible to derived classes, a derived class can't increase their visibility:

```ts
class Base {
  private x = 0;
}
class Derived extends Base {
  x = 1;
}
```

#### Cross-instance `private` access

Different OOP languages disagree about whether different instances of the same class may access each others' `private` members.
While languages like Java, C#, C++, Swift, and PHP allow this, Ruby does not.

TypeScript does allow cross-instance `private` access:

```ts
class A {
  private x = 10;

  public sameAs(other: A) {
    // No error
    return other.x === this.x;
  }
}
```

#### Caveats

Like other aspects of TypeScript's type system, `private` and `protected` are only enforced during type checking.

This means that JavaScript runtime constructs like `in` or simple property lookup can still access a `private` or `protected` member:

```ts
class MySafe {
  private secretKey = 12345;
}
```

```js
// In a JavaScript file...
const s = new MySafe();
// Will print 12345
console.log(s.secretKey);
```

`private` also allows access using bracket notation during type checking. This makes `private`-declared fields potentially easier to access for things like unit tests, with the drawback that these fields are _soft private_ and don't strictly enforce privacy.

```ts
class MySafe {
  private secretKey = 12345;
}

const s = new MySafe();

// Not allowed during type checking
console.log(s.secretKey);

// OK
console.log(s["secretKey"]);
```

Unlike TypeScripts's `private`, JavaScript's private fields (`#`) remain private after compilation and do not provide the previously mentioned escape hatches like bracket notation access, making them _hard private_.

```ts
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

```ts
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

When compiling to ES2021 or less, TypeScript will use WeakMaps in place of `#`.

```ts
class Dog {
  #barkAmount = 0;
  personality = "happy";

  constructor() {}
}
```

If you need to protect values in your class from malicious actors, you should use mechanisms that offer hard runtime privacy, such as closures, WeakMaps, or private fields. Note that these added privacy checks during runtime could affect performance.

## Static Members

   Background Reading:
   Static Members (MDN)

Classes may have `static` members.
These members aren't associated with a particular instance of the class.
They can be accessed through the class constructor object itself:

```ts
class MyClass {
  static x = 0;
  static printX() {
    console.log(MyClass.x);
  }
}
console.log(MyClass.x);
MyClass.printX();
```

Static members can also use the same `public`, `protected`, and `private` visibility modifiers:

```ts
class MyClass {
  private static x = 0;
}
console.log(MyClass.x);
```

Static members are also inherited:

```ts
class Base {
  static getGreeting() {
    return "Hello world";
  }
}
class Derived extends Base {
  myGreeting = Derived.getGreeting();
}
```

### Special Static Names

It's generally not safe/possible to overwrite properties from the `Function` prototype.
Because classes are themselves functions that can be invoked with `new`, certain `static` names can't be used.
Function properties like `name`, `length`, and `call` aren't valid to define as `static` members:

```ts
class S {
  static name = "S!";
}
```

### Why No Static Classes?

TypeScript (and JavaScript) don't have a construct called `static class` the same way as, for example, C# does.

Those constructs _only_ exist because those languages force all data and functions to be inside a class; because that restriction doesn't exist in TypeScript, there's no need for them.
A class with only a single instance is typically just represented as a normal _object_ in JavaScript/TypeScript.

For example, we don't need a "static class" syntax in TypeScript because a regular object (or even top-level function) will do the job just as well:

```ts
// Unnecessary "static" class
class MyStaticClass {
  static doSomething() {}
}

// Preferred (alternative 1)
function doSomething() {}

// Preferred (alternative 2)
const MyHelperObject = {
  dosomething() {},
};
```

## `static` Blocks in Classes

Static blocks allow you to write a sequence of statements with their own scope that can access private fields within the containing class. This means that we can write initialization code with all the capabilities of writing statements, no leakage of variables, and full access to our class's internals.

```ts
declare function loadLastInstances(): any[]
class Foo {
    static #count = 0;

    get count() {
        return Foo.#count;
    }

    static {
        try {
            const lastInstances = loadLastInstances();
            Foo.#count += lastInstances.length;
        }
        catch {}
    }
}
```

## Generic Classes

Classes, much like interfaces, can be generic.
When a generic class is instantiated with `new`, its type parameters are inferred the same way as in a function call:

```ts
class Box<Type> {
  contents: Type;
  constructor(value: Type) {
    this.contents = value;
  }
}

const b = new Box("hello!");
```

Classes can use generic constraints and defaults the same way as interfaces.

### Type Parameters in Static Members

This code isn't legal, and it may not be obvious why:

```ts
class Box<Type> {
  static defaultValue: Type;
}
```

Remember that types are always fully erased!
At runtime, there's only _one_ `Box.defaultValue` property slot.
This means that setting `Box<string>.defaultValue` (if that were possible) would _also_ change `Box<number>.defaultValue` - not good.
The `static` members of a generic class can never refer to the class's type parameters.

## `this` at Runtime in Classes

   Background Reading:
   this keyword (MDN)

It's important to remember that TypeScript doesn't change the runtime behavior of JavaScript, and that JavaScript is somewhat famous for having some peculiar runtime behaviors.

JavaScript's handling of `this` is indeed unusual:

```ts
class MyClass {
  name = "MyClass";
  getName() {
    return this.name;
  }
}
const c = new MyClass();
const obj = {
  name: "obj",
  getName: c.getName,
};

// Prints "obj", not "MyClass"
console.log(obj.getName());
```

Long story short, by default, the value of `this` inside a function depends on _how the function was called_.
In this example, because the function was called through the `obj` reference, its value of `this` was `obj` rather than the class instance.

This is rarely what you want to happen!
TypeScript provides some ways to mitigate or prevent this kind of error.

### Arrow Functions

   Background Reading:
   Arrow functions (MDN)

If you have a function that will often be called in a way that loses its `this` context, it can make sense to use an arrow function property instead of a method definition:

```ts
class MyClass {
  name = "MyClass";
  getName = () => {
    return this.name;
  };
}
const c = new MyClass();
const g = c.getName;
// Prints "MyClass" instead of crashing
console.log(g());
```

This has some trade-offs:

- The `this` value is guaranteed to be correct at runtime, even for code not checked with TypeScript
- This will use more memory, because each class instance will have its own copy of each function defined this way
- You can't use `super.getName` in a derived class, because there's no entry in the prototype chain to fetch the base class method from

### `this` parameters

In a method or function definition, an initial parameter named `this` has special meaning in TypeScript.
These parameters are erased during compilation:

```ts
type SomeType = any;
// TypeScript input with 'this' parameter
function fn(this: SomeType, x: number) {
  /* ... */
}
```

```js
// JavaScript output
function fn(x) {
  /* ... */
}
```

TypeScript checks that calling a function with a `this` parameter is done so with a correct context.
Instead of using an arrow function, we can add a `this` parameter to method definitions to statically enforce that the method is called correctly:

```ts
class MyClass {
  name = "MyClass";
  getName(this: MyClass) {
    return this.name;
  }
}
const c = new MyClass();
// OK
c.getName();

// Error, would crash
const g = c.getName;
console.log(g());
```

This method makes the opposite trade-offs of the arrow function approach:

- JavaScript callers might still use the class method incorrectly without realizing it
- Only one function per class definition gets allocated, rather than one per class instance
- Base method definitions can still be called via `super`.

## `this` Types

In classes, a special type called `this` refers _dynamically_ to the type of the current class.
Let's see how this is useful:

```ts
class Box {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}
```

Here, TypeScript inferred the return type of `set` to be `this`, rather than `Box`.
Now let's make a subclass of `Box`:

```ts
class Box {
  contents: string = "";
  set(value: string) {
    this.contents = value;
    return this;
  }
}
class ClearableBox extends Box {
  clear() {
    this.contents = "";
  }
}

const a = new ClearableBox();
const b = a.set("hello");
```

You can also use `this` in a parameter type annotation:

```ts
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}
```

This is different from writing `other: Box` -- if you have a derived class, its `sameAs` method will now only accept other instances of that same derived class:

```ts
class Box {
  content: string = "";
  sameAs(other: this) {
    return other.content === this.content;
  }
}

class DerivedBox extends Box {
  otherContent: string = "?";
}

const base = new Box();
const derived = new DerivedBox();
derived.sameAs(base);
```

### `this`-based type guards

You can use `this is Type` in the return position for methods in classes and interfaces.
When mixed with a type narrowing (e.g. `if` statements) the type of the target object would be narrowed to the specified `Type`.

```ts
class FileSystemObject {
  isFile(): this is FileRep {
    return this instanceof FileRep;
  }
  isDirectory(): this is Directory {
    return this instanceof Directory;
  }
  isNetworked(): this is Networked & this {
    return this.networked;
  }
  constructor(public path: string, private networked: boolean) {}
}

class FileRep extends FileSystemObject {
  constructor(path: string, public content: string) {
    super(path, false);
  }
}

class Directory extends FileSystemObject {
  children: FileSystemObject[];
}

interface Networked {
  host: string;
}

const fso: FileSystemObject = new FileRep("foo/bar.txt", "foo");

if (fso.isFile()) {
  fso.content;
} else if (fso.isDirectory()) {
  fso.children;
} else if (fso.isNetworked()) {
  fso.host;
}
```

A common use-case for a this-based type guard is to allow for lazy validation of a particular field. For example, this case removes an `undefined` from the value held inside box when `hasValue` has been verified to be true:

```ts
class Box<T> {
  value?: T;

  hasValue(): this is { value: T } {
    return this.value !== undefined;
  }
}

const box = new Box<string>();
box.value = "Gameboy";

box.value;

if (box.hasValue()) {
  box.value;
}
```

## Parameter Properties

TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value.
These are called _parameter properties_ and are created by prefixing a constructor argument with one of the visibility modifiers `public`, `private`, `protected`, or `readonly`.
The resulting field gets those modifier(s):

```ts
class Params {
  constructor(
    public readonly x: number,
    protected y: number,
    private z: number
  ) {
    // No body necessary
  }
}
const a = new Params(1, 2, 3);
console.log(a.x);
console.log(a.z);
```
