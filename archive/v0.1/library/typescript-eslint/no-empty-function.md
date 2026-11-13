---
title: "no-empty-function"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-empty-function.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-empty-function

It adds support for handling TypeScript specific code that would otherwise trigger the rule.

One example of valid TypeScript specific code that would otherwise trigger the `no-empty-function` rule is the use of parameter properties in constructor functions.

## Options

This rule adds the following options:

```ts
type AdditionalAllowOptionEntries =
  | 'private-constructors'
  | 'protected-constructors'
  | 'decoratedFunctions'
  | 'overrideMethods';

type AllowOptionEntries =
  BaseNoEmptyFunctionAllowOptionEntries | AdditionalAllowOptionEntries;

interface Options extends BaseNoEmptyFunctionOptions {
  allow?: Array<AllowOptionEntries>;
}
const defaultOptions: Options = {
  ...baseNoEmptyFunctionDefaultOptions,
  allow: [],
};
```

### allow: `private-constructors`

Examples of correct code for the `{ "allow": ["private-constructors"] }` option:

```ts
class Foo {
  private constructor() {}
}
```

### allow: `protected-constructors`

Examples of correct code for the `{ "allow": ["protected-constructors"] }` option:

```ts
class Foo {
  protected constructor() {}
}
```

### allow: `decoratedFunctions`

Examples of correct code for the `{ "allow": ["decoratedFunctions"] }` option:

```ts
class Foo {
  @decorator()
  foo() {}
}
```

### allow: `overrideMethods`

Examples of correct code for the `{ "allow": ["overrideMethods"] }` option:

```ts
abstract class Base {
  protected greet(): void {
    console.log('Hello!');
  }
}

class Foo extends Base {
  protected override greet(): void {}
}
```

## When Not To Use It

If you are working with external APIs that require functions even if they do nothing, then you may want to avoid this rule.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

Test code often violates this rule as well.
If your testing setup doesn't support "mock" or "spy" functions such as `jest.fn()`, `sinon.spy()`, or `vi.fn()`, you may wish to disable this rule in test files.
Again, if those cases aren't extremely common, you might consider using ESLint disable comments for those specific situations instead of completely disabling this rule in test files.
