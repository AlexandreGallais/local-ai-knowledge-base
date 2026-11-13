---
title: "no-useless-constructor"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-useless-constructor.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-useless-constructor

ES2015 provides a default class constructor if one is not specified. As such, it is unnecessary to provide an empty constructor or one that simply delegates into its parent class, as in the following examples:

```js
class A {
    constructor () {
    }
}

class B extends A {
    constructor (value) {
      super(value);
    }
}
```

## Rule Details

This rule flags class constructors that can be safely removed without changing how the class works.

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-useless-constructor: "error"*/

class A {
    constructor () {
    }
}

class B extends A {
    constructor (...args) {
      super(...args);
    }
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-useless-constructor: "error"*/

class A { }

class B {
    constructor () {
        doSomething();
    }
}

class C extends A {
    constructor() {
        super('foo');
    }
}

class D extends A {
    constructor() {
        super();
        doSomething();
    }
}
```

This rule additionally supports TypeScript type syntax.

Examples of **incorrect** TypeScript code for this rule:

**Incorrect:**

```ts
/* eslint no-useless-constructor: "error" */

class A {
    public constructor() {}
}
```

Examples of **correct** TypeScript code for this rule:

**Correct:**

```ts
/* eslint no-useless-constructor: "error" */

class A {
    protected constructor() {}
}

class B extends A {
    public constructor() {
        super();
    }
}

class C {
    constructor(@decorated param) {}
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about unnecessary constructors, you can safely disable this rule.
