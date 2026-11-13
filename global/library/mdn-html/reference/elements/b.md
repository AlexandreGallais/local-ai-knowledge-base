---
title: "`<b>` HTML bring attention to element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/b/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<b>` HTML bring attention to element

The **``** HTML element is used to draw the reader's attention to the element's contents, which are not otherwise granted special importance. This was formerly known as the Boldface element, and most browsers still draw the text in boldface. However, you should not use `` for styling text or granting importance. If you wish to create boldface text, you should use the CSS `font-weight` property. If you wish to indicate an element is of special importance, you should use the `` element.

```html
<p>
  The two most popular science courses offered by the school are
  <b class="term">chemistry</b> (the study of chemicals and the composition of
  substances) and <b class="term">physics</b> (the study of the nature and
  properties of matter and energy).
</p>
```

```css
b {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

- Use the `` for cases like keywords in a summary, product names in a review, or other spans of text whose typical presentation would be boldfaced (but not including any special importance).
- Do not confuse the `` element with the ``, ``, or `` elements. The `` element represents text of certain _importance_, `` puts some emphasis on the text and the `` element represents text of certain _relevance_. The `` element doesn't convey such special semantic information; use it only when no others fit.
- Similarly, do not mark titles and headings using the `` element. For this purpose, use the `<h1>` to `<h6>` tags. Further, stylesheets can change the default style of these elements, with the result that they are not _necessarily_ displayed in bold.
- It is a good practice to use the `class` attribute on the `` element in order to convey additional semantic information as needed (for example `` for the first sentence in a paragraph). This makes it easier to manage multiple use cases of `` if your stylistic needs change, without the need to change all of its uses in the HTML.
- Historically, the `` element was meant to make text boldface. Styling information has been deprecated since HTML4, so the meaning of the `` element has been changed.
- If there is no semantic purpose to using the `` element, you should use the CSS `font-weight` property with the value `"bold"` instead in order to make text bold.

## Examples

```html
<p>
  This article describes several <b class="keywords">text-level</b> elements. It
  explains their usage in an <b class="keywords">HTML</b> document.
</p>
Keywords are displayed with the default style of the
<b>element, likely in bold.</b>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        <code
          >generic</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- Other elements conveying text-level semantics: ``, ``, ``, ``, ``, `<q>`, ``, ``, `<time>`, `<code>`, ``, ``, `<kbd>`, ``, ``, ``, ``, `<ruby>`, `<rp>`, `<rt>`, `<bdo>`, ``, ``, ``.
- Using \ and \ elements (W3C)
