---
title: "Empty statement"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/statements/empty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Empty statement

An **empty statement** is used to provide no statement, although the
JavaScript syntax would expect one.

```js
const array = [1, 2, 3];

// Assign all array values to 0
for (let i = 0; i < array.length; array[i++] = 0 /* empty statement */);

console.log(array);
// Expected output: Array [0, 0, 0]
```

## Syntax

```js
;
```

## Description

The empty statement is a semicolon (`;`) indicating that no statement will
be executed, even if JavaScript syntax requires one.

The opposite behavior, where you want multiple statements, but JavaScript only allows a
single one, is possible using a block statement,
which combines several statements into a single one.

## Examples

### Empty loop body

The empty statement is sometimes used with loop statements. See the following example
with an empty loop body:

```js
const arr = [1, 2, 3];

// Assign all array values to 0
for (let i = 0; i < arr.length; arr[i++] = 0) /* empty statement */ ;

console.log(arr);
// [0, 0, 0]
```

### Unintentional usage

It is a good idea to comment _intentional_ use of the empty statement, as it is
not really obvious to distinguish from a normal semicolon.

In the following example, the usage is probably not intentional:

```js
if (condition);      // Caution, this "if" does nothing!
  killTheUniverse(); // So this always gets executed!!!
```

## See also

- Block statement
