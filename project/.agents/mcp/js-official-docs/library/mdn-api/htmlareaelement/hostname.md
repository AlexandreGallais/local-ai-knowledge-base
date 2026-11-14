---
title: "HTMLAreaElement: hostname property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlareaelement/hostname/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLAreaElement: hostname property

The **`hostname`** property of the `HTMLAreaElement` interface is a string containing either the domain name or IP address of the `<area>` element's URL. If the URL does not have a hostname, this property contains an empty string, `""`. IPv4 and IPv6 addresses are normalized, such as stripping leading zeros, and domain names are converted to IDN.

See `URL.hostname` for more information.

## Value

A string containing the domain of the URL associated with the `area` element.
It can be used as both a setter and getter.

## Examples

```html
<textarea id="log" rows="4" cols="100"></textarea>
<map name="infographic">
  <area
    id="area1"
    shape="rect"
    coords="184,6,253,27"
    href="/en-US/docs/HTMLAreaElement"
    target="_blank"
    alt="Mozilla" />
  <area
    id="area2"
    shape="circle"
    coords="130,136,60"
    href="https://coolexample.com/"
    target="_blank"
    alt="MDN" />
</map>
```

```js
// An element is in the document
const area1 = document.getElementById("area1");
const area2 = document.getElementById("area2");

const log = document.getElementById("log");
log.textContent = `area1 hostname: ${area1.hostname} \n`; // 'developer.mozilla.org'
log.textContent += `area2 hostname: ${area2.hostname}`; // 'coolexample.com'
```

## See also

- The `HTMLAreaElement` interface it belongs to.
