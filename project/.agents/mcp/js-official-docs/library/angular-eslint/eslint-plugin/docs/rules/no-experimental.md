---
title: "@angular-eslint/no-experimental"
tool: "angular-eslint"
version: "22.6"
source: "https://github.com/angular-eslint/angular-eslint/blob/7722ad2ab4da81568f19a7a29a3951fa443bf22c/packages/eslint-plugin/docs/rules/no-experimental.md"
commit: "7722ad2ab4da81568f19a7a29a3951fa443bf22c"
license: "MIT"
---

# `@angular-eslint/no-experimental`

Disallow using code which is marked as experimental

- Type: problem

## Rationale

Angular's experimental APIs are subject to significant changes or removal without notice and are not covered by Angular's breaking change policy. These APIs may change even in patch releases, making them risky for production applications.

## Rule Options

The rule does not have any configuration options.

## Usage Examples

> The following examples are generated automatically from the actual unit tests within the plugin, so you can be assured that their behavior is accurate based on the current commit.

**❌ - Toggle examples of incorrect code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
interface Test {};
const test: Test = {};
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
interface Test {};
Partial<Test>;
        ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
interface Test {
  good?: () => void;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
interface Test {
  good?: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const test = {
  /** @experimental */
  a: {
    b: {
      c: () => {},
    },
  },
};
const value = test.a.b.c();
                   ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
class Test {}
const test: Test = {};
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
class Test {}

const test = new Test();
                 ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  /** @publicApi */
  good?: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good?: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good?: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
class Test {
  good() {}
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const Test = class {};
new Test();
    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
type Test = 'a' | 'b';
const test: Test = 'a';
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
function test() {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = () => {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
function test(param = '') {}
test();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
function test(param = ''): any {}
test()?.a()?.b();
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental @deprecated */
const test = 'test';
const myString = test + '-suffix';
                 ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
let test = [];
for (const value of test) {}
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
var test = true;
const value = test ? 'yes' : 'no';
              ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = 'test';
const another = test;
                ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = 'test';
console.log(test);
            ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = { a: { b: {} } };
test.a.b;
~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = {};
const result = { ...test };
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = [];
const result = [ ...test ];
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
type A = () => {
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
let test: number = 1;
const result = test++;
               ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
let i = 0;
while(false) {
  i++;
  ~
}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const x = 1;

const { y = x } = {};
            ~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
const test = {
  a: '',
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
async function test() {}

await test();
      ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
const test = 'test';
const myString = `${test}-suffix`;
                    ~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
enum Test {
  member1 = 1,
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
/** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { experimentalFunction } from './experimental';

experimentalFunction();
~~~~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { experimentalFunction as alias } from './experimental';

alias();
~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { ExperimentalClass } from './experimental';

const instance = new ExperimentalClass();
                     ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { experimentalConst } from './experimental';

const myConst = experimentalConst;
                ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { experimentalConst } from './experimental';

const myConst = { prop: experimentalConst };
                        ~~~~~~~~~~~~~~~~~
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ❌ Invalid Code

```ts
import { SomeInterface } from './experimental';

const obj: SomeInterface = {};
const { experimentalItem } = obj;
        ~~~~~~~~~~~~~~~~
```

---

**✅ - Toggle examples of correct code for this rule**

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not experimental */
interface Test {
  /** @publicApi */
  a1: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not experimental */
class Test {
  /** @deprecated */
  a1: string;
  /** @experimental */
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
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not experimental */
const test = {};
if (test) return;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** Not experimental */
function test() {}
test();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @experimental */
declare module "some-module" {}
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularFunction, experimentalFunction } from './experimental';

regularFunction();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { RegularClass, ExperimentalClass } from './experimental';

const instance = new RegularClass();
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { experimentalFunction } from './experimental';

export { experimentalFunction as alias };
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
export * from './experimental';
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @experimental */
declare function test(): void;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
/** @experimental */
declare const test: () => void;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularConst } from './experimental';
const myConst = regularConst;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { regularConst } from './experimental';
const myConst = { prop: regularConst };
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
      "error"
    ]
  }
}
```

#### ✅ Valid Code

```ts
import { SomeInterface } from './experimental';
const obj: SomeInterface = {};
const { regularItem } = obj;
```

---

#### Default Config

```json
{
  "rules": {
    "@angular-eslint/no-experimental": [
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
