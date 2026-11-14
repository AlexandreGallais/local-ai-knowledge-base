---
title: "`rel` HTML attribute (part 3 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/rel/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `rel` HTML attribute (part 3 of 3)

The `rel` attribute has no default value. If the attribute is omitted or if none of the values in the attribute are supported, then the document has no particular relationship with the destination resource other than there being a hyperlink between the two. In this case, on `<link>` and `<form>`, if the `rel` attribute is absent, has no keywords, or if not one or more of the space-separated keywords above, then the element does not create any links. `` and `<area>` will still create links, but without a defined relationship.

## Value

- `alternate`
    Indicates an alternate representation of the current document. Valid for `<link>`, ``, and `<area>`, the meaning depends on the values of the other attributes.
    - With the `stylesheet` keyword on a `<link>`, it creates an alternate stylesheet.

      ```html
      <!-- a persistent style sheet -->
      <link rel="stylesheet" href="default.css" />
      <!-- alternate style sheets -->
      <link
        rel="alternate stylesheet"
        href="highcontrast.css"
        title="High contrast" />
      ```

    - With an `hreflang` attribute that differs from the document language, it indicates a translation.
    - With the `type` attribute value of `"application/rss+xml"` or `"application/atom+xml"`, it creates a hyperlink referencing a syndication feed.

      ```html
      <link
        rel="alternate"
        type="application/atom+xml"
        href="posts.xml"
        title="Blog" />
      ```

    - Otherwise, it creates a hyperlink referencing an alternate representation of the current document, whose nature is given by the `hreflang` and `type` attributes.
      - If `hreflang` is given alongside `alternate`, and the value of `hreflang` is different from the current document's language, it indicates that the referenced document is a translation.
      - If `type` is given alongside `alternate`, it indicates that the referenced document is an alternative format (such as a PDF).
      - The `hreflang` and `type` attributes may both be given alongside `alternate`.

      ```html
      <link
        rel="alternate"
        href="/fr/html/print"
        hreflang="fr"
        type="text/html"
        media="print"
        title="French HTML (for printing)" />
      <link
        rel="alternate"
        href="/fr/pdf"
        hreflang="fr"
        type="application/pdf"
        title="French PDF" />
      ```

- `author`
    Indicates the referenced document provides further information about the author of the current document or article. Relevant for `<link>`, ``, and `<area>` elements.

    With `` and `<area>`, it indicates the linked document (or `mailto:`) provides information about the author of the nearest `` ancestor if there is one, otherwise the entire document.

    With `<link>`, it represents the author of the entire document.

    > **Note:**
    > For historical reasons, the obsolete attribute value `rev="made"` is treated as `rel="author"`.

- `bookmark`
    Relevant as the `rel` attribute value for the `` and `<area>` elements. Gives a permalink for the nearest ancestor `` element, if there is one. If there is no ancestor `` element, gives a permalink for the section the linking element is most closely associated with.
- `canonical`
    Valid for `<link>`, it defines the preferred URL for the current document, which helps search engines reduce duplicate content.
- `compression-dictionary` (experimental)
    Valid for `<link>`, it defines a compression dictionary that can be used to compress future downloads for resources on this site so the download sizes of those resources are smaller than standard compression.
- `dns-prefetch`
    Relevant for the `<link>` element both in the `<body>` and `<head>`, it tells the browser to preemptively perform DNS resolution for the target resource's origin. Useful for resources the user will likely need, it helps reduce latency and thereby improves performance when the user does access the resources as the browser preemptively performed DNS resolution for the origin of the specified resource. See dns-prefetch described in resource hints.
- `external`
    Relevant to `<form>`, ``, and `<area>`, it indicates the referenced document is not part of the current site. This can be used with attribute selectors to style external links in a way that indicates to the user that they will be leaving the current site.
- `expect`
    Allows the page to be render-blocked until the essential parts of the document are parsed so it will render consistently. Note that render-blocking occurs only when supplemented with the `blocking="render"` attribute.

    > **Note:**
    > See Stabilizing page state to make cross-document transitions consistent for more information on its use.

- `help`
    Relevant to `<form>`, `<link>`, ``, and `<area>`, the `help` keyword indicates that the linked to content provides context-sensitive help, providing information for the parent of the element defining the hyperlink, and its children. When used within `<link>`, the help is for the whole document. When included with `` and `<area>` and supported, the default `cursor` will be `help` instead of `pointer`.
- `icon`
    Valid with `<link>`, the linked resource represents the icon, a resource for representing the page in the user interface, for the current document.

    The most common use for the `icon` value is the favicon:

    ```html
    <link rel="icon" href="favicon.ico" />
    ```

    If there are multiple `<link rel="icon">`s, the browser uses their `media`, `type`, and `sizes` attributes to select the most appropriate icon. If several icons are equally appropriate, the last one is used. If the most appropriate icon is later found to be inappropriate, for example because it uses an unsupported format, the browser proceeds to the next-most appropriate, and so on.

    > **Note:**
    > The `crossorigin` attribute is not supported for `rel="icon"` in Chromium-based browsers. See the open Chromium issue.

    > **Note:**
    > Apple's iOS does not use this link type, nor the `sizes` attribute, like others mobile browsers do, to select a webpage icon for Web Clip or a start-up placeholder.
    > Instead it uses the non-standard `apple-touch-icon` and `apple-touch-startup-image` respectively.

    > **Note:**
    > The `shortcut` link type is often seen before `icon`, but this link type is non-conforming, ignored and **web authors must not use it anymore**.

- `license`
    Valid on the ``, `<area>`, `<form>`, `<link>` elements, the `license` value indicates that the hyperlink leads to a document describing the licensing information; that the main content of the current document is covered by the copyright license described by the referenced document. If not inside the `<head>` element, the standard doesn't distinguish between a hyperlink applying to a specific part of the document or to the document as a whole. Only the data on the page can indicate this.

    ```html
    <link rel="license" href="#license" />
    ```

    > **Note:**
    > Although recognized, the synonym `copyright` is incorrect and must be avoided.

- `manifest`
    Web app manifest. Requires the use of the CORS protocol for cross-origin fetching.
- `modulepreload`
    Useful for improved performance, and relevant to the `<link>` anywhere in the document, setting `rel="modulepreload"` tells the browser to preemptively fetch the script (and dependencies) and store it in the document's module map for later evaluation. `modulepreload` links can ensure network fetching is done with the module ready (but not evaluated) in the module map before it is necessarily needed. See also `modulepreload`.
- `next`
    Relevant to `<form>`, `<link>`, ``, and `<area>`, the `next` values indicates that the current document is a part of a series, and that the next document in the series is the referenced document. When included in a `<link>`, browsers may assume that document will be fetched next, and treat it as a resource hint.
- `nofollow`
    Relevant to `<form>`, ``, and `<area>`, the `nofollow` keyword tells search engine spiders to ignore the link relationship. The nofollow relationship may indicate the current document's owner does not endorse the referenced document. It is often included by Search Engine Optimizers pretending their link farms are not spam pages.
- `noopener`
    Relevant to `<form>`, ``, and `<area>`, creates a top-level browsing context that is not an auxiliary browsing context if the hyperlink would create either of those to begin with (i.e., has an appropriate `target` attribute value). In other words, it makes the link behave as if `window.opener` were null and `target="_parent"` were set.

    This is the opposite of `opener`.

- `noreferrer`
    Relevant to `<form>`, ``, and `<area>`, including this value makes the referrer unknown (no `Referer` header will be included), and creates a top-level browsing context as if `noopener` were also set.
- `opener`
    Creates an auxiliary browsing context if the hyperlink would otherwise create a top-level browsing context that is not an auxiliary browsing context (i.e., has `"_blank"` as `target` attribute value). Effectively, the opposite of noopener.
- `pingback`
    Gives the address of the pingback server that handles pingbacks to the current document. See the Pingback specification.
- `preconnect`
    Provides a hint to the browser suggesting that it open a connection to the linked website in advance, without disclosing any private information or downloading any content, so that when the link is followed the linked content can be fetched more quickly.
- `prefetch`
    Specifies that the user agent should preemptively fetch and cache the target resource as it is likely to be required for a followup navigation.
    See prefetch for more information.
- `preload`
    Specifies that the user agent must preemptively fetch and cache the target resource for current navigation according to the potential destination given by the `as` attribute (and the priority associated with the corresponding destination). See the page for the `preload` value.
- `prerender` (deprecated) (non-standard)
    Specifies that the user agent should preemptively fetch the target resource and process it in a way that helps deliver a faster response in the future, for example by fetching its subresources or performing some rendering. This feature is superseded by the Speculation Rules API.
- `prev`
    Similar to the `next` keyword, relevant to `<form>`, `<link>`, ``, and `<area>`, the `prev` values indicates that the current document is a part of a series, and that the link references a previous document in the series is the referenced document.

    Note: The synonym `previous` is incorrect and should not be used.

- `privacy-policy`
    Valid for ``, `<area>`, and `<link>` elements, the `privacy-policy` value indicates that the referenced document is the Privacy Policy which describes the data collection and usage practices of the current document.

- `search`
    Relevant to `<form>`, `<link>`, ``, and `<area>` elements, the `search` keywords indicates that the hyperlink references a document whose interface is specially designed for searching in the current document, site, and related resources, providing a link to a resource that can be used to search.

    If the `type` attribute is set to `application/opensearchdescription+xml` the resource is an OpenSearch plugin that can be easily added to the interface of Firefox.

- `stylesheet`
    Valid for the `<link>` element, it imports an external resource to be used as a stylesheet. The `type` attribute is not needed if it's a `text/css` stylesheet, as that is the default value. If it's not a stylesheet of type `text/css` it is best to declare the type.

    While this attribute defines the link as being a stylesheet, the interaction with other attributes and other key terms within the rel value impact whether the stylesheet is downloaded and/or used.

    When used with the `alternate` keyword, it defines an alternative style sheet. In this case, include a non-empty `title`.

    The external stylesheet will not be used or even downloaded if the media does not match the value of the `media` attribute.

    Requires the use of the CORS protocol for cross-origin fetching.

- `tag`
    Valid for the ``, and `<area>` elements, it gives a tag (identified by the given address) that applies to the current document. The tag value denotes that the link refers to a document describing a tag applying to the document on which it is located. This link type is not meant for tags within a tag cloud, as those tags apply to a group of pages, whereas the `tag` value of the `rel` attribute is for a single document.

- `terms-of-service`
    Valid for ``, `<area>`, and `<link>` elements, the `terms-of-service` value indicates that the referenced document is the Terms of Service that describes the agreements between the current document's provider and users who wish to use the document provided.

### Non-standard values

- `apple-touch-icon`
    Specifies the icon for a web application on an iOS device.

## See also

- `HTMLLinkElement.relList`
- `HTMLAnchorElement.relList`
- `HTMLAreaElement.relList`
