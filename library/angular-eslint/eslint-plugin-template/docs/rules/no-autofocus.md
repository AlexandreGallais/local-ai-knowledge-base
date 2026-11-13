---
title: "@angular-eslint/template/no-autofocus"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-autofocus.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-autofocus`

[Accessibility] Ensures that the `autofocus` attribute is not used

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

The autofocus attribute automatically moves focus to an element when the page loads, which can be disorienting and problematic for accessibility. For screen reader users, autofocus disrupts their normal navigation flow and can cause them to miss important page content. For users with motor disabilities, unexpected focus changes can be confusing. For users with cognitive disabilities, the auto-focused element might grab attention before they've had a chance to understand the page structure. Additionally, autofocus can interfere with browser features like scroll restoration. If focus management is needed, implement it through Angular lifecycle hooks with proper context awareness rather than using the autofocus attribute.

However, there is an important exception: Using autofocus on elements within <dialog> elements (or on the dialog itself) is actually recommended for accessibility. According to MDN, the autofocus attribute should be added to the element the user is expected to interact with immediately upon opening a modal dialog. If no other element involves more immediate interaction, it is recommended to add autofocus to the close button inside the dialog, or the dialog itself. This rule automatically allows autofocus when used within dialog elements.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button autofocus>Click me!</button>
        ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input [attr.autofocus]="false">
       ~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<app-test [autofocus]="true"></app-test>
<select autofocus></select>
        ~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
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
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<textarea autoFocus></textarea>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div [autoFocus]="true"></div>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button [appautofocus]="false">Click me!</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-drag-drop autofocus></app-drag-drop>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<app-textarea [autofocus]="false"></app-textarea>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog autofocus></dialog>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog><button autofocus>Close</button></dialog>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog><form><input autofocus type="text"></form></dialog>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog [attr.autofocus]="true"></dialog>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog><button [attr.autofocus]="true">Close</button></dialog>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-autofocus": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<dialog><div><button autofocus>Action</button></div></dialog>
```
