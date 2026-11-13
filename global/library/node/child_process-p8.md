---
title: "Child process (part 8 of 8)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/child_process.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# Child process (part 8 of 8)

## Advanced serialization

Child processes support a serialization mechanism for IPC that is based on the
serialization API of the `node:v8` module, based on the
HTML structured clone algorithm. This is generally more powerful and
supports more built-in JavaScript object types, such as `BigInt`, `Map`
and `Set`, `ArrayBuffer` and `TypedArray`, `Buffer`, `Error`, `RegExp` etc.

However, this format is not a full superset of JSON, and e.g. properties set on
objects of such built-in types will not be passed on through the serialization
step. Additionally, performance may not be equivalent to that of JSON, depending
on the structure of the passed data.
Therefore, this feature requires opting in by setting the
`serialization` option to `'advanced'` when calling `child_process.spawn()`
or `child_process.fork()`.
