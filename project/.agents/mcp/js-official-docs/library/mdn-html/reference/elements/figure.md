---
title: "`<figure>` HTML figure with optional caption element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/figure/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<figure>` HTML figure with optional caption element

The **``** HTML element represents self-contained content, potentially with an optional caption, which is specified using the `` element. The figure, its caption, and its contents are referenced as a single unit.

```html
<figure>
  <img
    src="/shared-assets/images/examples/elephant.jpg"
    alt="Elephant at sunset" />
  <figcaption>An elephant at sunset</figcaption>
</figure>
```

```css
figure {
  border: thin silver solid;
  display: flex;
  flex-flow: column;
  padding: 5px;
  max-width: 220px;
  margin: auto;
}

img {
  max-width: 220px;
  max-height: 150px;
}

figcaption {
  background-color: #222222;
  color: white;
  font: italic smaller sans-serif;
  padding: 3px;
  text-align: center;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

- Usually a `` is an image, illustration, diagram, code snippet, etc., that is referenced in the main flow of a document, but that can be moved to another part of the document or to an appendix without affecting the main flow.
- A caption can be associated with the `` element by inserting a `` inside it (as the first or the last child). The first `` element found in the figure is presented as the figure's caption.
- The `` provides the accessible name for the parent ``.

## Examples

### Images

```html
<!-- Just an image -->
<figure>
  <img src="favicon-192x192.png" alt="The beautiful MDN logo." />
</figure>

<!-- Image with a caption -->
<figure>
  <img src="favicon-192x192.png" alt="The beautiful MDN logo." />
  <figcaption>MDN Logo</figcaption>
</figure>
```

#### Result

### Code snippets

```html
<figure>
  <figcaption>Get browser details using <code>navigator</code>.</figcaption>
  <pre>
function NavigatorExample() {
  let txt = `Browser CodeName: ${navigator.appCodeName};\n`;
  txt += `Browser Name: ${navigator.appName};\n`;
  txt += `Browser Version: ${navigator.appVersion};\n`;
  txt += `Cookies Enabled: ${navigator.cookieEnabled};\n`;
  txt += `Platform: ${navigator.platform};\n`;
  txt += `User-agent header: ${navigator.userAgent};`;
  console.log("NavigatorExample", txt);
}
  </pre>
</figure>
```

#### Result

### Quotations

```html
<figure>
  <figcaption><b>Edsger Dijkstra:</b></figcaption>
  <blockquote>
    If debugging is the process of removing software bugs, then programming must
    be the process of putting them in.
  </blockquote>
</figure>
```

#### Result

### Poems

```html
<figure>
  <p>
    Bid me discourse, I will enchant thine ear,<br />
    Or like a fairy trip upon the green,<br />
    Or, like a nymph, with long dishevelled hair,<br />
    Dance on the sands, and yet no footing seen:<br />
    Love is a spirit all compact of fire,<br />
    Not gross to sink, but light, and will aspire.<br />
  </p>
  <figcaption><cite>Venus and Adonis</cite>, by William Shakespeare</figcaption>
</figure>
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        palpable content.

       | Permitted content
       |
        A `` element, followed by
        flow content; or flow content followed by a
        `` element; or flow content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        Flow content.

       | Implicit ARIA role
       |
        figure

       | Permitted ARIA roles
       |
        With no
        figcaption descendant:
        any,
        otherwise no permitted roles

       | DOM interface
       | `HTMLElement`

## See also

- The `` element.
