---
title: "Warning: -file- is being assigned a //# sourceMappingURL, but already has one"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/already_has_pragma/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Warning: -file- is being assigned a //# sourceMappingURL, but already has one

The JavaScript warning "-file- is being assigned a //# sourceMappingURL, but already has one." occurs when a source map has been specified more than once for a given JavaScript source.

## Message

```plain
Warning: -file- is being assigned a //# sourceMappingURL, but already has one.
```

## Error type

A warning. JavaScript execution won't be halted.

## What went wrong?

A source map has been specified more than once for a given JavaScript source.

JavaScript sources are often combined and minified to make delivering them from the server more efficient. With source maps, the debugger can map the code being executed to the original source files. There are two ways to assign a source map, either by using a comment or by setting a header to the JavaScript file.

## Examples

### Setting source maps

Setting a source map by using a comment in the file:

```js
//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map
```

Or, alternatively, you can set a header to your JavaScript file:

```http
X-SourceMap: /path/to/file.js.map
```

## See also

- Use a source map in the Firefox source docs
- Introduction to JavaScript source maps on developer.chrome.com (2012)
