---
title: "TypeScript 4.2 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.2.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

## Smarter Type Alias Preservation

TypeScript has a way to declare new names for types called type aliases.
If you're writing a set of functions that all work on `string | number | boolean`, you can write a type alias to avoid repeating yourself over and over again.

```ts
type BasicPrimitive = number | string | boolean;
```

TypeScript has always used a set of rules and guesses for when to reuse type aliases when printing out types.
For example, take the following code snippet.

```ts
export type BasicPrimitive = number | string | boolean;

export function doStuff(value: BasicPrimitive) {
  let x = value;
  return x;
}
```

If we hover our mouse over `x` in an editor like Visual Studio, Visual Studio Code, or the TypeScript Playground, we'll get a quick info panel that shows the type `BasicPrimitive`.
Likewise, if we get the declaration file output (`.d.ts` output) for this file, TypeScript will say that `doStuff` returns `BasicPrimitive`.

However, what happens if we return a `BasicPrimitive` or `undefined`?

```ts
export type BasicPrimitive = number | string | boolean;

export function doStuff(value: BasicPrimitive) {
  if (Math.random() < 0.5) {
    return undefined;
  }

  return value;
}
```

We can see what happens in the TypeScript 4.1 playground.
While we might want TypeScript to display the return type of `doStuff` as `BasicPrimitive | undefined`, it instead displays `string | number | boolean | undefined`!
What gives?

Well this has to do with how TypeScript represents types internally.
When creating a union type out of one or more union types, it will always _normalize_ those types into a new flattened union type - but doing that loses information.
The type-checker would have to find every combination of types from `string | number | boolean | undefined` to see what type aliases could have been used, and even then, there might be multiple type aliases to `string | number | boolean`.

In TypeScript 4.2, our internals are a little smarter.
We keep track of how types were constructed by keeping around parts of how they were originally written and constructed over time.
We also keep track of, and differentiate, type aliases to instances of other aliases!

Being able to print back the types based on how you used them in your code means that as a TypeScript user, you can avoid some unfortunately humongous types getting displayed, and that often translates to getting better `.d.ts` file output, error messages, and in-editor type displays in quick info and signature help.
This can help TypeScript feel a little bit more approachable for newcomers.

For more information, check out the first pull request that improves various cases around preserving union type aliases, along with a second pull request that preserves indirect aliases.

## Leading/Middle Rest Elements in Tuple Types

In TypeScript, tuple types are meant to model arrays with specific lengths and element types.

```ts
// A tuple that stores a pair of numbers
let a: [number, number] = [1, 2];

// A tuple that stores a string, a number, and a boolean
let b: [string, number, boolean] = ["hello", 42, true];
```

Over time, TypeScript's tuple types have become more and more sophisticated, since they're also used to model things like parameter lists in JavaScript.
As a result, they can have optional elements and rest elements, and can even have labels for tooling and readability.

```ts
// A tuple that has either one or two strings.
let c: [string, string?] = ["hello"];
c = ["hello", "world"];

// A labeled tuple that has either one or two strings.
let d: [first: string, second?: string] = ["hello"];
d = ["hello", "world"];

// A tuple with a *rest element* - holds at least 2 strings at the front,
// and any number of booleans at the back.
let e: [string, string, ...boolean[]];

e = ["hello", "world"];
e = ["hello", "world", false];
e = ["hello", "world", true, false, true];
```

In TypeScript 4.2, rest elements specifically been expanded in how they can be used.
In prior versions, TypeScript only allowed `...rest` elements at the very last position of a tuple type.

However, now rest elements can occur _anywhere_ within a tuple - with only a few restrictions.

```ts
let foo: [...string[], number];

foo = [123];
foo = ["hello", 123];
foo = ["hello!", "hello!", "hello!", 123];

let bar: [boolean, ...string[], boolean];

bar = [true, false];
bar = [true, "some text", false];
bar = [true, "some", "separated", "text", false];
```

The only restriction is that a rest element can be placed anywhere in a tuple, so long as it's not followed by another optional element or rest element.
In other words, only one rest element per tuple, and no optional elements after rest elements.

```ts
interface Clown {
  /*...*/
}
interface Joker {
  /*...*/
}

let StealersWheel: [...Clown[], "me", ...Joker[]];

let StringsAndMaybeBoolean: [...string[], boolean?];
```

These non-trailing rest elements can be used to model functions that take any number of leading arguments, followed by a few fixed ones.

```ts
declare function doStuff(...args: [...names: string[], shouldCapitalize: boolean]): void;

doStuff(/*shouldCapitalize:*/ false)
doStuff("fee", "fi", "fo", "fum", /*shouldCapitalize:*/ true);
```

Even though JavaScript doesn't have any syntax to model leading rest parameters, we were still able to declare `doStuff` as a function that takes leading arguments by declaring the `...args` rest parameter with _a tuple type that uses a leading rest element_.
This can help model lots of existing JavaScript out there!

For more details, see the original pull request.

## Stricter Checks For The `in` Operator

In JavaScript, it is a runtime error to use a non-object type on the right side of the `in` operator.
TypeScript 4.2 ensures this can be caught at design-time.

```ts
"foo" in 42;
```

This check is fairly conservative for the most part, so if you have received an error about this, it is likely an issue in the code.

A big thanks to our external contributor Jonas Hübotter for their pull request!

## `--noPropertyAccessFromIndexSignature`

Back when TypeScript first introduced index signatures, you could only get properties declared by them with "bracketed" element access syntax like `person["name"]`.

```ts
interface SomeType {
  /** This is an index signature. */
  [propName: string]: any;
}

function doStuff(value: SomeType) {
  let x = value["someProperty"];
}
```

This ended up being cumbersome in situations where we need to work with objects that have arbitrary properties.
For example, imagine an API where it's common to misspell a property name by adding an extra `s` character at the end.

```ts
interface Options {
  /** File patterns to be excluded. */
  exclude?: string[];

  /**
   * It handles any extra properties that we haven't declared as type 'any'.
   */
  [x: string]: any;
}

function processOptions(opts: Options) {
  // Notice we're *intentionally* accessing `excludes`, not `exclude`
  if (opts.excludes) {
    console.error(
      "The option `excludes` is not valid. Did you mean `exclude`?"
    );
  }
}
```

To make these types of situations easier, a while back, TypeScript made it possible to use "dotted" property access syntax like `person.name` when a type had a string index signature.
This also made it easier to transition existing JavaScript code over to TypeScript.

However, loosening the restriction also meant that misspelling an explicitly declared property became much easier.

```ts
interface Options {
  /** File patterns to be excluded. */
  exclude?: string[];

  /**
   * It handles any extra properties that we haven't declared as type 'any'.
   */
  [x: string]: any;
}
function processOptions(opts: Options) {
  // ...

  // Notice we're *accidentally* accessing `excludes` this time.
  // Oops! Totally valid.
  for (const excludePattern of opts.excludes) {
    // ...
  }
}
```

In some cases, users would prefer to explicitly opt into the index signature - they would prefer to get an error message when a dotted property access doesn't correspond to a specific property declaration.

That's why TypeScript introduces a new flag called `noPropertyAccessFromIndexSignature`.
Under this mode, you'll be opted in to TypeScript's older behavior that issues an error.
This new setting is not under the `strict` family of flags, since we believe users will find it more useful on certain codebases than others.

You can understand this feature in more detail by reading up on the corresponding pull request.
We'd also like to extend a big thanks to Wenlu Wang who sent us this pull request!

## `abstract` Construct Signatures

TypeScript allows us to mark a class as _abstract_.
This tells TypeScript that the class is only meant to be extended from, and that certain members need to be filled in by any subclass to actually create an instance.

```ts
abstract class Shape {
  abstract getArea(): number;
}

new Shape();

class Square extends Shape {
  #sideLength: number;

  constructor(sideLength: number) {
    super();
    this.#sideLength = sideLength;
  }

  getArea() {
    return this.#sideLength ** 2;
  }
}

// Works fine.
new Square(42);
```

To make sure this restriction in `new`-ing up `abstract` classes is consistently applied, you can't assign an `abstract` class to anything that expects a construct signature.

```ts
abstract class Shape {
  abstract getArea(): number;
}
interface HasArea {
  getArea(): number;
}

let Ctor: new () => HasArea = Shape;
```

This does the right thing in case we intend to run code like `new Ctor`, but it's overly-restrictive in case we want to write a subclass of `Ctor`.

```ts
abstract class Shape {
  abstract getArea(): number;
}

interface HasArea {
  getArea(): number;
}

function makeSubclassWithArea(Ctor: new () => HasArea) {
  return class extends Ctor {
    getArea() {
      return 42
    }
  };
}

let MyShape = makeSubclassWithArea(Shape);
```

It also doesn't work well with built-in helper types like `InstanceType`.

```ts
abstract class Shape {
  abstract getArea(): number;
}
type MyInstance = InstanceType<typeof Shape>;
```

That's why TypeScript 4.2 allows you to specify an `abstract` modifier on constructor signatures.

```ts
abstract class Shape {
  abstract getArea(): number;
}
interface HasArea {
    getArea(): number;
}

// Works!
let Ctor: abstract new () => HasArea = Shape;
```

Adding the `abstract` modifier to a construct signature signals that you can pass in `abstract` constructors.
It doesn't stop you from passing in other classes/constructor functions that are "concrete" - it really just signals that there's no intent to run the constructor directly, so it's safe to pass in either class type.

This feature allows us to write _mixin factories_ in a way that supports abstract classes.
For example, in the following code snippet, we're able to use the mixin function `withStyles` with the `abstract` class `SuperClass`.

```ts
abstract class SuperClass {
    abstract someMethod(): void;
    badda() {}
}

type AbstractConstructor<T> = abstract new (...args: any[]) => T

function withStyles<T extends AbstractConstructor<object>>(Ctor: T) {
    abstract class StyledClass extends Ctor {
        getStyles() {
            // ...
        }
    }
    return StyledClass;
}

class SubClass extends withStyles(SuperClass) {
    someMethod() {
        this.someMethod()
    }
}
```

Note that `withStyles` is demonstrating a specific rule, where a class (like `StyledClass`) that extends a value that's generic and bounded by an abstract constructor (like `Ctor`) has to also be declared `abstract`.
This is because there's no way to know if a class with _more_ abstract members was passed in, and so it's impossible to know whether the subclass implements all the abstract members.

You can read up more on abstract construct signatures on its pull request.

## Understanding Your Project Structure With `--explainFiles`

A surprisingly common scenario for TypeScript users is to ask "why is TypeScript including this file?".
Inferring the files of your program turns out to be a complicated process, and so there are lots of reasons why a specific combination of `lib.d.ts` got used, why certain files in `node_modules` are getting included, and why certain files are being included even though we thought specifying `exclude` would keep them out.

That's why TypeScript now provides an `explainFiles` flag.

```sh
tsc --explainFiles
```

When using this option, the TypeScript compiler will give some very verbose output about why a file ended up in your program.
To read it more easily, you can forward the output to a file, or pipe it to a program that can easily view it.

```sh
# Forward output to a text file
tsc --explainFiles > explanation.txt

# Pipe output to a utility program like `less`, or an editor like VS Code
tsc --explainFiles | less

tsc --explainFiles | code -
```

Typically, the output will start out by listing out reasons for including `lib.d.ts` files, then for local files, and then `node_modules` files.

```
TS_Compiler_Directory/4.2.2/lib/lib.es5.d.ts
  Library referenced via 'es5' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2015.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2015.d.ts
  Library referenced via 'es2015' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2016.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2016.d.ts
  Library referenced via 'es2016' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2017.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2017.d.ts
  Library referenced via 'es2017' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2018.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2018.d.ts
  Library referenced via 'es2018' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2019.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2019.d.ts
  Library referenced via 'es2019' from file 'TS_Compiler_Directory/4.2.2/lib/lib.es2020.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.es2020.d.ts
  Library referenced via 'es2020' from file 'TS_Compiler_Directory/4.2.2/lib/lib.esnext.d.ts'
TS_Compiler_Directory/4.2.2/lib/lib.esnext.d.ts
  Library 'lib.esnext.d.ts' specified in compilerOptions

... More Library References...

foo.ts
  Matched by include pattern '**/*' in 'tsconfig.json'
```

Right now, we make no guarantees about the output format - it might change over time.
On that note, we're interested in improving this format if you have any suggestions!

For more information, check out the original pull request!
