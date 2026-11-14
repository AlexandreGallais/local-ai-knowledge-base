---
title: "@angular-eslint/use-injectable-provided-in"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/use-injectable-provided-in.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/use-injectable-provided-in`

Using the `providedIn` property makes `Injectables` tree-shakable

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Using 'providedIn' in the @Injectable() decorator (like '@Injectable({ providedIn: "root" })') enables tree-shaking, which means Angular can remove the service from your production bundle if it's never actually used. Without 'providedIn', services must be registered in a module's providers array, and Angular must include them in the bundle even if they're unused. This can significantly increase bundle size. Additionally, 'providedIn' makes services easier to use (no need to add them to module providers) and makes circular dependencies less likely. The 'providedIn' syntax is the modern, recommended way to provide services. Angular treats 'providedIn: null' as equivalent to omitting the property, so it is flagged by default. Set 'allowProvidedInNull' to true if you need to permit this pattern.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  ignoreClassNamePattern?: string;
  /**
   * Default: `false`
   */
  allowProvidedInNull?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({})
~~~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const providedIn = 'anotherProperty';
@Injectable({ [providedIn]: [] })
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({ providedIn: null })
                          ~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({ ['providedIn']: undefined })
                              ~~~~~~~~~
class Test {}

@Injectable()
class HttpPostInterceptor implements HttpInterceptor {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error",
      {
        "ignoreClassNamePattern": "/(Effects|NgModule)$/"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({ ['providedIn']: undefined })
                              ~~~~~~~~~
class Test {}

@Injectable()
class ProvidedInNgModule {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error",
      {
        "ignoreClassNamePattern": "/(Effects|NgModule)$/"
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({ [`providedIn`]: undefined })
                              ~~~~~~~~~
class Test {}

@Injectable()
class TestEffects {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
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
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const options = {};
@Injectable(options)
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({
  providedIn: `any`,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({
  'providedIn': 'root',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({
  ['providedIn']: SomeModule,
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({
  [`providedIn`]: providedIn(),
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test implements HttpInterceptor {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class Test implements ng.HttpInterceptor {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error",
      {
        "ignoreClassNamePattern": "/Effects$/"
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class TestEffects {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@CustomInjectable()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
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

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/use-injectable-provided-in": [
      "error",
      {
        "allowProvidedInNull": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({ providedIn: null })
class Test {}
```
