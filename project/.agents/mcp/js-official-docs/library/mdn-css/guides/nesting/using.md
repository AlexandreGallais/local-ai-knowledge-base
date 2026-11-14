---
title: "Using CSS nesting"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/nesting/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using CSS nesting

The CSS nesting module allows you to write your stylesheets so that they are easier to read, more modular, and more maintainable. As you are not constantly repeating selectors, the file size can also be reduced.

CSS nesting is different from CSS preprocessors such as Sass in that it is parsed by the browser rather than being pre-compiled by a CSS preprocessor. Also, in CSS nesting, the specificity of the `&` nesting selector is similar to the `:is()` function; it is calculated using the highest specificity in the associated selector list.

This guide shows different ways to arrange nesting in CSS.

## Child selectors

You can use CSS nesting to create child selectors of a parent, which in turn can be used to target child elements of specific parents. This can be done with or without the `&` nesting selector.

There are certain instances where using the `&` nesting selector can be necessary or helpful:

- When joining selectors together, such as using compound selectors or pseudo-classes.
- For backwards compatibility.
- As a visual indicator to aid with readability, when seeing the `&` nesting selector you know that CSS nesting is being used.

```css
/* Without nesting selector */
.parent {
  /* parent styles */
  .child {
    /* child of parent styles */
  }
}

/* With nesting selector */
.parent {
  /* parent styles */
  & .child {
    /* child of parent styles */
  }
}

/* the browser will parse both of these as */
.parent {
  /* parent styles */
}
.parent .child {
  /* child of parent styles */
}
```

### Examples

In these examples, one without and one with the `&` nesting selector, the `` inside the `` is being styled differently to the `` that is a sibling of a ``.

#### Without nesting selector

##### HTML

```html
<form>
  <label for="name">Name:
    <input type="text" id="name" />
  </label>
  <label for="email">email:</label>
  <input type="text" id="email" />
</form>
```

##### CSS

```css
form,
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

```css
input {
  /* styles for input not in a label  */
  border: tomato 2px solid;
}
label {
  /* styles for label */
  font-family: system-ui;
  font-size: 1.25rem;

  input {
    /* styles for input in a label  */
    border: blue 2px dashed;
  }
}
```

##### Result

#### With nesting selector

```html
<form>
  <label for="name">Name:
    <input type="text" id="name" />
  </label>
  <label for="email">email:</label>
  <input type="text" id="email" />
</form>
```

##### CSS

```css
form,
label {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
```

```css
input {
  /* styles for input not in a label  */
  border: tomato 2px solid;
}
label {
  /* styles for label */
  font-family: system-ui;
  font-size: 1.25rem;

  & input {
    /* styles for input in a label  */
    border: blue 2px dashed;
  }
}
```

##### Result

## Combinators

CSS Combinators can also be used with or without the `&` nesting selector.

### Example

#### Nesting the sibling combinator

In this example, the first paragraph after each `<h2>` is targeted with the next-sibling combinator (`+`) using CSS nesting.

##### HTML

```html
<h2>Heading</h2>
<p>This is the first paragraph.</p>
<p>This is the second paragraph.</p>
```

##### CSS

```css
h2 {
  color: tomato;
  + p {
    color: white;
    background-color: black;
  }
}
/* this code can also be written with the & nesting selector */
/* 
h2 {
  color: tomato;
  & + p {
    color: white;
    background-color: black;
  }
}
*/
```

##### Result

## Compound selectors

When using compound selectors in nested CSS you **have** to use the `&` nesting selector. This is because the browser will automatically add whitespace between selectors that do not use the `&` nesting selector.

In order to target an element with `class="a b"` the `&` nesting selector is needed otherwise the whitespace will break the compound selector.

```css
.a {
  /* styles for element with class="a" */
  .b {
    /* styles for element with class="b" which is a descendant of class="a" */
  }
  &.b {
    /* styles for element with class="a b" */
  }
}

/* the browser parses this as */
.a {
  /* styles for element with class="a" */
}
.a .b {
  /* styles for element with class="b" which is a descendant of class="a" */
}
.a.b {
  /* styles for element with class="a b" */
}
```

### Example

#### Nesting and compound selectors

In this example the `&` nesting selector is used to create compound selectors to style elements with multiple classes.

##### HTML

```html
<div class="notices">
  <div class="notice">
    <h2 class="notice-heading">Notice</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
  <div class="notice warning">
    <h2 class="warning-heading">Warning</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
  <div class="notice success">
    <h2 class="success-heading">Success</h2>
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
  </div>
</div>
```

##### CSS

Styles for the `.notices` to create a column using flexbox layout.

```css
.notices {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 90%;
  margin: auto;
}
```

In the CSS code below, nesting is used to create compound selectors both with and without `&`. The top-level selector defines the basic <example-value> for elements with `class="notice"`. The `&` nesting selector is then used to create compound selectors for elements with either `class="notice warning"` or `class="notice success"`. Additionally, the use of nesting to create compound selectors without explicitly using `&` can be seen in the selector `.notice .notice-heading::before`.

```css
.notice {
  width: 90%;
  justify-content: center;
  border-radius: 1rem;
  border: black solid 2px;
  background-color: #ffc107;
  color: black;
  padding: 1rem;
  .notice-heading::before {
    /* equivalent to `.notice .notice-heading::before` */
    content: "ℹ︎ ";
  }
  &.warning {
    /* equivalent to `.notice.warning` */
    background-color: #d81b60;
    border-color: #d81b60;
    color: white;
    .warning-heading::before {
      /* equivalent to `.notice.warning .warning-heading::before` */
      content: "! ";
    }
  }
  &.success {
    /* equivalent to `.notice.success` */
    background-color: #004d40;
    border-color: #004d40;
    color: white;
    .success-heading::before {
      /* equivalent to `.notice.success .success-heading::before` */
      content: "✓ ";
    }
  }
}
```

##### Result

## Appended nesting selector

The `&` nesting selector can also be appended to a nested selector which has the effect of reversing the context.

This can be useful when we have styles for a child element that change when a parent element is given a different class:

```html
<div>
  <span class="foo">text</span>
</div>
```

As opposed to:

```html
<div class="bar">
  <span class="foo">text</span>
</div>
```

```css
.foo {
  /* .foo styles */
  .bar & {
    /* .bar .foo styles */
  }
}
```

### Example

#### Appending nesting selector

In this example there are 3 cards, one of which is featured. The cards are all exactly the same except the featured card will have an alternative color for the heading. By appending the `&` nesting selector the style for the `.featured h2` can be nested in the style for the `h2`.

##### HTML

```html
<div class="wrapper">
  <article class="card">
    <h2>Card 1</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
  <article class="card featured">
    <h2>Card 2</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
  <article class="card">
    <h2>Card 3</h2>
    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
  </article>
</div>
```

##### CSS

```css
.wrapper {
  display: flex;
  flex-direction: row;
  gap: 0.25rem;
  font-family: system-ui;
}
```

In the following CSS, we are creating the styles for `.card` and `.card h2`. Then, in the `h2` style block, we nest the `.featured` class with the `&` nesting selector appended which creates a style for `.card :is(.featured h2)`, which is equivalent to `:is(.card h2):is(.featured h2)`.

```css
.card {
  padding: 0.5rem;
  border: 1px solid black;
  border-radius: 0.5rem;
  & h2 {
    /* equivalent to `.card h2` */
    color: slateblue;
    .featured & {
      /* equivalent to `:is(.card h2):is(.featured h2)` */
      color: tomato;
    }
  }
}
```

##### Result

## Nested declarations rule

The nested declaration rule is that CSS rules are parsed in the order that they are written in the CSS document.

With the following CSS:

```css
.foo {
  background-color: silver;
  @media screen {
    color: tomato;
  }
  color: black;
}
```

The `background-color` is parsed first and set to silver, then the `@media` rule is evaluated, and finally the `color`.

The CSSOM parses the CSS in the following way:

```plain
↳ CSSStyleRule
  .style
    - background-color: silver
  ↳ CSSMediaRule
    ↳ CSSNestedDeclarations
      .style (CSSStyleDeclaration, 1) =
      - color: tomato
  ↳ CSSNestedDeclarations
    .style (CSSStyleDeclaration, 1) =
      - color: black
```

Note that in order to preserve the parsing order, all the rules before nesting are handled as top-level `CSSRules`, while any top level rules after nesting are represented as `CSSNestedDeclarations`.
That's why the `color-black` is inside a nested declaration even though it is a top level declaration in the original document.

> **Note:**
> Support for the rule was added with `CSSNestedDeclarations`.
> Browsers that do not support this interface may parse nested rules in the wrong order.

## Concatenation (is not possible)

In CSS preprocessors such as Sass, it is possible to use nesting to join strings to create new classes. This is common in CSS methodologies such as BEM.

```css
/* the following Sass syntax... */
.component {
  &__child-element {
  }
}
/* ... would become the following CSS */
.component__child-element {
}
```

> **Warning:**
> This is not possible in CSS nesting: when a combinator is not used, the nested selector is treated as a type selector. Allowing concatenation would break this.

In compound selectors, the type selector must come first. Writing `&Element` (a type selector) makes the CSS selector, and the entire selector block, invalid. As the type selector must come first, the compound selector must be written as `Element&`.

```css
.my-class {
  element& {
  }
}

/* the browser parses this to become a compound selector */
.my-class {
}
element.my-class {
}
```

## Invalid nested style rules

If a nested CSS rule is invalid then all of the enclosed styles will be ignored. This does not affect the parent or preceding rules.

In the following example, there is an invalid selector (`%` is not a valid character for selectors). The rule that includes this selector is ignored, but subsequent valid rules are not.

```css
.parent {
  /* .parent styles these work fine */
  & %invalid {
    /* %invalid styles all of which are ignored */
  }
  & .valid {
    /* .parent .valid styles these work fine */
  }
}
```

## See also

- CSS nesting module
- `&` nesting selector
- Nesting `@` at-rules
- Nesting and specificity
- `CSSNestedDeclarations`
- The Nested Declarations Rule
