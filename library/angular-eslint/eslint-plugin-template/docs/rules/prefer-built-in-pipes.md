---
title: "@angular-eslint/template/prefer-built-in-pipes"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/prefer-built-in-pipes.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/prefer-built-in-pipes`

Encourages the use of Angular built-in pipes (e.g. lowercase, uppercase, titlecase) instead of certain JavaScript methods in Angular templates.

- Type: suggestion

## Rationale

Angular provides built-in pipes for common string transformations (lowercase, uppercase, titlecase) that are more efficient than calling JavaScript methods directly in templates. Pipes are pure by default, meaning Angular only recalculates them when inputs change, whereas method calls in templates run on every change detection cycle. For example, {{ name.toLowerCase() }} runs toLowerCase() repeatedly during change detection, while {{ name | lowercase }} only transforms the string when name changes. Using pipes also makes templates more declarative and idiomatic. The rule can be configured to allow method calls in event handlers like (click) where purity is not a concern. By default, the rule flags toLowerCase, toUpperCase, toLocaleLowerCase, and toLocaleUpperCase, but can be extended to other methods.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Additional method names to disallow (defaults include common case/title casing helpers)
   *
   * Default: `["toLowerCase","toUpperCase","toLocaleLowerCase","toLocaleUpperCase"]`
   */
  disallowList?: string[];
  /**
   * Whether to allow these method calls inside output event handlers
   *
   * Default: `true`
   */
  allowInOutputHandlers?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ name.toLowerCase() }}
   ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ title.toUpperCase() }}
   ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ text.toLocaleLowerCase() }}
   ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ text.toLocaleUpperCase() }}
   ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div [title]="name.toLowerCase()">Content</div>
              ~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<div title="{{ name.toUpperCase() }}">Content</div>
               ~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error",
      {
        "allowInOutputHandlers": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<button (click)="handleClick(name.toLowerCase())">Click</button>
                             ~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error",
      {
        "disallowList": [
          "toUpperCase",
          "toLowerCase"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ name.toUpperCase() }}
   ~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error",
      {
        "disallowList": [
          "getFullYear"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
{{ date.getFullYear() }}
   ~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ name }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ user.name }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button (click)="handleClick(name.toLowerCase())">Click</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<button (change)="onChange(value.toUpperCase())">Change</button>
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ name | lowercase }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ name | uppercase }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ title | titlecase }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ getValue() }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ items.push(item) }}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ text.includes("test") }}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error",
      {
        "disallowList": [
          "toUpperCase"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
{{ name.toLowerCase() }}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/prefer-built-in-pipes": [
      "error",
      {
        "allowInOutputHandlers": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<button (click)="handleClick()">Click</button>
```
