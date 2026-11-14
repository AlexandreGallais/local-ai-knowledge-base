---
title: "TypeScript 4.4 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.4.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.4 (part 2 of 2)

## `tsc --help` Updates and Improvements

TypeScript's `--help` option has gotten a refresh!
Thanks to work in part by Song Gao, we've brought in changes to update the descriptions of our compiler options and restyle the `--help` menu with colors and other visual separation.

You can read more on the original proposal thread.

## Performance Improvements

### Faster Declaration Emit

TypeScript now caches whether internal symbols are accessible in different contexts, along with how specific types should be printed.
These changes can improve TypeScript's general performance in code with fairly complex types, and is especially observed when emitting `.d.ts` files under the `declaration` flag.

See more details here.

### Faster Path Normalization

TypeScript often has to do several types of "normalization" on file paths to get them into a consistent format that the compiler can use everywhere.
This involves things like replacing backslashes with slashes, or removing intermediate `/./` and `/../` segments of paths.
When TypeScript has to operate over millions of these paths, these operations end up being a bit slow.
In TypeScript 4.4, paths first undergo quick checks to see whether they need any normalization in the first place.
These improvements together reduce project load time by 5-10% on bigger projects, and significantly more in massive projects that we've tested internally.

For more details, you can view the PR for path segment normalization along with the PR for slash normalization.

### Faster Path Mapping

TypeScript now caches the way it constructs path-mappings (using the `paths` option in `tsconfig.json`).
For projects with several hundred mappings, the reduction is significant.
You can see more on the change itself.

### Faster Incremental Builds with `--strict`

In what was effectively a bug, TypeScript would end up redoing type-checking work under `incremental` compilations if `strict` was on.
This led to many builds being just as slow as if `incremental` was turned off.
TypeScript 4.4 fixes this, though the change has also been back-ported to TypeScript 4.3.

See more here.

### Faster Source Map Generation for Big Outputs

TypeScript 4.4 adds an optimization for source map generation on extremely large output files.
When building an older version of the TypeScript compiler, this results in around an 8% reduction in emit time.

We'd like to extend our thanks to David Michon who provided a simple and clean change to enable this performance win.

### Faster `--force` Builds

When using `--build` mode on project references, TypeScript has to perform up-to-date checks to determine which files need to be rebuilt.
When performing a `--force` build, however, that information is irrelevant since every project dependency will be rebuilt from scratch.
In TypeScript 4.4, `--force` builds avoid those unnecessary steps and start a full build.
See more about the change here.

## Spelling Suggestions for JavaScript

TypeScript powers the JavaScript editing experience in editors like Visual Studio and Visual Studio Code.
Most of the time, TypeScript tries to stay out of the way in JavaScript files;
however, TypeScript often has a lot of information to make confident suggestions, and ways of surfacing suggestions that aren't _too_ invasive.

That's why TypeScript now issues spelling suggestions in plain JavaScript files - ones without `// @ts-check` or in a project with `checkJs` turned off.
These are the same _"Did you mean...?"_ suggestions that TypeScript files already have, and now they're available in _all_ JavaScript files in some form.

These spelling suggestions can provide a subtle clue that your code is wrong.
We managed to find a few bugs in existing code while testing this feature!

For more details on this new feature, take a look at the pull request!

## Inlay Hints

TypeScript 4.4 provides support for _inlay hints_ which can help display useful information like parameter names and return types in your code.
You can think of it as a sort of friendly "ghost text".

This feature was built by Wenlu Wang whose pull request has more details.

Wenlu also contributed the integration for inlay hints in Visual Studio Code which has shipped as part of the July 2021 (1.59) release.
If you'd like to try inlay hints out, make sure you're using a recent stable or insiders version of the editor.
You can also modify when and where inlay hints get displayed in Visual Studio Code's settings.

## Auto-Imports Show True Paths in Completion Lists

When editors like Visual Studio Code show a completion list, completions which include auto-imports are displayed with a path to the given module;
however, this path usually isn't what TypeScript ends up placing in a module specifier.
The path is usually something relative to the _workspace_, meaning that if you're importing from a package like `moment`, you'll often see a path like `node_modules/moment`.

These paths end up being unwieldy and often misleading, especially given that the path that actually gets inserted into your file needs to consider Node's `node_modules` resolution, path mappings, symlinks, and re-exports.

That's why with TypeScript 4.4, the completion item label now shows the _actual_ module path that will be used for the import!

Since this calculation can be expensive, completion lists containing many auto-imports may fill in the final module specifiers in batches as you type more characters. It's possible that you'll still sometimes see the old workspace-relative path labels; however, as your editing experience "warms up", they should get replaced with the actual path after another keystroke or two.

## Breaking Changes

### `lib.d.ts` Changes for TypeScript 4.4

As with every TypeScript version, declarations for `lib.d.ts` (especially the declarations generated for web contexts), have changed.
You can consult our list of known `lib.dom.d.ts` changes to understand what is impacted.

### More-Compliant Indirect Calls for Imported Functions

In earlier versions of TypeScript, calling an import from CommonJS, AMD, and other non-ES module systems would set the `this` value of the called function.
Specifically, in the following example, when calling `fooModule.foo()`, the `foo()` method will have `fooModule` set as the value of `this`.

```ts
// Imagine this is our imported module, and it has an export named 'foo'.
let fooModule = {
  foo() {
    console.log(this);
  },
};

fooModule.foo();
```

This is not the way exported functions in ECMAScript are supposed to work when we call them.
That's why TypeScript 4.4 intentionally discards the `this` value when calling imported functions, by using the following emit.

```ts
// Imagine this is our imported module, and it has an export named 'foo'.
let fooModule = {
  foo() {
    console.log(this);
  },
};

// Notice we're actually calling '(0, fooModule.foo)' now, which is subtly different.
(0, fooModule.foo)();
```

You can read up more about the changes here.

### Using `unknown` in Catch Variables

Users running with the `strict` flag may see new errors around `catch` variables being `unknown`, especially if the existing code assumes only `Error` values have been caught.
This often results in error messages such as:

```
Property 'message' does not exist on type 'unknown'.
Property 'name' does not exist on type 'unknown'.
Property 'stack' does not exist on type 'unknown'.
```

To get around this, you can specifically add runtime checks to ensure that the thrown type matches your expected type.
Otherwise, you can just use a type assertion, add an explicit `: any` to your catch variable, or turn off `useUnknownInCatchVariables`.

### Broader Always-Truthy Promise Checks

In prior versions, TypeScript introduced "Always Truthy Promise checks" to catch code where an `await` may have been forgotten;
however, the checks only applied to named declarations.
That meant that while this code would correctly receive an error...

```ts
async function foo(): Promise<boolean> {
  return false;
}

async function bar(): Promise<string> {
  const fooResult = foo();
  if (fooResult) {
    // <- error! :D
    return "true";
  }
  return "false";
}
```

...the following code would not.

```ts
async function foo(): Promise<boolean> {
  return false;
}

async function bar(): Promise<string> {
  if (foo()) {
    // <- no error :(
    return "true";
  }
  return "false";
}
```

TypeScript 4.4 now flags both.
For more information, read up on the original change.

### Abstract Properties Do Not Allow Initializers

The following code is now an error because abstract properties may not have initializers:

```ts
abstract class C {
  abstract prop = 1;
  //       ~~~~
  // Property 'prop' cannot have an initializer because it is marked abstract.
}
```

Instead, you may only specify a type for the property:

```ts
abstract class C {
  abstract prop: number;
}
```
