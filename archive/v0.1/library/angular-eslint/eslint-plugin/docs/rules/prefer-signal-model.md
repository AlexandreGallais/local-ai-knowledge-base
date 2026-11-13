---
title: "@angular-eslint/prefer-signal-model"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-signal-model.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-signal-model`

Use `model` instead of `input` and `output` for two-way bindings

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

The model() function is Angular's modern API for two-way bindings, combining both input and output into a single signal. When you have an input property paired with an output property that follows the naming pattern of `propertyChange` (e.g., `enabled` input with `enabledChange` output), this is the traditional pattern for two-way binding. The model() function provides a cleaner, more concise way to express this pattern with better type safety and integration with Angular's signal ecosystem. It eliminates the boilerplate of managing separate input and output properties while maintaining the same two-way binding functionality.

Because `model()` exposes a single type for both directions, only pairs whose `input` and `output` types match are reported. By default the written type arguments are compared as text, and a pair is assumed compatible when either side has no type argument. Enabling the `useTypeChecking` option compares the types semantically instead, and infers an `input`'s type from its initial value, so `input('')` paired with `output<number>()` is left alone. A type argument that does not resolve falls back to the text comparison.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `false`
   */
  useTypeChecking?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output();
  readonly test = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~
  readonly testChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly otherProp = input();
  readonly valueChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly count = input<number>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly countChange = output<number>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input<string | null>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly valueChange = output<null | string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabledChange = output();
  readonly enabled = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { model, input, output } from '@angular/core';

class Test {
  readonly enabled = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input(false, { transform: booleanAttribute });
  readonly enabledChange = output<boolean>();
  readonly count = input(0);
  ~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly countChange = output<number>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly style = input({ transform: 'scale(2)' });
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly styleChange = output<object>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input.required<string>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly valueChange = output<string>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input<{ id: string }>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly valueChange = output<{ id: string }>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input('');
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly valueChange = output<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly input = input<string>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly inputChange = output<string>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly value = input<Foo>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly valueChange = output<Foo>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input<boolean>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output<boolean>();

  toggle(): void {
    this.enabledChange.emit(true);
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  readonly enabled = input<boolean>();
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  readonly enabledChange = output<boolean>();

  forward(): unknown {
    return this.enabledChange;
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly enabled = model();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly enabled = model<boolean>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly enabled = input();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly enabledChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly enabled = input();
  readonly onChange = output();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { booleanAttribute } from '@angular/core';
class Test {
  readonly enabled = input(false, { transform: booleanAttribute });
  readonly enabledChange = output<boolean>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { numberAttribute } from '@angular/core';
class Test {
  readonly count = input(0, { transform: numberAttribute });
  readonly countChange = output<number>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { booleanAttribute } from '@angular/core';
class Test {
  readonly enabled = input(false, { ...base, 'transform': booleanAttribute });
  readonly enabledChange = output<boolean>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input<string>();
  readonly valueChange = output<number>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input<string | null>();
  readonly valueChange = output<string>();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input.required<string>();
  readonly valueChange = output<number>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input<string>();
  readonly valueChange = output<number>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input<string | null>();
  readonly valueChange = output<string>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input<Foo>();
  readonly valueChange = output<Bar>();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signal-model": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input('');
  readonly valueChange = output<number>();
}
```
