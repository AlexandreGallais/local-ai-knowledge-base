---
title: "@angular-eslint/prefer-on-push-component-change-detection"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-on-push-component-change-detection.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-on-push-component-change-detection`

Ensures components do not opt out of the default `ChangeDetectionStrategy.OnPush` change detection strategy

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

As of Angular v22, `ChangeDetectionStrategy.OnPush` is the default change detection strategy: a component that does not specify `changeDetection` is checked using OnPush. This brings new code in line with zoneless being the default and with Angular's goal of performance by default, and means it is no longer necessary to set `ChangeDetectionStrategy.OnPush` explicitly. The previous default, `ChangeDetectionStrategy.Default`, has been renamed to `ChangeDetectionStrategy.Eager`. When you run `ng update`, the v22 migration adds an explicit `ChangeDetectionStrategy.Eager` to existing components that relied on the old implicit default, so that they keep behaving as before.

By default the rule reports components that explicitly opt out of OnPush by setting `changeDetection` to `ChangeDetectionStrategy.Eager` (or the deprecated `ChangeDetectionStrategy.Default`) — including the components the migration marked as `Eager` — so you can review them and adopt OnPush where it is safe to do so. Because omitting `changeDetection` already gives you OnPush, declaring `ChangeDetectionStrategy.OnPush` explicitly is redundant; set `allowExplicitOnPush` to `false` to have the rule flag and autofix that too. Note that switching a component from eager checking to OnPush can change its runtime behaviour, so apply the suggestion deliberately and make sure the component uses immutable data patterns (creating new object references when data changes).

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Whether to allow a component to set `changeDetection: ChangeDetectionStrategy.OnPush` explicitly even though it is now the default.
   *
   * Default: `true`
   */
  allowExplicitOnPush?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.Eager })
                                                      ~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.Default })
                                                      ~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ 'changeDetection': ChangeDetectionStrategy.Eager })
                                                        ~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ ['changeDetection']: ChangeDetectionStrategy.Eager })
                                                          ~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ [`changeDetection`]: ChangeDetectionStrategy.Eager })
                                                          ~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.Eager, selector: 'app-test' })
                                                      ~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ selector: 'app-test', changeDetection: ChangeDetectionStrategy.Eager })
                                                                            ~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.Eager })
                                                      ~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
                                                      ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ 'changeDetection': ChangeDetectionStrategy.OnPush })
                                                        ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ [`changeDetection`]: ChangeDetectionStrategy.OnPush })
                                                          ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ changeDetection: ChangeDetectionStrategy.OnPush, selector: 'app-test' })
                                                      ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({ selector: 'app-test', changeDetection: ChangeDetectionStrategy.OnPush })
                                                                            ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ changeDetection: ChangeDetectionStrategy.OnPush })
                                                      ~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ChangeDetectionStrategy } from '@angular/core';
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
                                           ~~~~~~
  // keep this comment
  selector: 'app-test',
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const options = {};
@Component(options)
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({ selector: 'app-test' })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({ changeDetection: undefined })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error",
      {
        "allowExplicitOnPush": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  [`changeDetection`]: ChangeDetectionStrategy.OnPush,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  'changeDetection': changeDetection,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const changeDetection = ChangeDetectionStrategy.Default;
@Component({
  changeDetection,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function changeDetection() {
  return ChangeDetectionStrategy.OnPush;
}

@Component({
  ['changeDetection']: changeDetection(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-on-push-component-change-detection": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@NgModule({
  bootstrap: [Foo]
})
class Test {}
```
