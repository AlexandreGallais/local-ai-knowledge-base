---
title: "`:dir()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_dir/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:dir()` CSS pseudo-class

The **`:dir()`** CSS pseudo-class matches elements based on the directionality of the text contained in them.

```css
/* Selects any element with right-to-left text */
:dir(rtl) {
  background-color: red;
}
```

The `:dir()` pseudo-class uses only the _semantic_ value of the directionality, i.e., the one defined in the document itself. It doesn't account for _styling_ directionality, i.e., the directionality set by CSS properties such as `direction`.

> **Note:**
> Be aware that the behavior of the `:dir()` pseudo-class is not equivalent to the `[dir=…]` attribute selectors. The latter match the HTML `dir` attribute, and ignore elements that lack it — even if they inherit a direction from their parent. (Similarly, `[dir=rtl]` and `[dir=ltr]` won't match the `auto` value.) In contrast, `:dir()` will match the value calculated by the user agent, even if inherited.

> **Note:**
> In HTML, the direction is determined by the `dir` attribute. Other document types may have different methods.

## Syntax

```css
:dir([ltr | rtl]) {
  /* ... */
}
```

### Parameters

The `:dir()` pseudo-class requires one parameter, representing the text directionality you want to target.

- `ltr`
    Target left-to-right elements.
- `rtl`
    Target right-to-left elements.

## Examples

### HTML

```html
<div dir="rtl">
  <span>test1</span>
  <div dir="ltr">
    test2
    <div dir="auto">עִבְרִית</div>
  </div>
</div>
```

### CSS

```css
:dir(ltr) {
  background-color: yellow;
}

:dir(rtl) {
  background-color: powderblue;
}
```

## See also

- Language-related pseudo-classes: `:lang`
- HTML `lang` attribute
- HTML `translate` attribute
