---
title: "HTMLImageElement: attributionSrc property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/attributionsrc/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: attributionSrc property

The **`attributionSrc`** property of the `HTMLImageElement` interface specifies that you want the browser to send an `Attribution-Reporting-Eligible` header along with the image request. It reflects the `` element's `attributionsrc` content attribute.

See the Attribution Reporting API for more details.

## Value

A string that is either empty or a space-separated list of URLs. For the interpretation of this attribute, see the HTML `` reference.

## Examples

### Setting an empty attributionSrc

```html
<img src="advertising-image.png" />
```

```js
const imgElem = document.querySelector("img");
imgElem.attributionSrc = "";
```

### Setting an attributionSrc containing URLs

```html
<img src="advertising-image.png" />
```

```js
// encode the URLs in case they contain special characters
// such as '=' that would be improperly parsed.
const encodedUrlA = encodeURIComponent("https://a.example/register-source");
const encodedUrlB = encodeURIComponent("https://b.example/register-source");

const imgElem = document.querySelector("img");
imgElem.attributionSrc = `${encodedUrlA} ${encodedUrlB}`;
```

## See also

- Attribution Reporting API.
