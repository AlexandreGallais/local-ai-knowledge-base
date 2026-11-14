---
title: "@angular-eslint/template/attributes-order (part 1 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/attributes-order.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/attributes-order`

Ensures that HTML attributes and Angular bindings are sorted based on an expected order

- Type: layout
- 🔧 Supports autofix (`--fix`)

## Rationale

Consistent ordering of template attributes makes templates easier to read and scan visually. When attributes are always ordered the same way across a codebase (for example: structural directives first, then template references, then inputs, then outputs), developers can quickly locate specific attributes without having to scan randomly-ordered attribute lists. This is especially valuable for elements with many attributes. The rule supports both semantic ordering (grouping by attribute type) and alphabetical sorting within groups, allowing teams to choose the organizational pattern that works best for them.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `false`
   */
  alphabetical?: boolean;
  /**
   * Default: `["STRUCTURAL_DIRECTIVE","TEMPLATE_REFERENCE","ATTRIBUTE_BINDING","INPUT_BINDING","TWO_WAY_BINDING","OUTPUT_BINDING"]`
   *
   * @minItems 6
   */
  order?: [
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    (
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    ),
    ...(
      | "STRUCTURAL_DIRECTIVE"
      | "TEMPLATE_REFERENCE"
      | "ATTRIBUTE_BINDING"
      | "INPUT_BINDING"
      | "TWO_WAY_BINDING"
      | "OUTPUT_BINDING"
    )[]
  ];
}

```
