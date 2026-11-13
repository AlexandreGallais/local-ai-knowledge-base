---
title: "HTMLFencedFrameElement"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfencedframeelement/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFencedFrameElement

The **`HTMLFencedFrameElement`** interface represents a `<fencedframe>` element in JavaScript and provides configuration properties.

## Instance properties

_Inherits properties from its parent, `HTMLElement`._

- `HTMLFencedFrameElement.allow` (deprecated)
    Gets and sets the value of the corresponding `<fencedframe>` `allow` attribute, which represents a Permissions Policy applied to the content when it is first embedded.
- `HTMLFencedFrameElement.config` (deprecated)
    a `FencedFrameConfig` object, which represents the navigation of a `<fencedframe>`, i.e., what content will be displayed in it. A `FencedFrameConfig` is returned from a source such as the Protected Audience API.
- `HTMLFencedFrameElement.height` (deprecated)
    Gets and sets the value of the corresponding `<fencedframe>` `height` attribute, which specifies the height of the element.
- `HTMLFencedFrameElement.width` (deprecated)
    Gets and sets the value of the corresponding `<fencedframe>` `width` attribute, which specifies the width of the element.

## Examples

To set what content will be shown in a `<fencedframe>`, a utilizing API (such as Protected Audience or Shared Storage) generates a `FencedFrameConfig` object, which is then set as the value of the `<fencedframe>`'s `config` property.

The following example gets a `FencedFrameConfig` from a Protected Audience API's ad auction, which is then used to display the winning ad in a `<fencedframe>`:

```js
const frameConfig = await navigator.runAdAuction({
  // … auction configuration
  resolveToConfig: true,
});

const frame = document.createElement("fencedframe");
frame.config = frameConfig;
```

> **Note:**
> `resolveToConfig: true` must be passed in to the `runAdAuction()` call to obtain a `FencedFrameConfig` object. If it is not set, the resulting `Promise` will resolve to a URN that can only be used in an ``.

## See also

- Fenced frames on privacysandbox.google.com
- The Privacy Sandbox on privacysandbox.google.com
