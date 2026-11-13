---
title: "naming-convention (part 1 of 3)"
tool: "typescript-eslint"
version: "8.72"
source: "https://github.com/typescript-eslint/typescript-eslint/blob/12e452f0292212bf9bf443b3988ec230f4ae7097/packages/eslint-plugin/docs/rules/naming-convention.mdx"
commit: "12e452f0292212bf9bf443b3988ec230f4ae7097"
license: "MIT"
---

# naming-convention

Enforcing naming conventions helps keep the codebase consistent, and reduces overhead when thinking about how to name a variable.
Additionally, a well-designed style guide can help communicate intent, such as by enforcing all private properties begin with an `_`, and all global-level constants are written in `UPPER_CASE`.

**Note:**
This rule is _feature frozen_: it will no longer receive new features such as new options.
It still will accept bug and documentation fixes for its existing area of features and to support new TypeScript versions.

Stylistic rules that enforce naming and/or sorting conventions tend to grow incomprehensibly complex as increasingly obscure features are requested.
This rule has reached the limit of what is reasonable for the typescript-eslint project to maintain.
See eslint-plugin: Feature freeze naming and sorting stylistic rules for more information.

## Examples

This rule allows you to enforce conventions for any identifier, using granular selectors to create a fine-grained style guide.

**Note:**

This rule only needs type information in specific cases, detailed below.
