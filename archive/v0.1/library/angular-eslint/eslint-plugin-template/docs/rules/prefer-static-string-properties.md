---
title: "@angular-eslint/template/prefer-static-string-properties"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-static-string-properties.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-static-string-properties`

Ensures that static string values use property assignment instead of property binding.

- Type: layout
- 🔧 Supports autofix (`--fix`)

## Rationale

When binding a static string literal to a property, using attribute syntax (property="value") is more efficient and simpler than property binding syntax ([property]="'value'"). Property binding with a static string creates unnecessary overhead because Angular evaluates it as an expression during change detection, even though the value never changes. Attribute syntax makes it immediately clear that the value is static and will never be updated. For example, [alt]="'Profile image'" should be alt="Profile image". This rule helps identify performance opportunities and makes templates more readable by distinguishing truly dynamic bindings from static values. The rule excludes animation bindings (@xxx), style/class sub-properties (style.color), and structural directives (*ngIf) where property binding syntax is required.

The rule automatically excludes certain property-only DOM APIs (innerHTML, innerText, outerHTML, textContent) because these properties behave differently than their attribute counterparts. For example, textContent as a property does not HTML-encode its value, while textContent as an attribute does. Converting [textContent]="''" to textContent="" would change the behavior and potentially break functionality. You can also configure additional properties to ignore using the ignore option.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * An array of property names that should be ignored by this rule
   */
  ignore?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]="'foo'"/>
              ~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]="   'foo'   "/>
              ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]=' "foo" '/>
              ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]="'say &quot;hi&quot;'"/>
              ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]='"it&apos;s"'/>
              ~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<my-component [name]="'a &amp;quot; b'"/>
              ~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<code [highlightAuto]="'<ng-template #ref=&quot;poly&quot;>x</ng-template>'"></code>
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [name]="foo"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [name]="42"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [name]="true"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [name]="null"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [name]="undefined"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component name="foo"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component *name="'foo'"/>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input *ngSwitchCase="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<ng-container *ngIf="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [style.color]="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [attr.aria-label]="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [class.foo]="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [@fade]="'foo'" />
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<code [textContent]="'<I>'"></code>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [innerHTML]="'<strong>text</strong>'"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<span [innerText]="'text'"></span>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [outerHTML]="'<p>text</p>'"></div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-static-string-properties": [
      "error",
      {
        "ignore": [
          "customProp"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<my-component [customProp]="'value'"/>
```
