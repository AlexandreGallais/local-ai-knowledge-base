---
title: "`<u>` HTML unarticulated annotation (underline) element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/u/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<u>` HTML unarticulated annotation (underline) element

The **``** HTML element represents a span of inline text which should be rendered in a way that indicates that it has a non-textual annotation. This is rendered by default as a single solid underline, but may be altered using CSS.

> **Warning:**
> This element used to be called the "Underline" element in older versions of HTML, and is still sometimes misused in this way. To underline text, you should instead apply a style that includes the CSS `text-decoration` property set to `underline`.

```html
<p>
  You could use this element to highlight <u>speling</u> mistakes, so the writer
  can <u>corect</u> them.
</p>
```

```css
p {
  margin: 0;
}

u {
  text-decoration: red wavy underline;
}
```

See the Usage notes section for further details on when it's appropriate to use `` and when it isn't.

## Attributes

This element only includes the global attributes.

## Usage notes

Along with other pure styling elements, the original HTML Underline (``) element was deprecated in HTML 4; however, `` was restored in HTML 5 with a new, semantic, meaning: to mark text as having some form of non-textual annotation applied.

> **Note:**
> Avoid using the `` element with its default styling (of underlined text) in such a way as to be confused with a hyperlink, which is also underlined by default.

### Use cases

Valid use cases for the `` element include annotating spelling errors, applying a proper name mark to denote proper names in Chinese text, and other forms of annotation.

You should _not_ use `` to underline text for presentation purposes, or to denote titles of books.

### Other elements to consider using

In most cases, you should use an element other than ``, such as:

- `` to denote stress emphasis
- `` to draw attention to text
- `` to mark key words or phrases
- `` to indicate that text has strong importance
- `` to mark the titles of books or other publications
- `` to denote technical terms, transliterations, thoughts, or names of vessels in Western texts

To provide textual annotations (as opposed to the non-textual annotations created with ``), use the `<ruby>` element.

To apply an underlined appearance without any semantic meaning, use the `text-decoration` property's value `underline`.

## Examples

### Indicating a spelling error

This example uses the `` element and some CSS to display a paragraph which includes a misspelled error, with the error indicated in the red wavy underline style which is fairly commonly used for this purpose.

#### HTML

```html
<p>This paragraph includes a <u class="spelling">wrnogly</u> spelled word.</p>
```

In the HTML, we see the use of `` with a class, `spelling`, which is used to indicate the misspelling of the word "wrongly".

#### CSS

```css
u.spelling {
  text-decoration: red wavy underline;
}
```

This CSS indicates that when the `` element is styled with the class `spelling`, it should have a red wavy underline underneath its text. This is a common styling for spelling errors. Another common style can be presented using `red dashed underline`.

#### Result

The result should be familiar to anyone who has used any of the more popular word processors available today.

### Avoiding \

Most of the time, you actually don't want to use ``. Here are some examples that show what you should do instead in several cases.

#### Non-semantic underlines

To underline text without implying any semantic meaning, use a `` element with the `text-decoration` property set to `"underline"`, as shown below.

##### HTML

```html
<span class="underline">Today's Special</span>
<br />
Chicken Noodle Soup With Carrots
```

##### CSS

```css
.underline {
  text-decoration: underline;
}
```

##### Result

#### Presenting a book title

Book titles should be presented using the `` element instead of `` or even ``.

##### Using the cite element

```html
<p>The class read <cite>Moby-Dick</cite> in the first term.</p>
```

##### Styling the cite element

The default styling for the `` element renders the text in italics. You can override that using CSS:

```html
<p>The class read <cite>Moby-Dick</cite> in the first term.</p>
```

```css
cite {
  font-style: normal;
  text-decoration: underline;
}
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

- The ``, ``, ``, ``, and `` elements should usually be used instead.
- The CSS `text-decoration` property should be used for non-semantic underlining.
