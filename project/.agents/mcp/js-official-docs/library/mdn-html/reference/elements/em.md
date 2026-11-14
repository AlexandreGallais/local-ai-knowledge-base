---
title: "`<em>` HTML emphasis element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/em/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<em>` HTML emphasis element

The **``** HTML element marks text that has stress emphasis. The `` element can be nested, with each level of nesting indicating a greater degree of emphasis.

```html
<p>Get out of bed <em>now</em>!</p>

<p>We <em>had</em> to do something about it.</p>

<p>This is <em>not</em> a drill!</p>
```

```css
em {
  /* Add your styles here */
}
```

## Attributes

This element only includes the global attributes.

## Usage notes

The `` element is for words that have a stressed emphasis compared to surrounding text, which is often limited to a word or words of a sentence and affects the meaning of the sentence itself.

Typically this element is displayed in italic type. However, it should not be used to apply italic styling; use the CSS `font-style` property for that purpose. Use the `` element to mark the title of a work (book, play, song, etc.). Use the `` element to mark text that is in an alternate tone or mood, which covers many common situations for italics such as scientific names or words in other languages. Use the `` element to mark text that has greater importance than surrounding text.

### \ vs. \

Some developers may be confused by how multiple elements seemingly produce similar visual results. `` and `` are a common example, since they both italicize text. What's the difference? Which should you use?

By default, the visual result is the same. However, the semantic meaning is different. The `` element represents stress emphasis of its contents, while the `` element represents text that is set off from the normal prose, such as a foreign word, fictional character thoughts, or when the text refers to the definition of a word instead of representing its semantic meaning. (The title of a work, such as the name of a book or movie, should use ``.)

This means the right one to use depends on the situation. Neither is for purely decorative purposes, that's what CSS styling is for.

Examples for `` could be:

```html
<p>Just <em>do</em> it already!</p>
<p>We <em>had</em> to do something about it.</p>
```

A person or software reading the text would pronounce the words in italics with an emphasis, using verbal stress.

Examples for `` could be:

```html
<p>The word <i>the</i> is an article.</p>
<p>The <i>Queen Mary</i> sailed last night.</p>
```

Here, there is no added emphasis or importance on the word "Queen Mary". It is merely indicated that the object in question is not a queen named Mary but a ship named "Queen Mary".

## Examples

In this example, the `` element is used to highlight an implicit or explicit contrast between two ingredient lists:

```html
<p>
  Ice cream is made with milk, sweetener, and cream. Frozen custard, on the
  other hand, is made of milk, cream, sweetener, and <em>egg yolks</em>.
</p>
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
          >emphasis</code
        >

       | Permitted ARIA roles
       | Any

       | DOM interface
       |
        `HTMLElement` Up to Gecko 1.9.2 (Firefox 4)
        inclusive, Firefox implements the
        `HTMLSpanElement` interface for this element.

## See also

- ``
