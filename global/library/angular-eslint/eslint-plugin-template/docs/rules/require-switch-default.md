---
title: "@angular-eslint/template/require-switch-default"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/require-switch-default.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/require-switch-default`

Requires a `@default` block on every `@switch` to ensure all cases are handled. This is the template equivalent of the `@typescript-eslint/switch-exhaustiveness-check` rule.

- Type: suggestion

## Rationale

A `@switch` without a `@default` silently renders nothing when the value matches none of the `@case` branches, which is rarely intended and easy to miss. Because Angular templates are not type-checked the way TypeScript code is, the linter cannot determine whether the listed cases are exhaustive over a union or enum. Requiring an explicit `@default` block ensures unhandled values are always accounted for. For genuine compile-time exhaustiveness over a union or enum, use Angular's `@default never` form, which fails the template type-check if any case is missing.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (value) {
~~~~~~~~
  @case (1) {
    one
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (value) {
~~~~~~~~
  @case (1) {
    one
  }
  @case (2) {
    two
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
@switch (outer) {
  @default {
    @switch (inner) {
    ~~~~~~~~
      @case (1) {
        one
      }
    }
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (value) {
    @case (1) {
      one
    }
    @default {
      other
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (value) {
    @default {
      other
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (value) {
    @case (1) {
      one
    }
    @default never;
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (item.kind) {
    @case ('a') {
      a
    }
    @default never(item);
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
@switch (value) {
    @case (1) {}
    @case (2) {
      one or two
    }
    @default {
      other
    }
  }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/require-switch-default": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div>{{ value }}</div>
```
