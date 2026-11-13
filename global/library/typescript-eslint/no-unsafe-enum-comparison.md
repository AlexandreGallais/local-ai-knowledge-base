---
title: "no-unsafe-enum-comparison"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-unsafe-enum-comparison.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-unsafe-enum-comparison

The TypeScript compiler can be surprisingly lenient when working with enums.
While overt safety problems with enums were resolved in TypeScript 5.0, some logical pitfalls remain permitted.
For example, it is allowed to compare enum values against non-enum values:

```ts
enum Vegetable {
  Asparagus = 'asparagus',
}

declare const vegetable: Vegetable;

vegetable === 'asparagus'; // No error
```

The above code snippet should instead be written as `vegetable === Vegetable.Asparagus`.
Allowing non-enums in comparisons subverts the point of using enums in the first place.
By enforcing comparisons with properly typed enums:

- It makes a codebase more resilient to enum members changing values.
- It allows for code IDEs to use the "Rename Symbol" feature to quickly rename an enum.
- It aligns code to the proper enum semantics of referring to them by name and treating their values as implementation details.

## Examples

**❌ Incorrect**

```ts
enum Fruit {
  Apple,
}

declare let fruit: Fruit;

// bad - comparison between enum and explicit value instead of named enum member
fruit === 0;

enum Vegetable {
  Asparagus = 'asparagus',
}

declare let vegetable: Vegetable;

// bad - comparison between enum and explicit value instead of named enum member
vegetable === 'asparagus';

declare let anyString: string;

// bad - comparison between enum and non-enum value
anyString === Vegetable.Asparagus;
```

**✅ Correct**

```ts
enum Fruit {
  Apple,
}

declare let fruit: Fruit;

fruit === Fruit.Apple;

enum Vegetable {
  Asparagus = 'asparagus',
}

declare let vegetable: Vegetable;

vegetable === Vegetable.Asparagus;
```

## When Not To Use It

If you don't mind enums being treated as a namespaced bag of values, rather than opaque identifiers, you likely don't need this rule.

Sometimes, you may want to ingest a value from an API or user input, then use it as an enum throughout your application.
While validating the input, it may be appropriate to disable the rule.
Alternately, you might consider making use of a validation library like Zod.
See further discussion of this topic in #8557.

Finally, in the rare case of relying on an third party enums that are only imported as `type`s, it may be difficult to adhere to this rule.
You might consider using ESLint disable comments for those specific situations instead of completely disabling this rule.
