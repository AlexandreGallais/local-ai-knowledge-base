---
title: "only-throw-error"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/only-throw-error.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# only-throw-error

It uses type information to determine which values are `Error`s.

It is considered good practice to only `throw` the `Error` object itself or an object using the `Error` object as base objects for user-defined exceptions.
The fundamental benefit of `Error` objects is that they automatically keep track of where they were built and originated.

**[Migration from `no-throw-literal`]**

This extension rule was formerly known as `@typescript-eslint/no-throw-literal`.
The new name is a drop-in replacement with identical functionality.

## Examples

This rule is aimed at maintaining consistency when throwing exceptions by disallowing throwing values that are not `Error` objects.

**❌ Incorrect**

```ts
throw 'error';

throw 0;

throw undefined;

function getErrorString(): string {
  return '';
}
throw getErrorString();

const foo = {
  bar: 'error string',
};
throw foo.bar;

class SomeClass {
  // ...
}
throw new SomeClass();
```

**✅ Correct**

```ts
throw new Error();

throw new Error('error');

const e = new Error('error');
throw e;

function getError() {
  return new Error();
}
throw getError();

const foo = {
  bar: new Error(),
};
throw foo.bar;

class CustomError extends Error {
  // ...
}
throw new CustomError();
```

## Options

This rule adds the following options:

```ts
interface Options {
  /**
   * Type specifiers that can be thrown.
   */
  allow?: (
    | {
        from: 'file';
        name: string[] | string;
        path?: string;
      }
    | {
        from: 'lib';
        name: string[] | string;
      }
    | {
        from: 'package';
        name: string[] | string;
        package: string;
      }
    | string
  )[];

  /**
   * Whether to allow rethrowing caught values that are not `Error` objects.
   */
  allowRethrowing?: boolean;

  /**
   * Whether to always allow throwing values typed as `any`.
   */
  allowThrowingAny?: boolean;

  /**
   * Whether to always allow throwing values typed as `unknown`.
   */
  allowThrowingUnknown?: boolean;
}

const defaultOptions: Options = {
  allow: [],
  allowRethrowing: true,
  allowThrowingAny: true,
  allowThrowingUnknown: true,
};
```

### allowThrowingAny

When set to `true`, this option allows throwing values typed as `any`.

Examples of **correct** code with `{ allowThrowingAny: true }`:

```ts
function throwAny(value: any) {
  throw value;
}
```

### allowThrowingUnknown

When set to `true`, this option allows throwing values typed as `unknown`.

Examples of **correct** code with `{ allowThrowingUnknown: true }`:

```ts
function throwUnknown(value: unknown) {
  throw value;
}
```

### allowRethrowing

When set to `true`, this option allows throwing caught values.
This is intended to be used in order to make patterns involving rethrowing exceptions less painful for users who set `allowThrowingAny`/`allowThrowingUnknown` to `false`.

Examples of **correct** code with `{ allowRethrowing: true, allowThrowingAny: false, allowThrowingUnknown: false }`:

```ts
declare function mightThrow(): void;
declare class SomeSpecificError extends Error {
  // ...
}

function foo() {
  try {
    mightThrow();
  } catch (e) {
    if (e instanceof SomeSpecificError) {
      // handle specific error ...
      return;
    }

    // unexpected error that we shouldn't catch.
    throw e;
  }
}

declare function mightReject(): Promise<void>;

mightReject().catch(e => {
  if (e instanceof SomeSpecificError) {
    // handle specific error ...
    return;
  }

  // unexpected error that we can't handle
  throw e;
});

declare function log(message: string): void;

function bar() {
  log('starting bar()');
  let wasError = false;
  try {
    // ...
  } catch (e) {
    wasError = true;
    throw e;
  } finally {
    log(`completed bar() ${wasError ? 'with error' : 'successfully'}`);
  }
}
```

**Note:**

While it makes sense to rethrow errors in some cases, it is likely more common that one would want to create a new `Error` and set its `cause` appropriately.

```ts
function foo() {
  try {
    // ...
  } catch (e) {
    throw new Error('Could not complete foo()', { cause: e });
  }
}
```

### allow

This option takes the shared `TypeOrValueSpecifier` format to allow throwing values that are not `Error` objects.
While we strongly recommend that you only create custom error classes that extend `Error`, this option can be useful for throwing errors defined by libraries that do not follow this convention.

Examples of code for this rule with:

```jsonc
{
  "allow": [{ "from": "file", "name": "CustomError" }],
}
```

```ts
class CustomError /* does NOT extend Error */ {
  // ...
}

throw new CustomError();
```
