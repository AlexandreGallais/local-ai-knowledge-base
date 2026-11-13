---
title: "check-property-names"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/check-property-names.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# `check-property-names`

* Fixer
* Options
    * `enableFixer`
* Context and settings
* Failing examples
* Passing examples

Ensures that property names in JSDoc are not duplicated on the same block
and that nested properties have defined roots.

## Fixer

Auto-removes `@property` duplicates (based on identical names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second property will
be removed even if it has a different type or description).

## Options

A single options object has the following properties.

### `enableFixer`

Set to `true` to auto-remove `@property` duplicates (based on
identical names).

Note that this option will remove duplicates of the same name even if
the definitions do not match in other ways (e.g., the second property will
be removed even if it has a different type or description).

## Context and settings

|||
|---|---|
|Context|Everywhere|
|Options|`enableFixer`|
|Tags|`property`|
|Aliases|`prop`|
|Recommended|true|

## Failing examples

The following patterns are considered problems:

````ts
/**
 * @typedef (SomeType) SomeTypedef
 * @property Foo.Bar
 */
// Message: @property path declaration ("Foo.Bar") appears before any real property.

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property Foo.Bar
 */
// Message: @property path declaration ("Foo.Bar") root node name ("Foo") does not match previous real property name ("foo").

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].department - The employee's department.
 */
// Message: @property path declaration ("employees[].name") appears before any real property.

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].name - The employee's department.
 */
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "employees[].name"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo
 */
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo
 */
// Message: Duplicate @property "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property cfg.foo
 */
function quux ({foo, bar}) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

class Test {
    /**
     * @typedef (SomeType) SomeTypedef
     * @property cfg
     * @property cfg.foo
     * @property cfg.foo
     */
    quux ({foo, bar}) {

    }
}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property [cfg.foo]
 * @property baz
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property cfg
 * @property cfg.foo
 * @property [cfg.foo="with a default"]
 * @property baz
 */
function quux ({foo, bar}, baz) {

}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @property "cfg.foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @prop foo
 * @prop foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":"prop"}}}
// "jsdoc/check-property-names": ["error"|"warn", {"enableFixer":true}]
// Message: Duplicate @prop "foo"

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 */
// Settings: {"jsdoc":{"tagNamePreference":{"property":false}}}
// Message: Unexpected tag `@property`

/**
 * @typedef {object} foo
 * @property {string} type
 *
 * @typedef {object} bar
 * @property {object} abc
 * @property {number} abc.def
 * @property {number} abc.def
 */
// Message: Duplicate @property "abc.def"

/**
 * @typedef {object} foo
 * @property {string} type
 *
 * @typedef {object} bar
 * @property {object} abc
 * @property {number} abc
 */
// Message: Duplicate @property "abc"

/**
 * @typedef {object} foo
 * @property {string} type
 * @property {string} type
 *
 * @typedef {object} bar
 * @property {object} abc
 */
// Message: Duplicate @property "type"
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 *
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @prop foo
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property bar
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo.foo
 * @property bar
 */

/**
 * Assign the project to a list of employees.
 * @typedef (SomeType) SomeTypedef
 * @property {object[]} employees - The employees who are responsible for the project.
 * @property {string} employees[].name - The name of an employee.
 * @property {string} employees[].department - The employee's department.
 */

/**
 * @typedef (SomeType) SomeTypedef
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */

/**
 * @namespace (SomeType) SomeNamespace
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */

/**
 * @class
 * @property {Error} error Exit code
 * @property {number} [code = 1] Exit code
 */
function quux (code = 1) {
  this.error = new Error('oops');
  this.code = code;
}

/**
 * @typedef (SomeType) SomeTypedef
 * @property foo
 * @property foo.bar
 * @property foo.baz
 * @property bar
 */

/**
 * @typedef {object} foo
 * @property {string} type
 *
 * @typedef {object} bar
 * @property {number} type
 */

/**
 * @typedef {object} foo
 * @property {string} type
 *
 * @typedef {object} bar
 * @property {number} anotherType
 */
````
