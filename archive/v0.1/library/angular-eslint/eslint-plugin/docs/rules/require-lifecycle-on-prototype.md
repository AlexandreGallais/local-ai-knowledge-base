---
title: "@angular-eslint/require-lifecycle-on-prototype"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/require-lifecycle-on-prototype.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/require-lifecycle-on-prototype`

Ensures that lifecycle methods are defined on the object's prototype instead of on an instance.

- Type: problem

## Rationale

Lifecycle methods in Angular must be defined on the class prototype (using method syntax) rather than as instance properties (using arrow functions or property assignments). Angular's change detection looks for lifecycle methods on the prototype chain, and defining them as instance properties can prevent Angular from finding and invoking them correctly. This is a subtle but critical issue that can cause lifecycle hooks to silently fail. For example, if ngOnInit is defined as a class property (ngOnInit = () => {}), Angular will not call it, leading to missing initialization logic. Using standard method definitions ensures lifecycle hooks are placed on the prototype where Angular expects them.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngOnChanges = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngOnInit = func;
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngDoCheck = func;
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngAfterContentInit = func;
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngAfterContentChecked = func;
  ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngAfterViewInit = func;
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngAfterViewChecked = func;
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Component({})
class Test {
  ngOnDestroy = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngOnChanges = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngOnInit = func;
  ~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngDoCheck = func;
  ~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngAfterContentInit = func;
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngAfterContentChecked = func;
  ~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngAfterViewInit = func;
  ~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngAfterViewChecked = func;
  ~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Directive({})
class Test {
  ngOnDestroy = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Injectable({})
class Test {
  ngOnDestroy = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
@Pipe({})
class Test {
  ngOnDestroy = func;
  ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  constructor() {
    this.ngOnDestroy = func;
         ~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  constructor() {
    this['ngOnDestroy'] = func;
         ~~~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  run() {
    this.ngOnDestroy = func;
         ~~~~~~~~~~~
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function hook(component) {
  component.ngOnDestroy = func;
            ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function hook(component) {
  (component as any).ngOnDestroy = func;
                     ~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  ['ngOnDestroy'] = func;
   ~~~~~~~~~~~~~
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngAfterContentChecked() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngAfterContentInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngAfterViewChecked() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngAfterViewInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngOnChanges() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngOnDestroy() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngOnInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  ngDoCheck() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngAfterContentChecked() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngAfterContentInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngAfterViewChecked() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngAfterViewInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngOnChanges() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngOnDestroy() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngOnInit() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Directive({})
class Test {
  ngDoCheck() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Injectable({})
class Test {
  ngOnDestroy() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Pipe({})
class Test {
  ngOnDestroy() {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {}
function hook(type) {
  type.prototype.ngOnDestroy = () => {};
}
hook(Test);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {}
function hook(type) {
  (type.prototype as any).ngOnDestroy = () => {};
}
hook(Test);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {}
function hook(type) {
  type['prototype'].ngOnDestroy = () => {};
}
hook(Test);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {}
function hook(type) {
  (type.prototype as unknown as { ngOnDestroy: () => void}).ngOnDestroy = () => {};
}
hook(Test);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  onDestroy = () => {}
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  constructor() {
    this.onDestroy = () => {}
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  constructor() {
    this['onDestroy'] = () => {}
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/require-lifecycle-on-prototype": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
@Component({})
class Test {
  constructor() {
    let ngOnDestroy;
    ngOnDestroy = () => {};
  }
}
```
