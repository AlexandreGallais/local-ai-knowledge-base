---
title: "`::search-text` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_search-text/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::search-text` CSS pseudo-element

The **`::search-text`** CSS pseudo-element applies styles to search results identified by the user agent's "Find" or "Find in page" text search feature.

```css
p::search-text {
  color: crimson;
  background-color: wheat;
}
```

```html
<p>
  Using your browser's "Find in page" functionality, find a word or phrase that
  appears in this sentence, and note how, in supporting browsers, each result is
  highlighted using the specified custom styles.
</p>
```

## Allowable properties

A limited subset of CSS properties can be used with `::search-text`:

- `color`
- `background-color`
- The `text-decoration` shorthand and associated longhand properties:
  - `text-decoration-line`: the `grammar-error`, `spelling-error`, `line-through`, `none`, and `underline` values only.
  - `text-decoration-color`
  - `text-decoration-style`
  - `text-decoration-thickness`
  - `text-decoration-skip-ink`
- `text-underline-offset`
- `text-shadow`

## Syntax

```css
::search-text {
  /* ... */
}
```

## Description

Most browsers include some kind of in-page text search functionality, usually labeled "Find" or "Find in page". The `::search-text` pseudo-element, one of the highlight pseudo-elements, allows you to apply a limited set of styles to the text results highlighted by the browser search functionality.

Not all browsers and browser versions highlight search results using in-page highlights that are stylable with CSS. In such cases, `::search-text` may be unimplemented or just ignored.

Using `::search-text` as a selector on its own will style browser search results appearing _anywhere_ on a page. If you want to only style browser search results appearing inside certain elements, you can combine `::search-text` with other selectors, for example `section::search-text`.

Additionally, `::search-text` can be combined with the `:current` pseudo-class to provide specific styles to the currently-focused search result, for example:

```css
p::search-text {
  color: white;
  background-color: purple;
}

p::search-text:current {
  background-color: crimson;
}
```

### Inheritance model

The `::search-text` pseudo-element follows a special inheritance model common to all highlight pseudo-elements, wherein styles are inherited from both their parent elements and the pseudo-elements of their parents. For more details on how this inheritance works, see the Highlight pseudo-elements inheritance section.

## Accessibility

**Override text search result styles sparingly**, especially when doing so for purely aesthetic reasons. For people experiencing cognitive concerns or who are less technologically literate, unexpected changes to these styles may hurt their understanding of the functionality.

A primary use case of `::search-text` is to increase color contrast compared to the default browser styling. When customizing highlighted text, it is important to ensure that the contrast ratio between the foreground and background colors is great enough for people to be able to perceive the content of the highlighted text.

## Examples

### Custom styles for text search results

This example shows how to use `::search-text` and `:current` to create custom styles for your browser's "Find in page" search results.

#### HTML

The HTML consists of a basic <example-value> of text. We won't show the HTML source, both for brevity, and so that it is easier to navigate the search results in the rendered example.

```html
<p>
  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec finibus est
  eget eros congue pellentesque. Etiam a augue accumsan, scelerisque nisl sit
  amet, lobortis nulla. Aliquam condimentum eu orci eu elementum. Donec
  porttitor quam et posuere commodo. Mauris rhoncus diam a scelerisque molestie.
  Integer sollicitudin risus dui, ut sagittis lorem laoreet eget. Duis eget
  pretium enim. Morbi tristique, diam sit amet gravida finibus, metus ex
  tincidunt nibh, ac volutpat urna purus et arcu. Donec risus risus, semper vel
  purus sit amet, gravida vestibulum est. Sed et tristique urna. Nam vel mi eget
  nisi consectetur elementum. Aenean faucibus aliquam cursus. Morbi posuere
  tincidunt velit, et sagittis quam sagittis in. Nam eget ante ultrices, auctor
  dui vel, euismod lacus. Vivamus tincidunt, sem ac sodales aliquet, tortor
  tortor consequat diam, nec tempor mi dui vel eros. Aliquam ac erat et metus
  egestas scelerisque.
</p>
```

#### CSS

In our CSS, we start by styling the `::search-text` pseudo-element. We give it custom `background-color`, `color`, and `text-shadow` styles.

```css
html {
  font-family: "Helvetica", "Arial";
}

p {
  font-size: 1.5rem;
  line-height: 1.5;
  width: 90%;
  margin: 0 auto;
}
@layer no-support {
  body::before {
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1em 0;
  }
  @supports not selector(:current) {
    body::before {
      content: "Your browser doesn't support the :current pseudo-class.";
    }
  }
  @supports not selector(::search-text) {
    body::before {
      content: "Your browser doesn't support the ::search-text pseudo-element.";
    }
  }
}
```

```css
::search-text {
  background-color: purple;
  color: white;
  text-shadow: 1px 1px 1px black;
}
```

Finally, we style the currently-focused search result via `::search-text:current`, providing it with a different `background-color` and some `text-decoration` styles so that it is distinguishable from the rest of the results.

```css
::search-text:current {
  background-color: crimson;
  text-decoration-line: underline;
  text-decoration-color: yellow;
  text-decoration-thickness: 3px;
}
```

#### Result

The example renders as follows:

Try using the browser's find in page interface to find a word that appears multiple times in the example text, such as "aliquam", "amet", or "tortor". Move between the previous and next results to check out the `:current` styling.

## See also

- `:current`
- Highlight pseudo-elements
- CSS pseudo-elements module
