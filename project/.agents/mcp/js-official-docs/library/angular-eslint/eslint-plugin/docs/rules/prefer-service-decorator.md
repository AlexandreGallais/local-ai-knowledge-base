---
title: "@angular-eslint/prefer-service-decorator"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-service-decorator.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-service-decorator`

Prefer the `@Service()` decorator over `@Injectable({ providedIn: 'root' })`

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Angular 22 introduced the `@Service()` decorator as a concise shorthand for `@Injectable({ providedIn: 'root' })`, the most common way to declare a tree-shakable, application-wide service. Using `@Service()` removes the boilerplate of the metadata object while expressing the exact same intent. Because `providedIn: 'root'` is exactly what `@Service()` implies, this migration is safe and behavior-preserving: the `providedIn: 'root'` entry is dropped, and a `useFactory` is preserved by renaming it to `@Service()`'s `factory` option. Services that rely on other provider metadata (`useClass`, `useExisting`, `useValue`, `deps`) or a different `providedIn` value (`'platform'`, `'any'`, a specific module) have no `@Service()` equivalent and are intentionally left untouched.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MyService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: `root` })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MyService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root', useFactory: () => new MyService() })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MyService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({ useFactory: () => new MyService(), providedIn: 'root' })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class MyService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Service, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class A {}

@Service()
class B {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
class MyService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
  useFactory: () => new MyService(),
})
class MyService {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
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
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: null })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: 'platform' })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: 'any' })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: SomeModule })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ useClass: TestImpl })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ useExisting: TestImpl })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ useValue: TEST_VALUE })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: 'root', useClass: TestImpl })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: 'root', useFactory: () => new Test(), deps: [Dep] })
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Service()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-service-decorator": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@CustomInjectable({ providedIn: 'root' })
class Test {}
```
