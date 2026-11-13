---
title: "TypeScript 5.5 (part 2 of 4)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.5.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.5 (part 2 of 4)

## Isolated Declarations

*This section was co-authored by Rob Palmer who supported the design of isolated declarations.*

Declaration files (a.k.a. `.d.ts` files) describe the shape of existing libraries and modules to TypeScript.
This lightweight description includes the library's type signatures and excludes implementation details such as the function bodies.
They are published so that TypeScript can efficiently check your usage of a library without needing to analyse the library itself.
Whilst it is possible to handwrite declaration files, if you are authoring typed code, it's much safer and simpler to let TypeScript generate them automatically from source files using `--declaration`.

The TypeScript compiler and its APIs have always had the job of generating declaration files;
however, there are some use-cases where you might want to use other tools, or where the traditional build process doesn't scale.

### Use-case: Faster Declaration Emit Tools

Imagine if you wanted to create a faster tool to generate declaration files, perhaps as part of a publishing service or a new bundler.
Whilst there is a thriving ecosystem of blazing fast tools that can turn TypeScript into JavaScript, the same is not true for turning TypeScript into declaration files.
The reason is that TypeScript's inference allows us to write code without explicitly declaring types, meaning declaration emit can be complex.

Let's consider a simple example of a function that adds two imported variables.

```ts
// util.ts
export let one = "1";
export let two = "2";

// add.ts
import { one, two } from "./util";
export function add() { return one + two; }
```

Even if the only thing we want to do is generate `add.d.ts`, TypeScript needs to crawl into another imported file (`util.ts`), infer that the type of `one` and `two` are strings, and then calculate that the `+` operator on two strings will lead to a `string` return type.

```ts
// add.d.ts
export declare function add(): string;
```

While this inference is important for the developer experience, it means that tools that want to generate declaration files would need to replicate parts of the type-checker including inference and the ability to resolve module specifiers to follow the imports.

### Use-case: Parallel Declaration Emit and Parallel Checking

Imagine if you had a monorepo containing many projects and a multi-core CPU that just wished it could help you check your code faster.
Wouldn't it be great if we could check all those projects at the same time by running each project on a different core?

Unfortunately we don't have the freedom to do all the work in parallel.
The reason is that we have to build those projects in dependency order, because each project is checking against the declaration files of their dependencies.
So we must build the dependency first to generate the declaration files.
TypeScript's project references feature works the same way, building the set of projects in "topological" dependency order.

As an example, if we have two projects called `backend` and `frontend`, and they both depend on a project called `core`, TypeScript can't start type-checking either `frontend` or `backend` until `core` has been built and its declaration files have been generated.

In the above graph, you can see that we have a bottleneck.
Whilst we can build `frontend` and `backend` in parallel, we need to first wait for `core` to finish building before either can start.

How could we improve upon this?
Well, if a fast tool could generate all those declaration files for `core` *in parallel*, TypeScript then could immediately follow that by type-checking `core`, `frontend`, and `backend` also *in parallel*.

### Solution: Explicit Types!

The common requirement in both use-cases is that we need a cross-file type-checker to generate declaration files.
Which is a lot to ask from the tooling community.

As a more complex example, if we want a declaration file for the following code...

```ts
import { add } from "./add";

const x = add();

export function foo() {
    return x;
}
```

...we would need to generate a signature for `foo`.
Well that requires looking at the implementation of `foo`.
`foo` just returns `x`, so getting the type of `x`  requires looking at the implementation of `add`.
But that might require looking at the implementation of `add`'s dependencies, and so on.
What we're seeing here is that generating declaration files requires a whole lot of logic to figure out the types of different places that might not even be local to the current file.

Still, for developers looking for fast iteration time and fully parallel builds, there is another way of thinking about this problem.
A declaration file only requires the types of the public API of a module - in other words, the types of the things that are exported.
If, controversially, developers are willing to explicitly write out the types of the things they export, tools could generate declaration files without needing to look at the implementation of the module - and without reimplementing a full type-checker.

This is where the new `--isolatedDeclarations` option comes in.
`--isolatedDeclarations` reports errors when a module can't be reliably transformed without a type-checker.
More plainly, it makes TypeScript report errors if you have a file that isn't sufficiently annotated on its exports.

That means in the above example, we would see an error like the following:

```ts
export function foo() {
//              ~~~
// error! Function must have an explicit
// return type annotation with --isolatedDeclarations.
    return x;
}
```

### Why are errors desirable?

Because it means that TypeScript can

1. Tell us up-front whether other tools will have issues with generating declaration files
2. Provide a quick fix to help add these missing annotations.

This mode doesn't require annotations *everywhere* though.
For locals, these can be ignored, since they don't affect the public API.
For example, the following code would **not** produce an error:

```ts
import { add } from "./add";

const x = add("1", "2"); // no error on 'x', it's not exported.

export function foo(): string {
    return x;
}
```

There are also certain expressions where the type is "trivial" to calculate.

```ts
// No error on 'x'.
// It's trivial to calculate the type is 'number'
export let x = 10;

// No error on 'y'.
// We can get the type from the return expression.
export function y() {
    return 20;
}

// No error on 'z'.
// The type assertion makes it clear what the type is.
export function z() {
    return Math.max(x, y()) as number;
}
```

### Using `isolatedDeclarations`

`isolatedDeclarations` requires that either the `declaration` or `composite` flags are also set.

Note that `isolatedDeclarations` does not change how TypeScript performs emit - just how it reports errors.
Importantly, and similar to `isolatedModules`, enabling the feature in TypeScript won't immediately bring about the potential benefits discussed here.
So please be patient and look forward to future developments in this space.
Keeping tool authors in mind, we should also recognize that today, not all of TypeScript's declaration emit can be easily replicated by other tools wanting to use it as a guide.
That's something we're actively working on improving.

On top of this, isolated declarations are still a new feature, and we're actively working on improving the experience.
Some scenarios, like using computed property declarations in classes and object literals, are not *yet* supported under `isolatedDeclarations`.
Keep an eye on this space, and feel free to provide us with feedback.

We also feel it is worth calling out that `isolatedDeclarations` should be adopted on a case-by-case basis.
There are some developer ergonomics that are lost when using `isolatedDeclarations`, and thus it may not be the right choice if your setup is not leveraging the two scenarios mentioned earlier.
For others, the work on `isolatedDeclarations` has already uncovered many optimizations and opportunities to unlock different parallel build strategies.
In the meantime, if you're willing to make the trade-offs, we believe `isolatedDeclarations` can be a powerful tool to speed up your build process as external tooling becomes more widely available.

For more information, read up on the Isolated Declarations: State of the Feature discussion on the TypeScript issue tracker.

### Credit

Work on `isolatedDeclarations` has been a long-time collaborative effort between the TypeScript team and the infrastructure and tooling teams within Bloomberg and Google.
Individuals like Hana Joo from Google who implemented the quick fix for isolated declaration errors (more on that soon), as well as Ashley Claymore, Jan Kühle, Lisa Velden, Rob Palmer, and Thomas Chetwin have been involved in discussion, specification, and implementation for many months.
But we feel it is specifically worth calling out the tremendous amount of work provided by Titian Cernicova-Dragomir from Bloomberg.
Titian has been instrumental in driving the implementation of `isolatedDeclarations` and has been a contributor to the TypeScript project for years prior.

While the feature involved many changes, you can see the core work for Isolated Declarations here.

## The `${configDir}` Template Variable for Configuration Files

It's common in many codebases to reuse a shared `tsconfig.json` file that acts as a "base" for other configuration files.
This is done by using the `extends` field in a `tsconfig.json` file.

```json
{
    "extends": "../../tsconfig.base.json",
    "compilerOptions": {
        "outDir": "./dist"
    }
}
```

One of the issues with this is that all paths in the `tsconfig.json` file are relative to the location of the file itself.
This means that if you have a shared `tsconfig.base.json` file that is used by multiple projects, relative paths often won't be useful in the derived projects.
For example, imagine the following `tsconfig.base.json`:

```json5
{
    "compilerOptions": {
        "typeRoots": [
            "./node_modules/@types",
            "./custom-types"
        ],
        "outDir": "dist"
    }
}
```

If author's intent was that every `tsconfig.json` that extends this file should

1. output to a `dist` directory relative to the derived `tsconfig.json` , and
1. have a `custom-types` directory relative to the derived `tsconfig.json`,

then this would not work.
The `typeRoots` paths would be relative to the location of the shared `tsconfig.base.json` file, not the project that extends it.
Each project that extends this shared file would need to declare its own `outDir` and `typeRoots` with identical contents.
This could be frustrating and hard to keep in sync between projects, and while the example above is using `typeRoots`, this is a common problem for `paths` and other options.

To solve this, TypeScript 5.5 introduces a new template variable `${configDir}`.
When `${configDir}` is written in certain path fields of a `tsconfig.json` or `jsconfig.json` files, this variable is substituted with the containing directory of the configuration file in a given compilation.
This means that the above `tsconfig.base.json` could be rewritten as:

```json5
{
    "compilerOptions": {
        "typeRoots": [
            "${configDir}/node_modules/@types",
            "${configDir}/custom-types"
        ],
        "outDir": "${configDir}/dist"
    }
}
```

Now, when a project extends this file, the paths will be relative to the derived `tsconfig.json`, not the shared `tsconfig.base.json` file.
This makes it easier to share configuration files across projects and ensures that the configuration files are more portable.

If you intend to make a `tsconfig.json` file extendable, consider if a `./` should instead be written with `${configDir}`.

For more information, see the proposal issue and the implementing pull request.

## Consulting `package.json` Dependencies for Declaration File Generation

Previously, TypeScript would often issue an error message like

```
The inferred type of "X" cannot be named without a reference to "Y". This is likely not portable. A type annotation is necessary.
```

This was often due to TypeScript's declaration file generation finding itself in the contents of files that were never explicitly imported in a program.
Generating an import to such a file could be risky if the path ended up being relative.
Still, for codebases with explicit dependencies in the `dependencies` (or `peerDependencies` and `optionalDependencies`) of a `package.json`, generating such an import should be safe under certain resolution modes.
So in TypeScript 5.5, we're more lenient when that's the case, and many occurrences of this error should disappear.

See this pull request for more details on the change.
