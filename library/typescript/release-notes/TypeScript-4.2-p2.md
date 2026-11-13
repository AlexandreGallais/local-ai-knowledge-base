---
title: "TypeScript 4.2 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.2.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.2 (part 2 of 2)

## Improved Uncalled Function Checks in Logical Expressions

Thanks to further improvements from Alex Tarasyuk, TypeScript's uncalled function checks now apply within `&&` and `||` expressions.

Under `strictNullChecks`, the following code will now error.

```ts
function shouldDisplayElement(element: Element) {
  // ...
  return true;
}

function getVisibleItems(elements: Element[]) {
  return elements.filter((e) => shouldDisplayElement && e.children.length);
  //                          ~~~~~~~~~~~~~~~~~~~~
  // This condition will always return true since the function is always defined.
  // Did you mean to call it instead.
}
```

For more details, check out the pull request here.

## Destructured Variables Can Be Explicitly Marked as Unused

Thanks to another pull request from Alex Tarasyuk, you can now mark destructured variables as unused by prefixing them with an underscore (the `_` character).

```ts
let [_first, second] = getValues();
```

Previously, if `_first` was never used later on, TypeScript would issue an error under `noUnusedLocals`.
Now, TypeScript will recognize that `_first` was intentionally named with an underscore because there was no intent to use it.

For more details, take a look at the full change.

## Relaxed Rules Between Optional Properties and String Index Signatures

String index signatures are a way of typing dictionary-like objects, where you want to allow access with arbitrary keys:

```ts
const movieWatchCount: { [key: string]: number } = {};

function watchMovie(title: string) {
  movieWatchCount[title] = (movieWatchCount[title] ?? 0) + 1;
}
```

Of course, for any movie title not yet in the dictionary, `movieWatchCount[title]` will be `undefined` (TypeScript 4.1 added the option `noUncheckedIndexedAccess` to include `undefined` when reading from an index signature like this).
Even though it's clear that there must be some strings not present in `movieWatchCount`, previous versions of TypeScript treated optional object properties as unassignable to otherwise compatible index signatures, due to the presence of `undefined`.

```ts
type WesAndersonWatchCount = {
  "Fantastic Mr. Fox"?: number;
  "The Royal Tenenbaums"?: number;
  "Moonrise Kingdom"?: number;
  "The Grand Budapest Hotel"?: number;
};

declare const wesAndersonWatchCount: WesAndersonWatchCount;
const movieWatchCount: { [key: string]: number } = wesAndersonWatchCount;
//    ~~~~~~~~~~~~~~~ error!
// Type 'WesAndersonWatchCount' is not assignable to type '{ [key: string]: number; }'.
//    Property '"Fantastic Mr. Fox"' is incompatible with index signature.
//      Type 'number | undefined' is not assignable to type 'number'.
//        Type 'undefined' is not assignable to type 'number'. (2322)
```

TypeScript 4.2 allows this assignment. However, it does _not_ allow the assignment of non-optional properties with `undefined` in their types, nor does it allow writing `undefined` to a specific key:

```ts
type BatmanWatchCount = {
  "Batman Begins": number | undefined;
  "The Dark Knight": number | undefined;
  "The Dark Knight Rises": number | undefined;
};

declare const batmanWatchCount: BatmanWatchCount;

// Still an error in TypeScript 4.2.
const movieWatchCount: { [key: string]: number } = batmanWatchCount;

// Still an error in TypeScript 4.2.
// Index signatures don't implicitly allow explicit `undefined`.
movieWatchCount["It's the Great Pumpkin, Charlie Brown"] = undefined;
```

The new rule also does not apply to number index signatures, since they are assumed to be array-like and dense:

```ts
declare let sortOfArrayish: { [key: number]: string };
declare let numberKeys: { 42?: string };

sortOfArrayish = numberKeys;
```

You can get a better sense of this change by reading up on the original PR.

## Declare Missing Helper Function

Thanks to a community pull request from Alexander Tarasyuk, we now have a quick fix for declaring new functions and methods based on the call-site!

## Breaking Changes

We always strive to minimize breaking changes in a release.
TypeScript 4.2 contains some breaking changes, but we believe they should be manageable in an upgrade.

### `lib.d.ts` Updates

As with every TypeScript version, declarations for `lib.d.ts` (especially the declarations generated for web contexts), have changed.
There are various changes, though `Intl` and `ResizeObserver`'s may end up being the most disruptive.

### `noImplicitAny` Errors Apply to Loose `yield` Expressions

When the value of a `yield` expression is captured, but TypeScript can't immediately figure out what type you intend for it to receive (i.e. the `yield` expression isn't contextually typed), TypeScript will now issue an implicit `any` error.

```ts
function* g1() {
  const value = yield 1;
}

function* g2() {
  // No error.
  // The result of `yield 1` is unused.
  yield 1;
}

function* g3() {
  // No error.
  // `yield 1` is contextually typed by 'string'.
  const value: string = yield 1;
}

function* g4(): Generator<number, void, string> {
  // No error.
  // TypeScript can figure out the type of `yield 1`
  // from the explicit return type of `g4`.
  const value = yield 1;
}
```

See more details in the corresponding changes.

### Expanded Uncalled Function Checks

As described above, uncalled function checks will now operate consistently within `&&` and `||` expressions when using `strictNullChecks`.
This can be a source of new breaks, but is typically an indication of a logic error in existing code.

### Type Arguments in JavaScript Are Not Parsed as Type Arguments

Type arguments were already not allowed in JavaScript, but in TypeScript 4.2, the parser will parse them in a more spec-compliant way.
So when writing the following code in a JavaScript file:

```ts
f<T>(100);
```

TypeScript will parse it as the following JavaScript:

```js
f < T > 100;
```

This may impact you if you were leveraging TypeScript's API to parse type constructs in JavaScript files, which may have occurred when trying to parse Flow files.

See the pull request for more details on what's checked.

### Tuple size limits for spreads

Tuple types can be made by using any sort of spread syntax (`...`) in TypeScript.

```ts
// Tuple types with spread elements
type NumStr = [number, string];
type NumStrNumStr = [...NumStr, ...NumStr];

// Array spread expressions
const numStr = [123, "hello"] as const;
const numStrNumStr = [...numStr, ...numStr] as const;
```

Sometimes these tuple types can accidentally grow to be huge, and that can make type-checking take a long time.
Instead of letting the type-checking process hang (which is especially bad in editor scenarios), TypeScript has a limiter in place to avoid doing all that work.

You can see this pull request for more details.

### `.d.ts` Extensions Cannot Be Used In Import Paths

In TypeScript 4.2, it is now an error for your import paths to contain `.d.ts` in the extension.

```ts
// must be changed to something like
//   - "./foo"
//   - "./foo.js"
import { Foo } from "./foo.d.ts";
```

Instead, your import paths should reflect whatever your loader will do at runtime.
Any of the following imports might be usable instead.

```ts
import { Foo } from "./foo";
import { Foo } from "./foo.js";
import { Foo } from "./foo/index.js";
```

### Reverting Template Literal Inference

This change removed a feature from TypeScript 4.2 beta.
If you haven't yet upgraded past our last stable release, you won't be affected, but you may still be interested in the change.

The beta version of TypeScript 4.2 included a change in inference to template strings.
In this change, template string literals would either be given template string types or simplify to multiple string literal types.
These types would then _widen_ to `string` when assigning to mutable variables.

```ts
declare const yourName: string;

// 'bar' is constant.
// It has type '`hello ${string}`'.
const bar = `hello ${yourName}`;

// 'baz' is mutable.
// It has type 'string'.
let baz = `hello ${yourName}`;
```

This is similar to how string literal inference works.

```ts
// 'bar' has type '"hello"'.
const bar = "hello";

// 'baz' has type 'string'.
let baz = "hello";
```

For that reason, we believed that making template string expressions have template string types would be "consistent";
however, from what we've seen and heard, that isn't always desirable.

In response, we've reverted this feature (and potential breaking change).
If you _do_ want a template string expression to be given a literal-like type, you can always add `as const` to the end of it.

```ts
declare const yourName: string;

// 'bar' has type '`hello ${string}`'.
const bar = `hello ${yourName}` as const;
//                              ^^^^^^^^

// 'baz' has type 'string'.
const baz = `hello ${yourName}`;
```

### TypeScript's `lift` Callback in `visitNode` Uses a Different Type

TypeScript has a `visitNode` function that takes a `lift` function.
`lift` now expects a `readonly Node[]` instead of a `NodeArray<Node>`.
This is technically an API breaking change which you can read more on here.
