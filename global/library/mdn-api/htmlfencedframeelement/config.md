---
title: "HTMLFencedFrameElement: config property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlfencedframeelement/config/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLFencedFrameElement: config property

The **`config`** property of the `HTMLFencedFrameElement` contains a `FencedFrameConfig` object, which represents the navigation of a `<fencedframe>`, i.e., what content will be displayed in it. A `FencedFrameConfig` is returned from a source such as the Protected Audience API.

## Value

The value of `config` is initially `null`.

When its value is set to a `FencedFrameConfig` object instance, the `FencedFrameConfig`'s internal properties (for example `mappedURL`) determine what is loaded inside the associated `<fencedframe>`. In addition:

- The navigation type will be `"replace"` (see `NavigateEvent.navigationType`), meaning that the current history entry is replaced with the new entry, rather adding a new history entry for it.
- The navigation's `Referrer-Policy` is set to `"no-referrer"`.

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
