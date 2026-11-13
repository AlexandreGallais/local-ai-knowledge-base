---
title: "Sanitizer: setDataAttributes() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/sanitizer/setdataattributes/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Sanitizer: setDataAttributes() method

The **`setDataAttributes()`** method of the `Sanitizer` interface sets whether all `data-*` attributes will be allowed by the sanitizer, or if they must be individually specified.

If this is set `true`, then data attributes are automatically allowed and you should not add them individually using `Sanitizer.allowAttribute()` (or `Sanitizer.allowElement()` for local attributes).

Note that this method is useful for allow configurations which have a lot of `data-*` attributes that you want to allow.
The method returns `false` when used with remove configurations, which can allow all `data-*` attributes simply by omitting them.

## Syntax

```js
setDataAttributes(allow);
```

### Parameters

- `allow`
    `true` if all `data-*` attributes are allowed, and `false` if they must be explicitly specified.

### Return value

`true` if the operation changed the configuration, and `false` if the configuration already set `dataAttributes` to the specified value or `dataAttributes` cannot be set `true` because this sanitizer has a remove configuration.

## Examples

### Basic usage

The code below shows the basic usage of the `setDataAttributes()` method.

```js
// Create sanitizer (in this case the default)
const sanitizer = new Sanitizer();

// Allow all data-* attributes
sanitizer.setDataAttributes(true);

// data-* attributes are allowed by adding them
// to the attributes array
sanitizer.setDataAttributes(false);
```
