---
title: "no-mixed-enums"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-mixed-enums.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-mixed-enums

TypeScript enums are allowed to assign numeric or string values to their members.
Most enums contain either all numbers or all strings, but in theory you can mix-and-match within the same enum.
Mixing enum member types is generally considered confusing and a bad practice.

## Examples

**❌ Incorrect**

```ts
enum Status {
  Unknown,
  Closed = 1,
  Open = 'open',
}
```

**✅ Correct (Explicit Numbers)**

```ts
enum Status {
  Unknown = 0,
  Closed = 1,
  Open = 2,
}
```

**✅ Correct (Implicit Numbers)**

```ts
enum Status {
  Unknown,
  Closed,
  Open,
}
```

**✅ Correct (Strings)**

```ts
enum Status {
  Unknown = 'unknown',
  Closed = 'closed',
  Open = 'open',
}
```

## Iteration Pitfalls of Mixed Enum Member Values

Enum values may be iterated over using `Object.entries`/`Object.keys`/`Object.values`.

If all enum members are strings, the number of items will match the number of enum members:

```ts
enum Status {
  Closed = 'closed',
  Open = 'open',
}

// ['closed', 'open']
Object.values(Status);
```

But if the enum contains members that are initialized with numbers -including implicitly initialized numbers— then iteration over that enum will include those numbers as well:

```ts
enum Status {
  Unknown,
  Closed = 1,
  Open = 'open',
}

// ["Unknown", "Closed", 0, 1, "open"]
Object.values(Status);
```

## When Not To Use It

If you don't mind the confusion of mixed enum member values and don't iterate over enums, you can safely disable this rule.
