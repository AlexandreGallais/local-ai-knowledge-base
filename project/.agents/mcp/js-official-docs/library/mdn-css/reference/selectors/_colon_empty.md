---
title: "`:empty` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_empty/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:empty` CSS pseudo-class

The **`:empty`** CSS pseudo-class represents any element that has no children. Children can be either element nodes or text (including whitespace). Comments, processing instructions, and CSS `content` do not affect whether an element is considered empty.

```css
div:empty {
  outline: 2px solid deeppink;
  height: 1em;
}
```

```html
<p>Element with no content:</p>
<div></div>

<p>Element with comment:</p>
<div><!-- A comment --></div>

<p>Element with nested empty element:</p>
<div><p></p></div>
```

> **Note:**
> In Selectors Level 4, the `:empty` pseudo-class was changed to act like `:-moz-only-whitespace`, but no browser currently supports this yet.

## Syntax

```css
:empty {
  /* ... */
}
```

## Accessibility

Assistive technology such as screen readers cannot parse interactive content that is empty. All interactive content must have an accessible name, which is created by providing a text value for the interactive control's parent element (anchors, buttons, etc.). Accessible names expose the interactive control to the accessibility tree, an API that communicates information useful for assistive technologies.

The text that provides the interactive control's accessible name can be hidden using a combination of properties that remove it visually from the screen but keep it parsable by assistive technology. This is commonly used for buttons that rely solely on an icon to convey purpose.

- What is an accessible name? | Vispero
- Hidden content for better a11y | Go Make Things
- MDN Understanding WCAG, Guideline 2.4 explanations
- Understanding Success Criterion 2.4.4 | W3C Understanding WCAG 2.0

## Examples

### HTML

```html
<div class="box"><!-- I will be lime. --></div>
<div class="box">I will be pink.</div>
<div class="box">
  <!-- I will be pink in older browsers because of the whitespace around this comment. -->
</div>
<div class="box">
  <p>
    <!-- I will be pink in all browsers because of the non-collapsible whitespace and elements around this comment. -->
  </p>
</div>
```

### CSS

```css
body {
  display: flex;
  justify-content: space-around;
}
```

```css
.box {
  background: pink;
  height: 80px;
  width: 80px;
}

.box:empty {
  background: lime;
}
```

## See also

- `:-moz-only-whitespace` – The prefixed implementation of the changes in Selectors Level 4
- `:blank`
