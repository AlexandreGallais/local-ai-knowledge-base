---
title: "`<a>` HTML anchor element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/a/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<a>` HTML anchor element (part 2 of 2)

## Examples

### Linking to an absolute URL

#### HTML

```html
<a href="https://www.mozilla.com">Mozilla</a>
```

#### Result

### Linking to relative URLs

#### HTML

```html
<a href="//example.com">Scheme-relative URL</a>
<a href="/en-US/docs/Web/HTML">Origin-relative URL</a>
<a href="p">Directory-relative URL</a>
<a href="./p">Directory-relative URL</a>
<a href="../p">Parent-directory-relative URL</a>
```

```css
a {
  display: block;
  margin-bottom: 0.5em;
}
```

#### Result

### Linking to an element on the same page

```html
<!-- <a> element links to the section below -->
<p><a href="#Section_further_down">Jump to the heading below</a></p>

<!-- Heading to link to -->
<h2 id="Section_further_down">Section further down</h2>
```

#### Result

> **Note:**
> You can use `href="#top"` or the empty fragment (`href="#"`) to link to the top of the current page, as defined in the HTML specification.

### Linking to an email address

To create links that open in the user's email program to let them send a new message, use the `mailto:` scheme:

```html
<a href="mailto:user@example.com">Send email to nowhere</a>
```

#### Result

For details about `mailto:` URLs, such as including a subject or body, see Email links or .

### Linking to telephone numbers

```html
<a href="tel:+49.157.0156">+49 157 0156</a>
<a href="tel:+1(800)555-0123">(800) 555-0123</a>
```

#### Result

`tel:` link behavior varies with device capabilities:

- Cellular devices autodial the number.
- Most operating systems have programs that can make calls, like Skype or FaceTime.
- Websites can make phone calls with `registerProtocolHandler`, such as `web.skype.com`.
- Other behaviors include saving the number to contacts, or sending the number to another device.

See  for syntax, additional features, and other details about the `tel:` URL scheme.

### Using the download attribute to save a \<canvas> as a PNG

To save a `<canvas>` element's contents as an image, you can create a link where the `href` is the canvas data as a `data:` URL created with JavaScript and the `download` attribute provides the file name for the downloaded PNG file:

#### Example painting app with save link

##### HTML

```html
<p>
  Paint by holding down the mouse button and moving it.
  <a href="" download="my_painting.png">Download my painting</a>
</p>

<canvas width="300" height="300"></canvas>
```

##### CSS

```css
html {
  font-family: sans-serif;
}
canvas {
  background: white;
  border: 1px dashed;
}
a {
  display: inline-block;
  background: #6699cc;
  color: white;
  padding: 5px 10px;
}
```

##### JavaScript

```js
const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");
c.fillStyle = "hotpink";
let isDrawing;

function draw(x, y) {
  if (isDrawing) {
    c.beginPath();
    c.arc(x, y, 10, 0, Math.PI * 2);
    c.closePath();
    c.fill();
  }
}

canvas.addEventListener("mousemove", (event) =>
  draw(event.offsetX, event.offsetY),
);
canvas.addEventListener("mousedown", () => (isDrawing = true));
canvas.addEventListener("mouseup", () => (isDrawing = false));

document
  .querySelector("a")
  .addEventListener(
    "click",
    (event) => (event.target.href = canvas.toDataURL()),
  );
```

##### Result

## Security and privacy

`` elements can have consequences for the security and privacy of users. See `Referer` header: privacy and security concerns for information.

Using `target="_blank"` without `rel="noreferrer"` and `rel="noopener"` makes the website vulnerable to `window.opener` API exploitation attacks, although note that, in newer browser versions setting `target="_blank"` implicitly provides the same protection as setting `rel="noopener"`. See browser compatibility for details.

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        interactive content, palpable content.

       | Permitted content
       |
        Transparent, except that no descendant may be
        interactive content or an
        `<a>` element, and no descendant may have a specified
        tabindex attribute.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content, but not other `<a>` elements.

       | Implicit ARIA role
       |
        `link` when `href` attribute is
        present, otherwise
        `generic`

       | Permitted ARIA roles
       |
        When `href` attribute is present:

          `button`
          `checkbox`
          `menuitem`
          `menuitemcheckbox`
          `menuitemradio`
          `option`
          `radio`
          `switch`
          `tab`
          `treeitem`

        When `href` attribute is not present:

          any

       | DOM interface
       | `HTMLAnchorElement`

## See also

- `<link>` is similar to ``, but for metadata hyperlinks that are invisible to users.
- `:link` is a CSS pseudo-class that will match `` elements with URL in `href` attribute that was not yet visited by the user.
- `:visited` is a CSS pseudo-class that will match `` elements with URL in `href` attribute that was visited by the user in the past.
- `:any-link` is a CSS pseudo-class that will match `` elements with `href` attribute.
- Text fragments are user-agent instructions added to URLs that allow content authors to link to specific text on a page, without IDs being required.
