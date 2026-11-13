---
title: "import-lite/consistent-type-specifier-style"
tool: "import-lite"
version: "0.6"
source: "https://github.com/9romise/eslint-plugin-import-lite/blob/2433f46392879f8ed9a40fe427b12f33972cf17f/src/rules/consistent-type-specifier-style/README.md"
commit: "2433f46392879f8ed9a40fe427b12f33972cf17f"
license: "MIT"
---

# import-lite/consistent-type-specifier-style

Origin docs: https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/consistent-type-specifier-style.md

## Changes

- Resolve https://github.com/un-ts/eslint-plugin-import-x/issues/221.
  - Rename `prefer-top-level` to `top-level`, `prefer-inline` to `inline`.
  - Add new option `prefer-top-level`.
    - Allow `import { Foo, type Bar } from 'Foo'`.
    - Don't allow `import { type Foo } from 'Foo'`.
- Drop flow support.
