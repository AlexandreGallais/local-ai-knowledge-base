---
title: "`inherit` CSS keyword"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/inherit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `inherit` CSS keyword

The **`inherit`** CSS keyword causes the element to take the computed value of the property from its parent element. It can be applied to any CSS property, including the CSS shorthand property `all`.

For inherited properties, this reinforces the default behavior, and is only needed to override another rule.

> **Note:**
> Inheritance is always from the parent element in the document tree, even when the parent element is not the containing block.

## Examples

### Basic usage

In this example, we demonstrate the effect of the `inherit` keyword by comparing two paragraphs with nested elements: the inline elements in one use their browser default styles, while those in the other inherit individual property values from their parent.

#### HTML

We include two identical paragraphs with several inline elements.

```html
<p>
  This paragraph has <em>emphasized text</em>, <strong>strong text</strong>, and
  <a href="#">a link to top</a>.
</p>
<p>
  This paragraph has <em>emphasized text</em>, <strong>strong text</strong>, and
  <a href="#">a link to top</a>.
</p>
```

#### CSS

We don't style the inline elements in the first paragraph, so they use their default browser styles.
In the second paragraph, we set properties on each inline element to `inherit`, so they get the computed styles from the parent `` element.

```css
p:nth-of-type(2) {
  a {
    text-decoration: inherit;
    color: inherit;
  }
  em {
    font-style: inherit;
  }
  strong {
    font-weight: inherit;
  }
}
```

#### Result

### Inheriting all property values

In this example, we use the same HTML as in the previous example to demonstrate the issues that can occur when the `inherit` keyword is applied to all properties.

```html
<p>
  This paragraph has <em>emphasized text</em>, <strong>strong text</strong>, and
  <a href="#">a link to top</a>.
</p>
<p>
  This paragraph has <em>emphasized text</em>, <strong>strong text</strong>, and
  <a href="#">a link to top</a>.
</p>
```

#### CSS

In the second paragraph, instead of setting individual properties to `inherit`, we set the `all` property on all inline elements to `inherit`, so they all get computed styles from their parent ``.

```css
p:nth-of-type(2) > * {
  all: inherit;
}
```

#### Result

Notice how the inline element inherit all the properties of the parent ``, including the paragraph's block-level `display` value. This is likely not the effect you would want.

### Excluding selected elements from a rule

This example demonstrates how the `inherit` keyword can be used to exclude selected elements from a color rule, allowing them to use their parent's color instead.

#### HTML

We include some semantically structured content.

```html
<header>
  <h1>This is my blog</h1>
  <h2>This is the subtitle of my blog in the HEADER</h2>
  <p>My blog is not very interesting</p>
</header>
<main>
  <h2>This first blog post in MAIN</h2>
  <p>I really have nothing to say.</p>
  <section>
    <h2>This second blog post is in a SECTION within MAIN</h2>
    <p>
      It is in a section because it is important even though it isn't the least
      bit interesting.
    </p>
  </section>
</main>
<footer>
  <h2>Contact in FOOTER</h2>
  <p>Find me on Mastodon</p>
  <section>
    <h2>Copyright in SECTION within FOOTER</h2>
    <p>1996</p>
  </section>
</footer>
```

#### CSS

We set the text color of the `` element to `blue` and all `<h2>` elements to `green` in `monospace` font. The `<h2>` elements inside a `` are set to `inherit` their parent's text color.

```css
main {
  color: blue;
}

h2 {
  color: green;
  font-family: monospace;
}

section h2 {
  color: inherit;
}
```

#### Result

The `<h2>` elements are all `green`. However, if they are nested in a `` element, they inherit their color from their parent, which is `blue` within ``. The default text color is black otherwise.

## See also

- `initial`, `revert`, `revert-layer`, `revert-rule`, and `unset` keywords
- Inheritance
