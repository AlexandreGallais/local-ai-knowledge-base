---
title: "`<iframe>` HTML inline frame element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/iframe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<iframe>` HTML inline frame element

The **``** HTML element represents a nested browsing context, embedding another document into the current one.

```html
<iframe
  id="inlineFrameExample"
  title="Inline Frame Example"
  width="300"
  height="200"
  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&amp;layer=mapnik">
</iframe>
```

```css
iframe {
  border: 1px solid black;
  width: 100%; /* takes precedence over the width set with the HTML width attribute */
}
```

## Attributes

This element includes the global attributes.

- `allow`
    Specifies a Permissions Policy for the ``. The policy defines what features are available to the `` (for example, access to the microphone, camera, battery, web-share, etc.) based on the origin of the request.

    See iframes in the `Permissions-Policy` topic for examples.

    > **Note:**
    > A Permissions Policy specified by the `allow` attribute implements a further restriction on top of the policy specified in the `Permissions-Policy` header. It doesn't replace it.

- `allowfullscreen`
    Set to `true` if the `` can activate fullscreen mode by calling the `requestFullscreen()` method.

    > **Note:**
    > This attribute is considered a legacy attribute and redefined as `allow="fullscreen *"`.

- `allowpaymentrequest` (deprecated) (non-standard)
    Set to `true` if a cross-origin `` should be allowed to invoke the Payment Request API.

    > **Note:**
    > This attribute is considered a legacy attribute and redefined as `allow="payment *"`.

- `browsingtopics` (non-standard) (deprecated)
    A boolean attribute that, if present, specifies that the selected topics for the current user should be sent with the request for the ``'s source.

- `credentialless` (experimental)
    Set to `true` to make the `` credentialless, meaning that its content will be loaded in a new, ephemeral context. It doesn't have access to the network, cookies, and storage data associated with its origin. It uses a new context local to the top-level document lifetime. In return, the `Cross-Origin-Embedder-Policy` (COEP) embedding rules can be lifted, so documents with COEP set can embed third-party documents that do not. See IFrame credentialless for more details.

- `csp` (experimental)
    A Content Security Policy enforced for the embedded resource. See `HTMLIFrameElement.csp` for details.

- `height`
    The height of the frame in CSS pixels. Default is `150`.
- `loading`
    Indicates when the browser should load the iframe:
    - `eager`
        Load the iframe immediately on page load (this is the default value).
    - `lazy`
        Defer loading of the iframe until it reaches a calculated distance from the visual viewport, as defined by the browser.
        The intent is to avoid using the network and storage bandwidth required to fetch the frame until the browser is reasonably certain that it will be needed.
        This improves the performance and cost in most typical use cases, in particular by reducing initial page load times.

        Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing iframes in a page's markup such that a server can track how many iframes are requested and when.

- `name`
    A targetable name for the embedded browsing context. This can be used in the `target` attribute of the ``, `<form>`, or `<base>` elements; the `formtarget` attribute of the `` or `` elements; or the `windowName` parameter in the `window.open()` method. In addition, the name becomes a property of the `Window` and `Document` objects, containing a reference to the embedded window or the element itself.

- `privateToken` (experimental)
    Contains a string representation of an options object representing a private state token <example-value>; this object has the same structure as the `RequestInit` dictionary's `privateToken` property. IFrames containing this attribute can initiate operations such as issuing or redeeming tokens when their embedded content is loaded.

- `referrerpolicy`
    Indicates which referrer to send when fetching the frame's resource:
    - `no-referrer`
        The `Referer` header will not be sent.
    - `no-referrer-when-downgrade`
        The `Referer` header will not be sent to origins without TLS (HTTPS).
    - `origin`
        The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
    - `origin-when-cross-origin`
        The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
    - `same-origin`
        A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
    - `strict-origin`
        Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
    - `strict-origin-when-cross-origin` (default)
        Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
    - `unsafe-url`
        The referrer will include the origin _and_ the path (but not the fragment, password, or username). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.

- `sandbox`
    Controls the restrictions applied to the content embedded in the ``. The value of the attribute can either be empty to apply all restrictions, or space-separated tokens to lift particular restrictions:
    - `allow-downloads`
        Allows downloading files through an `` or `<area>` element with the download attribute, as well as through the navigation that leads to a download of a file. This works regardless of whether the user clicked on the link, or JS code initiated it without user interaction.
    - `allow-forms`
        Allows the page to submit forms. If this keyword is not used, a form will be displayed as normal, but submitting it will not trigger input validation, send data to a web server, or close a dialog.
    - `allow-modals`
        Allows the page to open modal windows by `Window.alert()`, `Window.confirm()`, `Window.print()` and `Window.prompt()`, while opening a `<dialog>` is allowed regardless of this keyword. It also allows the page to receive `BeforeUnloadEvent` event.
    - `allow-orientation-lock`
        Lets the resource lock the screen orientation.
    - `allow-pointer-lock`
        Allows the page to use the Pointer Lock API.
    - `allow-popups`
        Allows popups (created, for example, by `Window.open()` or `target="_blank"`). If this keyword is not used, such functionality will silently fail.
    - `allow-popups-to-escape-sandbox`
        Allows a sandboxed document to open a new browsing context without forcing the sandboxing flags upon it. This will allow, for example, a third-party advertisement to be safely sandboxed without forcing the same restrictions upon the page the ad links to. If this flag is not included, a redirected page, popup window, or new tab will be subject to the same sandbox restrictions as the originating ``.
    - `allow-presentation`
        Allows embedders to have control over whether an iframe can start a presentation session.
    - `allow-same-origin`
        If this token is not used, the resource is treated as being from a special origin that always fails the same-origin policy (potentially preventing access to data storage/cookies and some JavaScript APIs).
        > **Note:**
        > When `allow-same-origin` is present, a same-origin parent document can still access and interact with the iframe's DOM even if `allow-scripts` is not set. The `allow-scripts` token only controls script execution within the embedded browsing context and does not affect DOM access from the parent.
    - `allow-scripts`
        Allows the page to run scripts (but not create pop-up windows). If this keyword is not used, this operation is not allowed.
    - `allow-storage-access-by-user-activation` (experimental)
        Allows a document loaded in the `` to use the `Storage Access API` to request access to unpartitioned cookies.
    - `allow-top-navigation`
        Lets the resource navigate the top-level browsing context (the one named `_top`).
    - `allow-top-navigation-by-user-activation`
        Lets the resource navigate the top-level browsing context, but only if initiated by a user gesture.
    - `allow-top-navigation-to-custom-protocols`
        Allows navigations to non-`http` protocols built into browser or registered by a website. This feature is also activated by `allow-popups` or `allow-top-navigation` keyword.

    > **Note:**
    >
    > - The `sandbox` attribute can block the browser's built-in PDF viewer. See Embedding PDFs.
    > - When the embedded document has the same origin as the embedding page, it is **strongly discouraged** to use both `allow-scripts` and `allow-same-origin`, as that lets the embedded document remove the `sandbox` attribute — making it no more secure than not using the `sandbox` attribute at all.
    > - Sandboxing is useless if the attacker can display content outside a sandboxed `iframe` — such as if the viewer opens the frame in a new tab. Such content should be also served from a _separate origin_ to limit potential damage.

    > **Note:**
    > When redirecting the user, opening a popup window, or opening a new tab from an embedded page within an `` with the `sandbox` attribute, the new browsing context is subject to the same `sandbox` restrictions. This can create issues — for example, if a page embedded within an `` without a `sandbox="allow-forms"` or `sandbox="allow-popups-to-escape-sandbox"` attribute set on it opens a new site in a separate tab, form submission in that new browsing context will silently fail.

- `src`
    The URL of the page to embed. Use a value of `about:blank` to embed an empty page that conforms to the same-origin policy. Also note that programmatically removing an ``'s src attribute (e.g., via `Element.removeAttribute()`) causes `about:blank` to be loaded in the frame in Firefox (from version 65), Chromium-based browsers, and Safari/iOS.

    > **Note:**
    > The `about:blank` page uses the embedding document's URL as its base URL when resolving any relative URLs, such as anchor links.

- `srcdoc`
    Inline HTML to embed, overriding the `src` attribute. Its content should follow the syntax of a full HTML document, which includes the doctype directive, `<html>`, `<body>` tags, etc., although most of them can be omitted, leaving only the body content. This doc will have `about:srcdoc` as its location. If a browser does not support the `srcdoc` attribute, it will fall back to the URL in the `src` attribute.

    > **Note:**
    > The `about:srcdoc` page uses the embedding document's URL as its base URL when resolving any relative URLs, such as anchor links.

- `width`
    The width of the frame in CSS pixels. Default is `300`.

### Deprecated attributes

These attributes are deprecated and may no longer be supported by all user agents. You should not use them in new content, and try to remove them from existing content.

- `align` (deprecated)
    The alignment of this element with respect to the surrounding context.
- `frameborder` (deprecated)
    The value `1` (the default) draws a border around this frame. The value `0` removes the border around this frame, but you should instead use the CSS property `border` to control `` borders.
- `longdesc` (deprecated)
    A URL of a long description of the frame's content. Due to widespread misuse, this is not helpful for non-visual browsers.
- `marginheight` (deprecated)
    The amount of space in pixels between the frame's content and its top and bottom borders.
- `marginwidth` (deprecated)
    The amount of space in pixels between the frame's content and its left and right borders.
- `scrolling` (deprecated)
    Indicates when the browser should provide a scrollbar for the frame:
    - `auto`
        Only when the frame's content is larger than its dimensions.
    - `yes`
        Always show a scrollbar.
    - `no`
        Never show a scrollbar.
