---
title: "`<a>` HTML anchor element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/a/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<a>` HTML anchor element

The **``** HTML element (or _anchor_ element), with its `href` attribute, creates a hyperlink to web pages, files, email addresses, locations in the same page, or anything else a URL can address.

Content within each `` _should_ indicate the link's destination. If the `href` attribute is present, pressing the enter key while focused on the `` element will activate it.

```html
<p>You can reach Michael at:</p>

<ul>
  <li><a href="https://example.com">Website</a></li>
  <li><a href="mailto:user@example.com">Email</a></li>
  <li><a href="tel:+123456789">Phone</a></li>
</ul>
```

```css
li {
  margin-bottom: 0.5rem;
}
```

## Attributes

This element's attributes include the global attributes.

- `attributionsrc` (deprecated) (non-standard)
    Specifies that you want the browser to send an `Attribution-Reporting-Eligible` header. On the server-side this is used to trigger sending an `Attribution-Reporting-Register-Source` header in the response, to register a navigation-based attribution source.

    The browser stores the source data associated with the navigation-based attribution source (as provided in the `Attribution-Reporting-Register-Source` response header) when the user clicks the link. See the Attribution Reporting API for more details.

    There are two versions of this attribute that you can set:
    - Boolean, i.e., just the `attributionsrc` name. This specifies that you want the `Attribution-Reporting-Eligible` header sent to the same server as the `href` attribute points to. This is fine when you are handling the attribution source registration on the same server.
    - Value containing one or more URLs, for example:

      ```html
      attributionsrc="https://a.example/register-source
      https://b.example/register-source"
      ```

      This is useful in cases where the requested resource is not on a server you control, or you just want to handle registering the attribution source on a different server. In this case, you can specify one or more URLs as the value of `attributionsrc`. When the resource request occurs, the `Attribution-Reporting-Eligible` header will be sent to the URL(s) specified in `attributionsrc` in addition to the resource origin. These URLs can then respond with the `Attribution-Reporting-Register-Source` to complete registration.

      > **Note:**
      > Specifying multiple URLs means that multiple attribution sources can be registered on the same feature. You might for example have different campaigns that you are trying to measure the success of, which involve generating different reports on different data.

    `` elements cannot be used as attribution triggers, only sources.

- `download`
    Causes the browser to treat the linked URL as a download. Can be used with or without a `filename` value:
    - Without a value, the browser will suggest a filename/extension, generated from various sources:
      - The `Content-Disposition` HTTP header
      - The final segment in the URL path
      - The media type (from the `Content-Type` header, the start of a `data:` URL, or `Blob.type` for a `blob:` URL)

    - `filename`: defining a value suggests it as the filename. `/` and `\` characters are converted to underscores (`_`). Filesystems may forbid other characters in filenames, so browsers will adjust the suggested name if necessary. This adjustment happens when the download is triggered and is not observable via the `HTMLAnchorElement.download` property.

    > **Note:**
    >
    > - `download` only works for same-origin URLs, same-origin `blob:`, and `data:` schemes. For other URLs, the `download` attribute is ignored and a normal navigation happens, although the target page may still use `Content-Disposition` to instruct a download.
    > - How browsers treat downloads varies by browser, user settings, and other factors. The user may be prompted before a download starts, or the file may be saved automatically, or it may open automatically, either in an external application or in the browser itself.
    > - The `download` attribute, when honored, overrides the `Content-Disposition: inline` behavior, but the `filename` parameter of `Content-Disposition` overrides the name in the `download` attribute.

- `href`
    The URL that the hyperlink points to. Links are not restricted to HTTP-based URLs — they can use any URL scheme supported by browsers:
    - Telephone numbers with `tel:` URLs
    - Email addresses with `mailto:` URLs
    - SMS text messages with `sms:` URLs
    - Executable code with `javascript:` URLs
    - While web browsers may not support other URL schemes, websites can with `registerProtocolHandler()`

    Moreover other URL features can locate specific parts of the resource, including:
    - Sections of a page with document fragments
    - Specific text portions with text fragments
    - Pieces of media files with media fragments

- `hreflang`
    Hints at the human language of the linked URL. No built-in functionality. Allowed values are the same as the global `lang` attribute.
- `interestfor` (experimental) (non-standard)
    Defines the `` element as an **interest invoker**. Its value is the `id` of the target element, which will be affected in some way (normally shown or hidden) when interest is shown or lost on the invoker element (for example, by hovering/unhovering or focusing/blurring it). See Using interest invokers for more details and examples.
- `ping`
    A space-separated list of URLs. When the link is followed, the browser will send `POST` requests with the body `PING` to the URLs. Typically for tracking.
- `referrerpolicy`
    How much of the referrer to send when fetching the linked resource.
    - `no-referrer`: The `Referer` header will not be sent.
    - `no-referrer-when-downgrade`: The `Referer` header will not be sent to origins without TLS (HTTPS).
    - `origin`: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
    - `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
    - `same-origin`: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
    - `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
    - `strict-origin-when-cross-origin` (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
    - `unsafe-url`: The referrer will include the origin _and_ the path (but not the fragment, password, or username). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.

- `rel`
    The relationship of the linked URL as space-separated link types.
- `target`
    Where to display the linked URL, as the name for a _browsing context_ (a tab, window, or ``). The following keywords have special meanings for where to load the URL:
    - `_self`: The current browsing context. (Default)
    - `_blank`: Usually a new tab, but users can configure browsers to open a new window instead.
    - `_parent`: The parent browsing context of the current one. If no parent, behaves as `_self`.
    - `_top`: The topmost browsing context. To be specific, this means the "highest" context that's an ancestor of the current one. If no ancestors, behaves as `_self`.
    - `_unfencedTop`: Allows embedded fenced frames to navigate the top-level frame (i.e., traversing beyond the root of the fenced frame, unlike other reserved destinations). Note that the navigation will still succeed if this is used outside of a fenced frame context, but it will not act like a reserved keyword.

    > **Note:**
    > Setting `target="_blank"` on `` elements implicitly provides the same `rel` behavior as setting `rel="noopener"` which does not set `window.opener`.

- `type`
    Hints at the linked URL's format with a MIME type. No built-in functionality.

### Deprecated attributes

- `charset` (deprecated)
    Hinted at the character encoding of the linked URL.

    > **Note:**
    > This attribute is deprecated and **should not be used by authors**. Use the HTTP `Content-Type` header on the linked URL.

- `coords` (deprecated)
    Used with the `shape` attribute. A comma-separated list of coordinates.
- `name` (deprecated)
    Was required to define a possible target location in a page. In HTML 4.01, `id` and `name` could both be used on ``, as long as they had identical values.

    > **Note:**
    > Use the global attribute `id` instead.

- `rev` (deprecated)
    Specified a reverse link; the opposite of the `rel` attribute. Deprecated for being very confusing.
- `shape` (deprecated)
    The shape of the hyperlink's region in an image map.

    > **Note:**
    > Use the `<area>` element for image maps instead.

## Accessibility

### Strong link text

**The content inside a link should indicate where the link goes**, even out of context.

#### Inaccessible, weak link text

A sadly common mistake is to only link the words "click here" or "here":

```html
<p>Learn more about our products <a href="/products">here</a>.</p>
```

##### Result

#### Accessible, strong link text

Luckily, this is an easy fix, and it's actually shorter than the inaccessible version!

```html
<p>Learn more <a href="/products">about our products</a>.</p>
```

##### Result

Assistive software has shortcuts to list all links on a page. However, strong link text benefits all users — the "list all links" shortcut emulates how sighted users quickly scan pages.

### onclick events

Anchor elements are often abused as fake buttons by setting their `href` to `#` or `javascript:void(0)` to prevent the page from refreshing, then listening for their `click` events.

These bogus `href` values cause unexpected behavior when copying/dragging links, opening links in a new tab/window, bookmarking, or when JavaScript is loading, errors, or is disabled. They also convey incorrect semantics to assistive technologies, like screen readers.

Use a `` instead. In general, **you should only use a hyperlink for navigation to a real URL**.

### External links and linking to non-HTML resources

Links that open in a new tab/window via `target="_blank"`, or links that point to a download file should indicate what will happen when the link is followed.

People experiencing low vision conditions, navigating with the aid of screen reading technology, or with cognitive concerns may be confused when a new tab, window, or application opens unexpectedly. Older screen-reading software may not even announce the behavior.

#### Link that opens a new tab/window

```html
<a target="_blank" href="https://www.wikipedia.org">
  Wikipedia (opens in new tab)
</a>
```

##### Result

#### Link to a non-HTML resource

If an icon is used to signify link behavior, make sure it has an `alt` attribute to describe its purpose. In case the icon is missing, the `alt` attribute's content will still convey the link's behavior.

```html
<p>
  <a href="https://www.wikipedia.org/" target="_blank">
    Wikipedia
    <img src="new-tab.svg" width="14" alt="(Opens in new tab)" />
  </a>
  <br />
  <a href="2017-annual-report.ppt">
    2017 annual report
    <img src="powerpoint.svg" width="14" alt="(PowerPoint file)" />
  </a>
</p>
<p>
  <a href="https://www.wikipedia.org/" target="_blank">
    Wikipedia
    <img src="missing-icon.svg" width="14" alt="(Opens in new tab)" />
  </a>
  <br />
  <a href="2017-annual-report.ppt">
    2017 annual report
    <img src="missing-icon.svg" width="14" alt="(PowerPoint file)" />
  </a>
</p>
```

##### Result

- WebAIM: Links and Hypertext - Hypertext Links
- MDN / Understanding WCAG, Guideline 3.2
- G200: Opening new windows and tabs from a link only when necessary
- G201: Giving users advanced warning when opening a new window

### Skip links

A **skip link** is a link placed as early as possible in `<body>` content that points to the beginning of the page's main content. Usually, CSS hides a skip link offscreen until focused.

```html
<body>
  <a href="#content" class="skip-link">Skip to main content</a>

  <header>…</header>

  <!-- The skip link jumps to here -->
  <main id="content"></main>
</body>
```

```css
.skip-link {
  position: absolute;
  top: -3em;
  background: white;
}
.skip-link:focus {
  top: 0;
}
```

#### Result

Skip links let keyboard users bypass <example-value> repeated throughout multiple pages, such as header navigation.

Skip links are especially useful for people who navigate with the aid of assistive technology such as switch control, voice command, or mouth sticks/head wands, where the act of moving through repetitive links can be laborious.

- WebAIM: "Skip Navigation" Links
- How-to: Use Skip Navigation links
- MDN / Understanding WCAG, Guideline 2.4 explanations
- Understanding Success Criterion 2.4.1

### Size and proximity

#### Size

Interactive elements, like links, should provide an area large enough that it is easy to activate them. This helps a variety of people, including those with motor control issues and those using imprecise inputs such as a touchscreen. A minimum size of 44×44 CSS pixels is recommended.

Text-only links in prose content are exempt from this requirement, but it's still a good idea to make sure enough text is hyperlinked to be easily activated.

- Understanding Success Criterion 2.5.5: Target Size
- Target Size and 2.5.5
- Quick test: Large touch targets

#### Proximity

Interactive elements, like links, placed in close visual proximity should have space separating them. Spacing helps people with motor control issues, who may otherwise accidentally activate the wrong interactive content.

Spacing may be created using CSS properties like `margin`.

- Hand tremors and the giant-button-problem
