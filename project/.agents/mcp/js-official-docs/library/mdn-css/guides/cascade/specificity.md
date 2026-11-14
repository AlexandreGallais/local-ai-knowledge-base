---
title: "Specificity (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/specificity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Specificity

**Specificity** is the weight that browsers use in the cascade algorithm to determine the CSS declaration that is the most relevant to an element, which in turn, determines the property value to apply to the element. The specificity algorithm calculates this weight from a CSS selector, and compares the resulting values to decide which rule, from competing CSS declarations within the same origin and layer, gets applied to an element.

> **Note:**
> Browsers consider specificity **after** determining cascade origin and importance. In other words, for competing property declarations, specificity is relevant and compared only between selectors from the one cascade origin and layer that has precedence for the property. Scoping proximity and order of appearance become relevant when the selector specificities of the competing declarations in the cascade layer with precedence are equal.

## How is specificity calculated?

Specificity is the weight that is applied to a given CSS declaration. The specificity algorithm calculates that weight based on the number of selectors of each weight category in the selector matching the element (or pseudo-element). If there are two or more declarations providing different property values for the same element, the declaration value in the style block having the matching selector with the greatest weight gets applied.

The specificity value is basically a three-column value of three categories or weights - ID, CLASS, and TYPE - corresponding to the three types of selectors. The value represents the count of selector components in each weight category and is written as _ID - CLASS - TYPE_. The three columns are created by counting the number of selector components for each selector weight category in the selectors that match the element.

### Selector weight categories

The selector weight categories are listed here in the order of decreasing specificity:

- ID column
    Includes only ID selectors, such as `#example`. For each ID in a matching selector, add 1-0-0 to the weight value.
- CLASS column
    Includes class selectors, such as `.myClass`, attribute selectors like `[type="radio"]` and `[lang|="fr"]`, and pseudo-classes, such as `:hover`, `:nth-of-type(3n)`, and `:required`. For each class, attribute selector, or pseudo-class in a matching selector, add 0-1-0 to the weight value.
- TYPE column
    Includes type selectors, such as `p`, `h1`, and `td`, and pseudo-elements like `::before`, `::placeholder`, and all other selectors with double-colon notation. For each type or pseudo-element in a matching selector, add 0-0-1 to the weight value.
- No value
    The universal selector (`*`) and the pseudo-class `:where()` and its parameters aren't counted when calculating the weight so their value is 0-0-0, but they do match elements. These selectors do not impact the specificity weight value.

Combinators, such as `+`, `>`, `~`, " ", and `||`, may make a selector more specific in what is selected but they don't add any value to the specificity weight.

The `&` nesting combinator doesn't add specificity weight, but nested rules do. In terms of specificity, and functionality, nesting is very similar to the `:is()` pseudo-class.

Like nesting, the `:is()`, `:has()`, and negation (`:not()`) pseudo-classes themselves add no weight. The parameters in these selectors, however, do. The specificity weight of each comes from the selector parameter in the list of selectors with the highest specificity. Similarly, with nested selectors, the specificity weight added by the nested selector component is the selector in the comma-separated list of nested selectors with the highest specificity.

The `:not()`, `:is()`, `:has()` and CSS nesting exceptions are discussed below.

#### Matching selector

The specificity weight comes from the matching selector. Take this CSS selector with three comma-separated selectors as an example:

```css
[type="<example-value>"],
input:focus,
:root #myApp input:required {
  color: blue;
}
```

The `[type="<example-value>"]` selector in the above selector list, with a specificity weight of `0-1-0`, applies the `color: blue` declaration to all password input types.

All inputs, no matter the type, when receiving focus, match the second selector in the list, `input:focus`, with a specificity weight of `0-1-1`; this weight is made up of the `:focus` pseudo-class (0-1-0) and the `input` type (0-0-1). If the password input has focus, it will match `input:focus`, and the specificity weight for the `color: blue` style declaration will be `0-1-1`. When that password doesn't have focus, the specificity weight remains at `0-1-0`.

The specificity for a required input nested in an element with attribute `id="myApp"` is `1-2-1`, based on one ID, two pseudo-classes, and one element type.

If the password input type with `required` is nested in an element with `id="<example-value>"` set, the specificity weight will be `1-2-1`, based on one ID, two pseudo-classes, and one element type, whether or not it has focus. Why is the specificity weight `1-2-1` rather than `0-1-1` or `0-1-0` in this case? Because the specificity weight comes from the matching selector with the greatest specificity weight. The weight is determined by comparing the values in the three columns, from left to right.

```css
[type="<example-value>"] {
  /* 0-1-0 */
}
input:focus {
  /* 0-1-1 */
}
:root #myApp input:required {
  /* 1-2-1 */
}
```

### Three-column comparison

Once the specificity values of the relevant selectors are determined, the number of selector components in each column is compared, from left to right.

```css
#myElement {
  color: green; /* 1-0-0  - WINS!! */
}
.bodyClass .sectionClass .parentClass [id="myElement"] {
  color: yellow; /* 0-4-0 */
}
```

The first column is the value of the _ID_ component, which is the number of IDs in each selector. The numbers in the _ID_ columns of competing selectors are compared. The selector with the greater value in the _ID_ column wins no matter what the values are in the other columns. In the above example, even though the yellow selector has more components in total, only the value of the first column matters.

If the number in the _ID_ columns of competing selectors is the same, then the next column, _CLASS_, is compared, as shown below.

```css
#myElement {
  color: yellow; /* 1-0-0 */
}
#myApp [id="myElement"] {
  color: green; /* 1-1-0  - WINS!! */
}
```

The _CLASS_ column is the count of class names, attribute selectors, and pseudo-classes in the selector. When the _ID_ column value is the same, the selector with the greater value in the _CLASS_ column wins, no matter the value in the _TYPE_ column. This is shown in the example below.

```css
:root input {
  color: green; /* 0-1-1 - WINS because CLASS column is greater */
}
html body main input {
  color: yellow; /* 0-0-4 */
}
```

If the numbers in the _CLASS_ and _ID_ columns in competing selectors are the same, the _TYPE_ column becomes relevant. The _TYPE_ column is the number of element types and pseudo-elements in the selector. When the first two columns have the same value, the selector with the greater number in the _TYPE_ column wins.

If the competing selectors have the same values in all the three columns, the proximity rule comes into play, wherein the last declared style gets precedence.

```css
input.myClass {
  color: yellow; /* 0-1-1 */
}
:root input {
  color: green; /* 0-1-1 WINS because it comes later */
}
```

### The `:is()`, `:not()`, `:has()` and CSS nesting exceptions

The matches-any pseudo-class `:is()`, the relational pseudo-class `:has()`, and the negation pseudo-class `:not()` are _not_ considered as pseudo-classes in the specificity weight calculation. They themselves don't add any weight to the specificity equation. However, the selector parameters passed into the pseudo-class parenthesis are part of the specificity algorithm; the weight of the matches-any and negation pseudo-class in the specificity value calculation is the weight of the parameter's weight.

```css
p {
  /* 0-0-1 */
}
:is(p) {
  /* 0-0-1 */
}

h2:nth-last-of-type(n + 2) {
  /* 0-1-1 */
}
h2:has(~ h2) {
  /* 0-0-2 */
}

div.outer p {
  /* 0-1-2 */
}
div:not(.inner) p {
  /* 0-1-2 */
}
```

Note that in the above CSS pairing, the specificity weight provided by the `:is()`, `:has()` and `:not()` pseudo-classes is the value of the selector parameter, not of the pseudo-class.

All three of these pseudo-classes accept complex selector lists, a list of comma-separated selectors, as a parameter. This feature can be used to increase a selector's specificity:

```css
:is(p, #fakeId) {
  /* 1-0-0 */
}
h1:has(+ h2, > #fakeId) {
  /* 1-0-1 */
}
p:not(#fakeId) {
  /* 1-0-1 */
}
div:not(.inner, #fakeId) p {
  /* 1-0-2 */
}
```

In the above CSS code block, we have included `#fakeId` in the selectors. This `#fakeId` adds `1-0-0` to the specificity weight of each paragraph.

When creating complex selector lists with CSS nesting this behaves in exactly the same way as the `:is()` pseudo-class.

```css
p,
#fakeId {
  span {
    /* 1-0-1 */
  }
}
```

In the above code block the complex selector `p, #fakeId` the specificity is taken from `#fakeId` and also the `span`, so this creates a specificity of `1-0-1` for both `p span` and `#fakeId span`. This is the equivalent specificity as the `:is(p, #fakeId) span` selector.

Generally, you want to keep specificity down to a minimum, but if you need to increase an element's specificity for a particular reason, these three pseudo-classes can help.

```css
a:not(#fakeId#fakeId#fakeID) {
  color: blue; /* 3-0-1 */
}
```

In this example, all links will be blue, unless overridden by a link declaration with 3 or more IDs, a color value matching an `a` includes the `!important` flag, or if the link has an inline style color declaration. If you use such a technique, add a comment to explain why the hack was needed.

### Inline styles

Inline styles added to an element (e.g., `style="font-weight: bold;"`) always overwrite any normal styles in author stylesheets, and therefore, can be thought of as having the highest specificity. Think of inline styles as having a specificity weight of `1-0-0-0`.

The only way to override inline styles is by using `!important`.

Many JavaScript frameworks and libraries add inline styles. Using `!important` with a very targeted selector, such as an attribute selector using the inline style, is one way to override these inline styles.

```html
<p style="color: purple">…</p>
```

```css
p[style*="purple"] {
  color: rebeccapurple !important;
}
```

Make sure to include a comment with every inclusion of the important flag so code maintainers understand why a CSS anti-pattern was used.

### The `!important` exception

CSS declarations marked as important override any other declarations within the same cascade layer and origin. Although technically, `!important` has nothing to do with specificity, it interacts directly with specificity and the cascade. It reverses the cascade order of stylesheets.

If declarations from the same origin and cascade layer conflict and one property value has the `!important` flag set, the important declaration is applied no matter the specificity. When conflicting declarations from the same origin and cascade layer with the `!important` flag are applied to the same element, the declaration with a greater specificity is applied.

Using `!important` to override specificity is considered a **bad practice** and should be avoided for this purpose. Understanding and effectively using specificity and the cascade can remove any need for the `!important` flag.

Instead of using `!important` to override foreign CSS (from external libraries, like Bootstrap or normalize.css), import the third-party scripts directly into cascade layers. If you must use `!important` in your CSS, comment your usage so future code maintainers know why the declaration was marked important and know not to override it. But definitely, don't use `!important` when writing plugins or frameworks that other developers will need to incorporate without being able to control.

### The `:where()` exception

The specificity-adjustment pseudo-class `:where()` always has its specificity replaced with zero, `0-0-0`. It enables making CSS selectors very specific in what element is targeted without any increase to specificity.

In creating third-party CSS to be used by developers who don't have access to edit your CSS, it's considered a good practice to create CSS with the lowest possible specificity. For example, if your theme includes the following CSS:

```css
:where(#defaultTheme) a {
  /* 0-0-1 */
  color: red;
}
```

Then the developer implementing the widget can easily override the link color using only type selectors.

```css
footer a {
  /* 0-0-2 */
  color: blue;
}
```

### How `@scope` blocks affect specificity

Including a ruleset inside a `@scope` block does not affect the specificity of its selector, regardless of the selectors used inside the scope root and limit.
However, if you decide to explicitly add the `:scope` pseudo-class, you'll need to factor it in when calculating their specificity.
`:scope`, like all regular pseudo-classes, has a specificity of 0-1-0. For example:

```css
@scope (.article-body) {
  /* :scope img has a specificity of 0-1-0 + 0-0-1 = 0-1-1 */
  :scope img {
  }
}
```

See Specificity in `@scope` for more information.
