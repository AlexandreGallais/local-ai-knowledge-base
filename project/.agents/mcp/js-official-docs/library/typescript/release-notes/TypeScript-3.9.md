---
title: "TypeScript 3.9 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 3.9.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 3.9

## Improvements in Inference and `Promise.all`

Recent versions of TypeScript (around 3.7) have had updates to the declarations of functions like `Promise.all` and `Promise.race`.
Unfortunately, that introduced a few regressions, especially when mixing in values with `null` or `undefined`.

```ts
interface Lion {
  roar(): void;
}

interface Seal {
  singKissFromARose(): void;
}

async function visitZoo(
  lionExhibit: Promise<Lion>,
  sealExhibit: Promise<Seal | undefined>
) {
  let [lion, seal] = await Promise.all([lionExhibit, sealExhibit]);
  lion.roar(); // uh oh
  //  ~~~~
  // Object is possibly 'undefined'.
}
```

This is strange behavior!
The fact that `sealExhibit` contained an `undefined` somehow poisoned type of `lion` to include `undefined`.

Thanks to a pull request from Jack Bates, this has been fixed with improvements in our inference process in TypeScript 3.9.
The above no longer errors.
If you've been stuck on older versions of TypeScript due to issues around `Promise`s, we encourage you to give 3.9 a shot!

### What About the `awaited` Type?

If you've been following our issue tracker and design meeting notes, you might be aware of some work around a new type operator called `awaited`.
This goal of this type operator is to accurately model the way that `Promise` unwrapping works in JavaScript.

We initially anticipated shipping `awaited` in TypeScript 3.9, but as we've run early TypeScript builds with existing codebases, we've realized that the feature needs more design work before we can roll it out to everyone smoothly.
As a result, we've decided to pull the feature out of our main branch until we feel more confident.
We'll be experimenting more with the feature, but we won't be shipping it as part of this release.

## Speed Improvements

TypeScript 3.9 ships with many new speed improvements.
Our team has been focusing on performance after observing extremely poor editing/compilation speed with packages like material-ui and styled-components.
We've dived deep here, with a series of different pull requests that optimize certain pathological cases involving large unions, intersections, conditional types, and mapped types.

- https://github.com/microsoft/TypeScript/pull/36576
- https://github.com/microsoft/TypeScript/pull/36590
- https://github.com/microsoft/TypeScript/pull/36607
- https://github.com/microsoft/TypeScript/pull/36622
- https://github.com/microsoft/TypeScript/pull/36754
- https://github.com/microsoft/TypeScript/pull/36696

Each of these pull requests gains about a 5-10% reduction in compile times on certain codebases.
In total, we believe we've achieved around a 40% reduction in material-ui's compile time!

We also have some changes to file renaming functionality in editor scenarios.
We heard from the Visual Studio Code team that when renaming a file, just figuring out which import statements needed to be updated could take between 5 to 10 seconds.
TypeScript 3.9 addresses this issue by changing the internals of how the compiler and language service caches file lookups.

While there's still room for improvement, we hope this work translates to a snappier experience for everyone!

## `// @ts-expect-error` Comments

Imagine that we're writing a library in TypeScript and we're exporting some function called `doStuff` as part of our public API.
The function's types declare that it takes two `string`s so that other TypeScript users can get type-checking errors, but it also does a runtime check (maybe only in development builds) to give JavaScript users a helpful error.

```ts
function doStuff(abc: string, xyz: string) {
  assert(typeof abc === "string");
  assert(typeof xyz === "string");

  // do some stuff
}
```

So TypeScript users will get a helpful red squiggle and an error message when they misuse this function, and JavaScript users will get an assertion error.
We'd like to test this behavior, so we'll write a unit test.

```ts
expect(() => {
  doStuff(123, 456);
}).toThrow();
```

Unfortunately if our tests are written in TypeScript, TypeScript will give us an error!

```ts
doStuff(123, 456);
//          ~~~
// error: Type 'number' is not assignable to type 'string'.
```

That's why TypeScript 3.9 brings a new feature: `// @ts-expect-error` comments.
When a line is preceded by a `// @ts-expect-error` comment, TypeScript will suppress that error from being reported;
but if there's no error, TypeScript will report that `// @ts-expect-error` wasn't necessary.

As a quick example, the following code is okay

```ts
console.log(47 * "octopus");
```

while the following code

```ts
console.log(1 + 1);
```

results in the error

```
Unused '@ts-expect-error' directive.
```

We'd like to extend a big thanks to Josh Goldberg, the contributor who implemented this feature.
For more information, you can take a look at the `ts-expect-error` pull request.

### `ts-ignore` or `ts-expect-error`?

In some ways `// @ts-expect-error` can act as a suppression comment, similar to `// @ts-ignore`.
The difference is that `// @ts-ignore` will do nothing if the following line is error-free.

You might be tempted to switch existing `// @ts-ignore` comments over to `// @ts-expect-error`, and you might be wondering which is appropriate for future code.
While it's entirely up to you and your team, we have some ideas of which to pick in certain situations.

Pick `ts-expect-error` if:

- you're writing test code where you actually want the type system to error on an operation
- you expect a fix to be coming in fairly quickly and you just need a quick workaround
- you're in a reasonably-sized project with a proactive team that wants to remove suppression comments as soon as affected code is valid again

Pick `ts-ignore` if:

- you have a larger project and new errors have appeared in code with no clear owner
- you are in the middle of an upgrade between two different versions of TypeScript, and a line of code errors in one version but not another.
- you honestly don't have the time to decide which of these options is better.

## Uncalled Function Checks in Conditional Expressions

In TypeScript 3.7 we introduced _uncalled function checks_ to report an error when you've forgotten to call a function.

```ts
function hasImportantPermissions(): boolean {
  // ...
}

// Oops!
if (hasImportantPermissions) {
  //  ~~~~~~~~~~~~~~~~~~~~~~~
  // This condition will always return true since the function is always defined.
  // Did you mean to call it instead?
  deleteAllTheImportantFiles();
}
```

However, this error only applied to conditions in `if` statements.
Thanks to a pull request from Alexander Tarasyuk, this feature is also now supported in ternary conditionals (i.e. the `cond ? trueExpr : falseExpr` syntax).

```ts
declare function listFilesOfDirectory(dirPath: string): string[];
declare function isDirectory(): boolean;

function getAllFiles(startFileName: string) {
  const result: string[] = [];
  traverse(startFileName);
  return result;

  function traverse(currentPath: string) {
    return isDirectory
      ? //     ~~~~~~~~~~~
        // This condition will always return true
        // since the function is always defined.
        // Did you mean to call it instead?
        listFilesOfDirectory(currentPath).forEach(traverse)
      : result.push(currentPath);
  }
}
```

https://github.com/microsoft/TypeScript/issues/36048

## Editor Improvements

The TypeScript compiler not only powers the TypeScript editing experience in most major editors, it also powers the JavaScript experience in the Visual Studio family of editors and more.
Using new TypeScript/JavaScript functionality in your editor will differ depending on your editor, but

- Visual Studio Code supports selecting different versions of TypeScript. Alternatively, there's the JavaScript/TypeScript Nightly Extension to stay on the bleeding edge (which is typically very stable).
- Visual Studio 2017/2019 have [the SDK installers above] and MSBuild installs.
- Sublime Text 3 supports selecting different versions of TypeScript

### CommonJS Auto-Imports in JavaScript

One great new improvement is in auto-imports in JavaScript files using CommonJS modules.

In older versions, TypeScript always assumed that regardless of your file, you wanted an ECMAScript-style import like

```js
import * as fs from "fs";
```

However, not everyone is targeting ECMAScript-style modules when writing JavaScript files.
Plenty of users still use CommonJS-style `require(...)` imports like so

```js
const fs = require("fs");
```

TypeScript now automatically detects the types of imports you're using to keep your file's style clean and consistent.

For more details on the change, see the corresponding pull request.

### Code Actions Preserve Newlines

TypeScript's refactorings and quick fixes often didn't do a great job of preserving newlines.
As a really basic <example-value>, take the following code.

```ts
const maxValue = 100;

/*start*/
for (let i = 0; i <= maxValue; i++) {
  // First get the squared value.
  let square = i ** 2;

  // Now print the squared value.
  console.log(square);
}
/*end*/
```

If we highlighted the range from `/*start*/` to `/*end*/` in our editor to extract to a new function, we'd end up with code like the following.

```ts
const maxValue = 100;

printSquares();

function printSquares() {
  for (let i = 0; i <= maxValue; i++) {
    // First get the squared value.
    let square = i ** 2;
    // Now print the squared value.
    console.log(square);
  }
}
```

That's not ideal - we had a blank line between each statement in our `for` loop, but the refactoring got rid of it!
TypeScript 3.9 does a little more work to preserve what we write.

```ts
const maxValue = 100;

printSquares();

function printSquares() {
  for (let i = 0; i <= maxValue; i++) {
    // First get the squared value.
    let square = i ** 2;

    // Now print the squared value.
    console.log(square);
  }
}
```

You can see more about the implementation in this pull request

### Quick Fixes for Missing Return Expressions

There are occasions where we might forget to return the value of the last statement in a function, especially when adding curly braces to arrow functions.

```ts
// before
let f1 = () => 42;

// oops - not the same!
let f2 = () => {
  42;
};
```

Thanks to a pull request from community member Wenlu Wang, TypeScript can provide a quick-fix to add missing `return` statements, remove curly braces, or add parentheses to arrow function bodies that look suspiciously like object literals.

### Support for "Solution Style" `tsconfig.json` Files

Editors need to figure out which configuration file a file belongs to so that it can apply the appropriate options and figure out which other files are included in the current "project".
By default, editors powered by TypeScript's language server do this by walking up each parent directory to find a `tsconfig.json`.

One case where this slightly fell over is when a `tsconfig.json` simply existed to reference other `tsconfig.json` files.

```jsonc
// tsconfig.json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.shared.json" },
    { "path": "./tsconfig.frontend.json" },
    { "path": "./tsconfig.backend.json" }
  ]
}
```

This file that really does nothing but manage other project files is often called a "solution" in some environments.
Here, none of these `tsconfig.*.json` files get picked up by the server, but we'd really like the language server to understand that the current `.ts` file probably belongs to one of the mentioned projects in this root `tsconfig.json`.

TypeScript 3.9 adds support to editing scenarios for this configuration.
For more details, take a look at the pull request that added this functionality.
