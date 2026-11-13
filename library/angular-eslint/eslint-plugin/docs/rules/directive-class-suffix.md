---
title: "@angular-eslint/directive-class-suffix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/directive-class-suffix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/directive-class-suffix`

Classes decorated with @Directive must have suffix "Directive" (or custom) in their name. Note: As of v20, this is no longer recommended by the Angular Team.

- Type: suggestion

## Rationale

Historically, appending 'Directive' to directive class names was recommended to distinguish directives from other classes. However, as of Angular v20, the Angular Team no longer recommends this convention, favoring simpler class names. This rule remains available for teams that have established this naming pattern and wish to maintain consistency in their existing codebase.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `["Directive"]`
   */
  suffixes?: string[];
}

```

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'sg-foo-bar'
})
class Test {}
      ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'sg-foo-bar'
})
class TestDirectivePage implements AsyncValidator {}
      ~~~~~~~~~~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error",
      {
        "suffixes": [
          "Page"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestPageDirective {}
      ~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestDirective {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestValidator implements Validator {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestValidator implements AsyncValidator {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class Test {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'sg-bar-foo'
})
class TestComponent {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'sgPipe'
})
class TestPipe {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable()
class TestService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class TestEmpty {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error",
      {
        "suffixes": [
          "Dir"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestDir {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/directive-class-suffix": [
      "error",
      {
        "suffixes": [
          "Page",
          "View"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: 'sgBarFoo'
})
class TestPage {}
```
