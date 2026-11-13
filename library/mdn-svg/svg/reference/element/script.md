---
title: "<script>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/element/script/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# <script>

The **`<script>`** SVG element allows you to add scripts to an SVG document.

> **Note:**
> While SVG's `script` element is equivalent to the HTML `<script>` element, it has some discrepancies, like it uses the `href` attribute instead of `src` and it doesn't support ECMAScript modules so far (See browser compatibility below for details)

## Attributes

- `async` (experimental)
    If the `async` attribute is present, then the external script will be fetched in parallel to parsing and evaluated as soon as it is available. Equivalent to the `async` attribute on the HTML `<script>` element.
    _Value type_: **boolean**; _Default value_: _none_; _Animatable_: **no**
- `crossorigin`
    This attribute defines CORS settings as defined for the HTML `<script>` element.
    _Value type_: **[ anonymous | use-credentials ]?**; _Default value_: `?`; _Animatable_: **yes**
- `defer` (experimental)
    If the `defer` attribute is present, then the external script will be executed after the document has been parsed, but before firing `DOMContentLoaded`. Equivalent to the `defer` attribute on the HTML `<script>` element.
    _Value type_: **boolean**; _Default value_: _none_; _Animatable_: **no**
- `fetchpriority` (experimental) (non-standard)
    Provides a hint of the relative priority to use when fetching an external script.
    Allowed values:
    - `high`
        Fetches the external script at a high priority relative to other external scripts.
    - `low`
        Fetches the external script at a low priority relative to other external scripts.
    - `auto`
        Doesn't set a preference for the fetch priority.
        It is used if no value or an invalid value is set.
        This is the default.
- `href`
    The URL to the script to load.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **no**
- `type`
    This attribute defines type of the script language to use.
    _Value type_: **`<media-type>`**; _Default value_: `application/ecmascript`; _Animatable_: **no**
- `xlink:href` (deprecated)
    The URL to the script to load.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **no**

## DOM Interface

This element implements the `SVGScriptElement` interface.

## Example

```html
Click the circle to change colors.
<svg
  viewBox="0 0 10 10"
  height="120px"
  width="120px"
  xmlns="http://www.w3.org/2000/svg">
  <circle cx="5" cy="5" r="4" />

  <script>
    // <![CDATA[
    function getColor() {
      const R = Math.round(Math.random() * 255)
        .toString(16)
        .padStart(2, "0");

      const G = Math.round(Math.random() * 255)
        .toString(16)
        .padStart(2, "0");

      const B = Math.round(Math.random() * 255)
        .toString(16)
        .padStart(2, "0");

      return `#${R}${G}${B}`;
    }

    document.querySelector("circle").addEventListener("click", (e) => {
      e.target.style.fill = getColor();
    });
    // ]]>
  </script>
</svg>
```

## See also

- `fetchpriority` attribute
- `script` element in HTML
