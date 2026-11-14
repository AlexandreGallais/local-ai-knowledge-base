---
title: "consistent-tuple-labels"
tool: "unicorn"
version: "79.0"
source: "https://github.com/sindresorhus/eslint-plugin-unicorn/blob/d078ad9e080d7eba07a1aab65c5faa6461a2eed7/docs/rules/consistent-tuple-labels.md"
commit: "d078ad9e080d7eba07a1aab65c5faa6461a2eed7"
license: "MIT"
---

# consistent-tuple-labels

📝 Enforce consistent labels on tuple type elements.

💼🚫 This rule is enabled in the ✅ `recommended` config. This rule is _disabled_ in the ☑️ `unopinionated` config.

Labeled tuple elements document what each position in a tuple means. Labeling only some of the elements is inconsistent: the unlabeled positions read as an oversight, and the tuple is harder to scan than one that is either fully labeled or fully unlabeled.

This rule requires that, when at least one element of a tuple type is labeled, every element is labeled. A tuple with no labels at all is left alone.

A rest element counts as labeled when its label is present (`...rest: number[]`), so a fully labeled tuple that ends with a labeled rest element is not reported.

There is no autofix, since a meaningful label cannot be inferred.

## Examples

```ts
// ❌
type Point = [x: number, number];

// ✅
type Point = [x: number, y: number];
```

```ts
// ✅
type Point = [number, number];
```

```ts
// ❌
type Route = [name: string, ...string[]];

// ✅
type Route = [name: string, ...segments: string[]];
```
