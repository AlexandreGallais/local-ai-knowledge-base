---
title: "@angular-eslint/template/prefer-ngsrc"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-ngsrc.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-ngsrc`

Ensures ngSrc is used instead of src for img elements

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

The ngSrc directive (part of Angular's Image directive introduced in v15) provides significant performance and user experience benefits over the standard src attribute for images. Using ngSrc enables automatic lazy loading, responsive images with srcset generation, optimized loading priority hints, prevention of layout shift by enforcing width and height attributes, and automatic image optimization when using an image loader. These features dramatically improve Largest Contentful Paint (LCP) and other Core Web Vitals metrics. The directive also provides warnings for common mistakes like missing width/height. The rule allows data: URIs with src since those are inline base64 images that don't benefit from ngSrc optimizations. For best performance and user experience, all external images should use ngSrc.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img src="http://localhost">
     ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img src="http://src.com">
     ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="'http://localhost'">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="value">
     ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [attr.src]="value">
     ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [attr.src]="'http://localhost'">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="'http://' + value">
     ~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img ngSrc="http://localhost" src="http://localhost">
                              ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img ngSrc="http://src.com" src="http://src.com">
                            ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img ngSrc="http://localhost" [src]="'http://localhost'">
                              ~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img ngSrc="http://localhost" [src]="value">
                              ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [ngSrc]="otherValue" src="http://localhost">
                          ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [ngSrc]="otherValue" [src]="'http://localhost'">
                          ~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [ngSrc]="otherValue" [src]="value">
                          ~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="otherValue" [ngSrc]="value">
     ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img src="data:image/png;base64" [ngSrc]="otherValue">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [attr.src]="'data:image/png;base64'" [ngSrc]="otherValue">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="'data:image/png;base64'" [ngSrc]="otherValue">
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img [src]="'data:' + value" [ngSrc]="otherValue">
     ~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img
  src="http://localhost">
  ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img
  [src]="value"
  ~~~~~~~~~~~~~
  alt="test">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img
  [attr.src]="value"
  ~~~~~~~~~~~~~~~~~~
  width="100">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img
  ngSrc="http://localhost"
  src="http://localhost">
  ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img
  [ngSrc]="otherValue"
  [src]="value"
  ~~~~~~~~~~~~~
  alt="test">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img alt="test"
  [src]="value"
  ~~~~~~~~~~~~~
>
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img alt="nothing">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img ngSrc="http://localhost">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [ngSrc]="'http://localhost'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [ngSrc]="value">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="data:image/jpeg;base64">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [src]="'data:image/jpeg;base64'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [src]="'data:' + value">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [attr.src]="'data:image/jpeg;base64'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-ngsrc": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img [attr.src]="'data:' + value">
```
