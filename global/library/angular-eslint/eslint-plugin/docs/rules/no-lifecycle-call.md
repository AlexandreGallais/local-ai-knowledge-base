---
title: "@angular-eslint/no-lifecycle-call"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-lifecycle-call.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-lifecycle-call`

Disallows explicit calls to lifecycle methods

- Type: suggestion

## Rationale

Lifecycle hooks like ngOnInit(), ngOnDestroy(), and ngOnChanges() are designed to be called automatically by Angular at the appropriate times in a component's lifecycle. Calling them manually (e.g., 'this.ngOnInit()') breaks Angular's lifecycle management, can cause hooks to run multiple times or in the wrong order, and makes the code's execution flow harder to understand. The only exception is calling super.ngOnInit() in a derived class to ensure the parent class's initialization runs. If you need to share initialization logic, extract it into a separate method that both ngOnInit() and your other code can call.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  test(): void {
    this.ngAfterContentChecked();
    ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  test(): void {
    this.ngAfterContentInit();
    ~~~~~~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  test(): void {
    this.ngAfterViewChecked();
    ~~~~~~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  test(): void {
    this.ngAfterViewInit();
    ~~~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe()
class Test {
  test(): void {
    this.ngDoBootstrap();
    ~~~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  test(): void {
    this.ngDoCheck();
    ~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class Test {
  test(): void {
    this.ngOnChanges();
    ~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  test(): void {
    this.ngOnDestroy();
    ~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test {
  test(): void {
    this.ngOnInit();
    ~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  test(): void {
    this.ngOnDestroy();
    ~~~~~~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({ template: '' })
class Test extends ParentComponent {
  test(): void {
    super.ngOnChanges();
    ~~~~~~~~~~~~~~~~~~~
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-lifecycle-call": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component()
class Test {
  ngAfterContentChecked(): void {
    super.ngAfterContentChecked();
  }
}

@Directive()
class Test {
  test(): void {
    this.ngAfterContentChecked1();
    this.angAfterContentInit();
    this.ngAfterViewChecked2();
    this.ngAfterViewInit3();
    this.ngOnChange$();
    this.ngOnDestroyx();
    this.ngOnInitialize();
    this.ngDoChecking();
    ngOnInit();
  }
}

@MyDecorator()
class Test {
  test(): void {
    ngDoCheck();
  }
}

ngOnDestroy();
```
