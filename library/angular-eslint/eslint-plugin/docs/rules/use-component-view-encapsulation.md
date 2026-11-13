---
title: "@angular-eslint/use-component-view-encapsulation"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/use-component-view-encapsulation.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/use-component-view-encapsulation`

Disallows using `ViewEncapsulation.None`

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Setting encapsulation to ViewEncapsulation.None disables Angular's view encapsulation, making the component's styles global and affecting the entire application. This breaks component isolation and can cause unexpected styling conflicts throughout your app. When multiple components use ViewEncapsulation.None, their styles can interfere with each other in unpredictable ways, making it extremely difficult to reason about styling. A style intended for one component might accidentally affect completely unrelated components. This defeats one of Angular's key <example-value>: component style isolation. ViewEncapsulation.None is occasionally necessary for specific edge cases (like styling dynamically inserted content), but it should be avoided in normal component development. Use the default Emulated encapsulation, or ShadowDom for native Shadow DOM, to keep component styles properly isolated.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  encapsulation: ViewEncapsulation.None,
                                   ~~~~
  selector: 'app-foo-bar',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import type { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-foo-bar',
  'encapsulation': ViewEncapsulation.None
                                     ~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-foo-bar',
  ['encapsulation']: ViewEncapsulation.None
                                       ~~~~
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-foo-bar',
  [`encapsulation`]: ViewEncapsulation.None
                                       ~~~~
})
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  encapsulation: ViewEncapsulation.Emulated,
  selector: 'app-foo-bar'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  'encapsulation': ViewEncapsulation.Native,
  selector: 'app-foo-bar',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  ['encapsulation']: ViewEncapsulation.ShadowDom,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function encapsulation() {
  return ViewEncapsulation.None;
}

@Component({
  [`encapsulation`]: encapsulation()
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const encapsulation = 'templateUrl';
@Component({
  [encapsulation]: '../a.html'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const encapsulation = 'templateUrl';
@Component({
  encapsulation
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const test = 'test';
@Component({
  encapsulation: test,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  encapsulation: undefined,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-component-view-encapsulation": [
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
    "@angular-eslint/use-component-view-encapsulation": [
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
    "@angular-eslint/use-component-view-encapsulation": [
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
