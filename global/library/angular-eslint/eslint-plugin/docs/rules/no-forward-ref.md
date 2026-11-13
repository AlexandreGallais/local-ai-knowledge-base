---
title: "@angular-eslint/no-forward-ref"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-forward-ref.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-forward-ref`

Disallows usage of `forwardRef` references for DI

- Type: suggestion

## Rationale

The forwardRef() function is a workaround for circular dependencies in Angular's dependency injection system, but it obscures the dependency graph and can make code harder to understand and maintain. When forwardRef() is used, it's often a sign of poor architecture, such as circular dependencies between components or services that could be resolved through better abstraction. Modern Angular and TypeScript have reduced the need for forwardRef() in most cases. Instead, consider restructuring your code to eliminate circular dependencies, using interfaces for dependency injection, or moving shared logic into a separate service.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-forward-ref": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  selector: 'test',
  template: ''
})
export class Test {
  constructor(@Inject(forwardRef(() => TestService)) testService) {}
                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
export class TestService {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-forward-ref": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({
  providers: [
    {
      multi: true,
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagsValueAccessor)
                   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    }
  ],
  selector: '[tags]',
})
export class TagsValueAccessor {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-forward-ref": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const TAGS_VALUE_ACCESSOR: StaticProvider = {
  multi: true,
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagsValueAccessor)
               ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
};
@Directive({
  providers: [TAGS_VALUE_ACCESSOR],
  selector: '[tags]'
})
export class TagsValueAccessor {}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-forward-ref": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({
  selector: 'test',
  template: ''
})
export class Test {
  constructor() {
    this.test();
  }

  test() {}
}
```
