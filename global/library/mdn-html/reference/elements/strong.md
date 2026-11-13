---
title: "`<strong>` HTML strong importance element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/strong/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<strong>` HTML strong importance element

The **``** HTML element indicates that its contents have strong importance, seriousness, or urgency. Browsers typically render the contents in bold type.

```html
<p>
  ... the most important rule, the rule you can never forget, no matter how much
  he cries, no matter how much he begs:
  <strong>never feed him after midnight</strong>.
</p>
```

```css
p {
  font-size: 1rem;
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The `` element is for content that is of "strong importance," including things of great seriousness or urgency (such as warnings). This could be a sentence that is of great importance to the whole page, or you could merely try to point out that some words are of greater importance compared to nearby content.

Typically this element is rendered by default using a bold font weight. However, it should _not_ be used to apply bold styling; use the CSS `font-weight` property for that purpose. Use the `` element to draw attention to certain text without indicating a higher level of importance. Use the `` element to mark text that has stress emphasis.

Another accepted use for `` is to denote the labels of paragraphs which represent notes or warnings within the text of a page.

### \ vs. \

It is often confusing to new developers why there are so many ways to express the same thing on a rendered website. `` and `` are perhaps one of the most common sources of confusion, causing developers to ask "Should I use `` or ``? Don't they both do the same thing?"

Not exactly. The `` element is for content that is of greater importance, while the `` element is used to draw attention to text without indicating that it's more important.

It may help to realize that both are valid and semantic elements in HTML and that it's a coincidence that they both have the same default styling (boldface) in most browsers (although some older browsers actually underline ``). Each element is meant to be used in certain types of scenarios, and if you want to bold text for decoration, you should instead actually use the CSS `font-weight` property.

The intended meaning or purpose of the enclosed text should be what determines which element you use. Communicating meaning is what semantics are all about.

### \ vs. \

Adding to the confusion is the fact that while HTML 4 defined `` as indicating a stronger emphasis, HTML 5 defines `` as representing "strong importance for its contents." This is an important distinction to make.

While `` is used to change the meaning of a sentence as spoken emphasis does ("I _love_ carrots" vs. "I love _carrots_"), `` is used to give portions of a sentence added importance (e.g., "**Warning!** This is **very dangerous.**") Both `` and `` can be nested to increase the relative degree of importance or stress emphasis, respectively.

## Examples

### Basic <example-value>

```html
<p>
  Before proceeding, <strong>make sure you put on your safety goggles</strong>.
</p>
```

#### Result

### Labeling warnings

```html
<p>
  <strong>Important:</strong> Before proceeding, make sure you add plenty of
  butter.
</p>
```

#### Result

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
       | None; must have both a start tag and an end tag.

       | Permitted parents
       |
        Any element that accepts
        phrasing content, or any element that accepts
        flow content.

       | Implicit ARIA role
       |
        <code
          >strong</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- The `` element
- The `` element
- The `font-weight` property
