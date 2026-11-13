---
title: "@angular-eslint/template/no-positive-tabindex"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-positive-tabindex.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-positive-tabindex`

Ensures that the `tabindex` attribute is not positive

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Using positive tabindex values (like tabindex="1" or tabindex="5") disrupts the natural tab order and creates a confusing navigation experience. The natural tab order follows the DOM structure, which users expect. Positive tabindex values create a complex focus order where lower numbers are focused first, then tabindex="0" elements, then remaining interactive elements. This makes the tab order unpredictable and hard to maintain. Users with motor disabilities who rely on keyboard navigation will struggle with illogical focus orders. Instead, use tabindex="0" to add elements to the natural tab order, tabindex="-1" to remove them, and structure your DOM in a logical order. This is a WCAG Level A requirement.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div tabindex="5"></div>
               ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [attr.tabindex]="21"></div>
                      ~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span id="2"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span tabindex></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span tabindex="-1"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span tabindex="0"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [attr.tabindex]="-1"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [attr.tabindex]="0"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [attr.tabindex]="tabIndex"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [attr.tabindex]="null"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [attr.tabindex]="undefined"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-positive-tabindex": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-test [tabindex]="1"></app-test>
```
