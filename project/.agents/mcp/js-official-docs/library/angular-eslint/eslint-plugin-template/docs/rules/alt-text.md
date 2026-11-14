---
title: "@angular-eslint/template/alt-text"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/alt-text.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/alt-text`

[Accessibility] Enforces alternate text for elements which require the alt, aria-label, aria-labelledby attributes.

- Type: suggestion

## Rationale

Images, area elements, and input buttons must have alternative text for accessibility. Screen readers used by blind and visually impaired users rely on alt text to describe images. Without alt text, these users miss important content and context. Decorative images should have an empty alt attribute (alt="") to signal they can be safely ignored by screen readers. Meaningful images require descriptive alt text that conveys the image's content and purpose. This is a WCAG Level A requirement, meaning it's a basic <example-value> standard.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<ng-template>
  <div>
    <img src="foo">
    ~~~~~~~~~~~~~~~
  </div>
</ng-template>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<object></object>
~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<area />
~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="image">
~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [type]="'image'">
~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" alt="Foo eating a sandwich.">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" [attr.alt]="altText">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" [attr.alt]="'Alt Text'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<img src="foo" alt="">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object aria-label="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object aria-labelledby="id1">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object>Meaningful description</object>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object title="An object">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object aria-label="foo" id="bar"></object>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area aria-label="foo" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area aria-labelledby="id1" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area alt="This is descriptive!" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area alt="desc" href="path">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" alt="This is descriptive!">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" aria-label="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="image" aria-labelledby="id1">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object [title]="title" [other]="val"></object>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<object [attr.aria-label]="desc" [custom]="x"></object>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area [alt]="altText" [id]="itemId">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/alt-text": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<area [attr.aria-label]="label" [prop]="p">
```
