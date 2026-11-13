---
title: "<image>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/image/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <image>

The **`<image>`** SVG element includes images inside SVG documents. It can display raster image files or other SVG files.

The only image formats SVG software must support are JPEG, PNG, and other SVG files. Animated GIF behavior is undefined.

SVG files displayed with `<image>` are treated as an image: external resources aren't loaded, `:visited` styles aren't applied, and they cannot be interactive. To include dynamic SVG elements, try `<use>` with an external URL. To include SVG files and run scripts inside them, try `<object>` inside of `<foreignObject>`.

> **Note:**
> The HTML spec defines `<image>` as a synonym for `` while parsing HTML. This specific element and its behavior only apply inside SVG documents or inline SVGs.

## Attributes

- `x`
    Positions the image horizontally from the origin.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `y`
    Positions the image vertically from the origin.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `0`; _Animatable_: **yes**
- `width`
    The width the image renders at. Unlike HTML's ``, this attribute is required.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `height`
    The height the image renders at. Unlike HTML's ``, this attribute is required.
    _Value type_: **\<length>** | **\<percentage>**; _Default value_: `auto`; _Animatable_: **yes**
- `href`
    Points at a URL for the image file.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **no**
- `preserveAspectRatio`
    Controls how the image is scaled.
    _Value type_: (`none` | `xMinYMin` | `xMidYMin` | `xMaxYMin` | `xMinYMid` | `xMidYMid` | `xMaxYMid` | `xMinYMax` | `xMidYMax` | `xMaxYMax`) (`meet` | `slice`)?; _Default value_: `xMidYMid meet`; _Animatable_: **yes**
- `crossorigin`
    Defines the value of the credentials flag for CORS requests.
    _Value type_: [ `anonymous` | `use-credentials` ]?; _Default value_: None; _Animatable_: **yes**
- `decoding`
    Provides a hint to the browser as to whether it should perform image decoding synchronously or asynchronously.
    _Value type_: `async | sync | auto`; _Default value_: `auto`; _Animatable_: **yes**
- `fetchpriority` (experimental) (non-standard)
    Provides a hint of the relative priority to use when fetching an external image.
    Allowed values:
    - `high`
        Fetches the external image at a high priority relative to other external resources.
    - `low`
        Fetches the external image at a low priority relative to other external resources.
    - `auto`
        Doesn't set a preference for the fetch priority.
        It is used if no value or an invalid value is set.
        This is the default.
- `xlink:href` (deprecated)
    Points at a URL for the image file.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **no**

## DOM Interface

This element implements the `SVGImageElement` interface.

## Example

Basic <example-value> of a PNG image in SVG:

### SVG

```html
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <image href="mdn_logo_only_color.png" height="200" width="200" />
</svg>
```

## See also

- `fetchpriority` attribute
