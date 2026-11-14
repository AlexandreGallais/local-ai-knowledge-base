---
title: "no-extraneous-class"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-extraneous-class.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-extraneous-class

This rule reports when a class has no non-static members, such as for a class used exclusively as a static namespace.

Users who come from a OOP paradigm may wrap their utility functions in an extra class, instead of putting them at the top level of an ECMAScript module.
Doing so is generally unnecessary in JavaScript and TypeScript projects.

- Wrapper classes add extra cognitive complexity to code without adding any structural improvements
  - Whatever would be put on them, such as utility functions, are already organized by virtue of being in a module.
  - As an alternative, you can `import * as ...` the module to get all of them in a single object.
- IDEs can't provide as good suggestions for static class or namespace imported properties when you start typing property names
- It's more difficult to statically analyze code for unused variables, etc. when they're all on the class (see: Finding dead code (and dead types) in TypeScript).

This rule also reports classes that have only a constructor and no fields.
Those classes can generally be replaced with a standalone function.

## Examples

**❌ Incorrect**

```ts
class StaticConstants {
  static readonly version = 42;

  static isProduction() {
    return process.env.NODE_ENV === 'production';
  }
}

class HelloWorldLogger {
  constructor() {
    console.log('Hello, world!');
  }
}

abstract class Foo {}
```

**✅ Correct**

```ts
export const version = 42;

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

function logHelloWorld() {
  console.log('Hello, world!');
}

abstract class Foo {
  abstract prop: string;
}
```

## Alternatives

### Individual Exports (Recommended)

Instead of using a static utility class we recommend you individually export the utilities from your module.

**❌ Incorrect**

```ts
export class Utilities {
  static util1() {
    return Utilities.util3();
  }

  static util2() {
    /* ... */
  }

  static util3() {
    /* ... */
  }
}
```

**✅ Correct**

```ts
export function util1() {
  return util3();
}

export function util2() {
  /* ... */
}

export function util3() {
  /* ... */
}
```

### Namespace Imports (Not Recommended)

If you strongly prefer to have all constructs from a module available as properties of a single object, you can `import * as` the module.
This is known as a "namespace import".
Namespace imports are sometimes preferable because they keep all properties nested and don't need to be changed as you start or stop using various properties from the module.

However, namespace imports are impacted by these downsides:

- They also don't play as well with tree shaking in modern bundlers
- They require a name prefix before each property's usage

**❌ Incorrect**

```ts
// utilities.ts
export class Utilities {
  static sayHello() {
    console.log('Hello, world!');
  }
}

// consumers.ts
import { Utilities } from './utilities';

Utilities.sayHello();
```

**⚠️ Namespace Imports**

```ts
// utilities.ts
export function sayHello() {
  console.log('Hello, world!');
}

// consumers.ts
import * as utilities from './utilities';

utilities.sayHello();
```

**✅ Standalone Imports**

```ts
// utilities.ts
export function sayHello() {
  console.log('Hello, world!');
}

// consumers.ts
import { sayHello } from './utilities';

sayHello();
```

### Notes on Mutating Variables

One case you need to be careful of is exporting mutable variables.
While class properties can be mutated externally, exported variables are always constant.
This means that importers can only ever read the first value they are assigned and cannot write to the variables.

Needing to write to an exported variable is very rare and is generally considered a code smell.
If you do need it you can accomplish it using getter and setter functions:

**❌ Incorrect**

```ts
export class Utilities {
  static mutableCount = 1;

  static incrementCount() {
    Utilities.mutableCount += 1;
  }
}
```

**✅ Correct**

```ts
let mutableCount = 1;

export function getMutableCount() {
  return mutableCount;
}

export function incrementCount() {
  mutableCount += 1;
}
```

## Options

This rule normally bans classes that are empty (have no constructor or fields).
The rule's options each add an exemption for a specific type of class.

### `allowConstructorOnly`

**❌ Incorrect**

```ts
class NoFields {}
```

**✅ Correct**

```ts
class NoFields {
  constructor() {
    console.log('Hello, world!');
  }
}
```

### `allowEmpty`

**❌ Incorrect**

```ts
class NoFields {
  constructor() {
    console.log('Hello, world!');
  }
}
```

**✅ Correct**

```ts
class NoFields {}
```

### `allowStaticOnly`

**Caution:**
We strongly recommend against the `allowStaticOnly` exemption.
It works against this rule's primary purpose of discouraging classes used only for static members.

**❌ Incorrect**

```ts
class EmptyClass {}
```

**✅ Correct**

```ts
class NotEmptyClass {
  static version = 42;
}
```

### `allowWithDecorator`

**❌ Incorrect**

```ts
class Constants {
  static readonly version = 42;
}
```

**✅ Correct**

```ts
@logOnRead()
class Constants {
  static readonly version = 42;
}
```

## When Not To Use It

If your project was set up before modern class and namespace practices, and you don't have the time to switch over, you might not be practically able to use this rule.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
