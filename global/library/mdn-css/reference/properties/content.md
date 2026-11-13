---
title: "`content` CSS property (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/content/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `content` CSS property

The **`content`** CSS property replaces content with a generated value. It can be used to define what is rendered inside an element or pseudo-element. For elements, the `content` property specifies whether the element renders normally (`normal` or `none`) or is replaced with an image (and associated "alt" text). For pseudo-elements and margin boxes, `content` defines the content as images, text, both, or none, which determines whether the element renders at all.

Objects inserted using the `content` property are **anonymous replaced elements**.

```css
.topic-games::before {
  content: "🎮 " / "games";
}

.topic-weather::before {
  content: "⛅ " / "cloudy";
}

.topic-hot::before {
  content: url("/shared-assets/images/examples/fire.png") / "On fire";
  margin-right: 6px;
}
```

```html
<p class="topic-games">Game News: A new inFamous is not planned</p>

<p class="topic-weather">
  Weather for Today: Heat, violent storms and twisters
</p>

<p class="topic-hot">Trending Article: Must-watch videos of the week</p>
```

## Syntax

```css
/* Keywords that cannot be combined with other values */
content: normal;
content: none;

/* <content-replacement>: <image> values */
content: url("http://www.example.com/test.png");
content: linear-gradient(#e66465, #9198e5);
content: image-set("image1x.png" 1x, "image2x.png" 2x);

/* speech output: alternative text after a "/"  */
content: url("../img/test.png") / "This is the alt text";
content: counter(chapter) / "Chapter " counter(chapter);

/* <string> value */
content: "unparsed text";

/* <counter> values, optionally with <list-style-type> */
content: counter(chapter_counter);
content: counter(chapter_counter, upper-roman);
content: counters(section_counter, ".");
content: counters(section_counter, ".", decimal-leading-zero);

/* attr() value linked to the HTML attribute value */
content: attr(href);

/* <quote> values */
content: open-quote;
content: close-quote;
content: no-open-quote;
content: no-close-quote;

/* <content-list>: a list of content values. 
Several values can be used simultaneously */
content: "prefix" url("http://www.example.com/test.png");
content: "prefix" url("/img/test.png") "suffix" / "Alt text";
content: open-quote counter(chapter_counter);

/* Global values */
content: inherit;
content: initial;
content: revert;
content: revert-layer;
content: unset;
```

### Values

The value can be:

- One of two keywords: `none` or `normal`. `normal` is the default property value.
- `<content-replacement>` when replacing a DOM node. `<content-replacement>` is always an `<image>`.
- A `<content-list>` when replacing pseudo-elements and margin boxes. A `<content-list>` is a list of one or more anonymous inline boxes appearing in the order specified. Each `<content-list>` item is of type `<string>`, `<image>`, `<counter>`, `<quote>`, `<target>`, or `<leader()>`.
- An optional alternative text value that can include `<string>`, `<counter>`, or `attr()` function values, preceded by a slash (`/`).

The keywords and data types mentioned above are described in more detail below:

- `none`
    When applied to a pseudo-element, the pseudo-element is not generated.
    When applied to an element, the value has no effect.

- `normal`
    For the `::before` and `::after` pseudo-elements, this value computes to `none` . For other pseudo-elements such as `::marker`, `::placeholder`, or `::file-selector-button`, it produces the element's initial (or normal) content. For regular elements or page margin boxes, it computes to the element's descendants. This is the default value.

- `<string>`
    A sequence of characters enclosed in matching single or double quotes. Multiple string values will be concatenated (there is no concatenation operator in CSS).

- `image`
    An `image`, representing an image to display. This can be equal to a `<url>`, `image-set()`, or `gradient` data type, or a part of the webpage itself, defined by the `element()` function.

- `<counter>`
    The `<counter>` value is a CSS counter, generally a number produced by computations defined by `counter-reset` and `counter-increment` properties. It can be displayed using either the `counter()` or `counters()` function.
    - `counter()`
        The `counter()` function has two forms: 'counter(_name_)' or 'counter(_name_, style)'. The generated text is the value of the innermost counter of the given name in scope at the given pseudo-element. It is formatted in the specified `list-style-type` (`decimal` by default).
    - `counters()`
        The `counters()` function also has two forms: 'counters(_name_, _string_)' or 'counters(_name_, _string_, _style_)'. The generated text is the value of all counters with the given name in scope at the given pseudo-element, from outermost to innermost, separated by the specified string. The counters are rendered in the indicated `list-style-type` (`decimal` by default).

- `<quote>`
    The `<quote>` data type includes language- and position-dependent keywords:
    - `open-quote` and `close-quote`
        These values are replaced by the appropriate string from the `quotes` property.
    - `no-open-quote` and `no-close-quote`
        Introduces no content, but increments (decrements) the level of nesting for quotes.

- `<target>`
    The `<target>` data type includes three target functions, `<target-counter()>`, `<target-counters()>`, and `<target-text()>` that create cross-references obtained from the target end of a link. See Formal syntax.

- `<leader()>`
    The `<leader()>` data type includes a leader function: `leader( <leader-type> )`. This function accepts the keyword values `dotted`, `solid`, or `space` (equal to `leader(".")`, `leader("_")`, and `leader(" ")`, respectively), or a `<string>` as a parameter. When supported and used as a value for `content`, the leader-type provided will be inserted as a repeating pattern, visually connecting content across a horizontal line.

- `attr(x)`
    The `attr(x)` CSS function retrieves the value of an attribute of the selected element, or the pseudo-element's originating element. The value of the element's attribute `x` is an unparsed string representing the attribute name. If there is no attribute `x`, an empty string is returned. The case sensitivity of the attribute name parameter depends on the document language.

- alternative text: `/ <string> | <counter> | attr()`
    Alternative text may be specified for an image or any `<content-list>` items, by appending a forward slash and then a combination of strings, counters, and `attr()` functions. The alternative text is intended for speech output by screen-readers, but may also be displayed in some browsers.

## Accessibility

CSS-generated content is not included in the DOM. Because of this, it will not be represented in the accessibility tree and certain assistive technology/browser combinations will not announce it. If the content conveys information that is critical to understanding the page's purpose, it is better to include it in the main document.

If inserted content is not decorative, check that the information is provided to assistive technologies and is also available when CSS is turned off.

- Accessibility support for CSS generated content – Tink (2015)
- WCAG, Guideline 1.3: Create content that can be presented in different ways
- Understanding Success Criterion 1.3.1 | W3C Understanding WCAG 2.0
- Failure of Success Criterion 1.3.1: inserting non-decorative generated content Techniques for WCAG 2.0
