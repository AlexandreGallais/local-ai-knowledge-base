---
title: "TypeScript 5.4 (part 2 of 2)"
tool: "typescript"
version: "6.0"
source: "https://github.com/microsoft/TypeScript-Website/blob/a93dd416c393cbc7570b829a9e0c753b2678249f/packages/documentation/copy/en/release-notes/TypeScript 5.4.md"
commit: "a93dd416c393cbc7570b829a9e0c753b2678249f"
license: "CC-BY-4.0"
---

# TypeScript 5.4 (part 2 of 2)

## Notable Behavioral Changes

This section highlights a set of noteworthy changes that should be acknowledged and understood as part of any upgrade.
Sometimes it will highlight deprecations, removals, and new restrictions.
It can also contain bug fixes that are functionally improvements, but which can also affect an existing build by introducing new errors.

### `lib.d.ts` Changes

Types generated for the DOM may have an impact on type-checking your codebase.
For more information, see the DOM updates for TypeScript 5.4.

### More Accurate Conditional Type Constraints

The following code no longer allows the second variable declaration in the function `foo`.

```ts
type IsArray<T> = T extends any[] ? true : false;

function foo<U extends object>(x: IsArray<U>) {
    let first: true = x;    // Error
    let second: false = x;  // Error, but previously wasn't
}
```

Previously, when TypeScript checked the initializer for `second`, it needed to determine whether `IsArray` was assignable to the unit type `false`.
While `IsArray` isn't compatible any obvious way, TypeScript looks at the *constraint* of that type as well.
In a conditional type like `T extends Foo ? TrueBranch : FalseBranch`, where `T` is generic, the type system would look at the constraint of `T`, substitute it in for `T` itself, and decide on either the true or false branch.

But this behavior was inaccurate because it was overly eager.
Even if the constraint of `T` isn't assignable to `Foo`, that doesn't mean that it won't be instantiated with something that is.
And so the more correct behavior is to produce a union type for the constraint of the conditional type in cases where it can't be proven that `T` *never* or *always* extends `Foo.`

TypeScript 5.4 adopts this more accurate behavior.
What this means in practice is that you may begin to find that some conditional type instances are no longer compatible with their branches.

You can read about the specific changes here.

### More Aggressive Reduction of Intersections Between Type Variables and Primitive Types

TypeScript now reduces intersections with type variables and primitives more aggressively, depending on how the type variable's constraint overlaps with those primitives.

```ts
declare function intersect<T, U>(x: T, y: U): T & U;

function foo<T extends "abc" | "def">(x: T, str: string, num: number) {

    // Was 'T & string', now is just 'T'
    let a = intersect(x, str);

    // Was 'T & number', now is just 'never'
    let b = intersect(x, num)

    // Was '(T & "abc") | (T & "def")', now is just 'T'
    let c = Math.random() < 0.5 ?
        intersect(x, "abc") :
        intersect(x, "def");
}
```

For more information, see the change here.

### Improved Checking Against Template Strings with Interpolations

TypeScript now more accurately checks whether or not strings are assignable to the placeholder slots of a template string type.

```ts
function a<T extends {id: string}>() {
    let x: `-${keyof T & string}`;
    
    // Used to error, now doesn't.
    x = "-id";
}
```

This behavior is more desirable, but may cause breaks in code using constructs like conditional types, where these rule changes are easy to witness.

See this change for more details.

### Errors When Type-Only Imports Conflict with Local Values

Previously, TypeScript would permit the following code under `isolatedModules` if the import to `Something` only referred to a type.

```ts
import { Something } from "./some/path";

let Something = 123;
```

However, it's not safe for single-file compilers to assume whether it's "safe" to drop the `import`, even if the code is guaranteed to fail at runtime.
In TypeScript 5.4, this code will trigger an error like the following:

```
Import 'Something' conflicts with local value, so must be declared with a type-only import when 'isolatedModules' is enabled.
```

The fix should be to either make a local rename, or, as the error states, add the `type` modifier to the import:

```ts
import type { Something } from "./some/path";

// or

import { type Something } from "./some/path";
```

See more information on the change itself.

### New Enum Assignability Restrictions

When two enums have the same declared names and enum member names, they were previously always considered compatible;
however, when the values were known, TypeScript would silently allow them to have differing values.

TypeScript 5.4 tightens this restriction by requiring the values to be identical when they are known.

```ts
namespace First {
    export enum SomeEnum {
        A = 0,
        B = 1,
    }
}

namespace Second {
    export enum SomeEnum {
        A = 0,
        B = 2,
    }
}

function foo(x: First.SomeEnum, y: Second.SomeEnum) {
    // Both used to be compatible - no longer the case,
    // TypeScript errors with something like:
    //
    //  Each declaration of 'SomeEnum.B' differs in its value, where '1' was expected but '2' was given.
    x = y;
    y = x;
}
```

Additionally, there are new restrictions for when one of the enum members does not have a statically known value.
In these cases, the other enum must at least be implicitly numeric (e.g. it has no statically resolved initializer), or it is explicitly numeric (meaning TypeScript could resolve the value to something numeric).
Practically speaking, what this means is that string enum members are only ever compatible with other string enums of the same value.

```ts
namespace First {
    export declare enum SomeEnum {
        A,
        B,
    }
}

namespace Second {
    export declare enum SomeEnum {
        A,
        B = "some known string",
    }
}

function foo(x: First.SomeEnum, y: Second.SomeEnum) {
    // Both used to be compatible - no longer the case,
    // TypeScript errors with something like:
    //
    //  One value of 'SomeEnum.B' is the string '"some known string"', and the other is assumed to be an unknown numeric value.
    x = y;
    y = x;
}
```

For more information, see the pull request that introduced this change.

### Name Restrictions on Enum Members

TypeScript no longer allows enum members to use the names `Infinity`, `-Infinity`, or `NaN`.

```ts
// Errors on all of these:
//
//  An enum member cannot have a numeric name.
enum E {
    Infinity = 0,
    "-Infinity" = 1,
    NaN = 2,
}
```

See more details here.

### Better Mapped Type Preservation Over Tuples with `any` Rest Elements

Previously, applying a mapped type with `any` into a tuple would create an `any` element type.
This is undesirable and is now fixed.

```ts
Promise.all(["", ...([] as any)])
    .then((result) => {
        const head = result[0];       // 5.3: any, 5.4: string
        const tail = result.slice(1); // 5.3 any, 5.4: any[]
    });
```

For more information, see the fix along with the follow-on discussion around behavioral changes and further tweaks.

### Emit Changes

While not a breaking change per se, developers may have implicitly taken dependencies on TypeScript's JavaScript or declaration emit outputs.
The following are notable changes.

* Preserve type parameter names more often when shadowed
* Move complex parameter lists of async function into downlevel generator body
* Do not remove binding alias in function declarations
* ImportAttributes should go through the same emit phases when in an ImportTypeNode
