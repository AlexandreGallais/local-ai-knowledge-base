---
title: "@angular-eslint/template/table-scope"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/table-scope.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/table-scope`

[Accessibility] Ensures that the `scope` attribute is only used on the ` | ` element

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

The scope attribute on table headers ( | ) tells screen readers whether a header applies to a column or row, enabling more efficient table navigation. When screen reader users navigate table cells, the screen reader announces the associated headers. Without proper scope attributes, users must manually explore the table structure to understand what each cell represents. Use scope="col" for column headers and scope="row" for row headers. For simple tables, screen readers can often infer the scope, but explicit scope attributes ensure reliable accessibility across all screen readers.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ test }}<div scope></div>
               ~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.scope]="scope"></div><p></p>
     ~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th scope="col"></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th [scope]="'col'"></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<th [attr.scope]="scope"></th>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div Scope="col"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [appscope]="col"></button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-table scope></app-table>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/table-scope": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-row [scope]="row"></app-row>
```
