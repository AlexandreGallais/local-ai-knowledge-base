---
title: "@angular-eslint/template/no-interpolation-in-attributes"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin-template/docs/rules/no-interpolation-in-attributes.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/template/no-interpolation-in-attributes`

Ensures that property-binding is used instead of interpolation in attributes.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Property binding syntax [attribute]="value" is more efficient and clearer than interpolation {{ value }} for setting attribute values in templates. Interpolation converts the expression to a string and then Angular parses it back, whereas property binding directly passes the value without string conversion. This makes property binding faster and avoids potential issues with type coercion. Property binding also makes it immediately obvious that the attribute value is dynamic rather than static. For substring interpolation (like alt="Image of {{ name }}"), the performance difference is minimal and interpolation may be more readable, so the rule can optionally allow these cases while still catching full interpolation patterns that should use property binding.

## Rule Options

The rule accepts an options object with the following properties:

````ts
interface Options {
  /**
   * When `true`, only attribute values that are entirely interpolations will fail, whereas values with interpolations that form part of larger strings will be allowed.
   *
   * For example, when set to `true` the following code will not fail for the `alt` attribute but will still fail for the `src` attribute:
   *
   * ```html
   * <img alt="Poke user {{ username }}" src="{{ pokeSrc }}" />
   * ```
   *
   *
   * Default: `false`
   */
  allowSubstringInterpolation?: boolean;
}

````

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" name="{{ foo }}">
                         ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" name="{{ foo }}bar">
                         ~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" attr.data-myExample="{{ foo }}">
                                        ~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error",
      {
        "allowSubstringInterpolation": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<input type="text" name="{{ foo }}bar">
                         ~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error",
      {
        "allowSubstringInterpolation": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```html
<img alt="{{username}} is online" src="{{src}}">
                                       ~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" [name]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" name="foo" [(ngModel)]="foo">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" [name]="foo + 'bar'">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<input type="text" [name]="foo | bar">
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```html
<div>{{ content }}</div>
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/template/no-interpolation-in-attributes": [
      "error",
      {
        "allowSubstringInterpolation": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```html
<img class="icon icon--{{size}}" alt="{{username}} is online" src="online.png">
```
