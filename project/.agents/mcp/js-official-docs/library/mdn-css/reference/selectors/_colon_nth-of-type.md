---
title: "`:nth-of-type()` CSS pseudo-class"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_colon_nth-of-type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `:nth-of-type()` CSS pseudo-class

The **`:nth-of-type()`** CSS pseudo-class matches elements based on their position among siblings of the same type (tag name).

```css
dt {
  font-weight: bold;
}

dd {
  margin: 3px;
}

dd:nth-of-type(even) {
  border: 2px solid orange;
}
```

```html
<dl>
  <dt>Vegetables:</dt>
  <dd>1. Tomatoes</dd>
  <dd>2. Cucumbers</dd>
  <dd>3. Mushrooms</dd>
  <dt>Fruits:</dt>
  <dd>4. Apples</dd>
  <dd>5. Mangos</dd>
  <dd>6. Pears</dd>
  <dd>7. Oranges</dd>
</dl>
```

## Syntax

```css
:nth-of-type(<An+B> | even | odd) {
  /* ... */
}
```

### Parameters

The `:nth-of-type()` pseudo-class is specified with a single argument, which represents the pattern for matching elements.

See `:nth-child` for a more detailed explanation of its syntax.

## Examples

### Basic <example-value>

#### HTML

```html
<div>
  <div>This element isn't counted.</div>
  <p>1st paragraph.</p>
  <p class="fancy">2nd paragraph.</p>
  <div>This element isn't counted.</div>
  <p class="fancy">3rd paragraph.</p>
  <p>4th paragraph.</p>
</div>
```

#### CSS

```css
/* Odd paragraphs */
p:nth-of-type(2n + 1) {
  color: red;
}

/* Even paragraphs */
p:nth-of-type(2n) {
  color: blue;
}

/* First paragraph */
p:nth-of-type(1) {
  font-weight: bold;
}

/* This will match the 3rd paragraph as it will match elements which are 2n+1 AND have a class of fancy.
The second paragraph has a class of fancy but is not matched as it is not :nth-of-type(2n+1) */
p.fancy:nth-of-type(2n + 1) {
  text-decoration: underline;
}
```

#### Result

> **Note:**
> There is no way to select the "nth-of-class" using this selector. The `:nth-of-type` selector looks at the type only when creating the list of matches. You can however use the `:nth-of-child` selector `of` syntax to achieve an "nth-of-class" behavior. You can also apply CSS to an element based on `:nth-of-type` location **and** a class, as shown in the previous example.

## See also

- `:nth-child`, `:nth-last-of-type`
