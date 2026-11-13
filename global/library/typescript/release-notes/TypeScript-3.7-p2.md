---
title: "TypeScript 3.7 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 3.7.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 3.7 (part 2 of 2)

## `--declaration` and `--allowJs`

The `declaration` flag in TypeScript allows us to generate `.d.ts` files (declaration files) from TypeScript source files (i.e. `.ts` and `.tsx` files).
These `.d.ts` files are important for a couple of reasons.

First of all, they're important because they allow TypeScript to type-check against other projects without re-checking the original source code.
They're also important because they allow TypeScript to interoperate with existing JavaScript libraries that weren't built with TypeScript in mind.
Finally, a benefit that is often underappreciated: both TypeScript _and_ JavaScript users can benefit from these files when using editors powered by TypeScript to get things like better auto-completion.

Unfortunately, `declaration` didn't work with the `allowJs` flag which allows mixing TypeScript and JavaScript input files.
This was a frustrating limitation because it meant users couldn't use the `declaration` flag when migrating codebases, even if they were JSDoc-annotated.
TypeScript 3.7 changes that, and allows the two options to be used together!

The most impactful outcome of this feature might a bit subtle: with TypeScript 3.7, users can write libraries in JSDoc annotated JavaScript and support TypeScript users.

The way that this works is that when using `allowJs`, TypeScript has some best-effort analyses to understand common JavaScript patterns; however, the way that some patterns are expressed in JavaScript don't necessarily look like their equivalents in TypeScript.
When `declaration` emit is turned on, TypeScript figures out the best way to transform JSDoc comments and CommonJS exports into valid type declarations and the like in the output `.d.ts` files.

As an example, the following code snippet

```js
const assert = require("assert");

module.exports.blurImage = blurImage;

/**
 * Produces a blurred image from an input buffer.
 *
 * @param input {Uint8Array}
 * @param width {number}
 * @param height {number}
 */
function blurImage(input, width, height) {
  const numPixels = width * height * 4;
  assert(input.length === numPixels);
  const result = new Uint8Array(numPixels);

  // TODO

  return result;
}
```

Will produce a `.d.ts` file like

```ts
/**
 * Produces a blurred image from an input buffer.
 *
 * @param input {Uint8Array}
 * @param width {number}
 * @param height {number}
 */
export function blurImage(
  input: Uint8Array,
  width: number,
  height: number
): Uint8Array;
```

This can go beyond basic <example-value> with `@param` tags too, where the following example:

```js
/**
 * @callback Job
 * @returns {void}
 */

/** Queues work */
export class Worker {
  constructor(maxDepth = 10) {
    this.started = false;
    this.depthLimit = maxDepth;
    /**
     * NOTE: queued jobs may add more items to queue
     * @type {Job[]}
     */
    this.queue = [];
  }
  /**
   * Adds a work item to the queue
   * @param {Job} work
   */
  push(work) {
    if (this.queue.length + 1 > this.depthLimit) throw new Error("Queue full!");
    this.queue.push(work);
  }
  /**
   * Starts the queue if it has not yet started
   */
  start() {
    if (this.started) return false;
    this.started = true;
    while (this.queue.length) {
      /** @type {Job} */ (this.queue.shift())();
    }
    return true;
  }
}
```

will be transformed into the following `.d.ts` file:

```ts
/**
 * @callback Job
 * @returns {void}
 */
/** Queues work */
export class Worker {
  constructor(maxDepth?: number);
  started: boolean;
  depthLimit: number;
  /**
   * NOTE: queued jobs may add more items to queue
   * @type {Job[]}
   */
  queue: Job[];
  /**
   * Adds a work item to the queue
   * @param {Job} work
   */
  push(work: Job): void;
  /**
   * Starts the queue if it has not yet started
   */
  start(): boolean;
}
export type Job = () => void;
```

Note that when using these flags together, TypeScript doesn't necessarily have to downlevel `.js` files.
If you simply want TypeScript to create `.d.ts` files, you can use the `emitDeclarationOnly` compiler option.

For more details, you can check out the original pull request.

## The `useDefineForClassFields` Flag and The `declare` Property Modifier

Back when TypeScript implemented public class fields, we assumed to the best of our abilities that the following code

```ts
class C {
  foo = 100;
  bar: string;
}
```

would be equivalent to a similar assignment within a constructor body.

```ts
class C {
  constructor() {
    this.foo = 100;
  }
}
```

Unfortunately, while this seemed to be the direction that the proposal moved towards in its earlier days, there is an extremely strong chance that public class fields will be standardized differently.
Instead, the original code sample might need to de-sugar to something closer to the following:

```ts
class C {
  constructor() {
    Object.defineProperty(this, "foo", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: 100,
    });
    Object.defineProperty(this, "bar", {
      enumerable: true,
      configurable: true,
      writable: true,
      value: void 0,
    });
  }
}
```

While TypeScript 3.7 isn't changing any existing emit by default, we've been rolling out changes incrementally to help users mitigate potential future breakage.
We've provided a new flag called `useDefineForClassFields` to enable this emit mode with some new checking logic.

The two biggest changes are the following:

- Declarations are initialized with `Object.defineProperty`.
- Declarations are _always_ initialized to `undefined`, even if they have no initializer.

This can cause quite a bit of fallout for existing code that use inheritance. First of all, `set` accessors from base classes won't get triggered - they'll be completely overwritten.

```ts
class Base {
  set data(value: string) {
    console.log("data changed to " + value);
  }
}

class Derived extends Base {
  // No longer triggers a 'console.log'
  // when using 'useDefineForClassFields'.
  data = 10;
}
```

Secondly, using class fields to specialize properties from base classes also won't work.

```ts
interface Animal {
  animalStuff: any;
}
interface Dog extends Animal {
  dogStuff: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  // Initializes 'resident' to 'undefined'
  // after the call to 'super()' when
  // using 'useDefineForClassFields'!
  resident: Dog;

  constructor(dog: Dog) {
    super(dog);
  }
}
```

What these two boil down to is that mixing properties with accessors is going to cause issues, and so will re-declaring properties with no initializers.

To detect the issue around accessors, TypeScript 3.7 will now emit `get`/`set` accessors in `.d.ts` files so that in TypeScript can check for overridden accessors.

Code that's impacted by the class fields change can get around the issue by converting field initializers to assignments in constructor bodies.

```ts
class Base {
  set data(value: string) {
    console.log("data changed to " + value);
  }
}

class Derived extends Base {
  constructor() {
    this.data = 10;
  }
}
```

To help mitigate the second issue, you can either add an explicit initializer or add a `declare` modifier to indicate that a property should have no emit.

```ts
interface Animal {
  animalStuff: any;
}
interface Dog extends Animal {
  dogStuff: any;
}

class AnimalHouse {
  resident: Animal;
  constructor(animal: Animal) {
    this.resident = animal;
  }
}

class DogHouse extends AnimalHouse {
  declare resident: Dog;
  //  ^^^^^^^
  // 'resident' now has a 'declare' modifier,
  // and won't produce any output code.

  constructor(dog: Dog) {
    super(dog);
  }
}
```

Currently `useDefineForClassFields` is only available when targeting ES5 and upwards, since `Object.defineProperty` doesn't exist in ES3.
To achieve similar checking for issues, you can create a separate project that targets ES5 and uses `noEmit` to avoid a full build.

For more information, you can take a look at the original pull request for these changes.

We strongly encourage users to try the `useDefineForClassFields` flag and report back on our issue tracker or in the comments below.
This includes feedback on difficulty of adopting the flag so we can understand how we can make migration easier.

## Build-Free Editing with Project References

TypeScript's project references provide us with an easy way to break codebases up to give us faster compiles.
Unfortunately, editing a project whose dependencies hadn't been built (or whose output was out of date) meant that the editing experience wouldn't work well.

In TypeScript 3.7, when opening a project with dependencies, TypeScript will automatically use the source `.ts`/`.tsx` files instead.
This means projects using project references will now see an improved editing experience where semantic operations are up-to-date and "just work".
You can disable this behavior with the compiler option `disableSourceOfProjectReferenceRedirect` which may be appropriate when working in very large projects where this change may impact editing performance.

You can read up more about this change by reading up on its pull request.

## Uncalled Function Checks

A common and dangerous error is to forget to invoke a function, especially if the function has zero arguments or is named in a way that implies it might be a property rather than a function.

```ts
interface User {
  isAdministrator(): boolean;
  notify(): void;
  doNotDisturb?(): boolean;
}

// later...

// Broken code, do not use!
function doAdminThing(user: User) {
  // oops!
  if (user.isAdministrator) {
    sudo();
    editTheConfiguration();
  } else {
    throw new AccessDeniedError("User is not an admin");
  }
}
```

Here, we forgot to call `isAdministrator`, and the code incorrectly allows non-administrator users to edit the configuration!

In TypeScript 3.7, this is identified as a likely error:

```ts
function doAdminThing(user: User) {
    if (user.isAdministrator) {
    //  ~~~~~~~~~~~~~~~~~~~~
    // error! This condition will always return true since the function is always defined.
    //        Did you mean to call it instead?
```

This check is a breaking change, but for that reason the checks are very conservative.
This error is only issued in `if` conditions, and it is not issued on optional properties, if `strictNullChecks` is off, or if the function is later called within the body of the `if`:

```ts
interface User {
  isAdministrator(): boolean;
  notify(): void;
  doNotDisturb?(): boolean;
}

function issueNotification(user: User) {
  if (user.doNotDisturb) {
    // OK, property is optional
  }
  if (user.notify) {
    // OK, called the function
    user.notify();
  }
}
```

If you intended to test the function without calling it, you can correct the definition of it to include `undefined`/`null`, or use `!!` to write something like `if (!!user.isAdministrator)` to indicate that the coercion is intentional.

We owe a big thanks to GitHub user @jwbay who took the initiative to create a proof-of-concept and iterated to provide us with the current version.

## `// @ts-nocheck` in TypeScript Files

TypeScript 3.7 allows us to add `// @ts-nocheck` comments to the top of TypeScript files to disable semantic checks.
Historically this comment was only respected in JavaScript source files in the presence of `checkJs`, but we've expanded support to TypeScript files to make migrations easier for all users.

## Semicolon Formatter Option

TypeScript's built-in formatter now supports semicolon insertion and removal at locations where a trailing semicolon is optional due to JavaScript's automatic semicolon insertion (ASI) rules. The setting is available now in Visual Studio Code Insiders, and will be available in Visual Studio 16.4 Preview 2 in the Tools Options menu.

Choosing a value of "insert" or "remove" also affects the format of auto-imports, extracted types, and other generated code provided by TypeScript services. Leaving the setting on its default value of "ignore" makes generated code match the semicolon preference detected in the current file.

## 3.7 Breaking Changes

### DOM Changes

Types in `lib.dom.d.ts` have been updated.
These changes are largely correctness changes related to nullability, but impact will ultimately depend on your codebase.

### Class Field Mitigations

As mentioned above, TypeScript 3.7 emits `get`/`set` accessors in `.d.ts` files which can cause breaking changes for consumers on older versions of TypeScript like 3.5 and prior.
TypeScript 3.6 users will not be impacted, since that version was future-proofed for this feature.

While not a breakage per se, opting in to the `useDefineForClassFields` flag can cause breakage when:

- overriding an accessor in a derived class with a property declaration
- re-declaring a property declaration with no initializer

To understand the full impact, read the section above on the `useDefineForClassFields` flag.

### Function Truthy Checks

As mentioned above, TypeScript now errors when functions appear to be uncalled within `if` statement conditions.
An error is issued when a function type is checked in `if` conditions unless any of the following apply:

- the checked value comes from an optional property
- `strictNullChecks` is disabled
- the function is later called within the body of the `if`

### Local and Imported Type Declarations Now Conflict

Due to a bug, the following construct was previously allowed in TypeScript:

```ts
// ./someOtherModule.ts
interface SomeType {
  y: string;
}

// ./myModule.ts
import { SomeType } from "./someOtherModule";
export interface SomeType {
  x: number;
}

function fn(arg: SomeType) {
  console.log(arg.x); // Error! 'x' doesn't exist on 'SomeType'
}
```

Here, `SomeType` appears to originate in both the `import` declaration and the local `interface` declaration.
Perhaps surprisingly, inside the module, `SomeType` refers exclusively to the `import`ed definition, and the local declaration `SomeType` is only usable when imported from another file.
This is very confusing and our review of the very small number of cases of code like this in the wild showed that developers usually thought something different was happening.

In TypeScript 3.7, this is now correctly identified as a duplicate identifier error.
The correct fix depends on the original intent of the author and should be addressed on a case-by-case basis.
Usually, the naming conflict is unintentional and the best fix is to rename the imported type.
If the intent was to augment the imported type, a proper module augmentation should be written instead.

### 3.7 API Changes

To enable the recursive type alias patterns described above, the `typeArguments` property has been removed from the `TypeReference` interface. Users should instead use the `getTypeArguments` function on `TypeChecker` instances.
