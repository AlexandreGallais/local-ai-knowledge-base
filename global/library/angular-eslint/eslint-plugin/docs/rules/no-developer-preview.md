---
title: "@angular-eslint/no-developer-preview"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-developer-preview.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-developer-preview`

Disallow using code which is marked as developer preview

- Type: problem

## Rationale

Angular's developer preview APIs are fully functional and polished, but not yet covered by Angular's breaking change policy. These APIs may change even in patch releases, making them risky for production applications.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
interface Test {};
const test: Test = {};
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
interface Test {};
Partial<Test>;
        ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
interface Test {
  good?: () => void;
  /** @developerPreview */
  bad?: () => void;
};
const test: Test = {};
test.bad();
     ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
interface Test {
  good?: string;
  /** @developerPreview */
  bad?: string;
};
const test: Test = {};
if (test.good || test.bad) return;
                      ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good?: string;
  /** @developerPreview */
  bad?: string;
}
const { good, bad } = new Test();
              ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
interface Test {
  a: {
    /** @developerPreview */
    b: {
      c: string;
    };
  };
};
const test: Test = { a: { b: { c: '' } } };
test.a.b.c = 'value';
       ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
class Test {}
const test: Test = {};
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
class Test {}

const test = new Test();
                 ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good?: string;
  /** @developerPreview */
  bad?: string;
}

const test = new Test();
test.good = 'good';
test.bad = 'bad';
     ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  /** @developerPreview */
  func() {}
}

const test = new Test();
test.func();
     ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good?: string;
  /** @developerPreview */
  bad?: string;
}
const test = new Test();
if (test.good || test.bad) return;
                      ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good() {}
  /** @developerPreview */
  bad() {}
}
const test = new Test();
test.good();
test.bad();
     ~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const Test = class {};
const test = new Test();
                 ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
type Test = 'a' | 'b';
const test: Test = 'a';
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
function test() {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = () => {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
function test(param = '') {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
let test: number = 1;
const result = test++;
               ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = 'test';
const myString = test + '-suffix';
                 ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = [];
for (const value of test) {}
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = true;
const value = test ? 'yes' : 'no';
              ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = 'test';
const another = test;
                ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = 'test';
console.log(test);
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = { a: { b: {} } };
test.a.b;
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = {};
const result = { ...test };
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = [];
const result = [ ...test ];
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
type A = () => {
  /** @developerPreview */
  b: string;
};
declare const a: A;

const { b } = a();
        ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const x = 1;

const { y = x } = {};
            ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const test = {
  a: '',
  /** @developerPreview */
  b: '',
};
test.b;
     ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
const test = 'test';
const myString = `${test}-suffix`;
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
enum Test {
  member = 1,
}
Test.member;
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
enum Test {
  member1 = 1,
  /** @developerPreview */
  member2 = 2,
}
Test.member1;
Test.member2;
     ~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @developerPreview */
function $localize2(value: TemplateStringsArray) {
  return value;
}
const result = $localize2`Hello World!`;
               ~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { developerPreviewFunction } from './dev-preview';

developerPreviewFunction();
~~~~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { developerPreviewFunction as alias } from './dev-preview';

alias();
~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { DeveloperPreviewClass } from './dev-preview';

const instance = new DeveloperPreviewClass();
                     ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { developerPreviewConst } from './dev-preview';

const myConst = developerPreviewConst;
                ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { developerPreviewConst } from './dev-preview';

const myConst = { prop: developerPreviewConst };
                        ~~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { SomeInterface } from './dev-preview';

const obj: SomeInterface = {};
const { developerPreviewItem } = obj;
        ~~~~~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not developerPreview */
interface Test {
  /** @publicApi */
  a1: string;
  /** @developerPreview */
  a2: string;
};
const test: Test = {};
test.a1 = 'value';
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not developerPreview */
class Test {
  /** @deprecated */
  a1: string;
  /** @developerPreview */
  a2: string;
}
const test = new Test();
test.a1 = 'value';
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not developerPreview */
const test = {};
if (test) return;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not developerPreview */
function test() {}
test();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @developerPreview */
declare module "some-module" {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularFunction, developerPreviewFunction } from './dev-preview';

regularFunction();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { RegularClass, DeveloperPreviewClass } from './dev-preview';

const instance = new RegularClass();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { developerPreviewFunction } from './dev-preview';

export { developerPreviewFunction as alias };
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
export * from './dev-preview';
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @developerPreview */
declare function test(): void;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @developerPreview */
declare const test: () => void;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularConst } from './dev-preview';
const myConst = regularConst;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularConst } from './dev-preview';
const myConst = { prop: regularConst };
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { SomeInterface } from './dev-preview';
const obj: SomeInterface = {};
const { regularItem } = obj;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-developer-preview": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { something } from './non-existing';
const myVar = something;
```
