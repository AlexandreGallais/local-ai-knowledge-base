---
title: "TypeScript 4.5 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.5.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.5 (part 2 of 2)

## Const Assertions and Default Type Arguments in JSDoc

TypeScript 4.5 brings some extra expressivity to our JSDoc support.

One example of this is with `const` assertions. In TypeScript, you can get a more precise and immutable type by writing `as const` after a literal.

```ts
// type is { prop: string }
let a = { prop: "hello" };

// type is { readonly prop: "hello" }
let b = { prop: "hello" } as const;
```

In JavaScript files, you can now use JSDoc type assertions to achieve the same thing.

```ts
// type is { prop: string }
let a = { prop: "hello" };

// type is { readonly prop: "hello" }
let b = /** @type {const} */ ({ prop: "hello" });
```

As a reminder, JSDoc type assertions comments start with `/** @type {TheTypeWeWant} */` and are followed by a parenthesized expression:

```js
/** @type {TheTypeWeWant} */` (someExpression)
```

TypeScript 4.5 also adds default type arguments to JSDoc, which means the following `type` declaration in TypeScript:

```ts
type Foo<T extends string | number = number> = { prop: T };
```

can be rewritten as the following `@typedef` declaration in JavaScript:

```js
/**
 * @template {string | number} [T=number]
 * @typedef Foo
 * @property prop {T}
 */

// or

/**
 * @template {string | number} [T=number]
 * @typedef {{ prop: T }} Foo
 */
 ```

For more information, see the pull request for const assertions along with the changes for type argument defaults.

## Faster Load Time with `realPathSync.native`

TypeScript now leverages a system-native implementation of the Node.js `realPathSync` function on all operating systems.

Previously this function was only used on Linux, but in TypeScript 4.5 it has been adopted to operating systems that are typically case-insensitive, like Windows and MacOS.
On certain codebases, this change sped up project loading by 5-13% (depending on the host operating system).

For more information, see the original change here, along with the 4.5-specific changes here.

## Snippet Completions for JSX Attributes

TypeScript 4.5 brings _snippet completions_ for JSX attributes.
When writing out an attribute in a JSX tag, TypeScript will already provide suggestions for those attributes;
but with snippet completions, they can remove a little bit of extra typing by adding an initializer and putting your cursor in the right place.

TypeScript will typically use the type of an attribute to figure out what kind of initializer to insert, but you can customize this behavior in Visual Studio Code.

Keep in mind, this feature will only work in newer versions of Visual Studio Code, so you might have to use an Insiders build to get this working.
For more information, read up on the original pull request

## Better Editor Support for Unresolved Types

In some cases, editors will leverage a lightweight "partial" semantic mode - either while the editor is waiting for the full project to load, or in contexts like GitHub's web-based editor.

In older versions of TypeScript, if the language service couldn't find a type, it would just print `any`.

In the above example, `Buffer` wasn't found, so TypeScript replaced it with `any` in _quick info_.
In TypeScript 4.5, TypeScript will try its best to preserve what you wrote.

However, if you hover over `Buffer` itself, you'll get a hint that TypeScript couldn't find `Buffer`.

Altogether, this provides a smoother experience when TypeScript doesn't have the full program available.
Keep in mind, you'll always get an error in regular scenarios to tell you when a type isn't found.

For more information, see the implementation here.

## Breaking Changes

### `lib.d.ts` Changes

TypeScript 4.5 contains changes to its built-in declaration files which may affect your compilation;
however, these changes were fairly minimal, and we expect most code will be unaffected.

### Inference Changes from `Awaited`

Because `Awaited` is now used in `lib.d.ts` and as a result of `await`, you may see certain generic types change that might cause incompatibilities;
however, given many intentional design decisions around `Awaited` to avoid breakage, we expect most code will be unaffected.

### Compiler Options Checking at the Root of `tsconfig.json`

It's an easy mistake to accidentally forget about the `compilerOptions` section in a `tsconfig.json`.
To help catch this mistake, in TypeScript 4.5, it is an error to add a top-level field which matches any of the available options in `compilerOptions` _without_ having also defined `compilerOptions` in that `tsconfig.json`.
