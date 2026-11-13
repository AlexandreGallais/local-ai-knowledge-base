---
title: "TypeScript 4.0 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.0.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.0 (part 2 of 2)

## Custom JSX Factories

When using JSX, a _fragment_ is a type of JSX element that allows us to return multiple child elements.
When we first implemented fragments in TypeScript, we didn't have a great idea about how other libraries would utilize them.
Nowadays most other libraries that encourage using JSX and support fragments have a similar API shape.

In TypeScript 4.0, users can customize the fragment factory through the new `jsxFragmentFactory` option.

As an example, the following `tsconfig.json` file tells TypeScript to transform JSX in a way compatible with React, but switches each factory invocation to `h` instead of `React.createElement`, and uses `Fragment` instead of `React.Fragment`.

```jsonc
{
  "compilerOptions": {
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "jsxFactory": "h",
    "jsxFragmentFactory": "Fragment"
  }
}
```

In cases where you need to have a different JSX factory on a per-file basis, you can take advantage of the new `/** @jsxFrag */` pragma comment.
For example, the following...

```tsx
// Note: these pragma comments need to be written
// with a JSDoc-style multiline syntax to take effect.

/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";

export const Header = (
  <>
    <h1>Welcome</h1>
  </>
);
```

...will get transformed to this output JavaScript...

```tsx
// Note: these pragma comments need to be written
// with a JSDoc-style multiline syntax to take effect.

/** @jsx h */
/** @jsxFrag Fragment */

import { h, Fragment } from "preact";

export const Header = (
  <>
    <h1>Welcome</h1>
  </>
);
```

We'd like to extend a big thanks to community member Noj Vek for sending this pull request and patiently working with our team on it.

You can see that the pull request for more details!

## Speed Improvements in `build` mode with `--noEmitOnError`

Previously, compiling a program after a previous compile with errors under `incremental` would be extremely slow when using the `noEmitOnError` flag.
This is because none of the information from the last compilation would be cached in a `.tsbuildinfo` file based on the `noEmitOnError` flag.

TypeScript 4.0 changes this which gives a great speed boost in these scenarios, and in turn improves `--build` mode scenarios (which imply both `incremental` and `noEmitOnError`).

For details, read up more on the pull request.

## `--incremental` with `--noEmit`

TypeScript 4.0 allows us to use the `noEmit` flag while still leveraging `incremental` compiles.
This was previously not allowed, as `incremental` needs to emit a `.tsbuildinfo` files; however, the use-case to enable faster incremental builds is important enough to enable for all users.

For more details, you can see the implementing pull request.

## Editor Improvements

The TypeScript compiler doesn't only power the editing experience for TypeScript itself in most major editors - it also powers the JavaScript experience in the Visual Studio family of editors and more.
For that reason, much of our work focuses on improving editor scenarios - the place you spend most of your time as a developer.

Using new TypeScript/JavaScript functionality in your editor will differ depending on your editor, but

- Visual Studio Code supports selecting different versions of TypeScript. Alternatively, there's the JavaScript/TypeScript Nightly Extension to stay on the bleeding edge (which is typically very stable).
- Visual Studio 2017/2019 have [the SDK installers above] and MSBuild installs.
- Sublime Text 3 supports selecting different versions of TypeScript

You can check out a partial list of editors that have support for TypeScript to learn more about whether your favorite editor has support to use new versions.

### Convert to Optional Chaining

Optional chaining is a recent feature that's received a lot of love.
That's why TypeScript 4.0 brings a new refactoring to convert common patterns to take advantage of optional chaining and nullish coalescing!

Keep in mind that while this refactoring doesn't _perfectly_ capture the same behavior due to subtleties with truthiness/falsiness in JavaScript, we believe it should capture the intent for most use-cases, especially when TypeScript has more precise knowledge of your types.

For more details, check out the pull request for this feature.

### `/** @deprecated */` Support

TypeScript's editing support now recognizes when a declaration has been marked with a `/** @deprecated */` JSDoc comment.
That information is surfaced in completion lists and as a suggestion diagnostic that editors can handle specially.
In an editor like VS Code, deprecated values are typically displayed in a strike-though style ~~like this~~.

This new functionality is available thanks to Wenlu Wang.
See the pull request for more details.

### Partial Semantic Mode at Startup

We've heard a lot from users suffering from long startup times, especially on bigger projects.
The culprit is usually a process called _program construction_.
This is the process of starting with an initial set of root files, parsing them, finding their dependencies, parsing those dependencies, finding those dependencies' dependencies, and so on.
The bigger your project is, the longer you'll have to wait before you can get basic editor operations like go-to-definition or quick info.

That's why we've been working on a new mode for editors to provide a _partial_ experience until the full language service experience has loaded up.
The core idea is that editors can run a lightweight partial server that only looks at the current files that the editor has open.

It's hard to say precisely what sorts of improvements you'll see, but anecdotally, it used to take anywhere between _20 seconds to a minute_ before TypeScript would become fully responsive on the Visual Studio Code codebase.
In contrast, **our new partial semantic mode seems to bring that delay down to just a few seconds**.
As an example, in the following video, you can see two side-by-side editors with TypeScript 3.9 running on the left and TypeScript 4.0 running on the right.

When restarting both editors on a particularly large codebase, the one with TypeScript 3.9 can't provide completions or quick info at all.
On the other hand, the editor with TypeScript 4.0 can _immediately_ give us a rich experience in the current file we're editing, despite loading the full project in the background.

Currently the only editor that supports this mode is Visual Studio Code which has some UX improvements coming up in Visual Studio Code Insiders.
We recognize that this experience may still have room for polish in UX and functionality, and we have a list of improvements in mind.
We're looking for more feedback on what you think might be useful.

For more information, you can see the original proposal, the implementing pull request, along with the follow-up meta issue.

### Smarter Auto-Imports

Auto-import is a fantastic feature that makes coding a lot easier; however, every time auto-import doesn't seem to work, it can throw users off a lot.
One specific issue that we heard from users was that auto-imports didn't work on dependencies that were written in TypeScript - that is, until they wrote at least one explicit import somewhere else in their project.

Why would auto-imports work for `@types` packages, but not for packages that ship their own types?
It turns out that auto-imports only work on packages your project _already_ includes.
Because TypeScript has some quirky defaults that automatically add packages in `node_modules/@types` to your project, _those_ packages would be auto-imported.
On the other hand, other packages were excluded because crawling through all your `node_modules` packages can be _really_ expensive.

All of this leads to a pretty lousy getting started experience for when you're trying to auto-import something that you've just installed but haven't used yet.

TypeScript 4.0 now does a little extra work in editor scenarios to include the packages you've listed in your `package.json`'s `dependencies` (and `peerDependencies`) fields.
The information from these packages is only used to improve auto-imports, and doesn't change anything else like type-checking.
This allows us to provide auto-imports for all of your dependencies that have types, without incurring the cost of a complete `node_modules` search.

In the rare cases when your `package.json` lists more than ten typed dependencies that haven't been imported yet, this feature automatically disables itself to prevent slow project loading.
To force the feature to work, or to disable it entirely, you should be able to configure your editor.
For Visual Studio Code, this is the "Include Package JSON Auto Imports" (or `typescript.preferences.includePackageJsonAutoImports`) setting.

For more details, you can see the proposal issue along with the implementing pull request.

## Our New Website!

The TypeScript website has recently been rewritten from the ground up and rolled out!

We already wrote a bit about our new site, so you can read up more there; but it's worth mentioning that we're still looking to hear what you think!
If you have questions, comments, or suggestions, you can file them over on the website's issue tracker.

## Breaking Changes

### `lib.d.ts` Changes

Our `lib.d.ts` declarations have changed - most specifically, types for the DOM have changed.
The most notable change may be the removal of `document.origin` which only worked in old versions of IE and Safari
MDN recommends moving to `self.origin`.

### Properties Overriding Accessors (and vice versa) is an Error

Previously, it was only an error for properties to override accessors, or accessors to override properties, when using `useDefineForClassFields`; however, TypeScript now always issues an error when declaring a property in a derived class that would override a getter or setter in the base class.

```ts
class Base {
  get foo() {
    return 100;
  }
  set foo(value) {
    // ...
  }
}

class Derived extends Base {
  foo = 10;
}
```

```ts
class Base {
  prop = 10;
}

class Derived extends Base {
  get prop() {
    return 100;
  }
}
```

See more details on the implementing pull request.

### Operands for `delete` must be optional.

When using the `delete` operator in `strictNullChecks`, the operand must now be `any`, `unknown`, `never`, or be optional (in that it contains `undefined` in the type).
Otherwise, use of the `delete` operator is an error.

```ts
interface Thing {
  prop: string;
}

function f(x: Thing) {
  delete x.prop;
}
```

See more details on the implementing pull request.

### Usage of TypeScript's Node Factory is Deprecated

Today TypeScript provides a set of "factory" functions for producing AST Nodes; however, TypeScript 4.0 provides a new node factory API.
As a result, for TypeScript 4.0 we've made the decision to deprecate these older functions in favor of the new ones.

For more details, read up on the relevant pull request for this change.
