---
title: "ImageDecoder: completed property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/imagedecoder/completed/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ImageDecoder: completed property

The **`completed`** read-only property of the `ImageDecoder` interface returns a promise that resolves once encoded data has finished buffering.

## Value

A `Promise` that resolves with `undefined` once `ImageDecoder.complete` is `true`.

## Examples

In the following example the value of `completed` will be `undefined` once the promise resolves.

```js
let completed = await imageDecoder.completed;
console.log(completed);
```
