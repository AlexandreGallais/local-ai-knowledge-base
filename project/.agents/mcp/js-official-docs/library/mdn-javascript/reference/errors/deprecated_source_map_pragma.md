---
title: "SyntaxError: Using //@ to indicate sourceURL pragmas is deprecated. Use //# instead"
tool: "mdn-javascript"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/javascript/reference/errors/deprecated_source_map_pragma/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# SyntaxError: Using //@ to indicate sourceURL pragmas is deprecated. Use //# instead

The JavaScript warning "Using `//@` to indicate sourceURL pragmas is deprecated. Use `//#` instead" occurs when there is a deprecated source map syntax in a JavaScript source.

## Message

```plain
Warning: SyntaxError: Using //@ to indicate sourceURL pragmas is deprecated. Use //# instead

Warning: SyntaxError: Using //@ to indicate sourceMappingURL pragmas is deprecated. Use //# instead
```

## Error type

A warning that a `SyntaxError` occurred. JavaScript execution won't be halted.

## What went wrong?

There is a deprecated source map syntax in a JavaScript source.

JavaScript sources are often combined and minified to make delivering them from the server more efficient. With source maps, the debugger can map the code being executed to the original source files.

The source map specification changed the syntax due to a conflict with IE whenever it was found in the page after `//@cc_on` was interpreted to turn on conditional compilation in the IE JScript engine. The conditional compilation comment in IE is a little known feature, but it broke source maps with jQuery and other libraries.

## Examples

### Deprecated syntax

Syntax with the "@" sign is deprecated.

```js
//@ sourceMappingURL=http://example.com/path/to/your/sourcemap.map
```

### Standard syntax

Use the "#" sign instead.

```js
//# sourceMappingURL=http://example.com/path/to/your/sourcemap.map
```

Or, alternatively, you can set a `SourceMap` header to your JavaScript file to avoid having a comment at all:

```http
SourceMap: /path/to/file.js.map
```

## See also

- Use a source map in the Firefox source docs
- Introduction to JavaScript source maps on developer.chrome.com (2012)
- `SourceMap`
