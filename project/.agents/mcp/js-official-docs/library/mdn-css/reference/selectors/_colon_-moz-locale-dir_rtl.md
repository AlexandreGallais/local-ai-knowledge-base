---
title: "`:-moz-locale-dir(rtl)` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_-moz-locale-dir_rtl/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:-moz-locale-dir(rtl)` CSS pseudo-class

The **`:-moz-locale-dir(rtl)`** CSS pseudo-class is a Mozilla extension that matches an element if the user interface is being displayed right-to-left. This is determined by the preference `intl.uidirection.locale` (where `locale` is the current locale) being set to "rtl".

> **Note:**
> This selector is mainly used by extensions and themes to adapt the user interface based on the user's locale. (This can vary from window to window, and even from tab to tab.) It also allows extensions to work even when they don't support the user's default locale, since they can support both left-to-right and right-to-left layouts regardless of locale specifics.

> **Warning:**
> This selector does not work properly from HTML; it never matches, no matter whether the UI locale is left-to-right or right-to-left.

## Syntax

```css
:-moz-locale-dir(rtl) {
  /* ... */
}
```

## Examples

This example will not work if you're not using Firefox, and might not work properly even in Firefox due to an issue with using this selector in HTML.

### HTML

```html
<p>If you're using a right-to-left interface, this should be red.</p>
```

### CSS

```css
p:-moz-locale-dir(rtl) {
  color: red;
}
```

## Specifications

Not part of any standard.

## See also

- `:dir(…)`
- `:-moz-locale-dir(ltr)`
