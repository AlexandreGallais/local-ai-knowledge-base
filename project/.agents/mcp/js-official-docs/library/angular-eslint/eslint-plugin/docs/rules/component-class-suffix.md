---
title: "@angular-eslint/component-class-suffix"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/component-class-suffix.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/component-class-suffix`

Classes decorated with @Component must have suffix "Component" (or custom) in their name. Note: As of v20, this is no longer recommended by the Angular Team.

- Type: suggestion

## Rationale

Historically, appending 'Component' to component class names was recommended to make component files easily identifiable. However, as of Angular v20, the Angular Team no longer recommends this convention, favoring simpler class names. This rule remains available for teams that have established this naming pattern and wish to maintain consistency in their existing codebase.

## Rule Options

The rule accepts an options object with the following properties:

```ts
interface Options {
  /**
   * Default: `["Component"]`
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
    "@angular-eslint/component-class-suffix": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'sg-foo-bar'
})
class Test {}
      ~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
      "error",
      {
        "suffixes": [
          "Component",
          "View"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'sgBarFoo'
})
class TestPage {}
      ~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
      "error",
      {
        "suffixes": [
          "Component"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'sgBarFoo'
})
class TestPage {}
      ~~~~~~~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
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
@Component({
  selector: 'sgBarFoo'
})
class TestDirective {}
      ~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'sg-foo-bar',
  template: '<foo-bar [foo]="bar">{{baz + 42}}</foo-bar>'
})
class TestComponent {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({
  selector: '[myHighlight]'
})
class TestDirective {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({
  name: 'sg-test-pipe'
})
class TestPipe {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
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
    "@angular-eslint/component-class-suffix": [
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
    "@angular-eslint/component-class-suffix": [
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

#### ✅ Valid Code

```ts
@Component({
  selector: 'sgBarFoo'
})
class TestPage {}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/component-class-suffix": [
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
@Component({
  selector: 'sgBarFoo'
})
class TestPage {}
```
