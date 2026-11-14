---
title: "HTMLImageElement: crossOrigin property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/htmlimageelement/crossorigin/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# HTMLImageElement: crossOrigin property

The **`crossOrigin`** property of the `HTMLImageElement` interface is a string which specifies the Cross-Origin Resource Sharing (CORS) setting to use when retrieving the image. It reflects the `` element's `crossorigin` content attribute.

## Value

A string whose value is one of `anonymous` or `use-credentials`. For their meanings, see the HTML `crossorigin` attribute reference.

## Examples

### Setting the crossorigin attribute

In this example, a new `` element is created and added to the document, loading the image with the Anonymous state; the image will be loaded using CORS and credentials will be used for all cross-origin loads.

#### JavaScript

The code below demonstrates setting the `crossOrigin` property on an `` element to configure CORS access for the fetch of a newly-created image.

```js
const container = document.querySelector(".container");

function loadImage(url) {
  const image = new Image(200, 200);
  image.addEventListener("load", () => container.prepend(image));

  image.addEventListener("error", () => {
    const errMsg = document.createElement("output");
    errMsg.value = `Error loading image at ${url}`;
    container.append(errMsg);
  });

  image.crossOrigin = "anonymous";
  image.alt = "";
  image.src = url;
}

loadImage("/shared-assets/images/examples/balloon.jpg");
```

### HTML

```html
<div class="container">
  <p>
    Here's a paragraph. It's a very interesting paragraph. You are captivated by
    this paragraph. Keep reading this paragraph. Okay, now you can stop reading
    this paragraph. Thanks for reading me.
  </p>
</div>
```

### CSS

```css
body {
  font:
    1.125rem/1.5 "Helvetica",
    "Arial",
    sans-serif;
}

.container {
  display: flow-root;
  width: 37.5em;
  border: 1px solid #d2d2d2;
}

img {
  float: left;
  padding-right: 1.5em;
}

output {
  background: rgb(100 100 100 / 100%);
  font-family: "Courier New", monospace;
  width: 95%;
}
```

## See also

- `HTMLLinkElement.crossOrigin`
- `HTMLMediaElement.crossOrigin`
- `HTMLScriptElement.crossOrigin`
