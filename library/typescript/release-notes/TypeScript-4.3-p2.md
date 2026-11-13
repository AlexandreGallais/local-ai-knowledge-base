---
title: "TypeScript 4.3 (part 2 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.3.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.3 (part 2 of 3)

## Contextual Narrowing for Generics

TypeScript 4.3 now includes some slightly smarter type-narrowing logic on generic values.
This allows TypeScript to accept more patterns, and sometimes even catch mistakes.

For some motivation, let's say we're trying to write a function called `makeUnique`.
It'll take a `Set` or an `Array` of elements, and if it's given an `Array`, it'll sort that `Array` remove duplicates according to some comparison function.
After all that, it will return the original collection.

```ts
function makeUnique<T>(
  collection: Set<T> | T[],
  comparer: (x: T, y: T) => number
): Set<T> | T[] {
  // Early bail-out if we have a Set.
  // We assume the elements are already unique.
  if (collection instanceof Set) {
    return collection;
  }

  // Sort the array, then remove consecutive duplicates.
  collection.sort(comparer);
  for (let i = 0; i < collection.length; i++) {
    let j = i;
    while (
      j < collection.length &&
      comparer(collection[i], collection[j + 1]) === 0
    ) {
      j++;
    }
    collection.splice(i + 1, j - i);
  }
  return collection;
}
```

Let's leave questions about this function's implementation aside, and assume it arose from the requirements of a broader application.
Something that you might notice is that the signature doesn't capture the original type of `collection`.
We can do that by adding a type parameter called `C` in place of where we've written `Set<T> | T[]`.

```diff
- function makeUnique<T>(collection: Set<T> | T[], comparer: (x: T, y: T) => number): Set<T> | T[]
+ function makeUnique<T, C extends Set<T> | T[]>(collection: C, comparer: (x: T, y: T) => number): C
```

In TypeScript 4.2 and earlier, you'd end up with a bunch of errors as soon as you tried this.

```ts
function makeUnique<T, C extends Set<T> | T[]>(
  collection: C,
  comparer: (x: T, y: T) => number
): C {
  // Early bail-out if we have a Set.
  // We assume the elements are already unique.
  if (collection instanceof Set) {
    return collection;
  }

  // Sort the array, then remove consecutive duplicates.
  collection.sort(comparer);
  //         ~~~~
  // error: Property 'sort' does not exist on type 'C'.
  for (let i = 0; i < collection.length; i++) {
    //                             ~~~~~~
    // error: Property 'length' does not exist on type 'C'.
    let j = i;
    while (
      j < collection.length &&
      comparer(collection[i], collection[j + 1]) === 0
    ) {
      //                    ~~~~~~
      // error: Property 'length' does not exist on type 'C'.
      //                                       ~~~~~~~~~~~~~  ~~~~~~~~~~~~~~~~~
      // error: Element implicitly has an 'any' type because expression of type 'number'
      //        can't be used to index type 'Set<T> | T[]'.
      j++;
    }
    collection.splice(i + 1, j - i);
    //         ~~~~~~
    // error: Property 'splice' does not exist on type 'C'.
  }
  return collection;
}
```

Ew, errors!
Why is TypeScript being so mean to us?

The issue is that when we perform our `collection instanceof Set` check, we're expecting that to act as a type guard that narrows the type from `Set<T> | T[]` to `Set<T>` and `T[]` depending on the branch we're in;
however, we're not dealing with a `Set<T> | T[]`, we're trying to narrow the generic value `collection`, whose type is `C`.

It's a very subtle distinction, but it makes a difference.
TypeScript can't just grab the constraint of `C` (which is `Set<T> | T[]`) and narrow that.
If TypeScript _did_ try to narrow from `Set<T> | T[]`, it would forget that `collection` is also a `C` in each branch because there's no easy way to preserve that information.
If hypothetically TypeScript tried that approach, it would break the above example in a different way.
At the return positions, where the function expects values with the type `C`, we would instead get a `Set<T>` and a `T[]` in each branch, which TypeScript would reject.

```ts
function makeUnique<T>(
  collection: Set<T> | T[],
  comparer: (x: T, y: T) => number
): Set<T> | T[] {
  // Early bail-out if we have a Set.
  // We assume the elements are already unique.
  if (collection instanceof Set) {
    return collection;
    //     ~~~~~~~~~~
    // error: Type 'Set<T>' is not assignable to type 'C'.
    //          'Set<T>' is assignable to the constraint of type 'C', but
    //          'C' could be instantiated with a different subtype of constraint 'Set<T> | T[]'.
  }

  // ...

  return collection;
  //     ~~~~~~~~~~
  // error: Type 'T[]' is not assignable to type 'C'.
  //          'T[]' is assignable to the constraint of type 'C', but
  //          'C' could be instantiated with a different subtype of constraint 'Set<T> | T[]'.
}
```

So how does TypeScript 4.3 change things?
Well, basically in a few key places when writing code, all the type system really cares about is the constraint of a type.
For example, when we write `collection.length`, TypeScript doesn't care about the fact that `collection` has the type `C`, it only cares about the properties available, which are determined by the constraint `T[] | Set<T>`.

In cases like this, TypeScript will grab the narrowed type of the constraint because that will give you the data you care about;
however, in any other case, we'll just try to narrow the original generic type (and often end up with the original generic type).

In other words, based on how you use a generic value, TypeScript will narrow it a little differently.
The end result is that the entire above example compiles with no type-checking errors.

For more details, you can look at the original pull request on GitHub.

## Always-Truthy Promise Checks

Under `strictNullChecks`, checking whether a `Promise` is "truthy" in a conditional will trigger an error.

```ts
async function foo(): Promise<boolean> {
  return false;
}

async function bar(): Promise<string> {
  if (foo()) {
    //  ~~~~~
    // Error!
    // This condition will always return true since
    // this 'Promise<boolean>' appears to always be defined.
    // Did you forget to use 'await'?
    return "true";
  }
  return "false";
}
```

This change was contributed by Jack Works, and we extend our thanks to them!

## `static` Index Signatures

Index signatures allow us to set more properties on a value than a type explicitly declares.

```ts
class Foo {
  hello = "hello";
  world = 1234;

  // This is an index signature:
  [propName: string]: string | number | undefined;
}

let instance = new Foo();

// Valid assignment
instance["whatever"] = 42;

// Has type 'string | number | undefined'.
let x = instance["something"];
```

Up until now, an index signature could only be declared on the instance side of a class.
Thanks to a pull request from Wenlu Wang, index signatures can now be declared as `static`.

```ts
class Foo {
  static hello = "hello";
  static world = 1234;

  static [propName: string]: string | number | undefined;
}

// Valid.
Foo["whatever"] = 42;

// Has type 'string | number | undefined'
let x = Foo["something"];
```

The same sorts of rules apply for index signatures on the static side of a class as they do for the instance side - namely, that every other static property has to be compatible with the index signature.

```ts
class Foo {
  static prop = true;
  //     ~~~~
  // Error! Property 'prop' of type 'boolean'
  // is not assignable to string index type
  // 'string | number | undefined'.

  static [propName: string]: string | number | undefined;
}
```

## `.tsbuildinfo` Size Improvements

In TypeScript 4.3, `.tsbuildinfo` files that are generated as part of `incremental` builds should be significantly smaller.
This is thanks to several optimizations in the internal format, creating tables with numeric identifiers to be used throughout the file instead of repeating full paths and similar information.
This work was spear-headed by Tobias Koppers in their pull request, serving as inspiration for the ensuing pull request and further optimizations.

We have seen significant reductions of `.tsbuildinfo` file sizes including

- 1MB to 411 KB
- 14.9MB to 1MB
- 1345MB to 467MB

Needless to say, these sorts of savings in size translate to slightly faster build times as well.

## Lazier Calculations in `--incremental` and `--watch` Compilations

One of the issues with `incremental` and `--watch` modes are that while they make later compilations go faster, the initial compilation can be a bit slower - in some cases, significantly slower.
This is because these modes have to perform a bunch of book-keeping, computing information about the current project, and sometimes saving that data in a `.tsbuildinfo` file for later builds.

That's why on top of `.tsbuildinfo` size improvements, TypeScript 4.3 also ships some changes to `incremental` and `--watch` modes that make the first build of a project with these flags just as fast as an ordinary build!
To do this, much of the information that would ordinarily be computed up-front is instead done on an on-demand basis for later builds.
While this can add some overhead to a subsequent build, TypeScript's `incremental` and `--watch` functionality will still typically operate on a much smaller set of files, and any needed information will be saved afterwards.
In a sense, `incremental` and `--watch` builds will "warm up" and get faster at compiling files once you've updated them a few times.

In a repository with 3000 files, **this reduced initial build times to almost a third**!

This work was started by Tobias Koppers, whose work ensued in the resulting final change for this functionality.
We'd like to extend a great thanks to Tobias for helping us find these opportunities for improvements!

## Import Statement Completions

One of the biggest pain-points users run into with import and export statements in JavaScript is the order - specifically that imports are written as

```ts
import { func } from "./module.js";
```

instead of

```ts
from "./module.js" import { func };
```

This causes some pain when writing out a full import statement from scratch because auto-complete wasn't able to work correctly.
For example, if you start writing something like `import {`, TypeScript has no idea what module you're planning on importing from, so it couldn't provide any scoped-down completions.

To alleviate this, we've leveraged the power of auto-imports!
Auto-imports already deal with the issue of not being able to narrow down completions from a specific module - their whole point is to provide every possible export and automatically insert an import statement at the top of your file.

So when you now start writing an `import` statement that doesn't have a path, we'll provide you with a list of possible imports.
When you commit a completion, we'll complete the full import statement, including the path that you were going to write.

This work requires editors that specifically support the feature.
You'll be able to try this out by using the latest Insiders versions of Visual Studio Code.

For more information, take a look at the implementing pull request!

## Editor Support for `@link` Tags

TypeScript can now understand `@link` tags, and will try to resolve declarations that they link to.
What this means is that you'll be able to hover over names within `@link` tags and get quick information, or use commands like go-to-definition or find-all-references.

For example, you'll be able to go-to-definition on `plantCarrot` in `@link plantCarrot` in the example below and a TypeScript-supported editor will jump to `plantCarrot`'s function declaration.

```ts
/**
 * To be called 70 to 80 days after {@link plantCarrot}.
 */
function harvestCarrot(carrot: Carrot) {}

/**
 * Call early in spring for best results. Added in v2.1.0.
 * @param seed Make sure it's a carrot seed!
 */
function plantCarrot(seed: Seed) {
  // TODO: some gardening
}
```

For more information, see the pull request on GitHub!

## Go-to-Definition on Non-JavaScript File Paths

Many loaders allow users to include assets in their applications using JavaScript imports.
They'll typically be written as something like `import "./styles.css"` or the like.

Up until now, TypeScript's editor functionality wouldn't even attempt to read this file, so go-to-definition would typically fail.
At best, go-to-definition would jump to a declaration like `declare module "*.css"` if it could find something along those lines.

TypeScript's language service now tries to jump to the correct file when you perform a go-to-definition on relative file paths, even if they're not JavaScript or TypeScript files!
Try it out with imports to CSS, SVGs, PNGs, font files, Vue files, and more.

For more information, you can check out the implementing pull request.
