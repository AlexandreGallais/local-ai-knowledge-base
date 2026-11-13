---
title: "no-useless-constructor"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/no-useless-constructor.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# no-useless-constructor

It adds support for:

- constructors marked as `protected` / `private` (i.e. marking a constructor as non-public),
- `public` constructors when there is no superclass,
- constructors with only parameter properties.

### Caveat

This lint rule will report on constructors whose sole purpose is to change visibility of a parent constructor.
See discussion on this rule's lack of type information for context.
