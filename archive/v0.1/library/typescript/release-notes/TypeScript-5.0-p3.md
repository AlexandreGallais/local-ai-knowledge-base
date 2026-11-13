---
title: "TypeScript 5.0 (part 3 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.0 (part 3 of 4)

## `--verbatimModuleSyntax`

By default, TypeScript does something called *import elision*.
Basically, if you write something like

```ts
import { Car } from "./car";

export function drive(car: Car) {
    // ...
}
```

TypeScript detects that you're only using an import for types and drops the import entirely.
Your output JavaScript might look something like this:

```js
export function drive(car) {
    // ...
}
```

Most of the time this is good, because if `Car` isn't a value that's exported from `./car`, we'll get a runtime error.

But it does add a layer of complexity for certain edge cases.
For example, notice there's no statement like `import "./car";` - the import was dropped entirely.
That actually makes a difference for modules that have side-effects or not.

TypeScript's emit strategy for JavaScript also has another few layers of complexity - import elision isn't always just driven by how an import is used - it often consults how a value is declared as well.
So it's not always clear whether code like the following

```ts
export { Car } from "./car";
```

should be preserved or dropped.
If `Car` is declared with something like a `class`, then it can be preserved in the resulting JavaScript file.
But if `Car` is only declared as a `type` alias or `interface`, then the JavaScript file shouldn't export `Car` at all.

While TypeScript might be able to make these emit decisions based on information from across files, not every compiler can.

The `type` modifier on imports and exports helps with these situations a bit.
We can make it explicit whether an import or export is only being used for type analysis, and can be dropped entirely in JavaScript files by using the `type` modifier.

```ts
// This statement can be dropped entirely in JS output
import type * as car from "./car";

// The named import/export 'Car' can be dropped in JS output
import { type Car } from "./car";
export { type Car } from "./car";
```

`type` modifiers are not quite useful on their own - by default, module elision will still drop imports, and nothing forces you to make the distinction between `type` and plain imports and exports.
So TypeScript has the flag `--importsNotUsedAsValues` to make sure you use the `type` modifier, `--preserveValueImports` to prevent *some* module elision behavior, and `--isolatedModules` to make sure that your TypeScript code works across different compilers.
Unfortunately, understanding the fine details of those 3 flags is hard, and there are still some edge cases with unexpected behavior.

TypeScript 5.0 introduces a new option called `--verbatimModuleSyntax` to simplify the situation.
The rules are much simpler - any imports or exports without a `type` modifier are left around.
Anything that uses the `type` modifier is dropped entirely.

```ts
// Erased away entirely.
import type { A } from "a";

// Rewritten to 'import { b } from "bcd";'
import { b, type c, type d } from "bcd";

// Rewritten to 'import {} from "xyz";'
import { type xyz } from "xyz";
```

With this new option, what you see is what you get.

That does have some implications when it comes to module interop though.
Under this flag, ECMAScript `import`s and `export`s won't be rewritten to `require` calls when your settings or file extension implied a different module system.
Instead, you'll get an error.
If you need to emit code that uses `require` and `module.exports`, you'll have to use TypeScript's module syntax that predates ES2015:

         | Input TypeScript
         | Output JavaScript

 |

```ts
import foo = require("foo");
```

 |

```js
const foo = require("foo");
```

 |

```ts
function foo() {}
function bar() {}
function baz() {}

export = {
    foo,
    bar,
    baz
};
```

 |

```js
function foo() {}
function bar() {}
function baz() {}

module.exports = {
    foo,
    bar,
    baz
};
```

While this is a limitation, it does help make some issues more obvious.
For example, it's very common to forget to set the `type` field in `package.json` under `--module node16`.
As a result, developers would start writing CommonJS modules instead of ES modules without realizing it, giving surprising lookup rules and JavaScript output.
This new flag ensures that you're intentional about the file type you're using because the syntax is intentionally different.

Because `--verbatimModuleSyntax` provides a more consistent story than `--importsNotUsedAsValues` and `--preserveValueImports`, those two existing flags are being deprecated in its favor.

For more details, read up on [the original pull request]https://github.com/microsoft/TypeScript/pull/52203 and its proposal issue.

## Support for `export type *`

When TypeScript 3.8 introduced type-only imports, the new syntax wasn't allowed on `export * from "module"` or `export * as ns from "module"` re-exports. TypeScript 5.0 adds support for both of these forms:

```ts
// models/vehicles.ts
export class Spaceship {
  // ...
}

// models/index.ts
export type * as vehicles from "./vehicles";

// main.ts
import { vehicles } from "./models";

function takeASpaceship(s: vehicles.Spaceship) {
  // ✅ ok - `vehicles` only used in a type position
}

function makeASpaceship() {
  return new vehicles.Spaceship();
  //         ^^^^^^^^
  // 'vehicles' cannot be used as a value because it was exported using 'export type'.
}
```

You can read more about the implementation here.

## `@satisfies` Support in JSDoc

TypeScript 4.9 introduced the `satisfies` operator.
It made sure that the type of an expression was compatible, without affecting the type itself.
For example, let's take the following code:

```ts
interface CompilerOptions {
    strict?: boolean;
    outDir?: string;
    // ...
}

interface ConfigSettings {
    compilerOptions?: CompilerOptions;
    extends?: string | string[];
    // ...
}

let myConfigSettings = {
    compilerOptions: {
        strict: true,
        outDir: "../lib",
        // ...
    },

    extends: [
        "@tsconfig/strictest/tsconfig.json",
        "../../../tsconfig.base.json"
    ],

} satisfies ConfigSettings;
```

Here, TypeScript knows that `myConfigSettings.extends` was declared with an array - because while `satisfies` validated the type of our object, it didn't bluntly change it to `CompilerOptions` and lose information.
So if we want to map over `extends`, that's fine.

```ts
declare function resolveConfig(configPath: string): CompilerOptions;

let inheritedConfigs = myConfigSettings.extends.map(resolveConfig);
```

This was helpful for TypeScript users, but plenty of people use TypeScript to type-check their JavaScript code using JSDoc annotations.
That's why TypeScript 5.0 is supporting a new JSDoc tag called `@satisfies` that does exactly the same thing.

`/** @satisfies */` can catch type mismatches:

```js

/**
 * @typedef CompilerOptions
 * @prop {boolean} [strict]
 * @prop {string} [outDir]
 */

/**
 * @satisfies {CompilerOptions}
 */
let myCompilerOptions = {
    outdir: "../lib",
//  ~~~~~~ oops! we meant outDir
};
```

But it will preserve the original type of our expressions, allowing us to use our values more precisely later on in our code.

```js

/**
 * @typedef CompilerOptions
 * @prop {boolean} [strict]
 * @prop {string} [outDir]
 */

/**
 * @typedef ConfigSettings
 * @prop {CompilerOptions} [compilerOptions]
 * @prop {string | string[]} [extends]
 */

/**
 * @satisfies {ConfigSettings}
 */
let myConfigSettings = {
    compilerOptions: {
        strict: true,
        outDir: "../lib",
    },
    extends: [
        "@tsconfig/strictest/tsconfig.json",
        "../../../tsconfig.base.json"
    ],
};

let inheritedConfigs = myConfigSettings.extends.map(resolveConfig);
```

`/** @satisfies */` can also be used inline on any parenthesized expression.
We could have written `myCompilerOptions` like this:

```ts
let myConfigSettings = /** @satisfies {ConfigSettings} */ ({
    compilerOptions: {
        strict: true,
        outDir: "../lib",
    },
    extends: [
        "@tsconfig/strictest/tsconfig.json",
        "../../../tsconfig.base.json"
    ],
});
```

Why?
Well, it usually makes more sense when you're deeper in some other code, like a function call.

```js
compileCode(/** @satisfies {CompilerOptions} */ ({
    // ...
}));
```

This feature was provided thanks to Oleksandr Tarasiuk!

## `@overload` Support in JSDoc

In TypeScript, you can specify overloads for a function.
Overloads give us a way to say that a function can be called with different arguments, and possibly return different results.
They can restrict how callers can actually use our functions, and refine what results they'll get back.

```ts
// Our overloads:
function printValue(str: string): void;
function printValue(num: number, maxFractionDigits?: number): void;

// Our implementation:
function printValue(value: string | number, maximumFractionDigits?: number) {
    if (typeof value === "number") {
        const formatter = Intl.NumberFormat("en-US", {
            maximumFractionDigits,
        });
        value = formatter.format(value);
    }

    console.log(value);
}
```

Here, we've said that `printValue` takes either a `string` or a `number` as its first argument.
If it takes a `number`, it can take a second argument to determine how many fractional digits we can print.

TypeScript 5.0 now allows JSDoc to declare overloads with a new `@overload` tag.
Each JSDoc comment with an `@overload` tag is treated as a distinct overload for the following function declaration.

```js

/**
 * @overload
 * @param {string} value
 * @return {void}
 */

/**
 * @overload
 * @param {number} value
 * @param {number} [maximumFractionDigits]
 * @return {void}
 */

/**
 * @param {string | number} value
 * @param {number} [maximumFractionDigits]
 */
function printValue(value, maximumFractionDigits) {
    if (typeof value === "number") {
        const formatter = Intl.NumberFormat("en-US", {
            maximumFractionDigits,
        });
        value = formatter.format(value);
    }

    console.log(value);
}
```

Now regardless of whether we're writing in a TypeScript or JavaScript file, TypeScript can let us know if we've called our functions incorrectly.

```ts
// all allowed
printValue("hello!");
printValue(123.45);
printValue(123.45, 2);

printValue("hello!", 123); // error!
```

This new tag was implemented thanks to Tomasz Lenarcik.

## Passing Emit-Specific Flags Under `--build`

TypeScript now allows the following flags to be passed under `--build` mode

* `--declaration`
* `--emitDeclarationOnly`
* `--declarationMap`
* `--sourceMap`
* `--inlineSourceMap`

This makes it way easier to customize certain parts of a build where you might have different development and production builds.

For example, a development build of a library might not need to produce declaration files, but a production build would.
A project can configure declaration emit to be off by default and simply be built with

```sh
tsc --build -p ./my-project-dir
```

Once you're done iterating in the inner loop, a "production" build can just pass the `--declaration` flag.

```sh
tsc --build -p ./my-project-dir --declaration
```

More information on this change is available here.

## Case-Insensitive Import Sorting in Editors

In editors like Visual Studio and VS Code, TypeScript powers the experience for organizing and sorting imports and exports.
Often though, there can be different interpretations of when a list is "sorted".

For example, is the following import list sorted?

```ts
import {
    Toggle,
    freeze,
    toBoolean,
} from "./utils";
```

The answer might surprisingly be "it depends".
If we *don't* care about case-sensitivity, then this list is clearly not sorted.
The letter `f` comes before both `t` and `T`.

But in most programming languages, sorting defaults to comparing the byte values of strings.
The way JavaScript compares strings means that `"Toggle"` always comes before `"freeze"` because according to the ASCII character encoding, uppercase letters come before lowercase.
So from that perspective, the import list is sorted.

TypeScript previously considered the import list to be sorted because it was doing a basic <example-value> sort.
This could be a point of frustration for developers who preferred a case-*insensitive* ordering, or who used tools like ESLint which require case-insensitive ordering by default.

TypeScript now detects case sensitivity by default.
This means that TypeScript and tools like ESLint typically won't "fight" each other over how to best sort imports.

Our team has also been experimenting with further sorting strategies which you can read about here.
These options may eventually be configurable by editors.
For now, they are still unstable and experimental, and you can opt into them in VS Code today by using the `typescript.unstable` entry in your JSON options.
Below are all of the options you can try out (set to their defaults):

```jsonc
{
    "typescript.unstable": {
        // Should sorting be case-sensitive? Can be:
        // - true
        // - false
        // - "auto" (auto-detect)
        "organizeImportsIgnoreCase": "auto",

        // Should sorting be "ordinal" and use code points or consider Unicode rules? Can be:
        // - "ordinal"
        // - "unicode"
        "organizeImportsCollation": "ordinal",

        // Under `"organizeImportsCollation": "unicode"`,
        // what is the current locale? Can be:
        // - [any other locale code]
        // - "auto" (use the editor's locale)
        "organizeImportsLocale": "en",

        // Under `"organizeImportsCollation": "unicode"`,
        // should upper-case letters or lower-case letters come first? Can be:
        // - false (locale-specific)
        // - "upper"
        // - "lower"
        "organizeImportsCaseFirst": false,

        // Under `"organizeImportsCollation": "unicode"`,
        // do runs of numbers get compared numerically (i.e. "a1" < "a2" < "a100")? Can be:
        // - true
        // - false
        "organizeImportsNumericCollation": true,

        // Under `"organizeImportsCollation": "unicode"`,
        // do letters with accent marks/diacritics get sorted distinctly
        // from their "base" letter (i.e. is é different from e)? Can be
        // - true
        // - false
        "organizeImportsAccentCollation": true
    },
    "javascript.unstable": {
        // same options valid here...
    },
}
```

You can read more details on the original work for auto-detecting and specifying case-insensitivity, followed by the the broader set of options.

## Exhaustive `switch`/`case` Completions

When writing a `switch` statement, TypeScript now detects when the value being checked has a literal type.
If so, it will offer a completion that scaffolds out each uncovered `case`.

You can see specifics of the implementation on GitHub.
