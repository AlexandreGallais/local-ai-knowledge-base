---
title: "`<img>` HTML image embed element (part 3 of 4)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/img/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<img>` HTML image embed element (part 3 of 4)

```html
        <img
          loading="lazy"
          width="200"
          height="200"
          sizes="auto, (max-width: 30em) 100vw, (max-width: 50em) 50vw, calc(33vw - 100px)"
          srcset="
            swing-200.jpg   200w,
            swing-400.jpg   400w,
            swing-800.jpg   800w,
            swing-1600.jpg 1600w
          "
          src="swing-400.jpg"
          alt="Kettlebell Swing" />
        ```

- `src`
    The image URL. At least one of `src` and `srcset` is required for an `` element. If `srcset` is specified, `src` is used in one of two ways:
    - as a fallback for browsers that don't support `srcset`.
    - if `srcset` uses the "x" descriptor, then `src` is equivalent to a source with the density descriptor `1x`; that is, the image specified by `src` is used on low-density screens (such as typical 72 DPI or 96 DPI displays).

- `srcset`
    One or more strings separated by commas, indicating possible image sources for the user agent to use.

    Each string is composed of:
    1. A URL to an image
    2. Optionally, whitespace followed by one of:
       - A width descriptor (a positive integer directly followed by `w`). It _must_ match the intrinsic width of the referenced image. The width descriptor is divided by the source size given in the `sizes` attribute to calculate the effective pixel density. For example, to provide an image resource to be used when the renderer needs a 450 pixel wide image, use the width descriptor `450w`. When a `srcset` contains "w" descriptors, the browser uses those descriptors together with the `sizes` attribute to pick a resource.
       - A pixel density descriptor (a positive floating point number directly followed by `x`). It specifies the condition in which the corresponding image resource should be used as the display's pixel density. For example, to provide an image resource to be used when the pixel density is double the standard density, use the pixel density descriptor `2x` or `2.0x`.

    If no descriptor is specified, the source is assigned the default descriptor of `1x`. It is incorrect to mix width descriptors and pixel density descriptors in the same `srcset` attribute. Duplicate descriptors (for instance, two sources in the same `srcset` which are both described with `2x`) are also invalid.

    Space characters, other than the whitespace separating the URL and the corresponding condition descriptor, are ignored; this includes both leading and trailing space, as well as space before or after each comma. However, if an image candidate string contains no descriptors and no whitespace after the URL, the following image candidate string, if there is one, must begin with one or more whitespace, or the comma will be considered part of the URL.

    When the `` element's `srcset` uses `x` descriptors, browsers also consider the URL in the `src` attribute (if present) as a candidate, and assign it a default descriptor of `1x`. On the other hand, if the `srcset` attribute uses width descriptors, `src` is not considered, and the `sizes` attribute is used instead.

    The user agent selects any of the available sources at its discretion. This provides them with significant leeway to tailor their selection based on things like user preferences or bandwidth conditions. See our Responsive images tutorial for an example.

- `width`
    The intrinsic width of the image in pixels. Must be an integer without a unit.
- `usemap`
    The partial URL (starting with `#`) of an image map associated with the element.

    > **Note:**
    > You cannot use this attribute if the `` element is inside an `` or `` element.

### Deprecated attributes

- `align` (deprecated)
    Aligns the image with its surrounding context. Use the `float` and/or `vertical-align` CSS properties instead of this attribute. Allowed values:
    - `top`
        Equivalent to `vertical-align: top` or `vertical-align: text-top`
    - `middle`
        Equivalent to `vertical-align: -moz-middle-with-baseline`
    - `bottom`
        The default, equivalent to `vertical-align: unset` or `vertical-align: initial`
    - `left`
        Equivalent to `float: left`
    - `right`
        Equivalent to `float: right`

- `border` (deprecated)
    The width of a border around the image. Use the `border` CSS property instead.
- `hspace` (deprecated)
    The number of pixels of white space on the left and right of the image. Use the `margin` CSS property instead.
- `longdesc` (deprecated)
    A link to a more detailed description of the image. Possible values are a URL or an element `id`.

    > **Note:**
    > This attribute is considered obsolete in the HTML spec. It has an uncertain future; authors should use a WAI-ARIA alternative such as `aria-describedby` or `aria-details`.

- `name` (deprecated)
    A name for the element. Use the `id` attribute instead.
- `vspace` (deprecated)
    The number of pixels of white space above and below the image. Use the `margin` CSS property instead.

## Usage notes

You need at least two attributes for each `` element. Most commonly, they are `src` and `alt`.

- The `src` attribute holds the path to the image you want to embed. It is not mandatory if the srcset attribute is available. However, at least one of the `src` or `srcset` attributes must be provided.
- The `alt` attribute holds a textual replacement for the image, which is mandatory and **incredibly useful** for accessibility — screen readers read the attribute value out to their users so they know what the image means. Alt text is also displayed on the page if the image can't be loaded for some reason: for example, network errors, content blocking, or link rot.

There are many other attributes to achieve various purposes:

- Referrer/CORS control for security and privacy: see `crossorigin` and `referrerpolicy`.
- Use both `width` and `height` to set the intrinsic size of the image, allowing it to take up space before it loads, to mitigate content layout shifts.
- Responsive image hints with `sizes` and `srcset` (see also the `` element and our Responsive images tutorial).

The Image file type and format guide provides information about the supported image formats and broad recommendations about where they should be used.

### Image loading errors

If an error occurs while loading or rendering an image, and an `onerror` event handler has been set for the `error` event, that event handler will get called. This can happen in several situations, including:

- The `src` or `srcset` attributes are empty (`""`) or `null`.
- The `src` URL is the same as the URL of the page the user is currently on.
- The image is corrupted in some way that prevents it from being loaded.
- The image's metadata is corrupted in such a way that it's impossible to retrieve its dimensions, and no dimensions were specified in the `` element's attributes.
- The image is in a format not supported by the user agent.

### Styling with CSS

`` is a replaced element; it has a `display` value of `inline` by default, but its default dimensions are defined by the embedded image's intrinsic values, like it were `inline-block`. You can set properties like `border`/`border-radius`, `padding`/`margin`, `width`, `height`, etc. on an image.

`` has no baseline, so when images are used in an inline formatting context with `vertical-align: baseline`, the bottom of the image will be placed on the text baseline.

You can use the `object-position` property to position the image within the element's box, and the `object-fit` property to adjust the sizing of the image within the box (for example, whether the image should fit the box or fill it even if clipping is required).

Depending on its type, an image may have an intrinsic width and height. For some image types, however, intrinsic dimensions are unnecessary. SVG images, for instance, have no intrinsic dimensions if their root `` element doesn't have a `width` or `height` set on it.

## Accessibility

### Authoring meaningful alternate descriptions

An `alt` attribute's value should provide a clear and concise text replacement for the image's content. It should not describe the presence of the image itself or the file name of the image. If the `alt` attribute is purposefully left off because the image has no textual equivalent, consider alternate methods to present what the image is trying to communicate.

#### Don't

```html
<img alt="image" src="penguin.jpg" />
```

#### Do

```html
<img alt="A Penguin on a beach." src="penguin.jpg" />
```

An important accessibility test is to read the `alt` attribute content together with preceding textual content to see if it conveys the same meaning as the image. For example, if the image was preceded by the sentence "On my travels, I saw a cute little animal:", the _Don't_ example could be read by a screen reader as "On my travels, I saw a cute little animal: image", which doesn't make sense. The _Do_ example could be read by a screen reader as "On my travels, I saw a cute little animal: A Penguin on a beach.", which does make sense.

For images used to trigger an action, for example, images nested inside an `` or `` element, consider describing the triggered action inside the `alt` attribute value. For example, you could write `alt="next page"` instead of `alt="arrow right"`. You could also consider adding an optional further description inside a `title` attribute; this may be read by screen readers if requested by the user.

When an `alt` attribute is not present on an image, some screen readers may announce the image's file name instead. This can be a confusing experience if the file name isn't representative of the image's contents.

- An alt Decision Tree • Images • WAI Web Accessibility Tutorials
- Alt-texts: The Ultimate Guide — Axess Lab
- How to Design Great Alt Text: An Introduction | Deque
- MDN Understanding WCAG, Guideline 1.1 explanations
- Understanding Success Criterion 1.1.1 | W3C Understanding WCAG 2.0

### Identifying SVG as an image

Due to a VoiceOver bug, VoiceOver does not correctly announce SVG images as images. Include `role="img"` to all `` elements with SVG source files to ensure assistive technologies correctly announce the SVG as image content.

```html
<img src="mdn.svg" alt="MDN" role="img" />
```

### The title attribute

The `title` attribute is not an acceptable substitute for the `alt` attribute. Additionally, avoid duplicating the `alt` attribute's value in a `title` attribute declared on the same image. Doing so may cause some screen readers to announce the same text twice, creating a confusing experience.

The `title` attribute should also not be used as supplemental captioning information to accompany an image's `alt` description. If an image needs a caption, use the `figure` and `figcaption` elements.

The value of the `title` attribute is usually presented to the user as a tooltip, which appears shortly after the cursor stops moving over the image. While this _can_ provide additional information to the user, you should not assume that the user will ever see it: the user may only have keyboard or touchscreen. If you have information that's particularly important or valuable for the user, present it inline using one of the methods mentioned above instead of using `title`.

- Using the HTML title attribute – updated | Vispero

## Examples

### Alternative text

The following example embeds an image into the page and includes alternative text for accessibility.

```html
<img src="/shared-assets/images/examples/favicon144.png" alt="MDN" />
```

### Image link

This example builds upon the previous one, showing how to turn the image into a link. To do so, nest the `` tag inside the ``. You should make the alternative text describe the resource the link is pointing to, as if you were using a text link instead.

```html
<a href="https://developer.mozilla.org">
  <img
    src="/shared-assets/images/examples/favicon144.png"
    alt="Visit the MDN site" />
</a>
```

### Using the srcset attribute

In this example we include a `srcset` attribute with a reference to a high-resolution version of the logo; this will be loaded instead of the `src` image on high-resolution devices. The image referenced in the `src` attribute is counted as a `1x` candidate in user agents that support `srcset`.

```html
<img
  src="/shared-assets/images/examples/favicon72.png"
  alt="MDN"
  srcset="/shared-assets/images/examples/favicon144.png 2x" />
```

### Using the srcset and sizes attributes

The `src` attribute is ignored in user agents that support `srcset` when `w` descriptors are included. When the `(width <= 600px)` media condition matches, the 200 pixel-wide image will load (it is the one that matches `200px` most closely), otherwise the other image will load.

```html
<img
  src="clock-demo-200px.png"
  alt="The time is 12:45."
  srcset="clock-demo-200px.png 200w, clock-demo-400px.png 400w"
  sizes="(width <= 600px) 200px, 50vw" />
```

> **Note:**
> To see the resizing in action, , so you can actually resize the content area.

## Security and privacy concerns

Although `` elements have innocent uses, they can have undesirable consequences for user security and privacy. See Referer header: privacy and security concerns for more information and mitigations.

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content,
        embedded content,
        palpable content. If the element has a `usemap` attribute, it also is a part
        of the interactive content category.

       | Permitted content
       | None; it is a void element.

       | Tag omission
       | Must have a start tag and must not have an end tag.

       | Permitted parents
       | Any element that accepts embedded content.

       | Implicit ARIA role
       |

            with non-empty `alt` attribute or no
            `alt` attribute:
            <code
              >`img`</code
            >

            with empty `alt` attribute:
            `presentation`

       | Permitted ARIA roles
       |

            with non-empty `alt` attribute:

                <code
                  >button</code
                >

                <code
                  >checkbox</code
                >

              `link`
              `menuitem`
              `menuitemcheckbox`
              `menuitemradio`
              `option`
              `progressbar`
              `scrollbar`
              `separator`
              `slider`

                <code
                  >switch</code
                >

                <code
                  >tab</code
                >

              `treeitem`

            with empty `alt` attribute, `none`
            or `presentation`

            with no `alt` attribute, no `role` permitted

       | DOM interface
       | `HTMLImageElement`
