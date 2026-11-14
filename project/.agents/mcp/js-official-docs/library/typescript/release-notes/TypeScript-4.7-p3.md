---
title: "TypeScript 4.7 (part 3 of 3)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/4ec663ac4412c3a7086401bd5a8811565589b11d/packages/documentation/copy/en/release-notes/TypeScript 4.7.md"
commit: "4ec663ac4412c3a7086401bd5a8811565589b11d"
license: "CC-BY-4.0"
---

# TypeScript 4.7 (part 3 of 3)

## Group-Aware Organize Imports

TypeScript has an *Organize Imports* editor feature for both JavaScript and TypeScript.
Unfortunately, it could be a bit of a blunt instrument, and would often naively sort your import statements.

For instance, if you ran Organize Imports on the following file...

```ts
// local code
import * as bbb from "./bbb";
import * as ccc from "./ccc";
import * as aaa from "./aaa";

// built-ins
import * as path from "path";
import * as child_process from "child_process"
import * as fs from "fs";

// some code...
```

You would get something like the following

```ts
// local code
import * as child_process from "child_process";
import * as fs from "fs";
// built-ins
import * as path from "path";
import * as aaa from "./aaa";
import * as bbb from "./bbb";
import * as ccc from "./ccc";

// some code...
```

This is... not ideal.
Sure, our imports are sorted by their paths, and our comments and newlines are preserved, but not in a way we expected.
Much of the time, if we have our imports grouped in a specific way, then we want to keep them that way.

TypeScript 4.7 performs Organize Imports in a group-aware manner.
Running it on the above code looks a little bit more like what you'd expect:

```ts
// local code
import * as aaa from "./aaa";
import * as bbb from "./bbb";
import * as ccc from "./ccc";

// built-ins
import * as child_process from "child_process";
import * as fs from "fs";
import * as path from "path";

// some code...
```

We'd like to extend our thanks to Minh Quy who provided this feature.

## Object Method Snippet Completions

TypeScript now provides snippet completions for object literal methods.
When completing members in an object, TypeScript will provide a typical completion entry for just the name of a method, along with a separate completion entry for the full method definition!

For more details, see the implementing pull request.

## Breaking Changes

### `lib.d.ts` Updates

While TypeScript strives to avoid major breaks, even small changes in the built-in libraries can cause issues.
We don't expect major breaks as a result of DOM and `lib.d.ts` updates, but there may be some small ones.

### Stricter Spread Checks in JSX

When writing a `...spread` in JSX, TypeScript now enforces stricter checks that the given type is actually an object.
As a result, values with the types `unknown` and `never` (and more rarely, just bare `null` and `undefined`) can no longer be spread into JSX elements.

So for the following example:

```tsx
import * as React from "react";

interface Props {
    stuff?: string;
}

function MyComponent(props: unknown) {
    return <div {...props} />;
}
```

you'll now receive an error like the following:

```
Spread types may only be created from object types.
```

This makes this behavior more consistent with spreads in object literals.

For more details, see the change on GitHub.

### Stricter Checks with Template String Expressions

When a `symbol` value is used in a template string, it will trigger a runtime error in JavaScript.

```js
let str = `hello ${Symbol()}`;
// TypeError: Cannot convert a Symbol value to a string
```

As a result, TypeScript will issue an error as well;
however, TypeScript now also checks if a generic value that is constrained to a symbol in some way is used in a template string.

```ts
function logKey<S extends string | symbol>(key: S): S {
    // Now an error.
    console.log(`${key} is the key`);
    return key;
}

function get<T, K extends keyof T>(obj: T, key: K) {
    // Now an error.
    console.log(`Grabbing property '${key}'.`);
    return obj[key];
}
```

TypeScript will now issue the following error:

```
Implicit conversion of a 'symbol' to a 'string' will fail at runtime. Consider wrapping this expression in 'String(...)'.
```

In some cases, you can get around this by wrapping the expression in a call to `String`, just like the error message suggests.

```ts
function logKey<S extends string | symbol>(key: S): S {
    // No longer an error.
    console.log(`${String(key)} is the key`);
    return key;
}
```

In others, this error is too pedantic, and you might not ever care to even allow `symbol` keys when using `keyof`.
In such cases, you can switch to `string & keyof ...`:

```ts
function get<T, K extends string & keyof T>(obj: T, key: K) {
    // No longer an error.
    console.log(`Grabbing property '${key}'.`);
    return obj[key];
}
```

For more information, you can see the implementing pull request.

### `readFile` Method is No Longer Optional on `LanguageServiceHost`

If you're creating `LanguageService` instances, then provided `LanguageServiceHost`s will need to provide a `readFile` method.
This change was necessary to support the new `moduleDetection` compiler option.

You can read more on the change here.

### `readonly` Tuples Have a `readonly` `length` Property

A `readonly` tuple will now treat its `length` property as `readonly`.
This was almost never witnessable for fixed-length tuples, but was an oversight which could be observed for tuples with trailing optional and rest element types.

As a result, the following code will now fail:

```ts
function overwriteLength(tuple: readonly [string, string, string]) {
    // Now errors.
    tuple.length = 7;
}
```

You can read more on this change here.
