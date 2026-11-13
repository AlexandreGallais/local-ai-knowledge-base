---
title: "TypeScript 5.0 (part 4 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.0 (part 4 of 4)

## Speed, Memory, and Package Size Optimizations

TypeScript 5.0 contains lots of powerful changes across our code structure, our data structures, and algorithmic implementations.
What these all mean is that your entire experience should be faster - not just running TypeScript, but even installing it.

Here are a few interesting wins in speed and size that we've been able to capture relative to TypeScript 4.9.

Scenario | Time or Size Relative to TS 4.9
---------|--------------------
material-ui build time | 89%
TypeScript Compiler startup time | 89%
Playwright build time | 88%
TypeScript Compiler self-build time | 87%
Outlook Web build time | 82%
VS Code build time | 80%
typescript npm Package Size | 59%

How?
There are a few notable improvements we'd like give more details on in the future.
But we won't make you wait for that blog post.

First off, we recently migrated TypeScript from namespaces to modules, allowing us to leverage modern build tooling that can perform optimizations like scope hoisting.
Using this tooling, revisiting our packaging strategy, and removing some deprecated code has shaved off about 26.4 MB from TypeScript 4.9's 63.8 MB package size.
It also brought us a notable speed-up through direct function calls.

TypeScript also added more uniformity to internal object types within the compiler, and also slimmed the data stored on some of these object types as well.
This reduced polymorphic and megamorphic use sites, while offsetting most of the necessary memory consumption that was necessary for uniform shapes.

We've also performed some caching when serializing information to strings.
Type display, which can happen as part of error reporting, declaration emit, code completions, and more, can end up being fairly expensive.
TypeScript now caches some commonly used machinery to reuse across these operations.

Another notable change we made that improved our parser was leveraging `var` to occasionally side-step the cost of using `let` and `const` across closures.
This improved some of our parsing performance.

Overall, we expect most codebases should see speed improvements from TypeScript 5.0, and have consistently been able to reproduce wins between 10% to 20%.
Of course this will depend on hardware and codebase characteristics, but we encourage you to try it out on your codebase today!

For more information, see some of our notable optimizations:

* Migrate to Modules
* `Node` Monomorphization
* `Symbol` Monomorphization
* `Identifier` Size Reduction
* `Printer` Caching
* Limited Usage of `var`

## Breaking Changes and Deprecations

### Runtime Requirements

TypeScript now targets ECMAScript 2018.
For Node users, that means a minimum version requirement of at least Node.js 10 and later.

### `lib.d.ts` Changes

Changes to how types for the DOM are generated might have an impact on existing code.
Notably, certain properties have been converted from `number` to numeric literal types, and properties and methods for cut, copy, and paste event handling have been moved across interfaces.

### API Breaking Changes

In TypeScript 5.0, we moved to modules, removed some unnecessary interfaces, and made some correctness improvements.
For more details on what's changed, see our API Breaking Changes page.

### Forbidden Implicit Coercions in Relational Operators

Certain operations in TypeScript will already warn you if you write code which may cause an implicit string-to-number coercion:

```ts
function func(ns: number | string) {
  return ns * 4; // Error, possible implicit coercion
}
```

In 5.0, this will also be applied to the relational operators `>`, `<`, `<=`, and `>=`:

```ts
function func(ns: number | string) {
  return ns > 4; // Now also an error
}
```

To allow this if desired, you can explicitly coerce the operand to a `number` using `+`:

```ts
function func(ns: number | string) {
  return +ns > 4; // OK
}
```

This correctness improvement was contributed courtesy of Mateusz Burzyński.

### Enum Overhaul

TypeScript has had some long-standing oddities around `enum`s ever since its first release.
In 5.0, we're cleaning up some of these problems, as well as reducing the concept count needed to understand the various kinds of `enum`s you can declare.

There are two main new errors you might see as part of this.
The first is that assigning an out-of-domain literal to an `enum` type will now error as one might expect:

```ts
enum SomeEvenDigit {
    Zero = 0,
    Two = 2,
    Four = 4
}

// Now correctly an error
let m: SomeEvenDigit = 1;
```

The other is that declaration of certain kinds of indirected mixed string/number `enum` forms would, incorrectly, create an all-number `enum`:

```ts
enum Letters {
    A = "a"
}
enum Numbers {
    one = 1,
    two = Letters.A
}

// Now correctly an error
const t: number = Numbers.two;
```

You can see more details in relevant change.

### More Accurate Type-Checking for Parameter Decorators in Constructors Under `--experimentalDecorators`

TypeScript 5.0 makes type-checking more accurate for decorators under `--experimentalDecorators`.
One place where this becomes apparent is when using a decorator on a constructor parameter.

```ts
export declare const inject:
  (entity: any) =>
    (target: object, key: <example-value> | symbol, index?: number) => void;

export class Foo {}

export class C {
    constructor(@inject(Foo) private x: any) {
    }
}
```

This call will fail because `key` expects a `string | symbol`, but constructor parameters receive a key of `undefined`.
The correct fix is to change the type of `key` within `inject`.
A reasonable workaround if you're using a library that can't be upgraded is is to wrap `inject` in a more type-safe decorator function, and use a type-assertion on `key`.

For more details, see this issue.

### Deprecations and Default Changes

In TypeScript 5.0, we've deprecated the following settings and setting values:

* `--target: ES3`
* `--out`
* `--noImplicitUseStrict`
* `--keyofStringsOnly`
* `--suppressExcessPropertyErrors`
* `--suppressImplicitAnyIndexErrors`
* `--noStrictGenericChecks`
* `--charset`
* `--importsNotUsedAsValues`
* `--preserveValueImports`
* `prepend` in project references

These configurations will continue to be allowed until TypeScript 5.5, at which point they will be removed entirely, however, you will receive a warning if you are using these settings.
In TypeScript 5.0, as well as future releases 5.1, 5.2, 5.3, and 5.4, you can specify `"ignoreDeprecations": "5.0"` to silence those warnings.
We'll also shortly be releasing a 4.9 patch to allow specifying `ignoreDeprecations` to allow for smoother upgrades.
Aside from deprecations, we've changed some settings to better improve cross-platform behavior in TypeScript.

`--newLine`, which controls the line endings emitted in JavaScript files, used to be inferred based on the current operating system if not specified.
We think builds should be as deterministic as possible, and Windows Notepad supports line-feed line endings now, so the new default setting is `LF`.
The old OS-specific inference behavior is no longer available.

`--forceConsistentCasingInFileNames`, which ensured that all references to the same file name in a project agreed in casing, now defaults to `true`.
This can help catch differences issues with code written on case-insensitive file systems.

You can leave feedback and view more information on the tracking issue for 5.0 deprecations
