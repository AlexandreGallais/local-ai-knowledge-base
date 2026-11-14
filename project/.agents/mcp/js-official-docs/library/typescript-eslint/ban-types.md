---
title: "ban-types"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/ban-types.md"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# ban-types

**Deprecated**

The old `ban-types` rule encompassed multiple areas of functionality, and so has been split into several rules.

**`no-restricted-types`** is the new rule for banning a configurable list of type names.
It has no options enabled by default and is akin to rules like `no-restricted-globals`, `no-restricted-properties`, and `no-restricted-syntax`.

The default options from `ban-types` are now covered by:

- **`no-empty-object-type`**: banning the built-in `{}` type in confusing locations
- **`no-unsafe-function-type`**: banning the built-in `Function`
- **`no-wrapper-object-types`**: banning `Object` and built-in class wrappers such as `Number`

`ban-types` itself is removed in typescript-eslint v8.

- See Announcing typescript-eslint v8 Beta for the changes.
- See Revamping the `ban-types` rule for historical context and more details on the new rules.
