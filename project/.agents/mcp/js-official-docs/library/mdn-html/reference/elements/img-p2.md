---
title: "`<img>` HTML image embed element (part 2 of 4)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/img/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<img>` HTML image embed element (part 2 of 4)

## Attributes

This element includes the global attributes.

- `alt`
    Defines text that can replace the image in the page.

    > **Note:**
    > Browsers do not always display images. There are a number of situations in which a browser might not display images, such as:
    >
    > - Non-visual browsers (such as those used by people with visual impairments)
    > - The user chooses not to display images (saving bandwidth, privacy reasons)
    > - The image is invalid or an unsupported type
    >
    > In these cases, the browser may replace the image with the text in the element's `alt` attribute. For these reasons and others, provide a useful value for `alt` whenever possible.

    Setting this attribute to an empty string (`alt=""`) indicates that this image is _not_ a key part of the content (it's decoration or a tracking pixel), and that non-visual browsers may omit it from rendering. Visual browsers will also hide the broken image icon if the `alt` attribute is empty and the image failed to display.

    This attribute is also used when copying and pasting the image to text, or saving a linked image to a bookmark.

- `attributionsrc` (deprecated) (non-standard)
    Specifies that you want the browser to send an `Attribution-Reporting-Eligible` header along with the image request.

    On the server-side this is used to trigger sending an `Attribution-Reporting-Register-Source` or `Attribution-Reporting-Register-Trigger` header in the response, to register an image-based attribution source or attribution trigger, respectively. Which response header should be sent back depends on the value of the `Attribution-Reporting-Eligible` header that triggered the registration.

    The corresponding source or trigger event is set off once the browser receives the response containing the image file.

    > **Note:**
    > See the Attribution Reporting API for more details.

    There are two versions of this attribute that you can set:
    - Boolean, i.e., just the `attributionsrc` name. This specifies that you want the `Attribution-Reporting-Eligible` header sent to the same server as the `src` attribute points to. This is fine when you are handling the attribution source or trigger registration on the same server. When registering an attribution trigger this property is optional, and a boolean value will be used if it is omitted.
    - Value containing one or more URLs, for example:

    ```html
    <img
      src="image-file.png"
      alt="My image file description"
      attributionsrc="https://a.example/register-source
                         https://b.example/register-source" />
    ```

    This is useful in cases where the requested resource is not on a server you control, or you just want to handle registering the attribution source on a different server. In this case, you can specify one or more URLs as the value of `attributionsrc`. When the resource request occurs the `Attribution-Reporting-Eligible` header will be sent to the URL(s) specified in `attributionSrc` in addition to the resource origin. These URLs can then respond with an `Attribution-Reporting-Register-Source` or `Attribution-Reporting-Register-Trigger` header as appropriate to complete registration.

    > **Note:**
    > Specifying multiple URLs means that multiple attribution sources can be registered on the same feature. You might for example have different campaigns that you are trying to measure the success of, which involve generating different reports on different data.

- `crossorigin`
    Indicates if the fetching of the image must be done using a CORS request. Image data from a CORS-enabled image returned from a CORS request can be reused in the `<canvas>` element without being marked "tainted".

    If the `crossorigin` attribute is _not_ specified, then a non-CORS request is sent (without the `Origin` request header), and the browser marks the image as tainted and restricts access to its image data, preventing its usage in `<canvas>` elements.

    If the `crossorigin` attribute _is_ specified, then a CORS request is sent (with the `Origin` request header); but if the server does not opt into allowing cross-origin access to the image data by the origin site (by not sending any `Access-Control-Allow-Origin` response header, or by not including the site's origin in any `Access-Control-Allow-Origin` response header it does send), then the browser blocks the image from loading, and logs a CORS error to the devtools console.

    Allowed values:
    - `anonymous`
        A CORS request is sent with credentials <example-value> (that is, no cookies, X.509 certificates, or `Authorization` request header).
    - `use-credentials`
        The CORS request is sent with any credentials <example-value> (that is, cookies, X.509 certificates, and the `Authorization` request header). If the server does not opt into sharing credentials with the origin site (by sending back the `Access-Control-Allow-Credentials: true` response header), then the browser marks the image as tainted and restricts access to its image data.

    If the attribute has an invalid value, browsers handle it as if the `anonymous` value was used. See CORS settings attributes for additional information.

- `decoding`
    This attribute provides a hint to the browser as to whether it should perform image decoding along with rendering the other DOM content in a single presentation step that looks more "correct" (`sync`), or render and present the other DOM content first and then decode the image and present it later (`async`). In practice, `async` means that the next paint does not wait for the image to decode.

    It is often difficult to perceive any noticeable effect when using `decoding` on static `` elements. They'll likely be initially rendered as empty images while the image files are fetched (either from the network or from the cache) and then handled independently anyway, so the "syncing" of content updates is less apparent. However, the blocking of rendering while decoding happens, while often quite small, _can_ be measured — even if it is difficult to observe with the human eye. See What does the image decoding attribute actually do? for a more detailed analysis (tunetheweb.com, 2023).

    Using different `decoding` types can result in more noticeable differences when dynamically inserting `` elements into the DOM via JavaScript — see `HTMLImageElement.decoding` for more details.

    Allowed values:
    - `sync`
        Decode the image synchronously along with rendering the other DOM content, and present everything together.
    - `async`
        Decode the image asynchronously, after rendering and presenting the other DOM content.
    - `auto`
        No preference for the decoding mode; the browser decides what is best for the user. This is the default value.

- `elementtiming`
    Marks the image for observation by the `PerformanceElementTiming` API. The value given becomes an identifier for the observed image element. See also the `elementtiming` attribute page.

- `fetchpriority`
    Provides a hint of the relative priority to use when fetching the image. Allowed values:
    - `high`
        Fetch the image at a high priority relative to other images.
    - `low`
        Fetch the image at a low priority relative to other images.
    - `auto`
        Don't set a preference for the fetch priority.
        This is the default.
        It is used if no value or an invalid value is set.
- `height`
    The intrinsic height of the image, in pixels. Must be an integer without a unit.

    > **Note:**
    > Including `height` and `width` enables the aspect ratio of the image to be calculated by the browser prior to the image being loaded. This aspect ratio is used to reserve the space needed to display the image, reducing or even preventing a layout shift when the image is downloaded and painted to the screen. Reducing layout shift is a major component of good user experience and web performance.

- `ismap`
    This Boolean attribute indicates that the image is part of a server-side map. If so, the coordinates where the user clicked on the image are sent to the server.

    > **Note:**
    > This attribute is allowed only if the `` element is a descendant of an `` element with a valid `href` attribute. This gives users without pointing devices a fallback destination.

- `loading`
    Indicates how the browser should load the image:
    - `eager`
        Loads the image immediately, regardless of whether or not the image is currently within the visual viewport (this is the default value).
    - `lazy`
        Defers loading the image until it reaches a calculated distance from the viewport, as defined by the browser.

        Lazy loading avoids the network and storage bandwidth required to handle the image until it's reasonably certain that it will be needed. This improves the performance in most typical use cases.

        While explicit `width` and `height` attributes are recommended for all images to avoid layout shift, they are especially important for lazy-loaded ones. Lazy-loaded images will never be loaded if they do not intersect a visible part of an element, even if loading them would change that, because unloaded images have a `width` and `height` of `0`. It creates an even more disruptive user experience when the content visible in the viewport reflows in the middle of reading it.

        Lazy-loaded images located in the visual viewport may not yet be visible when the Window `load` event is fired. This is because the event is fired based on eager-loaded images — lazy-loaded images are not considered even if they are located within the visual viewport upon initial page load.

        Loading is only deferred when JavaScript is enabled. This is an anti-tracking measure, because if a user agent supported lazy loading when scripting is disabled, it would still be possible for a site to track a user's approximate scroll position throughout a session, by strategically placing images in a page's markup such that a server can track how many images are requested and when.

- `referrerpolicy`
    A string indicating which referrer to use when fetching the resource:
    - `no-referrer`: The `Referer` header will not be sent.
    - `no-referrer-when-downgrade`: The `Referer` header will not be sent to origins without TLS (HTTPS).
    - `origin`: The sent referrer will be limited to the origin of the referring page: its scheme, host, and port.
    - `origin-when-cross-origin`: The referrer sent to other origins will be limited to the scheme, the host, and the port. Navigations on the same origin will still include the path.
    - `same-origin`: A referrer will be sent for same origin, but cross-origin requests will contain no referrer information.
    - `strict-origin`: Only send the origin of the document as the referrer when the protocol security level stays the same (HTTPS→HTTPS), but don't send it to a less secure destination (HTTPS→HTTP).
    - `strict-origin-when-cross-origin` (default): Send a full URL when performing a same-origin request, only send the origin when the protocol security level stays the same (HTTPS→HTTPS), and send no header to a less secure destination (HTTPS→HTTP).
    - `unsafe-url`: The referrer will include the origin _and_ the path (but not the fragment, password, or username). **This value is unsafe**, because it leaks origins and paths from TLS-protected resources to insecure origins.

- `sizes`
    One or more values separated by commas, which can be source sizes or the `auto` keyword.
    The spec requires that the `sizes` attribute only be present when `srcset` uses width descriptors.
    - **source size**
        A **source size** consists of:
        1. A media condition, omitted for the last item in the list.
        2. A source size value.

        For example, the following source size proposes using a `1000px`-wide image source if the _viewport_ width is 500px or less.

        ```css
        (width <= 500px) 1000px
        ```

        Media conditions describe properties of the _viewport_, not the _image_.
        Because a source size descriptor specifies the width to use for the image during layout, the media condition is typically (but not necessarily) based on the `@media/width`.

        Source size values specify the intended display size of the image.
        User agents use the current source size to select one of the sources supplied by the `srcset` attribute, when those sources are described using width (`w`) descriptors.
        The `w` value defined in sizes determines the image's default layout width.
        In the absence of CSS, the browser will render the image at this size, regardless of the physical pixel dimensions of the downloaded file.

        A source size value can be any non-negative length.
        It must not use CSS functions other than the math functions.
        Units are interpreted in the same way as media queries, meaning that all relative length units are relative to the document root rather than the `` element. For example, an `em` value is relative to the root font size, not the font size of the image. Percentage values are not allowed. If the `sizes` attribute is not provided, it has a default value of `100vw` (the viewport width).

    - `auto`
        The `auto` keyword indicates that the browser should use the expected layout width of the element to select the image to display.
        That is, it should use the concrete size of the image, calculated after layout from HTML and CSS has been applied.
        This is only valid when combined with `loading="lazy"`, as the page is expected to already have CSS and other layout information by the time the image loads.

        Using `auto` saves you having to specify your layout media conditions twice: once for layout, and once for selection of an appropriate image to fetch and display.

        If `auto` cannot resolve — either because the browser does not support it, or because the image has no layout size yet — the browser falls back to the _source sizes_ in the list to determine the width, then to `width`/`height` attributes defined on the element, and finally to the default intrinsic size for `` elements defined in the user agent stylesheet (300px by 150px).

        For better backward compatibility with browsers that do not support `auto`, you can include fallback sizes after `auto` in the `sizes` attribute.
        You should also set the element's `width` and `height` attributes to the intrinsic dimensions of the largest image in your `srcset`, so the browser can reserve space using the correct aspect ratio:
