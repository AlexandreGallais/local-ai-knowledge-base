---
title: "no-unused-private-class-members"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-unused-private-class-members.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-unused-private-class-members

Private class members that are declared and not used anywhere in the code are most likely an error due to incomplete refactoring. Such class members take up space in the code and can lead to confusion by readers.

## Rule Details

This rule reports unused private class members.

* A private field or method is considered to be unused if its value is never read.
* A private accessor is considered to be unused if it is never accessed (read or write).

Examples of **incorrect** code for this rule:

**Incorrect:**

```js
/*eslint no-unused-private-class-members: "error"*/

class A {
    #unusedMember = 5;
}

class B {
    #usedOnlyInWrite = 5;
    method() {
        this.#usedOnlyInWrite = 42;
    }
}

class C {
    #usedOnlyToUpdateItself = 5;
    method() {
        this.#usedOnlyToUpdateItself++;
    }
}

class D {
    #unusedMethod() {}
}

class E {
    get #unusedAccessor() {}
    set #unusedAccessor(value) {}
}
```

Examples of **correct** code for this rule:

**Correct:**

```js
/*eslint no-unused-private-class-members: "error"*/

class A {
    #usedMember = 42;
    method() {
        return this.#usedMember;
    }
}

class B {
    #usedMethod() {
        return 42;
    }
    anotherMethod() {
        return this.#usedMethod();
    }
}

class C {
    get #usedAccessor() {}
    set #usedAccessor(value) {}
    
    method() {
        this.#usedAccessor = 42;
    }
}
```

## Options

This rule has no options.

## When Not To Use It

If you don't want to be notified about unused private class members, you can safely turn this rule off.
