---
title: "type-annotation-spacing"
tool: "eslint-stylistic"
version: "5.10"
source: "https://github.com/eslint-stylistic/eslint-stylistic/blob/efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712/packages/eslint-plugin/rules/type-annotation-spacing/README.md"
commit: "efbb1bc0e5aaedc4695c44a03f46f4fcbbe58712"
license: "MIT"
---

# type-annotation-spacing

Spacing around type annotations improves the readability of the code. Although the most commonly used style guideline for type annotations in TypeScript prescribes adding a space after the colon, but not before it, it is subjective to the preferences of a project. For example:

```ts
// with space after, but not before (default if no option is specified)
let foo: string = "bar";

// with no spaces
let foo:string = "bar";

// with space before and after
let foo : string = "bar";

// with space before, but not after
let foo :string = "bar";

// with spaces before and after the fat arrow (default if no option is specified)
type Foo = (string: name) => string;

// with no spaces between the fat arrow
type Foo = (string: name)=>string;

// with space after, but not before the fat arrow
type Foo = (string: name)=> string;

// with space before, but not after the fat arrow
type Foo = (string: name) =>string;
```

## Examples

This rule aims to enforce specific spacing patterns around type annotations and function types in type literals.

**Incorrect:**

```ts
/* eslint @stylistic/type-annotation-spacing: "error" */

let foo:string = "bar";
let foo :string = "bar";
let foo : string = "bar";

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

class Foo {
    name : string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

**Correct:**

```ts
/* eslint @stylistic/type-annotation-spacing: "error" */

let foo: string = "bar";

function foo(): string {}

class Foo {
    name: string;
}

type Foo = () => {};
```

## Options

### after

Examples of **incorrect** code for this rule with the `{ "before": false, "after": true }` option:

**Incorrect:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": true }] */

let foo:string = "bar";
let foo :string = "bar";
let foo : string = "bar";

function foo():string {}
function foo() :string {}
function foo() : string {}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

class Foo {
    name : string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = () => {};
```

Examples of **correct** code for this rule with the `{ "before": false, "after": true }` option:

**Correct:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": true }] */

let foo: string = "bar";

function foo(): string {}

class Foo {
    name: string;
}

type Foo = ()=> {};
```

### before

Examples of **incorrect** code for this rule with the `{ "before": true, "after": true }` option:

**Incorrect:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": true, "after": true }] */

let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

Examples of **correct** code for this rule with the `{ "before": true, "after": true }` option:

**Correct:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": true, "after": true }] */

let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}

type Foo = () => {};
```

### overrides

#### colon

Examples of **incorrect** code for this rule with the `{ "before": false, "after": false, "overrides": { "colon": { "before": true, "after": true } } }` option:

**Incorrect:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": false, "overrides": { "colon": { "before": true, "after": true } } }] */

let foo: string = "bar";
let foo:string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name:string;
}

class Foo {
    name :string;
}

type Foo = () =>{};
type Foo = ()=> {};
type Foo = () => {};
```

Examples of **correct** code for this rule with the `{ "before": false, "after": false, "overrides": { "colon": { "before": true, "after": true } } }` option:

**Correct:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": false, "overrides": { "colon": { "before": true, "after": true } } }] */

let foo : string = "bar";

function foo() : string {}

class Foo {
    name : string;
}

type Foo = {
    name: (name : string)=>string;
}

type Foo = ()=>{};
```

#### arrow (**deprecated**)

> **Note:**
> The spacing between arrow should be handled by the `arrow-spacing` rule now. And this option will be removed in the next major version.
>
> If you're trying to configure this rule and are running into a conflict with the `arrow-spacing` rule along with a persistent warning, you can set `"arrow": "ignore"` in the `overrides` option to disable this part of the rule.

Examples of **incorrect** code for this rule with the `{ "before": false, "after": false, "overrides": { "arrow": { "before": true, "after": true } } }` option:

**Incorrect:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": false, "overrides": { "arrow": { "before": true, "after": true } } }] */

let foo: string = "bar";
let foo : string = "bar";
let foo :string = "bar";

function foo(): string {}
function foo():string {}
function foo() :string {}

class Foo {
    name: string;
}

class Foo {
    name : string;
}

class Foo {
    name :string;
}

type Foo = ()=>{};
type Foo = () =>{};
type Foo = ()=> {};
```

Examples of **correct** code for this rule with the `{ "before": false, "after": false, "overrides": { "arrow": { "before": true, "after": true } } }` option:

**Correct:**

```ts
/* eslint @stylistic/type-annotation-spacing: ["error", { "before": false, "after": false, "overrides": { "arrow": { "before": true, "after": true } } }] */

let foo:string = "bar";

function foo():string {}

class Foo {
    name:string;
}

type Foo = () => {};
```

## When Not To Use It

If you don't want to enforce spacing for your type annotations, you can safely turn this rule off.

## Further Reading

- TypeScript Type System
- Type Inference
