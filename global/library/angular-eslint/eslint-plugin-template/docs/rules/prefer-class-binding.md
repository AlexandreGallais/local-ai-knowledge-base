---
title: "@angular-eslint/template/prefer-class-binding"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-class-binding.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-class-binding`

Suggests using [class] bindings over ngClass where applicable

- Type: suggestion

## Rationale

For simple cases, [class] bindings offer a more straightforward syntax with better performance than ngClass. However, ngClass should still be used when you need: (1) space-separated class names in a single key, or (2) mutations on objects, as class bindings do not support these use cases (the reference must change for class bindings to detect updates). See https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings for more information. This rule helps identify potential simplification opportunities but should be applied judiciously based on your specific needs.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngClass]="className"></div>
     ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngClass]="getClasses()"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button [ngClass]="isActive ? 'active' : 'inactive'"></button>
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div class="static" [ngClass]="dynamicClass"></div>
                    ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" [ngClass]="inputClass" [value]="text">
                   ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngClass]="['class1', 'class2']"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngClass]="{ active: true, disabled: false }"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [class.active]="isActive"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div class="static-class"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div class="static" [class.active]="isActive"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [class.active]="isActive" [class.disabled]="isDisabled"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [class.active]="isActive && !isDisabled">Click</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" [class.error]="hasError" [value]="inputValue">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngClass]="{'btn btn-primary': isPrimary}"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngClass]="{'alert alert-danger': hasError, 'alert-success': !hasError}"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [ngClass]="{'btn btn-lg btn-block': isLarge}">Submit</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-class-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngClass]="{'btn btn-primary': isPrimary, 'active': isActive}"></div>
```
