---
title: "Advanced Types (part 1 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/reference/Advanced Types.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# Advanced Types

This page lists some of the more advanced ways in which you can model types, it works in tandem with the Utility Types doc which includes types which are included in TypeScript and available globally.

## Type Guards and Differentiating Types

Union types are useful for modeling situations when values can overlap in the types they can take on.
What happens when we need to know specifically whether we have a `Fish`?
A common idiom in JavaScript to differentiate between two possible values is to check for the presence of a member.
As we mentioned, you can only access members that are guaranteed to be in all the constituents of a union type.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
let pet = getSmallPet();

// You can use the 'in' operator to check
if ("swim" in pet) {
  pet.swim();
}
// However, you cannot use property access
if (pet.fly) {
  pet.fly();
}
```

To get the same code working via property accessors, we'll need to use a type assertion:

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
let pet = getSmallPet();
let fishPet = pet as Fish;
let birdPet = pet as Bird;

if (fishPet.swim) {
  fishPet.swim();
} else if (birdPet.fly) {
  birdPet.fly();
}
```

This isn't the sort of code you would want in your codebase however.

## User-Defined Type Guards

It would be much better if once we performed the check, we could know the type of `pet` within each branch.

It just so happens that TypeScript has something called a _type guard_.
A type guard is some expression that performs a runtime check that guarantees the type in some scope.

### Using type predicates

To define a type guard, we simply need to define a function whose return type is a _type predicate_:

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
```

`pet is Fish` is our type predicate in this example.
A predicate takes the form `parameterName is Type`, where `parameterName` must be the name of a parameter from the current function signature.

Any time `isFish` is called with some variable, TypeScript will _narrow_ that variable to that specific type if the original type is compatible.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
// Both calls to 'swim' and 'fly' are now okay.
let pet = getSmallPet();

if (isFish(pet)) {
  pet.swim();
} else {
  pet.fly();
}
```

Notice that TypeScript not only knows that `pet` is a `Fish` in the `if` branch;
it also knows that in the `else` branch, you _don't_ have a `Fish`, so you must have a `Bird`.

You may use the type guard `isFish` to filter an array of `Fish | Bird` and obtain an array of `Fish`:

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
declare function getSmallPet(): Fish | Bird;
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
}
const zoo: (Fish | Bird)[] = [getSmallPet(), getSmallPet(), getSmallPet()];
const underWater1: Fish[] = zoo.filter(isFish);
// or, equivalently
const underWater2: Fish[] = zoo.filter<Fish>(isFish);
const underWater3: Fish[] = zoo.filter<Fish>((pet) => isFish(pet));
```

### Using the `in` operator

The `in` operator also acts as a narrowing expression for types.

For a `n in x` expression, where `n` is a string literal or string literal type and `x` is a union type, the "true" branch narrows to types which have an optional or required property `n`, and the "false" branch narrows to types which have an optional or missing property `n`.

```ts
type Fish = { swim: () => void };
type Bird = { fly: () => void };
function move(pet: Fish | Bird) {
  if ("swim" in pet) {
    return pet.swim();
  }
  return pet.fly();
}
```

## `typeof` type guards

Let's go back and write the code for a version of `padLeft` which uses union types.
We could write it with type predicates as follows:

```ts
function isNumber(x: any): x is number {
  return typeof x === "number";
}

function isString(x: any): x is string {
  return typeof x === "string";
}

function padLeft(value: string, padding: string | number) {
  if (isNumber(padding)) {
    return Array(padding + 1).join(" ") + value;
  }
  if (isString(padding)) {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

However, having to define a function to figure out if a type is a primitive is kind of a pain.
Luckily, you don't need to abstract `typeof x === "number"` into its own function because TypeScript will recognize it as a type guard on its own.
That means we could just write these checks inline.

```ts
function padLeft(value: string, padding: string | number) {
  if (typeof padding === "number") {
    return Array(padding + 1).join(" ") + value;
  }
  if (typeof padding === "string") {
    return padding + value;
  }
  throw new Error(`Expected string or number, got '${padding}'.`);
}
```

These _`typeof` type guards_ are recognized in two different forms: `typeof v === "typename"` and `typeof v !== "typename"`, where `"typename"` can be one of `typeof` operator's return values (`"undefined"`, `"number"`, `"string"`, `"boolean"`, `"bigint"`, `"symbol"`, `"object"`, or `"function"`).
While TypeScript won't stop you from comparing to other strings, the language won't recognize those expressions as type guards.

## `instanceof` type guards

If you've read about `typeof` type guards and are familiar with the `instanceof` operator in JavaScript, you probably have some idea of what this section is about.

_`instanceof` type guards_ are a way of narrowing types using their constructor function.
For instance, let's borrow our industrial strength string-padder example from earlier:

```ts
interface Padder {
  getPaddingString(): string;
}

class SpaceRepeatingPadder implements Padder {
  constructor(private numSpaces: number) {}
  getPaddingString() {
    return Array(this.numSpaces + 1).join(" ");
  }
}

class StringPadder implements Padder {
  constructor(private value: string) {}
  getPaddingString() {
    return this.value;
  }
}

function getRandomPadder() {
  return Math.random() < 0.5
    ? new SpaceRepeatingPadder(4)
    : new StringPadder("  ");
}

let padder: Padder = getRandomPadder();

if (padder instanceof SpaceRepeatingPadder) {
  padder;
}
if (padder instanceof StringPadder) {
  padder;
}
```

The right side of the `instanceof` needs to be a constructor function, and TypeScript will narrow down to:

1. the type of the function's `prototype` property if its type is not `any`
2. the union of types returned by that type's construct signatures

in that order.

## Nullable types

TypeScript has two special types, `null` and `undefined`, that have the values null and undefined respectively.
We mentioned these briefly in the Basic Types section.

By default, the type checker considers `null` and `undefined` assignable to anything.
Effectively, `null` and `undefined` are valid values of every type.
That means it's not possible to _stop_ them from being assigned to any type, even when you would like to prevent it.
The inventor of `null`, Tony Hoare, calls this his "billion dollar mistake".

The `strictNullChecks` flag fixes this: when you declare a variable, it doesn't automatically include `null` or `undefined`.
You can include them explicitly using a union type:

```ts
let exampleString = "foo";
exampleString = null;

let stringOrNull: string | null = "bar";
stringOrNull = null;

stringOrNull = undefined;
```

Note that TypeScript treats `null` and `undefined` differently in order to match JavaScript semantics.
`string | null` is a different type than `string | undefined` and `string | undefined | null`.

From TypeScript 3.7 and onwards, you can use optional chaining to simplify working with nullable types.

### Optional parameters and properties

With `strictNullChecks`, an optional parameter automatically adds `| undefined`:

```ts
function f(x: number, y?: number) {
  return x + (y ?? 0);
}

f(1, 2);
f(1);
f(1, undefined);
f(1, null);
```

The same is true for optional properties:

```ts
class C {
  a: number;
  b?: number;
}

let c = new C();

c.a = 12;
c.a = undefined;
c.b = 13;
c.b = undefined;
c.b = null;
```

### Type guards and type assertions

Since nullable types are implemented with a union, you need to use a type guard to get rid of the `null`.
Fortunately, this is the same code you'd write in JavaScript:

```ts
function f(stringOrNull: string | null): string {
  if (stringOrNull === null) {
    return "default";
  } else {
    return stringOrNull;
  }
}
```

The `null` elimination is pretty obvious here, but you can use terser operators too:

```ts
function f(stringOrNull: string | null): string {
  return stringOrNull ?? "default";
}
```

In cases where the compiler can't eliminate `null` or `undefined`, you can use the type assertion operator to manually remove them.
The syntax is postfix `!`: `identifier!` removes `null` and `undefined` from the type of `identifier`:

```ts
function getUser(id: string): UserAccount | undefined {
  return {} as any;
}
interface UserAccount {
  id: number;
  email?: string;
}

const user = getUser("admin");
user.id;

if (user) {
  user.email.length;
}

// Instead if you are sure that these objects or fields exist, the
// postfix ! lets you short circuit the nullability
user!.email!.length;
```

## Type Aliases

Type aliases create a new name for a type.
Type aliases are sometimes similar to interfaces, but can name primitives, unions, tuples, and any other types that you'd otherwise have to write by hand.

```ts
type Second = number;

let timeInSecond: number = 10;
let time: Second = 10;
```

Aliasing doesn't actually create a new type - it creates a new _name_ to refer to that type.
Aliasing a primitive is not terribly useful, though it can be used as a form of documentation.

Just like interfaces, type aliases can also be generic - we can just add type parameters and use them on the right side of the alias declaration:

```ts
type Container<T> = { value: T };
```

We can also have a type alias refer to itself in a property:

```ts
type Tree<T> = {
  value: T;
  left?: Tree<T>;
  right?: Tree<T>;
};
```

Together with intersection types, we can make some pretty mind-bending types:

```ts
declare function getDriversLicenseQueue(): LinkedList<Person>;
type LinkedList<Type> = Type & { next: LinkedList<Type> };

interface Person {
  name: string;
}

let people = getDriversLicenseQueue();
people.name;
people.next.name;
people.next.next.name;
people.next.next.next.name;
```

## Interfaces vs. Type Aliases

As we mentioned, type aliases can act sort of like interfaces; however, there are some subtle differences.

Almost all features of an `interface` are available in `type`, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

       | `Interface`
       | `Type`

       |
        Extending an interface
        <code><pre>
interface Animal {
  name: string
}
interface Bear extends Animal {
  honey: boolean
}
const bear = getBear()
bear.name
bear.honey
        </pre></code>

       |
        Extending a type via intersections
        <code><pre>
type Animal = {
  name: string
}
type Bear = Animal & {
  honey: Boolean
}
const bear = getBear();
bear.name;
bear.honey;
        </pre></code>

       |
        Adding new fields to an existing interface
        <code><pre>
interface Window {
  title: string
}
interface Window {
  ts: import("typescript")
}
const src = 'const a = "Hello World"';
window.ts.transpileModule(src, {});
        </pre></code>

       |
        A type cannot be changed after being created
        <code><pre>
type Window = {
  title: string
}
type Window = {
  ts: import("typescript")
}
// Error: Duplicate identifier 'Window'.
        </pre></code>

Because an interface more closely maps how JavaScript objects work by being open to extension, we recommend using an interface over a type alias when possible.

On the other hand, if you can't express some shape with an interface and you need to use a union or tuple type, type aliases are usually the way to go.

## Enum Member Types

As mentioned in our section on enums, enum members have types when every member is literal-initialized.

Much of the time when we talk about "singleton types", we're referring to both enum member types as well as numeric/string literal types, though many users will use "singleton types" and "literal types" interchangeably.

## Polymorphic `this` types

A polymorphic `this` type represents a type that is the _subtype_ of the containing class or interface.
This is called _F_-bounded polymorphism, a lot of people know it as the fluent API pattern.
This makes hierarchical fluent interfaces much easier to express, for example.
Take a simple calculator that returns `this` after each operation:

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}

let v = new BasicCalculator(2).multiply(5).add(1).currentValue();
```

Since the class uses `this` types, you can extend it and the new class can use the old methods with no changes.

```ts
class BasicCalculator {
  public constructor(protected value: number = 0) {}
  public currentValue(): number {
    return this.value;
  }
  public add(operand: number): this {
    this.value += operand;
    return this;
  }
  public multiply(operand: number): this {
    this.value *= operand;
    return this;
  }
  // ... other operations go here ...
}
class ScientificCalculator extends BasicCalculator {
  public constructor(value = 0) {
    super(value);
  }
  public sin() {
    this.value = Math.sin(this.value);
    return this;
  }
  // ... other operations go here ...
}

let v = new ScientificCalculator(2).multiply(5).sin().add(1).currentValue();
```

Without `this` types, `ScientificCalculator` would not have been able to extend `BasicCalculator` and keep the fluent interface.
`multiply` would have returned `BasicCalculator`, which doesn't have the `sin` method.
However, with `this` types, `multiply` returns `this`, which is `ScientificCalculator` here.
