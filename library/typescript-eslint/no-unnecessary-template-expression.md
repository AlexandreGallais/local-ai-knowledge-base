---
title: "no-unnecessary-template-expression"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unnecessary-template-expression.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unnecessary-template-expression

This rule reports template literals that contain substitution expressions (also variously referred to as embedded expressions or string interpolations) that are unnecessary and can be simplified.

**[Migration from `no-useless-template-literals`]**

This rule was formerly known as `no-useless-template-literals`.
The new name is a drop-in replacement with identical functionality.

## Examples

**❌ Incorrect**

```ts
// Static values can be incorporated into the surrounding template.

const ab1 = `${'a'}${'b'}`;
const ab2 = `a${'b'}`;
type AB1 = `${'A'}${'B'}`;
type AB2 = `A${'B'}`;

const stringWithNumber = `${'1 + 1 = '}${2}`;

const stringWithBoolean = `${'true is '}${true}`;

// Some simple expressions that are already strings
// can be rewritten without a template at all.

const text = 'a';
const wrappedText = `${text}`;
type Text = 'A';
type WrappedText = `${Text}`;

declare const intersectionWithString: string & { _brand: 'test-brand' };
const wrappedIntersection = `${intersectionWithString}`;
type IntersectionWithString = string & { _brand: 'test-brand' };
type WrappedIntersection = `${IntersectionWithString}`;
```

**✅ Correct**

```ts
// Static values can be incorporated into the surrounding template.

const ab1 = `ab`;
const ab2 = `ab`;
type AB = `AB`;

// Transforming enum members into string unions using template literals is allowed.
enum ABC {
  A = 'A',
  B = 'B',
  C = 'C',
}
type ABCUnion = `${ABC}`;
type A = `${ABC.A}`;

// Interpolating type parameters is allowed.
type TextUtil<T extends string> = `${T}`;

const stringWithNumber = `1 + 1 = 2`;

const stringWithBoolean = `true is true`;

// Some simple expressions that are already strings
// can be rewritten without a template at all.

const text = 'a';
const wrappedText = text;
type Text = 'A';
type WrappedText = Text;

declare const intersectionWithString: string & { _brand: 'test-brand' };
const wrappedIntersection = intersectionWithString;
type IntersectionWithString = string & { _brand: 'test-brand' };
type WrappedIntersection = IntersectionWithString;
```

**Info:**
This rule does not aim to flag template literals without substitution expressions that could have been written as an ordinary string.
That is to say, this rule will not help you turn `` `this` `` into `"this"`.
If you are looking for such a rule, you can configure the `@stylistic/quotes` rule to do this.

## When Not To Use It

When you want to allow string expressions inside template literals.

## Related To

- `restrict-template-expressions`
- `@stylistic/quotes`
