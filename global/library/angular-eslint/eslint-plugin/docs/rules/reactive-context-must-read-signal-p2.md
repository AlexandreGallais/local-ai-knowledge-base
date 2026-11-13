---
title: "@angular-eslint/reactive-context-must-read-signal (part 2 of 2)"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/reactive-context-must-read-signal.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# @angular-eslint/reactive-context-must-read-signal (part 2 of 2)

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const value = 42;
const c = computed(() => value * 2);
          ~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = computed(() => 42);
          ~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  name = 'x';
  c = computed(() => this.name);
      ~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  name = 'x';
  c = computed(() => {
      ~~~~~~~~~~~~~~~~
    const { name } = this;
    ~~~~~~~~~~~~~~~~~~~~~~
    return name;
    ~~~~~~~~~~~~
  });
  ~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  name = 'x';
  c = computed(() => this.name.toUpperCase());
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  items = [1, 2, 3];
  c = computed(() => this.items.filter((item) => item > 1));
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const x = 1.5;
const c = computed(() => Math.floor(x));
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = computed(() => new Date().getFullYear());
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = computed(function () {
          ~~~~~~~~~~~~~~~~~~~~~~
  return 42;
  ~~~~~~~~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = computed(() => 1, { equal: (a, b) => a === b });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = linkedSignal(() => 42);
          ~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const c = linkedSignal({ source: () => 1, computation: (s) => s + 1 });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const value = 1;
effect(() => value + 1);
~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
effect(() => {
~~~~~~~~~~~~~~
  console.log('side effect');
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
afterRenderEffect(() => 42);
~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
afterRenderEffect({
~~~~~~~~~~~~~~~~~~~
  earlyRead: () => 1,
  ~~~~~~~~~~~~~~~~~~~
  write: (value) => value + 1,
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});
~~
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error",
      {
        "checkResources": true
      }
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const r = resource({ params: () => 1, loader: () => null });
          ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const a = signal(0);
const c = computed(() => a() * 2);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const c = computed(() => a() + 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
interface WritableSignal<T> {
  (): T;
  set(value: T): void;
}
declare const a: WritableSignal<number>;
const c = computed(() => a() + 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: InputSignal<number>;
const c = computed(() => a());
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: ModelSignal<number>;
const c = computed(() => a() + 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
const c = computed(() => a().map((x) => x * 2));
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  count = signal(0);
  c = computed(() => this.count() + 1);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function helper(): number {
  return 1;
}
const c = computed(() => helper());
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Service {
  getValue(): number {
    return 1;
  }
}
class Test {
  service = new Service();
  c = computed(() => this.service.getValue());
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const c = computed(() => untracked(() => 1));
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  items = [1, 2, 3];
  transform(value: number): number {
    return value;
  }
  c = computed(() => this.items.map(this.transform));
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
declare const transform: any;
class Test {
  items = [1, 2, 3];
  c = computed(() => this.items.map(transform));
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  items = [1, 2, 3];
  transform: ((value: number) => number) | ((value: number) => string) =
    (value) => value;
  c = computed(() => this.items.map(this.transform));
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  values = [1, 2, 3];
  c = computed(() => Math.max(...this.values));
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Box {
  value = 1;
}
const c = computed(() => new Box().value);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
declare function html(
  strings: TemplateStringsArray,
  ...values: unknown[]
): string;
const outside = html`ignored`;
const c = computed(() => html`static`);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  count = signal(0);
  get double(): number {
    return this.count() * 2;
  }
  c = computed(() => this.double);
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  count = signal(0);
  get double(): number {
    return this.count() * 2;
  }
  c = computed(() => {
    const { double } = this;
    return double;
  });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class Test {
  count = signal(0);
  get double(): number {
    return this.count() * 2;
  }
  c = computed(() => {
    const { count, ...rest } = this;
    return rest;
  });
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const c = computed(() => {
  const inner = computed(() => a() * 2);
  return inner() + 1;
});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function compute(): number {
  return 1;
}
const c = computed(compute);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const c = linkedSignal(() => a() + 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const c = linkedSignal({ source: () => a(), computation: (s) => s * 2 });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const c = linkedSignal({ source: () => 1, computation: () => a() });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<string[]>;
const c = linkedSignal({ source: a, computation: (options) => options[0] });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
declare const options: { source: () => number };
const c = linkedSignal({ ...options, computation: (s) => s + 1 });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
effect(() => {
  console.log(a());
});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
afterRenderEffect(() => a() + 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
afterRenderEffect({
  earlyRead: () => 1,
  write: () => a(),
});
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const r = resource({ params: () => 1, loader: () => null });
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
declare const Test: { computed: (fn: () => unknown) => unknown };
Test.computed(() => 1);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const c = computed();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const x = computed;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
const callback = ({
  valueOf,
  toString,
  constructor,
  hasOwnProperty,
}: {
  valueOf: () => unknown;
  toString: () => unknown;
  constructor: () => unknown;
  hasOwnProperty: () => unknown;
}) => {
  valueOf();
  toString();
  constructor();
  hasOwnProperty();
};
```

---

#### Custom Config

```json
{
  "rules": {
    "@angular-eslint/reactive-context-must-read-signal": [
      "error",
      {
        "checkResources": true
      }
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
const r = resource({ params: () => a(), loader: () => null });
```
