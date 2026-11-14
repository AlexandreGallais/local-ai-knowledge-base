---
title: "URL: searchParams property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/url/searchparams/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URL: searchParams property

The **`searchParams`** read-only property of the
`URL` interface returns a `URLSearchParams` object allowing
access to the `GET` decoded query arguments contained in the URL.

## Value

A `URLSearchParams` object.

## Examples

### Basic usage

```js
const params = new URL("https://example.com/?name=Jonathan%20Smith&age=18")
  .searchParams;
const name = params.get("name");
const age = parseInt(params.get("age"), 10);

console.log(`name: ${name}`); // name: Jonathan Smith
console.log(`age: ${age}`); // age: 18
```

### Interaction with search

The `searchParams` property exposes the `URL.search` string as a `URLSearchParams` object. When updating this `URLSearchParams`, the URL's `search` is updated with its serialization. However, `URL.search` encodes a subset of characters that `URLSearchParams` does, and encodes spaces as `%20` instead of `+`. This may cause some surprising interactions—if you update `searchParams`, even with the same values, the URL may be serialized differently.

```js
const url = new URL("https://example.com/?a=b ~");
console.log(url.href); // "https://example.com/?a=b%20~"
console.log(url.searchParams.toString()); // "a=b+%7E"
// This should be a no-op, but it changes the URL's query to the
// serialization of its searchParams
url.searchParams.sort();
console.log(url.href); // "https://example.com/?a=b+%7E"

const url2 = new URL("https://example.com?search=1234&param=my%20param");
console.log(url2.search); // "?search=1234&param=my%20param"
url2.searchParams.delete("search");
console.log(url2.search); // "?param=my+param"
```
