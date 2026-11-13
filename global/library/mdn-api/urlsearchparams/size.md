---
title: "URLSearchParams: size property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/urlsearchparams/size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# URLSearchParams: size property

The **`size`** read-only property of the `URLSearchParams` interface indicates the total number of search parameter entries.

## Value

A number indicating the total number of search parameter entries in the `URLSearchParams` object.

## Examples

### Getting the amount of search parameter entries

You can get the total number of search parameter entries like so:

```js
const searchParams = new URLSearchParams("c=4&a=2&b=3&a=1");
searchParams.size; // 4
```

Note how the `a` parameter is given twice, but `size` returns the number of all given entries (4) and not 3. To get the amount of unique keys, you can use a `Set`, for example:

```js
[...new Set(searchParams.keys())].length; // 3
```

### Checking if search parameters exist

The `size` property is useful for checking whether there are any search parameters at all:

```js
const url = new URL("https://example.com?foo=1&bar=2");

if (url.searchParams.size) {
  console.log("URL has search parameters!");
}
```

## See also

- `URL.searchParams`
- Polyfill of `URLSearchParams` in `core-js`
