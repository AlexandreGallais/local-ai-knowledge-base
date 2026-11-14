---
title: "Deprecated APIs (part 1 of 6)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/deprecations.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Deprecated APIs

Node.js APIs might be deprecated for any of the following reasons:

* Use of the API is unsafe.
* An improved alternative API is available.
* Breaking changes to the API are expected in a future major release.

Node.js uses four kinds of deprecations:

* Documentation-only
* Application (non-`node_modules` code only)
* Runtime (all code)
* End-of-Life

A Documentation-only deprecation is one that is expressed only within the
Node.js API docs. These generate no side-effects while running Node.js.
Some Documentation-only deprecations trigger a runtime warning when launched
with `--pending-deprecation` flag (or its alternative,
`NODE_PENDING_DEPRECATION=1` environment variable), similarly to Runtime
deprecations below. Documentation-only deprecations that support that flag
are explicitly labeled as such in the
list of Deprecated APIs.

An Application deprecation for only non-`node_modules` code will, by default,
generate a process warning that will be printed to `stderr` the first time
the deprecated API is used in code that's not loaded from `node_modules`.
When the `--throw-deprecation` command-line flag is used, a Runtime
deprecation will cause an error to be thrown. When
`--pending-deprecation` is used, warnings will also be emitted for
code loaded from `node_modules`.

A runtime deprecation for all code is similar to the runtime deprecation
for non-`node_modules` code, except that it also emits a warning for
code loaded from `node_modules`.

An End-of-Life deprecation is used when functionality is or will soon be removed
from Node.js.

## Revoking deprecations

Occasionally, the deprecation of an API might be reversed. In such situations,
this document will be updated with information relevant to the decision.
However, the deprecation identifier will not be modified.
