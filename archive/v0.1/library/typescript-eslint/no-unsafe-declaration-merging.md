---
title: "no-unsafe-declaration-merging"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-declaration-merging.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-declaration-merging

TypeScript's "declaration merging" supports merging separate declarations with the same name.

Declaration merging between classes and interfaces is unsafe.
The TypeScript compiler doesn't check whether properties are initialized, which can lead to TypeScript not detecting code that will cause runtime errors.

```ts
interface Foo {
  numbers: number[];
}

class Foo {}

const foo = new Foo();

foo.numbers.push(1); // Runtime Error: Cannot read properties of undefined.
```

## Examples

**❌ Incorrect**

```ts
interface Foo {}

class Foo {}
```

**✅ Correct**

```ts
interface Foo {}
class Bar implements Foo {}

namespace Baz {}
namespace Baz {}
enum Baz {}

namespace Qux {}
function Qux() {}
```

## When Not To Use It

If your project intentionally defines classes and interfaces with unsafe declaration merging patterns, this rule might not be for you.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.

## Further Reading

- Declaration Merging
