---
title: "no-useless-computed-key"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-useless-computed-key.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-useless-computed-key

It's unnecessary to use computed properties with literals such as:

```js
const foo = {["a"]: "b"};
```

The code can be rewritten as:

```js
const foo = {"a": "b"};
```

## Rule Details

This rule disallows unnecessary usage of computed property keys.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-useless-computed-key: "error"*/

const a = { ['0']: 0 };
const b = { ['0+1,234']: 0 };
const c = { [0]: 0 };
const d = { ['x']: 0 };
const e = { ['x']() {} };

const { [0]: foo } = obj;
const { ['x']: bar } = obj;

class Foo {
    ["foo"] = "bar";

    [0]() {}
    ['a']() {}
    get ['b']() {}
    set ['c'](value) {}

    static ["foo"] = "bar";

    static ['a']() {}
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-useless-computed-key: "error"*/

const a = { 'a': 0 };
const b = { 0: 0 };
const c = { x() {} };
const d = { a: 0 };
const e = { '0+1,234': 0 };

const { 0: foo } = obj;
const { 'x': bar } = obj;

class Foo {
    "foo" = "bar";

    0() {}
    'a'() {}
    get 'b'() {}
    set 'c'(value) {}

    static "foo" = "bar";

    static 'a'() {}
}
```

Examples of additional **correct** code for this rule:

**Correct:**

```js
/*eslint no-useless-computed-key: "error"*/

const c = {
    "__proto__": foo, // defines object's prototype

    ["__proto__"]: bar // defines a property named "__proto__"
};

class Foo {
    ["constructor"]; // instance field named "constructor"

    "constructor"() {} // the constructor of this class

    ["constructor"]() {} // method named "constructor"

    static ["constructor"]; // static field named "constructor"

    static ["prototype"]; // runtime error, it would be a parsing error without `[]`
}
```

## Options

This rule has an object option:

* `enforceForClassMembers` set to `false` disables this rule for class members (Default `true`).

### enforceForClassMembers

By default, this rule also checks class declarations and class expressions,
as the default value for `enforceForClassMembers` is `true`.

When `enforceForClassMembers` is set to `false`, the rule will allow unnecessary computed keys inside of class fields, class methods, class getters, and class setters.

Examples of **incorrect** code for this rule with the `{ "enforceForClassMembers": false }` option:

**Incorrect:**

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/

const obj = {
    ["foo"]: "bar",
    [42]: "baz",

    ['a']() {},
    get ['b']() {},
    set ['c'](value) {}
};
```

Examples of **correct** code for this rule with the `{ "enforceForClassMembers": false }` option:

**Correct:**

```js
/*eslint no-useless-computed-key: ["error", { "enforceForClassMembers": false }]*/

class SomeClass {
    ["foo"] = "bar";
    [42] = "baz";

    ['a']() {}
    get ['b']() {}
    set ['c'](value) {}

    static ["foo"] = "bar";
    static ['baz']() {}
}
```

## When Not To Use It

If you don't want to be notified about unnecessary computed property keys, you can safely disable this rule.
