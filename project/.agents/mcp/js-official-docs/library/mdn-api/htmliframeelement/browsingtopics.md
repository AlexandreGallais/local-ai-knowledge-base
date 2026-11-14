---
title: "HTMLIFrameElement: browsingTopics property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmliframeelement/browsingtopics/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLIFrameElement: browsingTopics property

> **Warning:**
> This feature is currently opposed by two browser vendors. See the Standards positions section for details of opposition.

The **`browsingTopics`** property of the `HTMLIFrameElement` interface is a boolean specifying that the selected topics for the current user should be sent with the request for the associated ``'s source in a `Sec-Browsing-Topics` header. This reflects the `browsingtopics` HTML attribute.

## Value

A boolean. The default value is `false`; set it to `true` to send the associated `` source request with a `Sec-Browsing-Topics` header containing the selected topics for the current user.

## Examples

### Get

Set `browsingtopics` to `true` then load the `` contents declaratively:

```html
<iframe browsingtopics title="Advertising container" src="ad-tech1.example">
  ...
</iframe>
```

Log the `browsingTopics` value via script:

```js
const iframeElem = document.querySelector("iframe");
console.log(iframeElem.browsingTopics); // will return true in supporting browsers
```

### Set

Specify a minimum ``:

```html
<iframe> ... </iframe>
```

Set `browsingtopics` to `true` then load the `` contents via script:

```js
const iframeElem = document.querySelector("iframe");

iframeElem.browsingTopics = true;
iframeElem.title = "Advertising container";
iframeElem.src = "ad-tech1.example";
```

## Specifications

This feature is not part of an official standard, although it is specified in the Topics API Unofficial Proposal Draft.

## See also

- Topics API
