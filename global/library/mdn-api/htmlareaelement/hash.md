---
title: "HTMLAreaElement: hash property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/hash/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: hash property

The **`hash`** property of the `HTMLAreaElement` interface is a string containing a `"#"` followed by the fragment identifier of the `<area>` element's `href`. If the URL does not have a fragment identifier, this property contains an empty string, `""`.

See `URL.hash` for more information.

## Value

A string.

## Examples

### Getting the hash from an area link

Given this HTML

```html
<map name="infographic">
  <area
    id="mdn-circle"
    shape="circle"
    coords="130,136,60"
    href="https://developer.mozilla.org/#ExampleSection"
    alt="MDN" />
</map>

<img
  usemap="#infographic"
  src="/media/examples/mdn-info.png"
  alt="MDN infographic" />
```

you can get the hash of the area link like this:

```js
const area = document.getElementById("mdn-circle");
area.hash; // '#ExampleSection'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
