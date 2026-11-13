---
title: "HTMLTitleElement: text property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmltitleelement/text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLTitleElement: text property

The **`text`** property of the `HTMLTitleElement` interface represents the child text content of the document's title as a string. It contains the `<title>` element's content as text; if HTML tags are included within the `<title>` element, they are included as part of the string value rather than being parsed as HTML.

Setting a value for the `text` property replaces the entire text contents of the `<title>`.

## Value

A string.

## Examples

Consider the example below:

```html
<!doctype html>
<html lang="en-US">
  <head>
    <title>
      Hello world! <span class="highlight">Isn't this wonderful</span> really?
    </title>
  </head>
  <body></body>
</html>
```

```js
const title = document.querySelector("title");
console.log(title.text); // "Hello world! <span class="highlight">Isn't this wonderful</span> really?"
title.text = "Update the title";
```

As you can see, the `span` tag remained unparsed; the `<title>` element's contents were treated as plain text and returned exactly as they appear in the `title` element.
