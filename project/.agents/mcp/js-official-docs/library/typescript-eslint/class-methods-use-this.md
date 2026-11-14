---
title: "class-methods-use-this"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/class-methods-use-this.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# class-methods-use-this

It adds support for ignoring `override` methods and/or methods on classes that implement an interface. It also supports auto-accessor properties.

## Options

This rule adds the following options:

```ts
interface Options extends BaseClassMethodsUseThisOptions {
  ignoreOverrideMethods?: boolean;
  ignoreClassesThatImplementAnInterface?: boolean | 'public-fields';
}

const defaultOptions: Options = {
  ...baseClassMethodsUseThisOptions,
  ignoreOverrideMethods: false,
  ignoreClassesThatImplementAnInterface: false,
};
```

### `ignoreOverrideMethods`

Example of correct code when `ignoreOverrideMethods` is set to `true`:

```ts
abstract class Base {
  abstract method(): void;
  abstract property: () => void;
}

class Derived extends Base {
  override method() {}
  override property = () => {};
}
```

### `ignoreClassesThatImplementAnInterface`

If specified, it can be either:

- `true`: Ignore all classes that implement an interface
- `'public-fields'`: Ignore only the public fields of classes that implement an interface

Note that this option applies to all class members, not just those defined in the interface.

#### `true`

Examples of code when `ignoreClassesThatImplementAnInterface` is set to `true`:

**❌ Incorrect**

```ts
class Standalone {
  method() {}
  property = () => {};
}
```

**✅ Correct**

```ts
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};
}
```

#### `'public-fields'`

Example of incorrect code when `ignoreClassesThatImplementAnInterface` is set to `'public-fields'`:

**❌ Incorrect**

```ts
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};

  private privateMethod() {}
  private privateProperty = () => {};

  protected protectedMethod() {}
  protected protectedProperty = () => {};
}
```

**✅ Correct**

```ts
interface Base {
  method(): void;
}

class Derived implements Base {
  method() {}
  property = () => {};
}
```

## When Not To Use It

If your project dynamically changes `this` scopes around in a way TypeScript has difficulties modeling, this rule may not be viable to use.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
