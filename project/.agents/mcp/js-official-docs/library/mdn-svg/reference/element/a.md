---
title: "<a>"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/svg/reference/element/a/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# <a>

The **``** SVG element creates a hyperlink to other web pages, files, locations in the same page, email addresses, or any other URL. It is very similar to HTML's `` element.

SVG's `` element is a container, which means you can create a link around text (like in HTML) but also around any shape.

## Attributes

- `download`
    Instructs browsers to download a URL instead of navigating to it, so the user will be prompted to save it as a local file.
    _Value type_: **\<string>**; _Default value_: _none_; _Animatable_: **no**
- `href`
    The URL or URL fragment the hyperlink points to.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **yes**
- `hreflang`
    The human language of the URL or URL fragment that the hyperlink points to.
    _Value type_: **\<string>**; _Default value_: _none_; _Animatable_: **no**
- `interestfor` (experimental) (non-standard)
    Defines the `` element as an **interest invoker**. Its value is the `id` of a target element that will be affected in some way (normally shown or hidden) when interest is shown or lost on the invoker element (for example, by hovering/unhovering or focusing/blurring it). See Using interest invokers for more details and examples.
    _Value type_: **\<string>**; _Default value_: _none_; _Animatable_: **no**
- `ping` (experimental)
    A space-separated list of URLs to which, when the hyperlink is followed, `POST` requests with the body `PING` will be sent by the browser (in the background). Typically used for tracking. For a more widely-supported feature addressing the same use cases, see `Navigator.sendBeacon()`.
    _Value type_: **\<list-of-URLs>**; _Default value_: _none_; _Animatable_: **no**
- `referrerpolicy`
    Which referrer to send when fetching the URL.
    _Value type_: `no-referrer` | `no-referrer-when-downgrade` | `same-origin` | `origin` | `strict-origin` | `origin-when-cross-origin` | `strict-origin-when-cross-origin` | `unsafe-url`; _Default value_: _none_; _Animatable_: **no**
- `rel`
    The relationship of the target object to the link object.
    _Value type_: **\<list-of-Link-Types>**; _Default value_: _none_; _Animatable_: **no**
- `target`
    Where to display the linked URL.
    _Value type_: `_self` | `_parent` | `_top` | `_blank` | **\<XML-Name>**; _Default value_: `_self`; _Animatable_: **yes**
- `type`
    A MIME type for the linked URL.
    _Value type_: **\<string>**; _Default value_: _none_; _Animatable_: **no**
- `xlink:href` (deprecated)
    The URL or URL fragment that the hyperlink points to. May be required for backwards compatibility for older browsers.
    _Value type_: **\<URL>**; _Default value_: _none_; _Animatable_: **yes**

## DOM Interface

This element implements the `SVGAElement` interface.

## Example

```css
@namespace svg url("http://www.w3.org/2000/svg");
html,
body,
svg {
  height: 100%;
}
```

```html
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- A link around a shape -->
  <a href="/docs/Web/SVG/Reference/Element/circle">
    <circle cx="50" cy="40" r="35" />
  </a>

  <!-- A link around a text -->
  <a href="/docs/Web/SVG/Reference/Element/text">
    <text x="50" y="90" text-anchor="middle">&lt;circle&gt;</text>
  </a>
</svg>
```

```css
/* As SVG does not provide a default visual style for links,
   it's considered best practice to add some */

@namespace svg url("http://www.w3.org/2000/svg");
/* Necessary to select only SVG <a> elements, and not also HTML's.
   See warning below */

svg|a:link,
svg|a:visited {
  cursor: pointer;
}

svg|a text,
text svg|a {
  fill: blue; /* Even for text, SVG uses fill over color */
  text-decoration: underline;
}

svg|a:hover,
svg|a:active {
  outline: dotted 1px blue;
}
```

> **Warning:**
> Since this element shares its tag name with HTML's `` element, selecting `a` with CSS or `querySelector` may apply to the wrong kind of element. Try the `@namespace` rule to distinguish the two.

## See also

- `xlink:title` attribute
- HTML `` element
