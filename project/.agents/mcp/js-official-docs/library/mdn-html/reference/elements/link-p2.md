---
title: "`<link>` HTML external resource link element (part 2 of 3)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/link/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<link>` HTML external resource link element (part 2 of 3)

## Attributes

This element includes the global attributes.

- `as`
    This attribute is required when `rel="preload"` has been set on the `<link>` element, optional when `rel="modulepreload"` has been set, and otherwise should not be used.
    It specifies the type of content being loaded by the `<link>`, which is necessary for request matching, application of correct content security policy, and setting of correct `Accept` request header.

    Furthermore, `rel="preload"` uses this as a signal for request prioritization.
    The table below lists the valid values for this attribute and the elements or resources they apply to.

           | `As` value
           | `Rel` value
           | Applies To

           | audioworklet
           | modulepreload
           | AudioWorklet modules

           | fetch
           | preload
           |
            fetch, XHR

                Note: This value also requires
                `&#x3C;link>` to contain the crossorigin attribute, see CORS-enabled fetches.

           | font
           | preload
           |
            CSS @font-face

                Note: This value also requires
                `&#x3C;link>` to contain the crossorigin attribute, see CORS-enabled fetches.

           | image
           | preload
           |
            `&#x3C;img>` and `&#x3C;picture>` elements with
            srcset or imageset attributes, SVG `&#x3C;image>` elements,
            CSS `*-image` rules

           | json
           | modulepreload
           |
            Supplementary JSON file

           | paintworklet
           | modulepreload
           | PaintWorklet modules

           | script
           | preload or modulepreload
           |
            `&#x3C;script>` elements, Worker `importScripts`, and `modulepreload` destinations.

           | serviceworker
           | modulepreload
           | ServiceWorker modules

           | sharedworker
           | modulepreload
           | SharedWorker

           | style
           | preload or modulepreload
           |
            `&#x3C;link rel=stylesheet>` elements, CSS
            `@import` and `modulepreload` destinations.

           | text
           | modulepreload
           | Supplementary plain text file

           | track
           | preload
           | `&#x3C;track>` elements (WebVTT, MIME type `text/vtt`)

           | worker
           | modulepreload
           | Worker modules

- `blocking`
    This attribute explicitly indicates that certain operations should be blocked until specific conditions are met. It must only be used when the `rel` attribute contains the `expect` or `stylesheet` keywords. With `rel="<example-value>"`, it indicates that operations should be blocked until a specific DOM node has been parsed. With `rel="<example-value>"`, it indicates that operations should be blocked until an external stylesheet and its critical subresources have been fetched and applied to the document. The operations that are to be blocked must be a space-separated list of blocking tokens listed below. Currently there is only one token:
    - `render`: The rendering of content on the screen is blocked.

    > **Note:**
    > Only `link` elements in the document's `<head>` can possibly block rendering. By default, a `link` element with `rel="stylesheet"` in the `<head>` blocks rendering when the browser discovers it during parsing. If such a `link` element is added dynamically via script, you must additionally set `blocking = "render"` for it to block rendering.

- `crossorigin`
    This enumerated attribute indicates whether CORS must be used when fetching the resource.
    CORS-enabled images can be reused in the `<canvas>` element without being _tainted_.
    The allowed values are:
    - `anonymous`
        A cross-origin request (i.e., with an `Origin` HTTP header) is performed, but no credential is sent (i.e., no cookie, X.509 certificate, or HTTP Basic <example-value>).
        If the server does not give credentials to the origin site (by not setting the `Access-Control-Allow-Origin` HTTP header) the resource will be tainted and its usage restricted.
    - `use-credentials`
        A cross-origin request (i.e., with an `Origin` HTTP header) is performed along with a credential sent (i.e., a cookie, certificate, and/or HTTP Basic <example-value> is performed).
        If the server does not give credentials to the origin site (through `Access-Control-Allow-Credentials` HTTP header), the resource will be _tainted_ and its usage restricted.

    If the attribute is not present, the resource is fetched without a CORS request (i.e., without sending the `Origin` HTTP header), preventing its non-tainted usage. If invalid, it is handled as if the enumerated keyword **anonymous** was used.
    See CORS settings attributes for additional information.

- `disabled`
    For `rel="stylesheet"` only, the `disabled` Boolean attribute indicates whether the described stylesheet should be loaded and applied to the document.
    If `disabled` is specified in the HTML when it is loaded, the stylesheet will not be loaded during page load.
    Instead, the stylesheet will be loaded on-demand, if and when the `disabled` attribute is changed to `false` or removed.

    Setting the `disabled` property in the DOM causes the stylesheet to be removed from the document's `Document.styleSheets` list.

- `fetchpriority`
    Provides a hint of the relative priority to use when fetching a resource of a particular type. Allowed values:
    - `high`
        Fetch the resource at a high priority relative to other resources of the same type.
    - `low`
        Fetch the resource at a low priority relative to other resources of the same type.
    - `auto`
        Don't set a preference for the fetch priority.
        This is the default.
        It is used if no value or an invalid value is set.
- `href`
    This attribute specifies the URL of the linked resource. A URL can be absolute or relative.
- `hreflang`
    This attribute indicates the language of the linked resource.
    It is purely advisory.
    Values should be valid BCP 47 language tags.
    Use this attribute only if the `href` attribute is present.
- `imagesizes`
    For `rel="preload"` and `as="image"` only, the `imagesizes` attribute has similar syntax and semantics as the `sizes` attribute that indicates to preload the appropriate resource used by an `img` element with corresponding values for its `srcset` and `sizes` attributes.
- `imagesrcset`
    For `rel="preload"` and `as="image"` only, the `imagesrcset` attribute has similar syntax and semantics as the `srcset` attribute that indicates to preload the appropriate resource used by an `img` element with corresponding values for its `srcset` and `sizes` attributes.
- `integrity`
    This attribute contains one or more hashes of the resource. It is used to ensure that the content of the resource is what the developer expects it to be, and has not been replaced with a malicious copy in a supply chain attack. The attribute must only be specified when the `rel` attribute is set to `stylesheet`, `preload`, or `modulepreload`.
    See Subresource Integrity.
- `media`
    This attribute specifies the media that the linked resource applies to. Its value must be a media type / media query.
    This attribute is mainly useful when linking to external stylesheets — it allows the user agent to pick the best adapted one for the device it runs on.

- `referrerpolicy`
    A string indicating which referrer to use when fetching the resource. For detailed explanations and examples of each policy, see the `Referrer-Policy` header documentation.
    - `no-referrer` means that the `Referer` header will not be sent.
    - `no-referrer-when-downgrade` means that no `Referer` header will be sent when navigating to an origin without TLS (HTTPS).
      This is a user agent's default behavior, if no policy is otherwise specified.
    - `origin` means that the referrer will be the origin of the page, which is roughly the scheme, the host, and the port.
    - `origin-when-cross-origin` means that navigating to other origins will be limited to the scheme, the host, and the port, while navigating on the same origin will include the referrer's path.
    - `same-origin` means that the referrer (origin, path, and query string) is sent for same-origin requests, but no referrer is sent for cross-origin requests.
    - `strict-origin` means that only the origin is sent when the protocol security level stays the same (HTTPS→HTTPS). No referrer is sent to less secure destinations (HTTPS→HTTP). This is important for HTTPS pages because it prevents leaking referrer information to insecure origins.
    - `strict-origin-when-cross-origin` means that the full referrer is sent for same-origin requests. For cross-origin requests, only the origin is sent when the protocol stays the same (HTTPS→HTTPS), and no referrer is sent when downgrading to HTTP. This is the default value, which balances functionality with privacy and security for HTTPS sites.
    - `unsafe-url` means that the referrer will include the origin and the path (but not the fragment, password, or username).
      This case is unsafe because it can leak origins and paths from TLS-protected resources to insecure origins.

- `rel`
    This attribute names a relationship of the linked document to the current document. The attribute must be a space-separated list of link type values.
- `sizes`
    This attribute defines the sizes of the icons for visual media contained in the resource.
    It must be present only if the `rel` contains a value of `icon` or a non-standard type such as Apple's `apple-touch-icon`.
    It may have the following values:
    - `any`, meaning that the icon can be scaled to any size as it is in a vector format, like `image/svg+xml`.
    - a white-space separated list of sizes, each in the format `<width in pixels>x<height in pixels>` or `<width in pixels>X<height in pixels>`. Each of these sizes must be contained in the resource.

    > **Note:**
    > Most icon formats are only able to store one single icon; therefore, most of the time, the `sizes` attribute contains only one entry.
    > Microsoft's ICO format and Apple's ICNS format can store multiple icon sizes in a single file. ICO has better browser support, so you should use this format if cross-browser support is a concern.

- `title`
    The `title` attribute has special semantics on the `<link>` element.
    When used on a `<link rel="stylesheet">` it defines a default or an alternate stylesheet.
- `type`
    This attribute is used to define the type of the content linked to.
    The value of the attribute should be a MIME type such as **text/html**, **text/css**, and so on.
    The common use of this attribute is to define the type of stylesheet being referenced (such as **text/css**), but given that CSS is the only stylesheet language used on the web, not only is it possible to omit the `type` attribute, but is actually now recommended practice.
    It is also used on `rel="preload"` link types, to make sure the browser only downloads file types that it supports.

### Non-standard attributes

- `target` (deprecated)
    Defines the frame or window name that has the defined linking relationship or that will show the rendering of any linked resource.

### Obsolete attributes

- `charset` (deprecated)
    This attribute defines the character encoding of the linked resource.
    The value is a space- and/or comma-delimited list of character sets as defined in .
    The default value is `iso-8859-1`.

    > **Note:**
    > To produce the same effect as this obsolete attribute, use the `Content-Type` HTTP header on the linked resource.

- `rev` (deprecated)
    The value of this attribute shows the relationship of the current document to the linked document, as defined by the `href` attribute.
    The attribute thus defines the reverse relationship compared to the value of the `rel` attribute.
    Link type values for the attribute are similar to the possible values for `rel`.

    > **Note:**
    > Instead of `rev`, you should use the `rel` attribute with the opposite link type value.
    > For example, to establish the reverse link for `made`, specify `author`. Also, this attribute doesn't stand for "revision" and must not be used with a version number, even though many sites misuse it in this way.
