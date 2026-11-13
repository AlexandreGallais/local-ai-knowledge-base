---
title: "`<iframe>` HTML inline frame element (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/iframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<iframe>` HTML inline frame element (part 2 of 2)

## Usage notes

Each embedded browsing context has its own document and allows URL navigations. The navigations of each embedded browsing context are linearized into the session history of the _topmost_ browsing context. The browsing context that embeds the others is called the _parent browsing context_. The _topmost_ browsing context — the one with no parent — is usually the browser window, represented by the `Window` object.

> **Warning:**
> Because each browsing context is a complete document environment, every `` in a page requires increased memory and other computing resources. While theoretically you can use as many ``s as you like, check for performance problems.

### Scripting

Inline frames, like `<frame>` elements, are included in the `window.frames` pseudo-array.

With the DOM `HTMLIFrameElement` object, scripts can access the `window` object of the framed resource via the `contentWindow` property. The `contentDocument` property refers to the `document` inside the ``, same as `contentWindow.document`.

From the inside of a frame, a script can get a reference to its parent window with `window.parent`.

Script access to a frame's content is subject to the same-origin policy.
Scripts cannot access most properties in other `window` objects if the script was loaded from a different origin, including scripts inside a frame accessing the frame's parent.
Cross-origin communication can be achieved using `Window.postMessage()`.

#### Top navigation in cross-origin frames

Scripts running in a same-origin frame can access the `Window.top` property and set `window.top.location` to redirect the top-level page to a new location.
This behavior is referred to as "top navigation".

A cross-origin frame is allowed to redirect the top-level page using `top` only if the frame has sticky activation.
If top navigation is blocked, browsers may either prompt for user permission to redirect or report the error in the developer console (or both).
This restriction by browsers is called _framebusting intervention_.
What this means is that a cross-origin frame can't immediately redirect the top-level page — the user must have previously interacted with the frame or granted permission to redirect.

A sandboxed frame blocks all top navigation unless the `sandbox` attribute values are set to `allow-top-navigation` or `allow-top-navigation-by-user-activation`.
Note that top-navigation permissions are inherited, so a nested frame can perform a top navigation only if its parent frames are also allowed to.

### Embedding PDFs

An `` can display a PDF using the browser's built-in PDF viewer. Unlike `<object>`, it does not support child content as a fallback if the PDF cannot be displayed. Provide a link outside the `` so users can open the PDF separately.

The `sandbox` attribute can prevent the built-in PDF viewer from loading, even with `allow-scripts` or `allow-downloads`. It is not a portable way to add restrictions to a native PDF preview. The browser's PDF viewer already sandboxes all executable content.

### Positioning and scaling

Being a replaced element, the `` allows the position of the embedded document within its box to be adjusted using the `object-position` property.

> **Note:**
> The `object-fit` property has no effect on `` elements.

### `error` and `load` event behavior

The `error` and `load` events fired on ``s could be used to probe the URL space of the local network's HTTP servers. Therefore, as a security precaution user agents do not fire the error event on ``s, and the load event is always triggered even if the `` content fails to load.

### Responsive `` sizing

For security and privacy reasons, `` elements do not by default expose any information to the parent document about the size of the content in the document they are embedding.

To enable responsive sizing of `` elements based on their content, the `<meta name="responsive-embedded-sizing">` tag can be included in an embedded document to opt it in to sharing its size information with the parent document. The `frame-sizing` CSS property can then be set on the `` to cause it to adopt the same horizontal or vertical size as the embedded document's actual content size. This ensures that `` content fits seamlessly into its embedder, avoiding unnecessary scrollbars.

To resize the `` dynamically as the embedded document changes layout size, you can call the `Window.requestResize()` method from the embedded document to make it report an updated size.

## Accessibility

People navigating with assistive technology such as a screen reader can use the `title` attribute on an `` to label its content. The title's value should concisely describe the embedded content:

```html
<iframe
  title="Wikipedia page for Avocados"
  src="https://en.wikipedia.org/wiki/Avocado"></iframe>
```

Without this title, they have to navigate into the `` to determine what its embedded content is. This context shift can be confusing and time-consuming, especially for pages with multiple ``s and/or if embeds contain interactive content like video or audio.

## Examples

### A basic \

This example embeds the page at <https://example.org> in an iframe. This is a common use case of iframes: to embed content from another site. For example, the live sample itself, and the try it example at the top, are both `` embeds of content from another MDN site.

#### HTML

```html
<iframe
  src="https://example.org"
  title="iframe Example 1"
  width="400"
  height="300">
</iframe>
```

#### Result

### Embedding source code in an \

This example directly renders source code in an iframe. This can be used as a technique to prevent script injection when displaying user-generated content, when combined with the `sandbox` attribute.

Note that when using `srcdoc`, any relative URLs in the embedded content will be resolved relative to the URL of the embedding page. If you want to use anchor links that point to places in the embedded content, you need to explicitly specify `about:srcdoc` as the base URL.

#### HTML

```html
<article>
  <footer>Nine minutes ago, <i>jc</i> wrote:</footer>
  <iframe
    sandbox
    srcdoc="<p>There are two ways to use the <code>iframe</code> element:</p>
<ol>
<li><a href=&quot;about:srcdoc#embed_another&quot;>To embed content from another page</a></li>
<li><a href=&quot;about:srcdoc#embed_user&quot;>To embed user-generated content</a></li>
</ol>
<h2 id=&quot;embed_another&quot;>Embedding content from another page</h2>
<p>Use the <code>src</code> attribute to specify the URL of the page to embed:</p>
<pre><code>&amp;lt;iframe src=&quot;https://example.org&quot;&amp;gt;&amp;lt;/iframe&amp;gt;</code></pre>
<h2 id=&quot;embed_user&quot;>Embedding user-generated content</h2>
<p>Use the <code>srcdoc</code> attribute to specify the content to embed. This post is already an example!</p>
"
    width="500"
    height="250"
></iframe>
</article>
```

Here's how to write escape sequences when using `srcdoc`:

- First, write the HTML out, escaping anything you would escape in a normal HTML document (such as `<`, `>`, `&`, etc.).
- `<` and `<` represent the exact same character in the `srcdoc` attribute. Therefore, to make it an actual escape sequence in the HTML document, replace any ampersands (`&`) with `&`. For example, `<` becomes `&lt;`, and `&` becomes `&amp;`.
- Replace any double quotes (`"`) with `"` to prevent the `srcdoc` attribute from being prematurely terminated (if you use `'` instead, then you should replace `'` with `'` instead). This step happens after the previous one, so `"` generated in this step doesn't become `&quot;`.

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, embedded content, interactive content, palpable content.

       | Permitted content
       | None.

       | Tag omission
       | None, both the starting and ending tags are mandatory.

       | Permitted parents
       | Any element that accepts embedded content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       |
        `application`, `document`,
        `img`, `none`,
        `presentation`

       | DOM interface
       | `HTMLIFrameElement`

## See also

- CSP: frame-ancestors
- Privacy, permissions, and information security
- Local network access
