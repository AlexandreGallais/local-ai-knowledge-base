---
title: "Using CSS counters (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/counter_styles/using_counters/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS counters (part 2 of 2)

## Examples

### Basic <example-value>

This example adds "Section \[the value of the counter]:" to the beginning of each heading.

#### HTML

We include three `<h3>` elements.

```html
<h3>Introduction</h3>
<h3>Body</h3>
<h3>Conclusion</h3>
```

#### CSS

We create a counter named 'section', letting its initial value default to `0`. We increment the value of `section` counter by `1` at each `<h3>` and display the word "Section", the value of `section` counter, and a colon before the content of each `<h3>`.

```css
body {
  counter-reset: section;
}

h3::before {
  counter-increment: section;
}
h3::before {
  content: "Section " counter(section) ": ";
}
```

#### Result

### Reversed counter

This example uses the same HTML as the previous example but uses a reversed counter, numbering the elements from 3 to 1.

```html
<h3>Introduction</h3>
<h3>Body</h3>
<h3>Conclusion</h3>
```

#### CSS

We use the `reversed()` function to create a counter named 'section', letting the initial value default so that when we decrement the value of `section` counter by `1` on each `<h3>`, the last element in the set will have the counter set to `1`. We use generated content to display the word 'Section ' and the value of the counter before the content of each `<h3>`.

```css
body {
  counter-reset: reversed(section);
}

h3 {
  counter-increment: section -1;
}
h3::before {
  content: "Section " counter(section) ": ";
}
```

```css
@supports not (counter-reset: reversed(section)) {
  body::before {
    content: "Your browser doesn't support the reversed() function.";
    background-color: wheat;
    display: block;
    text-align: center;
    padding: 1rem 0;
  }
}
```

#### Result

### A more elaborate example

A counter need not necessarily be shown every time it is incremented.
This example counts all links but shows the counter as generated content only when a link has no text.

#### HTML

We include three paragraphs, each with a link, but the first and last links contain no text.

```html
<p>See <a href="https://www.mozilla.org/" aria-label="Mozilla"></a></p>
<p>Do not forget to <a href="contact-me.html">leave a message</a>!</p>
<p>See also <a href="https://developer.mozilla.org/" aria-label="MDN"></a></p>
```

#### CSS

We create and initialize the counter on `:root`, increment it on every link, and generate content only when the link is `:empty`.

```css
:root {
  counter-reset: link;
}

a[href] {
  counter-increment: link;
}

a[href]:empty::after {
  content: "[" counter(link) "]";
}
```

#### Result

### Nested counters

A CSS counter can be especially useful for making outlined lists, because a new instance of the counter is automatically created in child elements.
Using the `counters()` function, separating text can be inserted between different levels of nested counters.

#### HTML

```html
<ol>
  <li>item</li>          <!-- 1     -->
  <li>item               <!-- 2     -->
    <ol>
      <li>item</li>      <!-- 2.1   -->
      <li>item</li>      <!-- 2.2   -->
      <li>item           <!-- 2.3   -->
        <ol>
          <li>item</li>  <!-- 2.3.1 -->
          <li>item</li>  <!-- 2.3.2 -->
        </ol>
        <ol>
          <li>item</li>  <!-- 2.3.1 -->
          <li>item</li>  <!-- 2.3.2 -->
          <li>item</li>  <!-- 2.3.3 -->
        </ol>
      </li>
      <li>item</li>      <!-- 2.4   -->
    </ol>
  </li>
  <li>item</li>          <!-- 3     -->
  <li>item</li>          <!-- 4     -->
</ol>
<ol>
  <li>item</li>          <!-- 1     -->
  <li>item</li>          <!-- 2     -->
</ol>
```

#### CSS

We create a new instance of the section counter with each `` element, incrementing only the current instance of the section counter on each ``. Using the `counters()` function, we combine the values of all instances of the section counter, separated by a period.

```css
ol {
  counter-reset: section;
  list-style-type: none;
}

li {
  counter-increment: section;
}

li::before {
  content: counters(section, ".") " ";
}
```

#### Result

## See also

- `contain`
- `counter-reset`
- `counter-set`
- `counter-increment`
- `@counter-style`
- CSS counter styles module
- CSS lists and counters module
