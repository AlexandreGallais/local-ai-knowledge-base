---
title: "TypeScript 4.8 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.8.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.8

## Improved Intersection Reduction, Union Compatibility, and Narrowing

TypeScript 4.8 brings a series of correctness and consistency improvements under `--strictNullChecks`.
These changes affect how intersection and union types work, and are leveraged in how TypeScript narrows types.

For example, `unknown` is close in spirit to the union type `{} | null | undefined` because it accepts `null`, `undefined`, and any other type.
TypeScript now recognizes this, and allows assignments from `unknown` to `{} | null | undefined`.

```ts
function f(x: unknown, y: {} | null | undefined) {
    x = y; // always worked
    y = x; // used to error, now works
}
```

Another change is that `{}` intersected with any other object type simplifies right down to that object type.
That meant that we were able to rewrite `NonNullable` to just use an intersection with `{}`, because `{} & null` and `{} & undefined` just get tossed away.

```diff
- type NonNullable<T> = T extends null | undefined ? never : T;
+ type NonNullable<T> = T & {};
```

This is an improvement because intersection types like this can be reduced and assigned to, while conditional types currently cannot.
So `NonNullable<NonNullable<T>>` now simplifies at least to `NonNullable<T>`, whereas it didn't before.

```ts
function foo<T>(x: NonNullable<T>, y: NonNullable<NonNullable<T>>) {
    x = y; // always worked
    y = x; // used to error, now works
}
```

These changes also allowed us to bring in sensible improvements in control flow analysis and type narrowing.
For example, `unknown` is now narrowed just like `{} | null | undefined` in truthy branches.

```ts
function narrowUnknownishUnion(x: {} | null | undefined) {
    if (x) {
        x;  // {}
    }
    else {
        x;  // {} | null | undefined
    }
}

function narrowUnknown(x: unknown) {
    if (x) {
        x;  // used to be 'unknown', now '{}'
    }
    else {
        x;  // unknown
    }
}
```

Generic values also get narrowed similarly.
When checking that a value isn't `null` or `undefined`, TypeScript now just intersects it with `{}` - which again, is the same as saying it's `NonNullable`.
Putting many of the changes here together, we can now define the following function without any type assertions.

```ts
function throwIfNullable<T>(value: T): NonNullable<T> {
    if (value === undefined || value === null) {
        throw Error("Nullable value!");
    }

    // Used to fail because 'T' was not assignable to 'NonNullable<T>'.
    // Now narrows to 'T & {}' and succeeds because that's just 'NonNullable<T>'.
    return value;
}
```

`value` now gets narrowed to `T & {}`, and is now identical with `NonNullable<T>` - so the body of the function just works with no TypeScript-specific syntax.

On their own, these changes may appear small - but they represent fixes for many many paper cuts that have been reported over several years.

For more specifics on these improvements, you can read more here.

## Improved Inference for `infer` Types in Template String Types

TypeScript recently introduced a way to add `extends` constraints to `infer` type variables in conditional types.

```ts
// Grabs the first element of a tuple if it's assignable to 'number',
// and returns 'never' if it can't find one.
type TryGetNumberIfFirst<T> =
    T extends [infer U extends number, ...unknown[]] ? U : never;
```

If these `infer` types appear in a template string type and are constrained to a primitive type, TypeScript will now try to parse out a literal type.

```ts
// SomeNum used to be 'number'; now it's '100'.
type SomeNum = "100" extends `${infer U extends number}` ? U : never;

// SomeBigInt used to be 'bigint'; now it's '100n'.
type SomeBigInt = "100" extends `${infer U extends bigint}` ? U : never;

// SomeBool used to be 'boolean'; now it's 'true'.
type SomeBool = "true" extends `${infer U extends boolean}` ? U : never;
```

This can now better convey what a library will do at runtime, and give more precise types.

One note on this is that when TypeScript parses these literal types out it will greedily try to parse out as much of what looks like of the appropriate primitive type;
however it then checks to see if the print-back of that primitive matches up with the string contents.
In other words, TypeScript checks whether the going from the string, to the primitive, and back matches.
If it doesn't see that the string can be "round-tripped", then it will fall back to the base primitive type.

```ts
// JustNumber is `number` here because TypeScript parses out `"1.0"`, but `String(Number("1.0"))` is `"1"` and doesn't match.
type JustNumber = "1.0" extends `${infer T extends number}` ? T : never; 
```

You can see more about this feature here.

## `--build`, `--watch`, and `--incremental` Performance Improvements

TypeScript 4.8 introduces several optimizations that should speed up scenarios around `--watch` and `--incremental`, along with project references builds using `--build`.
For example, TypeScript is now able to avoid spending time updating timestamps during no-op changes in `--watch` mode, which makes rebuilds faster and avoids messing with other build tools that might be watching for TypeScript's output.
Many other optimizations where we're able to reuse information across `--build`, `--watch`, and `--incremental` have been introduced as well.

How big are these improvements?
Well, on a fairly large internal codebase, we've seen time reductions on the order of 10%-25% on many simple common operations, with around 40% time reductions in no-change scenarios.
We've seen similar results on the TypeScript codebase as well.

You can see the changes, along with the performance results on GitHub.

## Errors When Comparing Object and Array Literals

In many languages, operators like `==` perform what's called "value" equality on objects.
For example, in Python it's valid to check whether a list is empty by checking whether a value is equal to the empty list using `==`.

```py
if people_at_home == []:
    print("here's where I lie, broken inside. </3")
    adopt_animals()
```

This is not the case in JavaScript, where `==` and `===` between objects (and therefore, arrays) check whether both references point to the same value.
We believe that similar code in JavaScript is at best an early foot-gun for JavaScript developers, and at worst a bug in production code.
That's why TypeScript now disallows code like the following.

```ts
if (peopleAtHome === []) {
//  ~~~~~~~~~~~~~~~~~~~
// This condition will always return 'false' since JavaScript compares objects by reference, not value.
    console.log("here's where I lie, broken inside. </3")
    adoptAnimals();
}
```

We'd like to extend our gratitude to Jack Works who contributed this check.
You can view the changes involved here.

## Improved Inference from Binding Patterns

In some cases, TypeScript will pick up a type from a binding pattern to make better inferences.

```ts
declare function chooseRandomly<T>(x: T, y: T): T;

let [a, b, c] = chooseRandomly([42, true, "hi!"], [0, false, "bye!"]);
//   ^  ^  ^
//   |  |  |
//   |  |  string
//   |  |
//   |  boolean
//   |
//   number
```

When `chooseRandomly` needs to figure out a type for `T`, it will primarily look at `[42, true, "hi!"]` and `[0, false, "bye!"]`;
but TypeScript needs to figure out whether those two types should be `Array<number | boolean | string>` or the tuple type `[number, boolean, string]`.
To do that, it will look for existing candidates as a hint to see whether there are any tuple types.
When TypeScript sees the binding pattern `[a, b, c]`, it creates the type `[any, any, any]`, and that type gets picked up as a low-priority candidate for `T` which also gets used as a hint for the types of `[42, true, "hi!"]` and `[0, false, "bye!"]`.

You can see how this was good for `chooseRandomly`, but it fell short in other cases.
For example, take the following code

```ts
declare function f<T>(x?: T): T;

let [x, y, z] = f();
```

The binding pattern `[x, y, z]` hinted that `f` should produce an `[any, any, any]` tuple;
but `f` really shouldn't change its type argument based on a binding pattern.
It can't suddenly conjure up a new array-like value based on what it's being assigned to, so the binding pattern type has way too much influence on the produced type.
On top of that, because the binding pattern type is full of `any`s, we're left with `x`, `y`, and `z` being typed as `any`.

In TypeScript 4.8, these binding patterns are never used as candidates for type arguments.
Instead, they're just consulted in case a parameter needs a more specific type like in our `chooseRandomly` example.
If you need to revert to the old behavior, you can always provide explicit type arguments.

You can look at the change on GitHub if you're curious to learn more.

## File-Watching Fixes (Especially Across `git checkout`s)

We've had a long-standing bug where TypeScript has a very hard time with certain file changes in `--watch` mode and editor scenarios.
Sometimes the symptoms are stale or inaccurate errors that might show up that require restarting `tsc` or VS Code.
Frequently these occur on Unix systems, and you might have seen these after saving a file with vim or swapping branches in git.

This was caused by assumptions of how Node.js handles rename events across file systems.
File systems used by Linux and macOS utilize inodes, and Node.js will attach file watchers to inodes rather than file paths.
So when Node.js returns a watcher object, it might be watching a path or an inode depending on the platform and file system.

To be a bit more efficient, TypeScript tries to reuse the same watcher objects if it detects a path still exists on disk.
This is where things went wrong, because even if a file still exists at that path, a distinct file might have been created, and that file will have a different inode.
So TypeScript would end up reusing the watcher object instead of installing a new watcher at the original location, and watch for changes at what might be a totally irrelevant file.
So TypeScript 4.8 now handles these cases on inode systems and properly installs a new watcher and fixes this.

We'd like to extend our thanks to Marc Celani and his team at Airtable who invested lots of time in investigating the issues they were experiencing and pointing out the root cause.
You can view the specific fixes around file-watching here.

## Find-All-References Performance Improvements

When running find-all-references in your editor, TypeScript is now able to act a little smarter as it aggregates references.
This reduced the amount of time TypeScript took to search a widely-used identifier in its own codebase by about 20%.

You can read up more on the improvement here.

## Exclude Specific Files from Auto-Imports

TypeScript 4.8 introduces an editor preference for excluding files from auto-imports.
In Visual Studio Code, file names or globs can be added under "Auto Import File Exclude Patterns" in the Settings UI, or in a `.vscode/settings.json` file:

```jsonc
{
    // Note that `javascript.preferences.autoImportFileExcludePatterns` can be specified for JavaScript too.
    "typescript.preferences.autoImportFileExcludePatterns": [
      "**/node_modules/@types/node"
    ]
}
```

This can be useful in cases where you can't avoid having certain modules or libraries in your compilation but you rarely want to import from them.
These modules might have lots of exports that can pollute the auto-imports list and make it harder to navigate, and this option can help in those situations.

You can see more specifics about the implementation here.
