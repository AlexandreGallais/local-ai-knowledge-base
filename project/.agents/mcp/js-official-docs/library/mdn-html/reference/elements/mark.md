---
title: "`<mark>` HTML mark text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/mark/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<mark>` HTML mark text element

The **``** HTML element represents text which is **marked** or **highlighted** for reference or notation purposes due to the marked passage's relevance in the enclosing context.

```html
<p>Search results for "salamander":</p>

<hr />

<p>
  Several species of <mark>salamander</mark> inhabit the temperate rainforest of
  the Pacific Northwest.
</p>

<p>
  Most <mark>salamander</mark>s are nocturnal, and hunt for insects, worms, and
  other small creatures.
</p>
```

```css
mark {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

Typical use cases for `` include:

- When used in a quotation (`<q>`) or block quote (``), it generally indicates text which is of special interest but is not marked in the original source material, or material which needs special scrutiny even though the original author didn't think it was of particular importance. Think of this like using a highlighter pen in a book to mark passages that you find of interest.
- Otherwise, `` indicates a portion of the document's content which is likely to be relevant to the user's current activity. This might be used, for example, to indicate the words that matched a search operation.
- Don't use `` for syntax highlighting purposes; instead, use the `` element with appropriate CSS applied to it.

> **Note:**
> Don't confuse `` with the `` element; `` is used to denote content which has a degree of _relevance_, while `` indicates spans of text of _importance_.

## Examples

### Marking text of interest

In this first example, a `` element is used to mark some text within a quote which is of particular interest to the user.

```html
<blockquote>
  It is a period of civil war. Rebel spaceships, striking from a hidden base,
  have won their first victory against the evil Galactic Empire. During the
  battle, <mark>Rebel spies managed to steal secret plans</mark> to the Empire's
  ultimate weapon, the DEATH STAR, an armored space station with enough power to
  destroy an entire planet.
</blockquote>
```

#### Result

### Identifying context-sensitive passages

This example demonstrates using `` to mark search results within a passage.

```html
<p>
  It is a dark time for the Rebellion. Although the Death Star has been
  destroyed, <mark class="match">Imperial</mark> troops have driven the Rebel
  forces from their hidden base and pursued them across the galaxy.
</p>

<p>
  Evading the dreaded <mark class="match">Imperial</mark> Starfleet, a group of
  freedom fighters led by Luke Skywalker has established a new secret base on
  the remote ice world of Hoth.
</p>
```

To help distinguish the use of `` for search results from other potential usage, this example applies the custom class `"match"` to each match.

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
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       |
        No corresponding role

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`
