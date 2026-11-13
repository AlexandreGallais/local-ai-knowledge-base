---
title: "`<script>` HTML script element (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/script/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<script>` HTML script element

The **`<script>`** HTML element is used to embed executable code or data; this is typically used to embed or refer to JavaScript code. The `<script>` element can also be used with other languages, such as WebGL's GLSL shader programming language and JSON.

## Attributes

This element includes the global attributes.

- `async`
    For classic scripts, if the `async` attribute is present, then the classic script will be fetched in parallel to parsing and evaluated as soon as it is available.

    For module scripts, if the `async` attribute is present then the scripts and all their dependencies will be fetched in parallel to parsing and evaluated as soon as they are available.

    > **Warning:**
    > This attribute must not be used if the `src` attribute is absent (i.e., for inline scripts) for classic scripts, in this case it would have no effect.

    This attribute allows the elimination of **parser-blocking JavaScript** where the browser would have to load and evaluate scripts before continuing to parse. `defer` has a similar effect in this case.

    If the attribute is specified with the `defer` attribute, the element will act as if only the `async` attribute is specified.

    This is a boolean attribute: the presence of a boolean attribute on an element represents the true value, and the absence of the attribute represents the false value.

    See Browser compatibility for notes on browser support. See also Async scripts for asm.js.

- `attributionsrc` (deprecated) (non-standard)
    Specifies that you want the browser to send an `Attribution-Reporting-Eligible` header along with the script resource request. On the server-side this is used to trigger sending an `Attribution-Reporting-Register-Source` or `Attribution-Reporting-Register-Trigger` header in the response, to register a JavaScript-based attribution source or attribution trigger, respectively. Which response header should be sent back depends on the value of the `Attribution-Reporting-Eligible` header that triggered the registration.

    > **Note:**
    > Alternatively, JavaScript-based attribution sources or triggers can be registered by sending a `fetch()` request containing the `attributionReporting` option (either set directly on the `fetch()` call or on a `Request` object passed into the `fetch()` call), or by sending an `XMLHttpRequest` with `setAttributionReporting()` invoked on the request object.

    There are two versions of this attribute that you can set:
    - Boolean, i.e., just the `attributionsrc` name. This specifies that you want the `Attribution-Reporting-Eligible` header sent to the same server as the `src` attribute points to. This is fine when you are handling the attribution source or trigger registration on the same server. When registering an attribution trigger this property is optional, and an empty string value will be used if it is omitted.
    - Value containing one or more URLs, for example:

      ```html
      <script
        src="myscript.js"
        attributionsrc="https://a.example/register-source https://b.example/register-source"></script>
      ```

      This is useful in cases where the requested resource is not on a server you control, or you just want to handle registering the attribution source on a different server. In this case, you can specify one or more URLs as the value of `attributionsrc`. When the resource request occurs the `Attribution-Reporting-Eligible` header will be sent to the URL(s) specified in `attributionSrc` in addition to the resource origin. These URLs can then respond with an `Attribution-Reporting-Register-Source` or `Attribution-Reporting-Register-Trigger` header as appropriate to complete registration.

      > **Note:**
      > Specifying multiple URLs means that multiple attribution sources can be registered on the same feature. You might for example have different campaigns that you are trying to measure the success of, which involve generating different reports on different data.

    See the Attribution Reporting API for more details.

- `blocking`
    This attribute explicitly indicates that certain operations should be blocked until the script has executed. The operations that are to be blocked must be a space-separated list of blocking tokens. Currently there is only one token:
    - `render`: The rendering of content on the screen is blocked.

    > **Note:**
    > Only `script` elements in the document's `<head>` can possibly block rendering. Scripts are not render-blocking by default; if a `script` element does not include `type="module"`, `async`, or `defer`, then it blocks _parsing_, not _rendering_. If such a `script` element is added dynamically via script, you must set `blocking = "render"` for it to block rendering.

- `crossorigin`
    Normal `script` elements pass <example-value> information to the `window.onerror` for scripts which do not pass the standard CORS checks. To allow error logging for sites which use a separate domain for static media, use this attribute. See CORS settings attributes for a more descriptive explanation of its valid arguments.
- `defer`
    This Boolean attribute is set to indicate to a browser that the script is meant to be executed after the document has been parsed, but before firing `DOMContentLoaded` event.

    Scripts with the `defer` attribute will prevent the `DOMContentLoaded` event from firing until the script has loaded and finished evaluating.

    > **Warning:**
    > This attribute must not be used if the `src` attribute is absent (i.e., for inline scripts), in this case it would have no effect.
    >
    > The `defer` attribute has no effect on module scripts — they defer by default.

    Scripts with the `defer` attribute will execute in the order in which they appear in the document.

    This attribute allows the elimination of **parser-blocking JavaScript** where the browser would have to load and evaluate scripts before continuing to parse. `async` has a similar effect in this case.

    If the attribute is specified with the `async` attribute, the element will act as if only the `async` attribute is specified.

- `fetchpriority`
    Provides a hint of the relative priority to use when fetching an external script. Allowed values:
    - `high`
        Fetch the external script at a high priority relative to other external scripts.
    - `low`
        Fetch the external script at a low priority relative to other external scripts.
    - `auto`
        Don't set a preference for the fetch priority.
        This is the default.
        It is used if no value or an invalid value is set.
- `integrity`
    This attribute contains one or more hashes of the script. It is used to ensure that the content of the script is what the developer expects it to be, and has not been replaced with a malicious script in a supply chain attack. The attribute must not be specified when the `src` attribute is absent. See also Subresource Integrity.
- `nomodule`
    This Boolean attribute is set to indicate that the script should not be executed in browsers that support ES modules — in effect, this can be used to serve fallback scripts to older browsers that do not support modular JavaScript code.
- `nonce`
    A cryptographic nonce (number used once) to allow scripts in a script-src Content-Security-Policy. The server must generate a unique nonce value each time it transmits a policy. It is critical to provide a nonce that cannot be guessed as bypassing a resource's policy is otherwise trivial.
- `referrerpolicy`
    Indicates which referrer to send when fetching the script, or resources fetched by the script:
    - `no-referrer`: The `Referer` header will not be sent.
    - `no-referrer-when-downgrade`: The `Referer` header will not be sent to origins without TLS (HTTPS).
    - `origin`: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
    - `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
    - `same-origin`: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
    - `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
    - `strict-origin-when-cross-origin` (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
    - `unsafe-url`: The referrer will include the origin _and_ the path (but not the fragment, password, or username). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.

    > **Note:**
    > An empty string value (`""`) is both the default value, and a fallback value if `referrerpolicy` is not supported. If `referrerpolicy` is not explicitly specified on the `<script>` element, it will adopt a higher-level referrer policy, i.e., one set on the whole document or domain. If a higher-level policy is not available, the empty string is treated as being equivalent to `strict-origin-when-cross-origin`.

- `src`
    This attribute specifies the URI of an external script; this can be used as an alternative to embedding a script directly within a document.
- `type`
    This attribute indicates the type of script represented.
    The value of this attribute will be one of the following:
    - **Attribute is not set (default), an empty string, or a JavaScript MIME type**
        Indicates that the script is a "classic script", containing JavaScript code.
        Authors are encouraged to omit the attribute if the script refers to JavaScript code rather than specify a MIME type.
        JavaScript MIME types are listed in the IANA media types specification.
    - `importmap`
        This value indicates that the body of the element contains an import map.
        The import map is a JSON object that developers can use to control how the browser resolves module specifiers when importing JavaScript modules.
    - `module`
        This value causes the code to be treated as a JavaScript module.
        The processing of the script contents is deferred.
        The `charset` and `defer` attributes have no effect.
        For information on using `module`, see our JavaScript modules guide.
        Unlike classic scripts, module scripts require the use of the CORS protocol for cross-origin fetching.
    - `speculationrules` (experimental)
        This value indicates that the body of the element contains speculation rules.
        Speculation rules take the form of a JSON object that determine what resources should be prefetched or prerendered by the browser. This is part of the `Speculation Rules API`.
    - **Any other value**
        The embedded content is treated as a data block, and won't be processed by the browser.
        Developers must use a valid MIME type that is not a JavaScript MIME type to denote data blocks.
        All of the other attributes will be ignored, including the `src` attribute.

### Deprecated attributes

- `charset` (deprecated)
    If present, its value must be an ASCII case-insensitive match for `utf-8`. It's unnecessary to specify the `charset` attribute, because documents must use UTF-8, and the `script` element inherits its character encoding from the document.
- `language` (deprecated) (non-standard)
    Like the `type` attribute, this attribute identifies the scripting language in use. Unlike the `type` attribute, however, this attribute's possible values were never standardized. The `type` attribute should be used instead.

## Notes

Scripts without `async`, `defer` or `type="module"` attributes, as well as inline scripts without the `type="module"` attribute, are fetched and executed immediately before the browser continues to parse the page.

The script should be served with the `text/javascript` MIME type, but browsers are lenient and only block them if the script is served with an image type (`image/*`), a video type (`video/*`), an audio type (`audio/*`), or `text/csv`.
If the script is blocked, an `error` event is sent to the element; otherwise, a `load` event is sent.
