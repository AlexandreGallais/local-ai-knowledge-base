---
title: "@angular-eslint/use-lifecycle-interface"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/use-lifecycle-interface.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/use-lifecycle-interface`

Ensures that classes implement lifecycle interfaces corresponding to the declared lifecycle methods. See more at https://angular.dev/style-guide#use-lifecycle-hook-interfaces

- Type: suggestion
- 🔧 Supports autofix (`--fix`)

## Rationale

Implementing lifecycle interfaces (like OnInit, OnDestroy, AfterViewInit) provides TypeScript compile-time checking to ensure you've spelled the lifecycle method names correctly and used the right method signatures. For example, if you typo 'ngOnInit' as 'ngOninit', TypeScript will catch this error if your class implements OnInit. The interfaces also serve as self-documentation, making it immediately clear which lifecycle hooks a component uses. While Angular will still call correctly-named lifecycle methods even without the interface, using the interface leverages TypeScript's type safety to catch errors earlier in development.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test {
  ngOnInit() {
  ~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { OnInit } from '@angular/core';

        @Directive()
        class Test extends Component implements OnInit {
          ngOnInit() {}

          ngOnDestroy() {
          ~~~~~~~~~~~
          }
        }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test {
  ngDoBootstrap() {}
  ~~~~~~~~~~~~~

  ngOnInit() {}
  ~~~~~~~~

  ngOnDestroy() {}
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test extends Component implements ng.OnInit {
  ngOnInit() {}

  ngOnDestroy() {
  ~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@NgModule()
class Test extends Component {
  ngOnInit() {
  ~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive()
class FoobarBase implements OnDestroy {
  ngOnDestroy(): void {
    /* some base logic here */
  }
}

@Component()
class FoobarComponent extends FoobarBase {
  ngOnDestroy(): void {
  ~~~~~~~~~~~
    super.ngOnDestroy();
    /* some concrete logic here */
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Service()
class Test {
  ngOnDestroy() {
  ~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component()
class Test<T> {
  ngOnInit() {
  ~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable()
class Test<A, B extends C = D> {
  ngOnInit() {
  ~~~~~~~~
  }
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test implements OnInit {
  ngOnInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test implements DoBootstrap {
      ngDoBootstrap() {}
    }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test extends Component implements OnInit, OnDestroy  {
  ngOnInit() {}

  private ngOnChanges = '';

  ngOnDestroy() {}

  ngOnSmth() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test extends Component implements ng.OnInit, ng.OnDestroy  {
  ngOnInit() {}

  private ngOnChanges = '';

  ngOnDestroy() {}

  ngOnSmth() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
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
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class FoobarBase implements OnDestroy {
  ngOnDestroy(): void {
    /* some base logic here */
  }
}

@Component()
class FoobarComponent extends FoobarBase {
  override ngOnDestroy(): void {
    super.ngOnDestroy();
    /* some concrete logic here */
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class BaseClass {
  ngOnInit(): void {
    /* base initialization */
  }
}

@Component()
class DerivedComponent extends BaseClass {
  override ngOnInit(): void {
    super.ngOnInit();
    /* derived initialization */
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/use-lifecycle-interface": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive()
class BaseDirective implements OnInit {
  ngOnInit(): void {
    /* base initialization */
  }
}

@Component()
class DerivedComponent extends BaseDirective {
  override ngOnInit(): void {
    super.ngOnInit();
    /* derived initialization */
  }
}
```
