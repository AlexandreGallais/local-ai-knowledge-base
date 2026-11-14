---
title: "@angular-eslint/runtime-localize"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/runtime-localize.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/runtime-localize`

Ensures that $localize tagged messages can use runtime-loaded translations.

- Type: suggestion

## Rationale

Using $localize at the top level of a module (outside of functions or methods) means the localization happens immediately when the module loads, before runtime translation data can be loaded. This creates a timing problem - the string gets localized using whatever translations are available at module load time (typically none), and the translated value is frozen. Even if you load translations later, these top-level $localize calls won't use them. Instead, $localize should be called inside functions, methods, or non-static class properties so it executes after translations are loaded. This ensures the runtime-loaded translations are actually used. For top-level strings that need localization, initialize them in a function called after translations load, or use them within component templates where Angular handles the timing correctly.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const foo = $localize`foo`;
            ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let foo = {
  x: [{
    y: `--${$localize`foo`}--`
            ~~~~~~~~~
  }]
};
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
(x => { return x; })($localize`foo`);
                     ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  static foo = $localize`foo`;
               ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  static foo = {
    x: [{
      y: `--${$localize`foo`}--`
              ~~~~~~~~~
    }]
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function test() { return $localize`foo`; }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const test = function () { return $localize`foo`; }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const test = () => $localize`foo`;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function test(foo = $localize`foo`) { return foo; }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  foo() { $localize`foo`; }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  foo = () => $localize`foo`;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  static foo = () => $localize`foo`;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly foo = $localize`foo`;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/runtime-localize": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly foo = { x: [`--${$localize`foo`}--`] };
}
```
