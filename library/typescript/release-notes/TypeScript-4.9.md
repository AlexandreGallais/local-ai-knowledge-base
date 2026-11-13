---
title: "TypeScript 4.9 (part 1 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 4.9.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 4.9

## The `satisfies` Operator

TypeScript developers are often faced with a dilemma: we want to ensure that some expression *matches* some type, but also want to keep the *most specific* type of that expression for inference purposes.

For example:

```ts
// Each property can be a string or an RGB tuple.
const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
//  ^^^^ sacrebleu - we've made a typo!
};

// We want to be able to use string methods on 'green'...
const greenNormalized = palette.green.toUpperCase();
```

Notice that we've written `bleu`, whereas we probably should have written `blue`.
We could try to catch that `bleu` typo by using a type annotation on `palette`, but we'd lose the information about each property.

```ts
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette: Record<Colors, string | RGB> = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
//  ~~~~ The typo is now correctly detected
};

// But we now have an undesirable error here - 'palette.green' "could" be of type RGB and
// property 'toUpperCase' does not exist on type 'string | RGB'.
const greenNormalized = palette.green.toUpperCase();
```

The new `satisfies` operator lets us validate that the type of an expression matches some type, without changing the resulting type of that expression.
As an example, we could use `satisfies` to validate that all the properties of `palette` are compatible with `string | number[]`:

```ts
type Colors = "red" | "green" | "blue";

type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    bleu: [0, 0, 255]
//  ~~~~ The typo is now caught!
} satisfies Record<Colors, string | RGB>;

// toUpperCase() method is still accessible!
const greenNormalized = palette.green.toUpperCase();
```

`satisfies` can be used to catch lots of possible errors.
For example, we could ensure that an object has *all* the keys of some type, but no more:

```ts
type Colors = "red" | "green" | "blue";

// Ensure that we have exactly the keys from 'Colors'.
const favoriteColors = {
    "red": "yes",
    "green": false,
    "blue": "kinda",
    "platypus": false
//  ~~~~~~~~~~ error - "platypus" was never listed in 'Colors'.
} satisfies Record<Colors, unknown>;

// All the information about the 'red', 'green', and 'blue' properties are retained.
const g: boolean = favoriteColors.green;
```

Maybe we don't care about if the property names match up somehow, but we do care about the types of each property.
In that case, we can also ensure that all of an object's property values conform to some type.

```ts
type RGB = [red: number, green: number, blue: number];

const palette = {
    red: [255, 0, 0],
    green: "#00ff00",
    blue: [0, 0]
    //    ~~~~~~ error!
} satisfies Record<string, string | RGB>;

// Information about each property is still maintained.
const redComponent = palette.red.at(0);
const greenNormalized = palette.green.toUpperCase();
```

For more examples, you can see the issue proposing this and the implementing pull request.
We'd like to thank Oleksandr Tarasiuk who implemented and iterated on this feature with us.

## Unlisted Property Narrowing with the `in` Operator

As developers, we often need to deal with values that aren't fully known at runtime.
In fact, we often don't know if properties exist, whether we're getting a response from a server or reading a configuration file.
JavaScript's `in` operator can check whether a property
exists on an object.

Previously, TypeScript allowed us to narrow away any types that don't explicitly list a property.

```ts
interface RGB {
    red: number;
    green: number;
    blue: number;
}

interface HSV {
    hue: number;
    saturation: number;
    value: number;
}

function setColor(color: RGB | HSV) {
    if ("hue" in color) {
        // 'color' now has the type HSV
    }
    // ...
}
```

Here, the type `RGB` didn't list the `hue` and got narrowed away, and leaving us with the type `HSV`.

But what about examples where no type listed a given property?
In those cases, the language didn't help us much.
Let's take the following example in JavaScript:

```js
function tryGetPackageName(context) {
    const packageJSON = context.packageJSON;
    // Check to see if we have an object.
    if (packageJSON && typeof packageJSON === "object") {
        // Check to see if it has a string name property.
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
            return packageJSON.name;
        }
    }

    return undefined;
}
```

Rewriting this to canonical TypeScript would just be a matter of defining and using a type for `context`;
however, picking a safe type like `unknown` for the `packageJSON` property would cause issues in older versions of TypeScript.

```ts
interface Context {
    packageJSON: unknown;
}

function tryGetPackageName(context: Context) {
    const packageJSON = context.packageJSON;
    // Check to see if we have an object.
    if (packageJSON && typeof packageJSON === "object") {
        // Check to see if it has a string name property.
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
        //                                              ~~~~
        // error! Property 'name' does not exist on type 'object.
            return packageJSON.name;
        //                     ~~~~
        // error! Property 'name' does not exist on type 'object.
        }
    }

    return undefined;
}
```

This is because while the type of `packageJSON` was narrowed from `unknown` to `object`, the `in` operator strictly narrowed to types that actually defined the property being checked.
As a result, the type of `packageJSON` remained `object`.

TypeScript 4.9 makes the `in` operator a little bit more powerful when narrowing types that *don't* list the property at all.
Instead of leaving them as-is, the language will intersect their types with `Record<"property-key-being-checked", unknown>`.

So in our example, `packageJSON` will have its type narrowed from `unknown` to `object` to `object & Record<"name", unknown>`
That allows us to access `packageJSON.name` directly and narrow that independently.

```ts
interface Context {
    packageJSON: unknown;
}

function tryGetPackageName(context: Context): string | undefined {
    const packageJSON = context.packageJSON;
    // Check to see if we have an object.
    if (packageJSON && typeof packageJSON === "object") {
        // Check to see if it has a string name property.
        if ("name" in packageJSON && typeof packageJSON.name === "string") {
            // Just works!
            return packageJSON.name;
        }
    }

    return undefined;
}
```

TypeScript 4.9 also tightens up a few checks around how `in` is used, ensuring that the left side is assignable to the type `string | number | symbol`, and the right side is assignable to `object`.
This helps check that we're using valid property keys, and not accidentally checking primitives.

For more information, read the implementing pull request

## Auto-Accessors in Classes

TypeScript 4.9 supports an upcoming feature in ECMAScript called auto-accessors.
Auto-accessors are declared just like properties on classes, except that they're declared with the `accessor` keyword.

```ts
class Person {
    accessor name: string;

    constructor(name: string) {
        this.name = name;
    }
}
```

Under the covers, these auto-accessors "de-sugar" to a `get` and `set` accessor with an unreachable private property.

```ts
class Person {
    #__name: string;

    get name() {
        return this.#__name;
    }
    set name(value: string) {
        this.#__name = value;
    }

    constructor(name: string) {
        this.name = name;
    }
}
```

You can read up more about the auto-accessors pull request on the original PR.

## Checks For Equality on `NaN`

A major gotcha for JavaScript developers is checking against the value `NaN` using the built-in equality operators.

For some background, `NaN` is a special numeric value that stands for "Not a Number".
Nothing is ever equal to `NaN` - even `NaN`!

```js
console.log(NaN == 0)  // false
console.log(NaN === 0) // false

console.log(NaN == NaN)  // false
console.log(NaN === NaN) // false
```

But at least symmetrically *everything* is always not-equal to `NaN`.

```js
console.log(NaN != 0)  // true
console.log(NaN !== 0) // true

console.log(NaN != NaN)  // true
console.log(NaN !== NaN) // true
```

This technically isn't a JavaScript-specific problem, since any language that contains IEEE-754 floats has the same behavior;
but JavaScript's primary numeric type is a floating point number, and number parsing in JavaScript can often result in `NaN`.
In turn, checking against `NaN` ends up being fairly common, and the correct way to do so is to use `Number.isNaN` - *but* as we mentioned, lots of people accidentally end up checking with `someValue === NaN` instead.

TypeScript now errors on direct comparisons against `NaN`, and will suggest using some variation of `Number.isNaN` instead.

```ts
function validate(someValue: number) {
    return someValue !== NaN;
    //     ~~~~~~~~~~~~~~~~~
    // error: This condition will always return 'true'.
    //        Did you mean '!Number.isNaN(someValue)'?
}
```

We believe that this change should strictly help catch beginner errors, similar to how TypeScript currently issues errors on comparisons against object and array literals.

We'd like to extend our thanks to Oleksandr Tarasiuk who contributed this check.

## File-Watching Now Uses File System Events

In earlier versions, TypeScript leaned heavily on *polling* for watching individual files.
Using a polling strategy meant checking the state of a file periodically for updates.
On Node.js, `fs.watchFile` is the built-in way to get a polling file-watcher.
While polling tends to be more predictable across platforms and file systems, it means that your CPU has to periodically get interrupted and check for updates to the file, even when nothing's changed.
For a few dozen files, this might not be noticeable;
but on a bigger project with lots of files - or lots of files in `node_modules` - this can become a resource hog.

Generally speaking, a better approach is to use file system events.
Instead of polling, we can announce that we're interested in updates of specific files and provide a callback for when those files *actually do* change.
Most modern platforms in use provide facilities and APIs like `CreateIoCompletionPort`, `kqueue`, `epoll`, and `inotify`.
Node.js mostly abstracts these away by providing `fs.watch`.
File system events usually work great, but there are lots of caveats to using them, and in turn, to using the `fs.watch` API.
A watcher needs to be careful to consider inode watching, unavailability on certain file systems (e.g.networked file systems), whether recursive file watching is available, whether directory renames trigger events, and even file watcher exhaustion!
In other words, it's not quite a free lunch, especially if you're looking for something cross-platform.

As a result, our default was to pick the lowest common denominator: polling.
Not always, but most of the time.

Over time, we've provided the means to choose other file-watching strategies.
This allowed us to get feedback and harden our file-watching implementation against most of these platform-specific gotchas.
As TypeScript has needed to scale to larger codebases, and has improved in this area, we felt swapping to file system events as the default would be a worthwhile investment.

In TypeScript 4.9, file watching is powered by file system events by default, only falling back to polling if we fail to set up event-based watchers.
For most developers, this should provide a much less resource-intensive experience when running in `--watch` mode, or running with a TypeScript-powered editor like Visual Studio or VS Code.

The way file-watching works can still be configured through environment variables and `watchOptions` - and some editors like VS Code can support `watchOptions` independently.
Developers using more exotic set-ups where source code resides on a networked file systems (like NFS and SMB) may need to opt back into the older behavior; though if a server has reasonable processing power, it might just be better to enable SSH and run TypeScript remotely so that it has direct local file access.
VS Code has plenty of remote extensions to make this easier.

You can read up more on this change on GitHub.

## "Remove Unused Imports" and "Sort Imports" Commands for Editors

Previously, TypeScript only supported two editor commands to manage imports.
For our examples, take the following code:

```ts
import { Zebra, Moose, HoneyBadger } from "./zoo";
import { foo, bar } from "./helper";

let x: Moose | HoneyBadger = foo();
```

The first was called "Organize Imports" which would remove unused imports, and then sort the remaining ones.
It would rewrite that file to look like this one:

```ts
import { foo } from "./helper";
import { HoneyBadger, Moose } from "./zoo";

let x: Moose | HoneyBadger = foo();
```

In TypeScript 4.3, we introduced a command called "Sort Imports" which would *only* sort imports in the file, but not remove them - and would rewrite the file like this.

```ts
import { bar, foo } from "./helper";
import { HoneyBadger, Moose, Zebra } from "./zoo";

let x: Moose | HoneyBadger = foo();
```

The caveat with "Sort Imports" was that in Visual Studio Code, this feature was only available as an on-save command - not as a manually triggerable command.

TypeScript 4.9 adds the other half, and now provides "Remove Unused Imports".
TypeScript will now remove unused import names and statements, but will otherwise leave the relative ordering alone.

```ts
import { Moose, HoneyBadger } from "./zoo";
import { foo } from "./helper";

let x: Moose | HoneyBadger = foo();
```

This feature is available to all editors that wish to use either command;
but notably, Visual Studio Code (1.73 and later) will have support built in *and* will surface these commands via its Command Palette.
Users who prefer to use the more granular "Remove Unused Imports" or "Sort Imports" commands should be able to reassign the "Organize Imports" key combination to them if desired.

You can view specifics of the feature here.

## Go-to-Definition on `return` Keywords

In the editor, when running a go-to-definition on the `return` keyword, TypeScript will now jump you to the top of the corresponding function.
This can be helpful to get a quick sense of which function a `return` belongs to.

We expect TypeScript will expand this functionality to more keywords such as `await` and `yield` or `switch`, `case`, and `default`.

This feature was implemented thanks to Oleksandr Tarasiuk.
