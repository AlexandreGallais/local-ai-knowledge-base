---
title: "@angular-eslint/prefer-signals (part 2 of 3)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/prefer-signals.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/prefer-signals (part 2 of 3)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal: Signal<number>;
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal: InputSignal<number>;
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal: ModelSignal<number>;
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal: WritableSignal<number>;
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = computed(() => 0);
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = linkedSignal(() => source);
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = contentChild('test');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = contentChild.required('test');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = contentChildren('test');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = input('');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = input.required('');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = model(42);
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = model.required();
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = signal(42);
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = signal(42).asReadonly();
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = toSignal(source);
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = viewChild('test');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = viewChild.required('test');
  ~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = viewChildren('test');
  ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "additionalSignalCreationFunctions": [
          "createSignal"
        ]
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = createSignal('test');
  ~~~~~~~~~~
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  testSignal = createSignal();
  ~~~~~~~~~~
}
declare function createSignal(): Signal<boolean>;
interface Signal<T> {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @Input()
  ~~~~~~~~
  value = 1;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @ViewChild('test')
  ~~~~~~~~~~~~~~~~~~
  value: Widget;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @ViewChildren('test')
  ~~~~~~~~~~~~~~~~~~~~~
  value: QueryList<Widget>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @ContentChild('test')
  ~~~~~~~~~~~~~~~~~~~~~
  value: Widget;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  @ContentChildren('test')
  ~~~~~~~~~~~~~~~~~~~~~~~~
  value: QueryList<Widget>;
}
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testSubject = new Subject();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testSubject = new ReplaySubject(1);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testValue = test();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testValue: number;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testValue: Widget<number>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal: Signal<number>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal: InputSignal<number>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal: ModelSignal<number>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal: WritableSignal<number>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = computed(() => 0);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = linkedSignal(() => source);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = contentChild('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = contentChild.required('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = contentChildren('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = input('');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = input.required();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = model();
  readonly testRequired = model.required(42);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = signal(true);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = signal(true).asReadonly();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = toSignal(source);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = viewChild('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = viewChild.required('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = viewChildren('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testSignal = createSignal('test');
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferReadonlySignalProperties": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testSignal = signal('test');
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "additionalSignalCreationFunctions": [
          "createSignal"
        ]
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = createSignal('test');
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testSignal = createSignal();
}
function createSignal(): Signal<boolean> {
  return signal(true);
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly testSignal = createSignal();
}
function createSignal(): Signal<boolean> {
  return signal(true);
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "useTypeChecking": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  testNotSignal = createNotSignal();
}
function createNotSignal(): NotSignal<boolean> {
  return true;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly value = input();
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferInputSignals": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @Input()
  readonly value = 1;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly query = viewChild('test');
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferQuerySignals": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @ViewChild('test')
  value: Widget;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly query = viewChildren('test');
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferQuerySignals": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @ViewChildren('test')
  value: QueryList<Widget>;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly query = contentChild('test');
}
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error",
      {
        "preferQuerySignals": false
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  @ContentChild('test')
  value: Widget;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/prefer-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  readonly query = contentChildren('test');
}
```

---

#### Custom Config
