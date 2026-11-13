---
title: "`<h1>–<h6>` HTML section heading elements"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/heading_elements/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<h1>–<h6>` HTML section heading elements

The **`<h1>`** to **`<h6>`** HTML elements represent six levels of section headings. `<h1>` is the highest section level and `<h6>` is the lowest. By default, all heading elements create a block-level box in the layout, starting on a new line and taking up the full width available in their containing block.

```html
<h1>Beetles</h1>
<h2>External morphology</h2>
<h3>Head</h3>
<h4>Mouthparts</h4>
<h3>Thorax</h3>
<h4>Prothorax</h4>
<h4>Pterothorax</h4>
```

```css
h1,
h2,
h3,
h4 {
  margin: 0.1rem 0;
}

h1 {
  font-size: 2rem;
}

h2 {
  font-size: 1.5rem;
  padding-left: 20px;
}

h3 {
  font-size: 1.2rem;
  padding-left: 40px;
}

h4 {
  font-size: 1rem;
  font-style: italic;
  padding-left: 60px;
}
```

## Attributes

These elements only include the global attributes.

The `headingoffset` and `headingreset` global attributes can be used to adjust the computed heading level of these elements.

## Usage notes

- Heading information can be used by user agents to construct a table of contents for a document automatically.
- Do not use heading elements to resize text. Instead, use the CSS `font-size` property.
- Do not skip heading levels: always start from `<h1>`, followed by `<h2>` and so on.

### Avoid using multiple `<h1>` elements on one page

While using multiple `<h1>` elements on one page is allowed by the HTML standard (as long as they are not nested), this is not considered a best practice. A page should generally have a single `<h1>` element that describes the content of the page (similar to the document's `<title>` element).

> **Note:**
> Nesting multiple `<h1>` elements in nested sectioning elements was allowed in older versions of the HTML standard. However, this was never considered a best practice and is now non-conforming. Read more in There Is No Document Outline Algorithm.

Prefer using only one `<h1>` per page and nest headings without skipping levels.

### Specifying a uniform font size for `<h1>`

Before May 2025, the HTML standard specified that `<h1>` elements in a ``, ``, ``, or `` element should render as an `<h2>` (smaller `font-size` with an adjusted `margin-block`), or as an `<h3>` if nested another level, and so on. This special context-dependent default style has now been removed.

To ensure consistent `<h1>` rendering for browsers that implement the old context-dependent default style, use the following style rule:

```css
h1 {
  margin-block: 0.67em;
  font-size: 2em;
}
```

Alternatively, to avoid overwriting other style rules that target `<h1>` you can use `:where()`, which has zero specificity:

```css
:where(h1) {
  margin-block: 0.67em;
  font-size: 2em;
}
```

## Accessibility

### Navigation

A common navigation technique for users of screen reading software is to quickly jump from heading to heading in order to determine the content of the page. Because of this, it is important to not skip one or more heading levels. Doing so may create confusion, as the person navigating this way may be left wondering where the missing heading is.

**Don't do this:**

```html
<h1>Heading level 1</h1>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
```

**Prefer this:**

```html
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
```

#### Nesting

Headings may be nested as subsections to reflect the organization of the content of the page. Most screen readers can also generate an ordered list of all the headings on a page, which can help a person quickly determine the content hierarchy and navigate to different headings.

Given the following page structure:

```html
<h1>Beetles</h1>

<h2>Etymology</h2>

<h2>Distribution and Diversity</h2>

<h2>Evolution</h2>
<h3>Late Paleozoic</h3>
<h3>Jurassic</h3>
<h3>Cretaceous</h3>
<h3>Cenozoic</h3>

<h2>External Morphology</h2>
<h3>Head</h3>
<h4>Mouthparts</h4>
<h3>Thorax</h3>
<h4>Prothorax</h4>
<h4>Pterothorax</h4>
<h3>Legs</h3>
<h3>Wings</h3>
<h3>Abdomen</h3>
```

Screen readers would generate a list like this:

1. `h1` Beetles
   1. `h2` Etymology
   2. `h2` Distribution and Diversity
   3. `h2` Evolution
      1. `h3` Late Paleozoic
      2. `h3` Jurassic
      3. `h3` Cretaceous
      4. `h3` Cenozoic

   4. `h2` External Morphology
      1. `h3` Head
         1. `h4` Mouthparts

      2. `h3` Thorax
         1. `h4` Prothorax
         2. `h4` Pterothorax

      3. `h3` Legs
      4. `h3` Wings
      5. `h3` Abdomen

When headings are nested, heading levels may be "skipped" when closing a subsection.

- Headings • Page Structure • WAI Web Accessibility Tutorials
- MDN Understanding WCAG, Guideline 1.3 explanations
- Understanding Success Criterion 1.3.1 | W3C Understanding WCAG 2.0
- MDN Understanding WCAG, Guideline 2.4 explanations
- Understanding Success Criterion 2.4.1 | W3C Understanding WCAG 2.0
- Understanding Success Criterion 2.4.6 | W3C Understanding WCAG 2.0
- Understanding Success Criterion 2.4.10 | W3C Understanding WCAG 2.0

### Labeling section content

Another common navigation technique for users of screen reading software is to generate a list of sectioning content and use it to determine the page's layout.

Sectioning content can be labeled using a combination of the `aria-labelledby` and `id` attributes, with the label concisely describing the purpose of the section. This technique is useful for situations where there is more than one sectioning element on the same page.

#### Sectioning content examples

```html
<header>
  <nav aria-labelledby="primary-navigation">
    <h2 id="primary-navigation">Primary navigation</h2>
    <!-- navigation items -->
  </nav>
</header>

<!-- page content -->

<footer>
  <nav aria-labelledby="footer-navigation">
    <h2 id="footer-navigation">Footer navigation</h2>
    <!-- navigation items -->
  </nav>
</footer>
```

In this example, screen reading technology would announce that there are two `` sections, one called "Primary navigation" and one called "Footer navigation". If labels were not provided, the person using screen reading software may have to investigate each `nav` element's contents to determine their purpose.

- Using the aria-labelledby attribute
- Labeling Regions • Page Structure • W3C WAI Web Accessibility Tutorials

## Examples

### All headings

The following code shows all the heading levels, in use.

```html
<h1>Heading level 1</h1>
<h2>Heading level 2</h2>
<h3>Heading level 3</h3>
<h4>Heading level 4</h4>
<h5>Heading level 5</h5>
<h6>Heading level 6</h6>
```

### Example page

The following code shows a few headings with some content under them.

```html
<h1>Heading elements</h1>
<h2>Summary</h2>
<p>Some text here…</p>

<h2>Examples</h2>
<h3>Example 1</h3>
<p>Some text here…</p>

<h3>Example 2</h3>
<p>Some text here…</p>

<h2>See also</h2>
<p>Some text here…</p>
```

## Technical summary

       |
        Content categories

       |
        Flow content, heading content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        flow content.

       | Implicit ARIA role
       |
        heading

       | Permitted ARIA roles
       |
        `tab`, `presentation` or
        `none`

       | DOM interface
       | `HTMLHeadingElement`

## See also

- ``
- ``
- ``
