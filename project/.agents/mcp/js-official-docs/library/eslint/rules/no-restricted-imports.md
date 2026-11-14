---
title: "no-restricted-imports (part 1 of 3)"
tool: "eslint"
version: "10.14"
source: "https://github.com/eslint/eslint/blob/12cbff4125db3f6446f72fa0c48c46b92b120427/docs/src/rules/no-restricted-imports.md"
commit: "12cbff4125db3f6446f72fa0c48c46b92b120427"
license: "MIT"
---

# no-restricted-imports

Imports are an ES6/ES2015 standard for making the functionality of other modules available in your current module. In CommonJS this is implemented through the `require()` call which makes this ESLint rule roughly equivalent to its CommonJS counterpart `no-restricted-modules`.

Why would you want to restrict imports?

* Some imports might not make sense in a particular environment. For example, Node.js' `fs` module would not make sense in an environment that didn't have a file system.

* Some modules provide similar or identical functionality, think `lodash` and `underscore`. Your project may have standardized on a module. You want to make sure that the other alternatives are not being used as this would unnecessarily bloat the project and provide a higher maintenance cost of two dependencies when one would suffice.

## Rule Details

This rule allows you to specify imports that you don't want to use in your application.

It applies to static imports only, not dynamic ones.
