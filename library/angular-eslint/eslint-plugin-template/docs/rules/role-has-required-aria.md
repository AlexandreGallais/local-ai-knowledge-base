---
title: "@angular-eslint/template/role-has-required-aria"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/role-has-required-aria.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/role-has-required-aria`

[Accessibility] Ensures elements with ARIA roles have all required properties for that role.

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

ARIA roles define what an element is and how it should behave for assistive technologies, but many roles require specific ARIA properties to be meaningful and functional. For example, a role="slider" must have aria-valuemin, aria-valuemax, and aria-valuenow to communicate its state to screen readers. Without these required properties, the role is incomplete and may confuse or mislead users of assistive technologies. The ARIA specification defines which properties are required for each role, and this rule enforces those requirements based on the official aria-query library. Ensuring required ARIA properties are present is critical for making interactive elements accessible. This is a WCAG Level A requirement for proper ARIA implementation.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div role="combobox"></div>
     ~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span role="checkbox" aria-checked="false"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="checkbox" role="switch">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span role="heading" aria-level="5"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span role="button"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-component [role]="ADMIN"></app-component>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<summary (click)="onClick()">Foo</summary>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/role-has-required-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<summary (click)="onClick()" aria-expanded="false">Bar</summary>
```
