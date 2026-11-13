---
title: "no-blank-block-descriptions"
tool: "eslint-jsdoc"
version: "65.4"
source: "https://github.com/gajus/eslint-plugin-jsdoc/blob/9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3/docs/rules/no-blank-block-descriptions.md"
commit: "9adbdb25fedc1bb8024399c1bf2b5465ec9a21f3"
license: "BSD-3-Clause"
---

# no-blank-block-descriptions

### `no-blank-block-descriptions`

If tags are present, this rule will prevent empty lines in the
block description.

If no tags are present, this rule will prevent extra empty lines
in the block description.

## Fixer

Strips empty lines in block descriptions.

## Context and settings

|||
|---|---|
|Context|everywhere|
|Tags|(Block description)|
|Recommended|false|
|Settings||
|Options||

## Failing examples

The following patterns are considered problems:

````ts
/**
 *
 * @param {number} x
 */
function functionWithClearName(x) {}
// Message: There should be no blank lines in block descriptions followed by tags.

/**
 *
 *
 */
function functionWithClearName() {}
// Message: There should be no extra blank lines in block descriptions not followed by tags.

/**
 *
 * Some text
 * @param {number} x
 */
function functionWithClearName(x) {}
// Message: There should be no blank lines in block descriptions followed by tags.

/**
 *
 * Seniority levels that participate in distribution, in display
 * order. `custom` is never a real distribution key. Every test shown in this
 * modal can recruit each of these levels, so all three are always editable.
 */
const SENIORITY_ORDER = ['senior', 'middle', 'specialist'];
// Message: There should be no extra blank lines in block descriptions not followed by tags.
````

## Passing examples

The following patterns are not considered problems:

````ts
/**
 * Non-empty description
 * @param {number} x
 */
function functionWithClearName(x) {}

/**
 * @param {number} x
 */
function functionWithClearName(x) {}

/**
 *
 */
function functionWithClearName() {}

/**
 */
function functionWithClearName() {}

/** */
function functionWithClearName() {}

/** Some desc. */
function functionWithClearName() {}

/** @someTag */
function functionWithClearName() {}
````
