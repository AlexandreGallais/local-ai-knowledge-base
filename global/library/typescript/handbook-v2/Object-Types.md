---
title: "Object Types (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/handbook-v2/Object Types.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# Object Types

In JavaScript, the fundamental way that we group and pass <example-value> data is through objects.
In TypeScript, we represent those through _object types_.

As we've seen, they can be anonymous:

```ts
function greet(person: { name: string; age: number }) {
  //                   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  return "Hello " + person.name;
}
```

or they can be named by using either an interface:

```ts
interface Person {
  //      ^^^^^^
  name: string;
  age: number;
}

function greet(person: Person) {
  return "Hello " + person.name;
}
```

or a type alias:

```ts
type Person = {
  // ^^^^^^
  name: string;
  age: number;
};

function greet(person: Person) {
  return "Hello " + person.name;
}
```

In all three examples above, we've written functions that take objects that contain the property `name` (which must be a `string`) and `age` (which must be a `number`).

## Quick Reference

We have cheat-sheets available for both `type` and `interface`, if you want a quick look at the important every-day syntax at a glance.

## Property Modifiers

Each property in an object type can specify a couple of things: the type, whether the property is optional, and whether the property can be written to.

### Optional Properties

Much of the time, we'll find ourselves dealing with objects that _might_ have a property set.
In those cases, we can mark those properties as _optional_ by adding a question mark (`?`) to the end of their names.

```ts
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  //  ^
  yPos?: number;
  //  ^
}

function paintShape(opts: PaintOptions) {
  // ...
}

const shape = getShape();
paintShape({ shape });
paintShape({ shape, xPos: 100 });
paintShape({ shape, yPos: 100 });
paintShape({ shape, xPos: 100, yPos: 100 });
```

In this example, both `xPos` and `yPos` are considered optional.
We can choose to provide either of them, so every call above to `paintShape` is valid.
All optionality really says is that if the property _is_ set, it better have a specific type.

We can also read from those properties - but when we do under `strictNullChecks`, TypeScript will tell us they're potentially `undefined`.

```ts
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos;
  let yPos = opts.yPos;
  // ...
}
```

In JavaScript, even if the property has never been set, we can still access it - it's just going to give us the value `undefined`.
We can just handle `undefined` specially by checking for it.

```ts
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape(opts: PaintOptions) {
  let xPos = opts.xPos === undefined ? 0 : opts.xPos;
  let yPos = opts.yPos === undefined ? 0 : opts.yPos;
  // ...
}
```

Note that this pattern of setting defaults for unspecified values is so common that JavaScript has syntax to support it.

```ts
interface Shape {}
declare function getShape(): Shape;

interface PaintOptions {
  shape: Shape;
  xPos?: number;
  yPos?: number;
}

function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
  console.log("x coordinate at", xPos);
  console.log("y coordinate at", yPos);
  // ...
}
```

Here we used a destructuring pattern for `paintShape`'s parameter, and provided default values for `xPos` and `yPos`.
Now `xPos` and `yPos` are both definitely present within the body of `paintShape`, but optional for any callers to `paintShape`.

> Note that there is currently no way to place type annotations within destructuring patterns.
> This is because the following syntax already means something different in JavaScript.
>
> ```ts twoslash
> // @noImplicitAny: false
> // @errors: 2552 2304
> interface Shape {}
> declare function render(x: unknown);
> // ---cut---
> function draw({ shape: Shape, xPos: number = 100 /*...*/ }) {
>   render(shape);
>   render(xPos);
> }
> ```
>
> In an object destructuring pattern, `shape: Shape` means "grab the property `shape` and redefine it locally as a variable named `Shape`."
> Likewise `xPos: number` creates a variable named `number` whose value is based on the parameter's `xPos`.

### `readonly` Properties

Properties can also be marked as `readonly` for TypeScript.
While it won't change any behavior at runtime, a property marked as `readonly` can't be written to during type-checking.

```ts
interface SomeType {
  readonly prop: string;
}

function doSomething(obj: SomeType) {
  // We can read from 'obj.prop'.
  console.log(`prop has the value '${obj.prop}'.`);

  // But we can't re-assign it.
  obj.prop = "hello";
}
```

Using the `readonly` modifier doesn't necessarily imply that a value is totally immutable - or in other words, that its internal contents can't be changed.
It just means the property itself can't be re-written to.

```ts
interface Home {
  readonly resident: { name: string; age: number };
}

function visitForBirthday(home: Home) {
  // We can read and update properties from 'home.resident'.
  console.log(`Happy birthday ${home.resident.name}!`);
  home.resident.age++;
}

function evict(home: Home) {
  // But we can't write to the 'resident' property itself on a 'Home'.
  home.resident = {
    name: "Victor the Evictor",
    age: 42,
  };
}
```

It's important to manage expectations of what `readonly` implies.
It's useful to signal intent during development time for TypeScript on how an object should be used.
TypeScript doesn't factor in whether properties on two types are `readonly` when checking whether those types are compatible, so `readonly` properties can also change via aliasing.

```ts
interface Person {
  name: string;
  age: number;
}

interface ReadonlyPerson {
  readonly name: string;
  readonly age: number;
}

let writablePerson: Person = {
  name: "Person McPersonface",
  age: 42,
};

// works
let readonlyPerson: ReadonlyPerson = writablePerson;

console.log(readonlyPerson.age); // prints '42'
writablePerson.age++;
console.log(readonlyPerson.age); // prints '43'
```

Using mapping modifiers, you can remove `readonly` attributes.

### Index Signatures

Sometimes you don't know all the names of a type's properties ahead of time, but you do know the shape of the values.

In those cases you can use an index signature to describe the types of possible values, for example:

```ts
declare function getStringArray(): StringArray;
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
```

Above, we have a `StringArray` interface which has an index signature.
This index signature states that when a `StringArray` is indexed with a `number`, it will return a `string`.

Only some types are allowed for index signature properties: `string`, `number`, `symbol`, template string patterns, and union types consisting only of these.

    **It is possible to support multiple types of indexers...**
    It is possible to support multiple types of indexers. Note that when using both `number` and `string` indexers, the type returned from a numeric indexer must be a subtype of the type returned from the string indexer. This is because when indexing with a `number`, JavaScript will actually convert that to a `string` before indexing into an object. That means that indexing with `100` (a `number`) is the same thing as indexing with `"100"` (a `string`), so the two need to be consistent.

```ts
interface Animal {
  name: string;
}

interface Dog extends Animal {
  breed: string;
}

// Error: indexing with a numeric string might get you a completely separate type of Animal!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
```

While string index signatures are a powerful way to describe the "dictionary" pattern, they also enforce that all properties match their return type.
This is because a string index declares that `obj.property` is also available as `obj["property"]`.
In the following example, `name`'s type does not match the string index's type, and the type checker gives an error:

```ts
interface NumberDictionary {
  [index: string]: number;

  length: number; // ok
  name: string;
}
```

However, properties of different types are acceptable if the index signature is a union of the property types:

```ts
interface NumberOrStringDictionary {
  [index: string]: number | string;
  length: number; // ok, length is a number
  name: string; // ok, name is a string
}
```

Finally, you can make index signatures `readonly` in order to prevent assignment to their indices:

```ts
declare function getReadOnlyStringArray(): ReadonlyStringArray;
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory";
```

You can't set `myArray[2]` because the index signature is `readonly`.

## Excess Property Checks

Where and how an object is assigned a type can make a difference in the type system.
One of the key <example-value> of this is in excess property checking, which validates the object more thoroughly when it is created and assigned to an object type during creation.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

Notice the given argument to `createSquare` is spelled _`colour`_ instead of `color`.
In plain JavaScript, this sort of thing fails silently.

You could argue that this program is correctly typed, since the `width` properties are compatible, there's no `color` property present, and the extra `colour` property is insignificant.

However, TypeScript takes the stance that there's probably a bug in this code.
Object literals get special treatment and undergo _excess property checking_ when assigning them to other variables, or passing them as arguments.
If an object literal has any properties that the "target type" doesn't have, you'll get an error:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
let mySquare = createSquare({ colour: "red", width: 100 });
```

Getting around these checks is actually really simple.
The easiest method is to just use a type assertion:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

However, a better approach might be to add a string index signature if you're sure that the object can have some extra properties that are used in some special way.
If `SquareConfig` can have `color` and `width` properties with the above types, but could _also_ have any number of other properties, then we could define it like so:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: unknown;
}
```

Here we're saying that `SquareConfig` can have any number of properties, and as long as they aren't `color` or `width`, their types don't matter.

One final way to get around these checks, which might be a bit surprising, is to assign the object to another variable:
Since assigning `squareOptions` won't undergo excess property checks, the compiler won't give you an error:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

The above workaround will work as long as you have a common property between `squareOptions` and `SquareConfig`.
In this example, it was the property `width`. It will however, fail if the variable does not have any common object property. For example:

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  return {
    color: config.color || "red",
    area: config.width ? config.width * config.width : 20,
  };
}
let squareOptions = { colour: "red" };
let mySquare = createSquare(squareOptions);
```

Keep in mind that for simple code like above, you probably shouldn't be trying to "get around" these checks.
For more complex object literals that have methods and hold state, you might need to keep these techniques in mind, but a majority of excess property errors are actually bugs.

That means if you're running into excess property checking problems for something like option bags, you might need to revise some of your type declarations.
In this instance, if it's okay to pass an object with both a `color` or `colour` property to `createSquare`, you should fix up the definition of `SquareConfig` to reflect that.
