---
title: "@angular-eslint/template/prefer-style-binding"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-style-binding.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-style-binding`

Suggests using [style] bindings over ngStyle where applicable

- Type: suggestion

## Rationale

For simple cases, [style] and [style.property] bindings offer a more straightforward syntax with better performance than ngStyle, and the Angular style guide recommends them over the NgStyle directive. However, ngStyle should still be used when you need mutations on objects, as style bindings compare the bound object by reference and only apply updates when a new object instance is provided. Note that ngStyle also accepts unit suffixes on object keys (for example `{ "max-width.px": width }`), which [style] object bindings do not support; express these as [style.max-width.px] bindings instead. See https://angular.dev/style-guide#prefer-class-and-style-over-ngclass-and-ngstyle and https://angular.dev/guide/templates/binding#css-class-and-style-property-bindings for more information. This rule helps identify potential simplification opportunities but should be applied judiciously based on your specific needs.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ color: textColor, 'background-color': backgroundColor }"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="styles"></div>
     ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="getStyles()"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button [ngStyle]="isActive ? activeStyles : inactiveStyles"></button>
        ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div style="margin: 0" [ngStyle]="dynamicStyles"></div>
                       ~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ color: textColor }" [style.font-weight]="'bold'"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" [ngStyle]="inputStyles" [value]="text">
                   ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<app-card [ngStyle]="cardStyles"></app-card>
          ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [ngStyle]="{ 'max-width.px': width }"></div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div bind-ngStyle="styles"></div>
     ~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="textColor"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div style="color: red"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div style="margin: 0" [style.color]="textColor"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style.color]="textColor" [style.background-color]="backgroundColor"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<section [style.height.px]="sectionHeightInPixels()"></section>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="{ color: textColor, 'background-color': backgroundColor }"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="'display: flex; padding: 8px'"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="styles"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [style]="getStyles()"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [style.display]="isExpanded() ? 'block' : 'none'">Toggle</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" [style.width.px]="inputWidth" [value]="inputValue">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [ngClass]="{ active: isActive }"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-style-binding": [
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
    "@angular-eslint/template/prefer-style-binding": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [myNgStyle]="styles"></div>
```
