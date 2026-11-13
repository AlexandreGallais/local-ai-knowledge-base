---
title: "TypeScript 5.0 (part 2 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.0 (part 2 of 4)

## Supporting Multiple Configuration Files in `extends`

When managing multiple projects, it can be helpful to have a "base" configuration file that other `tsconfig.json` files can extend from.
That's why TypeScript supports an `extends` field for copying over fields from `compilerOptions`.

```jsonc
// packages/front-end/src/tsconfig.json
{
    "extends": "../../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "../lib",
        // ...
    }
}
```

However, there are scenarios where you might want to extend from multiple configuration files.
For example, imagine using a TypeScript base configuration file shipped to npm.
If you want all your projects to also use the options from the `@tsconfig/strictest` package on npm, then there's a simple solution: have `tsconfig.base.json` extend from `@tsconfig/strictest`:

```jsonc
// tsconfig.base.json
{
    "extends": "@tsconfig/strictest/tsconfig.json",
    "compilerOptions": {
        // ...
    }
}
```

This works to a point.
If you have any projects that *don't* want to use `@tsconfig/strictest`, they have to either manually disable the options, or create a separate version of `tsconfig.base.json` that *doesn't* extend from `@tsconfig/strictest`.

To give some more flexibility here, Typescript 5.0 now allows the `extends` field to take multiple entries.
For example, in this configuration file:

```jsonc
{
    "extends": ["a", "b", "c"],
    "compilerOptions": {
        // ...
    }
}
```

Writing this is kind of like extending `c` directly, where `c` extends `b`, and `b` extends `a`.
If any fields "conflict", the latter entry wins.

So in the following example, both `strictNullChecks` and `noImplicitAny` are enabled in the final `tsconfig.json`.

```jsonc
// tsconfig1.json
{
    "compilerOptions": {
        "strictNullChecks": true
    }
}

// tsconfig2.json
{
    "compilerOptions": {
        "noImplicitAny": true
    }
}

// tsconfig.json
{
    "extends": ["./tsconfig1.json", "./tsconfig2.json"],
    "files": ["./index.ts"]
}
```

As another example, we can rewrite our original example in the following way.

```jsonc
// packages/front-end/src/tsconfig.json
{
    "extends": ["@tsconfig/strictest/tsconfig.json", "../../../tsconfig.base.json"],
    "compilerOptions": {
        "outDir": "../lib",
        // ...
    }
}
```

For more details, read more on the original pull request.

## All `enum`s Are Union `enum`s

When TypeScript originally introduced enums, they were nothing more than a set of numeric constants with the same type.

```ts
enum E {
    Foo = 10,
    Bar = 20,
}
```

The only thing special about `E.Foo` and `E.Bar` was that they were assignable to anything expecting the type `E`.
Other than that, they were pretty much just `number`s.

```ts
function takeValue(e: E) {}

takeValue(E.Foo); // works
takeValue(123); // error!
```

It wasn't until TypeScript 2.0 introduced enum literal types that enums got a bit more special.
Enum literal types gave each enum member its own type, and turned the enum itself into a *union* of each member type.
They also allowed us to refer to only a subset of the types of an enum, and to narrow away those types.

```ts
// Color is like a union of Red | Orange | Yellow | Green | Blue | Violet
enum Color {
    Red, Orange, Yellow, Green, Blue, /* Indigo, */ Violet
}

// Each enum member has its own type that we can refer to!
type PrimaryColor = Color.Red | Color.Green | Color.Blue;

function isPrimaryColor(c: Color): c is PrimaryColor {
    // Narrowing literal types can catch bugs.
    // TypeScript will error here because
    // we'll end up comparing 'Color.Red' to 'Color.Green'.
    // We meant to use ||, but accidentally wrote &&.
    return c === Color.Red && c === Color.Green && c === Color.Blue;
}
```

One issue with giving each enum member its own type was that those types were in some part associated with the actual value of the member.
In some cases it's not possible to compute that value - for instance, an enum member could be initialized by a function call.

```ts
enum E {
    Blah = Math.random()
}
```

Whenever TypeScript ran into these issues, it would quietly back out and use the old enum strategy.
That meant giving up all the advantages of unions and literal types.

TypeScript 5.0 manages to make all enums into union enums by creating a unique type for each computed member.
That means that all enums can now be narrowed and have their members referenced as types as well.

For more details on this change, you can read the specifics on GitHub.

## `--moduleResolution bundler`

TypeScript 4.7 introduced the `node16` and `nodenext` options for its `--module` and `--moduleResolution` settings.
The intent of these options was to better model the precise lookup rules for ECMAScript modules in Node.js;
however, this mode has many restrictions that other tools don't really enforce.

For example, in an ECMAScript module in Node.js, any relative import needs to include a file extension.

```js
// entry.mjs
import * as utils from "./utils";     // ❌ wrong - we need to include the file extension.

import * as utils from "./utils.mjs"; // ✅ works
```

There are certain reasons for this in Node.js and the browser - it makes file lookups faster and works better for naive file servers.
But for many developers using tools like bundlers, the `node16`/`nodenext` settings were cumbersome because bundlers don't have most of these restrictions.
In some ways, the `node` resolution mode was better for anyone using a bundler.

But in some ways, the original `node` resolution mode was already out of date.
Most modern bundlers use a fusion of the ECMAScript module and CommonJS lookup rules in Node.js.
For example, extensionless imports work just fine just like in CommonJS, but when looking through the `export` conditions of a package, they'll prefer an `import` condition just like in an ECMAScript file.

To model how bundlers work, TypeScript now introduces a new strategy: `--moduleResolution bundler`.

```jsonc
{
    "compilerOptions": {
        "target": "esnext",
        "moduleResolution": "bundler"
    }
}
```

If you are using a modern bundler like Vite, esbuild, swc, Webpack, Parcel, and others that implement a hybrid lookup strategy, the new `bundler` option should be a good fit for you.

On the other hand, if you're writing a library that's meant to be published on npm, using the `bundler` option can hide compatibility issues that may arise for your users who *aren't* using a bundler.
So in these cases, using the `node16` or `nodenext` resolution options is likely to be a better path.

To read more on `--moduleResolution bundler`, take a look at the implementing pull request.

## Resolution Customization Flags

JavaScript tooling may now model "hybrid" resolution rules, like in the `bundler` mode we described above.
Because tools may differ in their support slightly, TypeScript 5.0 provides ways to enable or disable a few features that may or may not work with your configuration.

### `allowImportingTsExtensions`

`--allowImportingTsExtensions` allows TypeScript files to import each other with a TypeScript-specific extension like `.ts`, `.mts`, or `.tsx`.

This flag is only allowed when `--noEmit` or `--emitDeclarationOnly` is enabled, since these import paths would not be resolvable at runtime in JavaScript output files.
The expectation here is that your resolver (e.g. your bundler, a runtime, or some other tool) is going to make these imports between `.ts` files work.

### `resolvePackageJsonExports`

`--resolvePackageJsonExports` forces TypeScript to consult the `exports` field of `package.json` files if it ever reads from a package in `node_modules`.

This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for `--moduleResolution`.

### `resolvePackageJsonImports`

`--resolvePackageJsonImports` forces TypeScript to consult the `imports` field of `package.json` files when performing a lookup that starts with `#` from a file whose ancestor directory contains a `package.json`.

This option defaults to `true` under the `node16`, `nodenext`, and `bundler` options for `--moduleResolution`.

### `allowArbitraryExtensions`

In TypeScript 5.0, when an import path ends in an extension that isn't a known JavaScript or TypeScript file extension, the compiler will look for a declaration file for that path in the form of `{file basename}.d.{extension}.ts`.
For example, if you are using a CSS loader in a bundler project, you might want to write (or generate) declaration files for those stylesheets:

```css
/* app.css */
.cookie-banner {
  display: none;
}
```

```ts
// app.d.css.ts
declare const css: {
  cookieBanner: string;
};
export default css;
```

```ts
// App.tsx
import styles from "./app.css";

styles.cookieBanner; // string
```

By default, this import will raise an error to let you know that TypeScript doesn't understand this file type and your runtime might not support importing it.
But if you've configured your runtime or bundler to handle it, you can suppress the error with the new `--allowArbitraryExtensions` compiler option.

Note that historically, a similar effect has often been achievable by adding a declaration file named `app.css.d.ts` instead of `app.d.css.ts` - however, this just worked through Node's `require` resolution rules for CommonJS.
Strictly speaking, the former is interpreted as a declaration file for a JavaScript file named `app.css.js`.
Because relative files imports need to include extensions in Node's ESM support, TypeScript would error on our example in an ESM file under `--moduleResolution node16` or `nodenext`.

For more information, read up the proposal for this feature and its corresponding pull request.

### `customConditions`

`--customConditions` takes a list of additional conditions that should succeed when TypeScript resolves from an `exports` or `imports` field of a `package.json`.
These conditions are added to whatever existing conditions a resolver will use by default.

For example, when this field is set in a `tsconfig.json` as so:

```jsonc
{
    "compilerOptions": {
        "target": "es2022",
        "moduleResolution": "bundler",
        "customConditions": ["my-condition"]
    }
}
```

Any time an `exports` or `imports` field is referenced in `package.json`, TypeScript will consider conditions called `my-condition`.

So when importing from a package with the following `package.json`

```jsonc
{
    // ...
    "exports": {
        ".": {
            "my-condition": "./foo.mjs",
            "node": "./bar.mjs",
            "import": "./baz.mjs",
            "require": "./biz.mjs"
        }
    }
}
```

TypeScript will try to look for files corresponding to `foo.mjs`.

This field is only valid under the `node16`, `nodenext`, and `bundler` options for `--moduleResolution`
