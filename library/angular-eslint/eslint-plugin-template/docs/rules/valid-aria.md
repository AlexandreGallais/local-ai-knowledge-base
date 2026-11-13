---
title: "@angular-eslint/template/valid-aria"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/valid-aria.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/valid-aria`

[Accessibility] Ensures that correct ARIA attributes and respective values are used

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

ARIA (Accessible Rich Internet Applications) attributes must be valid and used correctly for screen readers to interpret them. Using invalid or misspelled ARIA attributes (like 'aria-labeledby' instead of 'aria-labelledby', or using ARIA attributes that don't exist) causes screen readers to ignore them, breaking accessibility. Each HTML element only supports specific ARIA attributes based on its role. Invalid ARIA is worse than no ARIA because it gives developers false confidence that they've made something accessible when they haven't. Use a reference like the ARIA specification or MDN to verify attribute names and valid usage.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div aria-roledescriptio="text">Text</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~
<input [aria-labelby]="label">
       ~~~~~~~~~~~~~~~~~~~~~~
<input [attr.aria-requiredIf]="required">
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div aria-expanded="notABoolean">notABoolean</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div aria-haspopup="notAToken">notAToken</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~
<input [attr.aria-rowcount]="{ a: 2 }">notAnInteger
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div aria-relevant="notATokenList">notATokenList</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div aria-checked="notATristate">notATristate</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div role="slider" [attr.aria-valuemin]="[1, 2]">notANumber</div>
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<input [attr.aria-placeholder]="4">notAPlaceholder
       ~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div aria-relevant="additions notAToken">Text</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div aria-dropeffect="copy notAToken">Text</div>
     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
<div aria-relevant="   ">Text</div>
     ~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input aria-labelledby="Text">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div ariaselected="0"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<textarea [attr.aria-readonly]="readonly"></textarea>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [variant]="variant">Text</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-expanded="true">aria-expanded</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-haspopup="menu">aria-haspopup</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [attr.aria-pressed]="undefined">aria-pressed</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input [attr.aria-rowcount]="2">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<table aria-rowcount="-1"></table>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-relevant="additions">additions</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-relevant="additions removals">additions removals</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-relevant="additions text">the ARIA default value</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-relevant="  additions   text  ">surrounding and repeated whitespace</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-dropeffect="copy move">copy move</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-checked="false">checked</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="slider" [attr.aria-valuemin]="1"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div role="slider" aria-valuemin="1"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-="text">Text</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input
  aria-placeholder="Placeholder"
  aria-orientation="undefined"
  [attr.aria-checked]="test && isChecked"
  [attr.aria-hidden]="'abc' | appAria"
  [attr.aria-invalid]="hasError ? 'grammar' : 'spelling'"
  [attr.aria-label]="inputSchema!.label"
  [attr.aria-live]="inputSchema['live']"
  [attr.aria-required]="inputSchema?.isRequired">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-custom aria-x="text">Text</app-custom>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-test aria-expanded="notABoolean"></app-test>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-checked="mixed">checked</div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/valid-aria": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div aria-pressed="mixed">checked</div>
```
