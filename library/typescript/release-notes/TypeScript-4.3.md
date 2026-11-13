---
title: "TypeScript 4.3 (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.3.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.3

## Separate Write Types on Properties

In JavaScript, it's pretty common for APIs to convert values that are passed in before storing them.
This often happens with getters and setters too.
For example, let's imagine we've got a class with a setter that always converts a value into a `number` before saving it in a private field.

```js
class Thing {
  #size = 0;

  get size() {
    return this.#size;
  }
  set size(value) {
    let num = Number(value);

    // Don't allow NaN and stuff.
    if (!Number.isFinite(num)) {
      this.#size = 0;
      return;
    }

    this.#size = num;
  }
}
```

How would we type this JavaScript code in TypeScript?
Well, technically we don't have to do anything special here - TypeScript can look at this with no explicit types and can figure out that `size` is a number.

The problem is that `size` allows you to assign more than just `number`s to it.
We could get around this by saying that `size` has the type `unknown` or `any` like in this snippet:

```ts
class Thing {
  // ...
  get size(): unknown {
    return this.#size;
  }
}
```

But that's no good - `unknown` forces people reading `size` to do a type assertion, and `any` won't catch any mistakes.
If we really want to model APIs that convert values, previous versions of TypeScript forced us to pick between being precise (which makes reading values easier, and writing harder) and being permissive (which makes writing values easier, and reading harder).

That's why TypeScript 4.3 allows you to specify types for reading and writing to properties.

```ts
class Thing {
  #size = 0;

  get size(): number {
    return this.#size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN and stuff.
    if (!Number.isFinite(num)) {
      this.#size = 0;
      return;
    }

    this.#size = num;
  }
}
```

In the above example, our `set` accessor takes a broader set of types (`string`s, `boolean`s, and `number`s), but our `get` accessor always guarantees it will be a `number`.
Now we can finally assign other types to these properties with no errors!

```ts
class Thing {
  #size = 0;

  get size(): number {
    return this.#size;
  }

  set size(value: string | number | boolean) {
    let num = Number(value);

    // Don't allow NaN and stuff.
    if (!Number.isFinite(num)) {
      this.#size = 0;
      return;
    }

    this.#size = num;
  }
}
let thing = new Thing();

// Assigning other types to `thing.size` works!
thing.size = "hello";
thing.size = true;
thing.size = 42;

// Reading `thing.size` always produces a number!
let mySize: number = thing.size;
```

When considering how two properties with the same name relate to each other, TypeScript will only use the "reading" type (e.g. the type on the `get` accessor above).
"Writing" types are only considered when directly writing to a property.

Keep in mind, this isn't a pattern that's limited to classes.
You can write getters and setters with different types in object literals.

```ts
function makeThing(): Thing {
  let size = 0;
  return {
    get size(): number {
      return size;
    },
    set size(value: string | number | boolean) {
      let num = Number(value);

      // Don't allow NaN and stuff.
      if (!Number.isFinite(num)) {
        size = 0;
        return;
      }

      size = num;
    },
  };
}
```

In fact, we've added syntax to interfaces/object types to support different reading/writing types on properties.

```ts
// Now valid!
interface Thing {
    get size(): number
    set size(value: number | string | boolean);
}
```

One limitation of using different types for reading and writing properties is that the type for reading a property has to be assignable to the type that you're writing.
In other words, the getter type has to be assignable to the setter.
This ensures some level of consistency, so that a property is always assignable to itself.

For more information on this feature, take a look at the implementing pull request.

## `override` and the `--noImplicitOverride` Flag

When extending classes in JavaScript, the language makes it super easy (pun intended) to override methods - but unfortunately, there are some mistakes that you can run into.

One big one is missing renames.
For example, take the following classes:

```ts
class SomeComponent {
  show() {
    // ...
  }
  hide() {
    // ...
  }
}

class SpecializedComponent extends SomeComponent {
  show() {
    // ...
  }
  hide() {
    // ...
  }
}
```

`SpecializedComponent` subclasses `SomeComponent`, and overrides the `show` and `hide` methods.
What happens if someone decides to rip out `show` and `hide` and replace them with a single method?

```diff
 class SomeComponent {
-    show() {
-        // ...
-    }
-    hide() {
-        // ...
-    }
+    setVisible(value: boolean) {
+        // ...
+    }
 }
 class SpecializedComponent extends SomeComponent {
     show() {
         // ...
     }
     hide() {
         // ...
     }
 }
```

_Oh no!_
Our `SpecializedComponent` didn't get updated.
Now it's just adding these two useless `show` and `hide` methods that probably won't get called.

Part of the issue here is that a user can't make it clear whether they meant to add a new method, or to override an existing one.
That's why TypeScript 4.3 adds the `override` keyword.

```ts
class SpecializedComponent extends SomeComponent {
    override show() {
        // ...
    }
    override hide() {
        // ...
    }
}
```

When a method is marked with `override`, TypeScript will always make sure that a method with the same name exists in a the base class.

```ts
class SomeComponent {
    setVisible(value: boolean) {
        // ...
    }
}
class SpecializedComponent extends SomeComponent {
    override show() {

    }
}
```

This is a big improvement, but it doesn't help if you _forget_ to write `override` on a method - and that's a big mistake users can run into also.

For example, you might accidentally "trample over" a method that exists in a base class without realizing it.

```ts
class Base {
  someHelperMethod() {
    // ...
  }
}

class Derived extends Base {
  // Oops! We weren't trying to override here,
  // we just needed to write a local helper method.
  someHelperMethod() {
    // ...
  }
}
```

That's why TypeScript 4.3 _also_ provides a new `noImplicitOverride` flag.
When this option is turned on, it becomes an error to override any method from a superclass unless you explicitly use an `override` keyword.
In that last example, TypeScript would error under `noImplicitOverride`, and give us a clue that we probably need to rename our method inside of `Derived`.

We'd like to extend our thanks to our community for the implementation here.
The work for these items was implemented in a pull request by Wenlu Wang, though an earlier pull request implementing only the `override` keyword by Paul Cody Johnston served as a basis for direction and discussion.
We extend our gratitude for putting in the time for these features.

## Template String Type Improvements

In recent versions, TypeScript introduced a new type construct: template string types.
These are types that either construct new string-like types by concatenating...

```ts
type Color = "red" | "blue";
type Quantity = "one" | "two";

type SeussFish = `${Quantity | Color} fish`;
// same as
//   type SeussFish = "one fish" | "two fish"
//                  | "red fish" | "blue fish";
```

...or match patterns of other string-like types.

```ts
declare let s1: `${number}-${number}-${number}`;
declare let s2: `1-2-3`;

// Works!
s1 = s2;
```

The first change we made is just in when TypeScript will infer a template string type.
When a template string is _contextually typed_ by a string-literal-like type (i.e. when TypeScript sees we're passing a template string to something that takes a literal type) it will try to give that expression a template type.

```ts
function bar(s: string): `hello ${string}` {
    // Previously an error, now works!
    return `hello ${s}`;
}
```

This also kicks in when inferring types, and the type parameter `extends string`

```ts
declare let s: string;
declare function f<T extends string>(x: T): T;

// Previously: string
// Now       : `hello ${string}`
let x2 = f(`hello ${s}`);
```

The second major change here is that TypeScript can now better-relate, and _infer between_, different template string types.

To see this, take the following example code:

```ts
declare let s1: `${number}-${number}-${number}`;
declare let s2: `1-2-3`;
declare let s3: `${number}-2-3`;

s1 = s2;
s1 = s3;
```

When checking against a string literal type like on `s2`, TypeScript could match against the string contents and figure out that `s2` was compatible with `s1` in the first assignment;
however, as soon as it saw another template string, it just gave up.
As a result, assignments like `s3` to `s1` just didn't work.

TypeScript now actually does the work to prove whether or not each part of a template string can successfully match.
You can now mix and match template strings with different substitutions and TypeScript will do a good job to figure out whether they're really compatible.

```ts
declare let s1: `${number}-${number}-${number}`;
declare let s2: `1-2-3`;
declare let s3: `${number}-2-3`;
declare let s4: `1-${number}-3`;
declare let s5: `1-2-${number}`;
declare let s6: `${number}-2-${number}`;

// Now *all of these* work!
s1 = s2;
s1 = s3;
s1 = s4;
s1 = s5;
s1 = s6;
```

In doing this work, we were also sure to add better inference capabilities.
You can see an example of these in action:

```ts
declare function foo<V extends string>(arg: `*${V}*`): V;

function test<T extends string>(s: string, n: number, b: boolean, t: T) {
    let x1 = foo("*hello*");            // "hello"
    let x2 = foo("**hello**");          // "*hello*"
    let x3 = foo(`*${s}*` as const);    // string
    let x4 = foo(`*${n}*` as const);    // `${number}`
    let x5 = foo(`*${b}*` as const);    // "true" | "false"
    let x6 = foo(`*${t}*` as const);    // `${T}`
    let x7 = foo(`**${s}**` as const);  // `*${string}*`
}
```

For more information, see the original pull request on leveraging contextual types, along with the pull request that improved inference and checking between template types.

## ECMAScript `#private` Class Elements

TypeScript 4.3 expands which elements in a class can be given `#private` `#names` to make them truly private at run-time.
In addition to properties, methods and accessors can also be given private names.

```ts
class Foo {
  #someMethod() {
    //...
  }

  get #someValue() {
    return 100;
  }

  publicMethod() {
    // These work.
    // We can access private-named members inside this class.
    this.#someMethod();
    return this.#someValue;
  }
}

new Foo().#someMethod();
//        ~~~~~~~~~~~
// error!
// Property '#someMethod' is not accessible
// outside class 'Foo' because it has a private identifier.

new Foo().#someValue;
//        ~~~~~~~~~~
// error!
// Property '#someValue' is not accessible
// outside class 'Foo' because it has a private identifier.
```

Even more broadly, static members can now also have private names.

```ts
class Foo {
  static #someMethod() {
    // ...
  }
}

Foo.#someMethod();
//  ~~~~~~~~~~~
// error!
// Property '#someMethod' is not accessible
// outside class 'Foo' because it has a private identifier.
```

This feature was authored in a pull request from our friends at Bloomberg - written by Titian Cernicova-Dragomirand Kubilay Kahveci, with support and expertise from Joey Watts, Rob Palmer, and Tim McClure.
We'd like to extend our thanks to all of them!

## `ConstructorParameters` Works on Abstract Classes

In TypeScript 4.3, the `ConstructorParameters` type helper now works on `abstract` classes.

```ts
abstract class C {
  constructor(a: string, b: number) {
    // ...
  }
}

// Has the type '[a: string, b: number]'.
type CParams = ConstructorParameters<typeof C>;
```

This is thanks to work done in TypeScript 4.2, where construct signatures can be marked as abstract:

```ts
type MyConstructorOf<T> = {
    abstract new(...args: any[]): T;
}

// or using the shorthand syntax:

type MyConstructorOf<T> = abstract new (...args: any[]) => T;
```

You can see the change in more detail on GitHub.
