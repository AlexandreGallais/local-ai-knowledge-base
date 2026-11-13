---
title: "@angular-eslint/no-uncalled-signals"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-uncalled-signals.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-uncalled-signals`

Warns user about unintentionally doing logic on the signal, rather than the signal's value

- Type: suggestion

- 💡 Provides suggestions on how to fix issues (https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions)

## Rationale

Angular signals are functions that must be called to retrieve their value. A common mistake, especially for developers new to signals, is to use the signal itself in conditional or logical expressions without calling it first. For example, 'if (mySignal)' checks if the signal function exists (which is always true), not whether the signal's value is truthy. You need 'if (mySignal())' to check the value. This bug is easy to make because signals look like regular properties but behave like functions. The mistake leads to logic errors where conditions always evaluate incorrectly. This rule catches these mistakes by detecting when signals are used in conditionals, comparisons, or logical operations without being called.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
let b = a ? 1 : 2;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
do {} while (a);
             ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
for (let i = 0; a; i++) { }
                ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function test(): boolean {
  let a: Signal<boolean>;

  return !a;
          ~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
const flag = !a;
              ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
if (a) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
switch (true) {
  case a:
       ~
    break;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
while (a) {}
       ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<boolean>;
if (!a) { }
     ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number>;
if (a === 1) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number>;
if (1 === a) { }
          ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number>;
let b = a || 1;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number>;
let b = 1 || a;
             ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number>;
let b = 1 || 2 || 3 || a || 4 || 5;
                       ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
function getSignal(): Signal<number> { }
if (getSignal()) { }
    ~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: { b: { c: { d: { e: Signal<number>; } } } }
if (a.b.c.d.e) { }
    ~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: InputSignal<boolean>;
if (a) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: InputSignalWithTransform<boolean, boolean | string>;
if (a) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: ModelSignal<boolean>;
if (a) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: WritableSignal<boolean>;
if (a) { }
    ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number[]>;
let b = a.arguments;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number[]>;
let b = a.caller;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number[]>;
let b = a.length;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number[]>;
let b = a.name;
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
let a: Signal<number[]>;
let b = a.toString();
        ~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a = 1;
if (a) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a = true;
if (!a) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
let b = a() ? 1 : 2;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
do {} while (a());
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
for (let i = 0; a(); i++) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
for (;;) { } // Tests for loop without 'test' node.
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (a()) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
switch (true) {
  case a():
    break;
  default: // Tests switch case without 'test' node.
    break;
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
while (a()) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (!a()) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (a() || true) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (a() == "hello") { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (false || (a() ?? true)) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
if (false) {
  a
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean> | null;
if (a) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean> | undefined;
if (a) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean> | NonSignal;
if (a) { }
interface NonSignal {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
let b = a() ?? true;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
const b = a() || true;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
let b = a;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<boolean>;
let b = !a();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number>;
let b = -a();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
class AppComponent {
  prop = viewChild<AppComponent | undefined>();

  test() {
    delete this.prop;
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function test(): boolean {
  let a: Signal<boolean>;

  return !a();
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function getSignal(): Signal<boolean> {}
if (getSignal()()) { }
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a().arguments;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a().caller;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a().length;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a().name;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a().toString();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: Signal<number[]>;
let b = a.prototype; // Acceptable to access the prototype property of a Signal.
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
export class AppComponent {
  readonly test: Signal<boolean>;

  constructor() {
    effect(() => {
      if (this.test()) { }
    });
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
export class AppComponent {
  readonly test: Signal<boolean>;

  constructor() {
    const t = this.test;
    effect(() => {
      if (t()) { }
    });
  }
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: WritableSignal<string>;
let b: boolean;
let c = b && a.set('');
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
let a: { b: WritableSignal<boolean> };
true && a.b.set(false);
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function a(b: WritableSignal<boolean> | InputSignal<boolean>) {
  return 'set' in b || 'applyValueToInputSignal' in b[SIGNAL];
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-uncalled-signals": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
function a(b: { c: WritableSignal<boolean> }) {
  true && ((x) => b.c.set(x))(true);
}
```
