---
title: "@angular-eslint/prefer-standalone"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-standalone.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/prefer-standalone`

Ensures Components, Directives and Pipes do not opt out of standalone.

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Standalone components, directives, and pipes are the recommended way to build Angular applications. Setting standalone: false opts out of the standalone API, tying your code to the older NgModule-based architecture. Standalone components simplify Angular applications by eliminating the need for NgModules in most cases, reducing boilerplate and making dependencies more explicit. Each standalone component declares its own dependencies directly, making it self-contained and easier to understand, test, and reuse. Standalone components also enable better tree-shaking and lazy loading. Angular provides comprehensive migration guides to help transition existing applications, such as https://angular.dev/reference/migrations/standalone. New projects should use standalone components from the start, and existing projects should avoid adding new non-standalone components as they will make future migrations harder. As of Angular v19, `standalone: true` is the default for components, directives, and pipes, so declaring `standalone: true` explicitly is redundant; set `allowExplicitStandalone` to `false` to have the rule flag and autofix redundant `standalone: true` declarations too.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Whether to allow a Component, Directive or Pipe to set `standalone: true` explicitly even though it is now the default.
   *
   * Default: `true`
   */
  allowExplicitStandalone?: boolean;
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ standalone: false })
             ~~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  standalone: false,
  ~~~~~~~~~~~~~~~~~
  template: '<div></div>'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({ standalone: false })
             ~~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  standalone: false,
  ~~~~~~~~~~~~~~~~~
  selector: 'x-selector'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({ standalone: false })
        ~~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({
  standalone: false,
  ~~~~~~~~~~~~~~~~~
  name: 'pipe-name'
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ standalone: false })
             ~~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ standalone: true })
             ~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ standalone: true, selector: 'app-test' })
             ~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ selector: 'app-test', standalone: true })
                                   ~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  standalone: true,
  ~~~~~~~~~~~~~~~~
  // keep this comment
  selector: 'app-test',
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({ standalone: true, selector: '[appTest]' })
             ~~~~~~~~~~~~~~~~
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({ standalone: true, name: 'testPipe' })
        ~~~~~~~~~~~~~~~~
class Test {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
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
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  standalone: true,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  standalone: true,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'test-selector',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'test-selector'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  standalone: true,
  selector: 'test-selector'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'test-selector',
  template: '<div></div>',
  styleUrls: ['./test.css']
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'test-selector',
  standalone: true,
  template: '<div></div>',
  styleUrls: ['./test.css']
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  standalone: true,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'test-selector',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'test-selector'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  standalone: true,
  selector: 'test-selector'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'test-selector',
  providers: []
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'test-selector',
  standalone: true,
  providers: []
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
abstract class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  standalone: true,
})
class Test {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error",
      {
        "allowExplicitStandalone": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'test-pipe',
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'test-pipe'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  standalone: true,
  name: 'test-pipe'
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'my-pipe',
  pure: true
})
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-standalone": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'my-pipe',
  standalone: true,
  pure: true
})
class Test {}
```
