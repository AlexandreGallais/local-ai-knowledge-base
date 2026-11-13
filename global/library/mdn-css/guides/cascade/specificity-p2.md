---
title: "Specificity (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/specificity/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Specificity (part 2 of 2)

## Tips for handling specificity headaches

Instead of using `!important`, consider using cascade layers and using low weight specificity throughout your CSS so that styles are easily overridden with slightly more specific rules. Using semantic HTML helps provide anchors from which to apply styling.

### Making selectors specific with and without adding specificity

By indicating the section of the document you're styling before the element you're selecting, the rule becomes more specific. Depending on how you add it, you can add some, a lot, or no specificity, as shown below:

```html
<main id="myContent">
  <h1>Text</h1>
</main>
```

```css
#myContent h1 {
  color: green; /* 1-0-1 */
}
[id="myContent"] h1 {
  color: yellow; /* 0-1-1 */
}
:where(#myContent) h1 {
  color: blue; /* 0-0-1 */
}
```

No matter the order, the heading will be green because that rule is the most specific.

#### Reducing ID specificity

Specificity is based on the form of a selector. Including the `id` of an element as an attribute selector rather than an id selector is a good way to make an element more specific without adding an overabundance of specificity. In the previous example, the selector `[id="myContent"]` counts as an attribute selector for the purpose of determining the selector's specificity, even though it selects an ID.

You can also include the `id` or any part of a selector as a parameter in the `:where()` specificity-adjustment pseudo class if you need to make a selector more specific but don't want to add any specificity at all.

### Increasing specificity by duplicating selector

As a special case for increasing specificity, you can duplicate weights from the _CLASS_ or _ID_ columns. Duplicating id, class, pseudo-class or attribute selectors within a compound selector will increase specificity when overriding very specific selectors over which you have no control.

```css
#myId#myId#myId span {
  /* 3-0-1 */
}
.myClass.myClass.myClass span {
  /* 0-3-1 */
}
```

Use this sparingly, if at all. If using selector duplication, always comment your CSS.

By using `:is()` and `:not()` (and also `:has()`), you can increase specificity even if you can't add an `id` to a parent element:

```css
:not(#fakeID#fakeId#fakeID) span {
  /* 3-0-1 */
}
:is(#fakeID#fakeId#fakeID, span) {
  /* 3-0-0 */
}
```

### Precedence over third-party CSS

Leveraging cascade layers is the standard way of enabling one set of styles to take precedence over another set of styles; cascade layers enable this without using specificity! Normal (not important) author styles imported into cascade layers have lower precedence than unlayered author styles.

If styles are coming from a stylesheet you can't edit or don't understand and you need to override styles, a strategy is to import the styles you don't control into a cascade layer. Styles in subsequently declared layers take precedence, with unlayered styles having precedence over all layered styles from the same origin.

When two selectors from different layers match the same element, origin and importance take precedence; the specificity of the selector in the losing stylesheet is irrelevant.

```css
@import "TW.css" layer();
p,
p * {
  font-size: 1rem;
}
```

In the above example, all paragraph text, including the nested content, will be `1rem` no matter how many class names the paragraphs have that match the TW stylesheet.

### Avoiding and overriding `!important`

The best approach is to not use `!important`. The above explanations on specificity should be helpful in avoiding using the flag and removing it altogether when encountered.

To remove the perceived need for `!important`, you can do one of the following:

- Increase the specificity of the selector of the formerly `!important` declaration so that it is greater than other declarations
- Give it the same specificity and put it after the declaration it is meant to override
- Reduce the specificity of the selector you are trying to override.

All these methods are covered in preceding sections.

If you're unable to remove `!important` flags from an author's style sheet, the only solution to overriding the important styles is by using `!important`. Creating a cascade layer of important declaration overrides is an excellent solution. Two ways of doing this include:

#### Method 1

1. Create a separate, short style sheet containing only important declarations specifically overriding any important declarations you were unable to remove.
2. Import this stylesheet as the first import in your CSS using `layer()`, including the `@import` statement, before linking to other stylesheets. This is to ensure that the important overrides are imported as the first layer.

```css
@import "importantOverrides.css" layer();
```

#### Method 2

1. At the beginning of your stylesheet declarations, create a named cascade layer, like so:

   ```css
   @layer importantOverrides;
   ```

2. Each time you need to override an important declaration, declare it within the named layer. Only declare important rules within the layer.

   ```css
   [id="myElement"] p {
     /* normal styles here */
   }
   @layer importantOverrides {
     [id="myElement"] p {
       /* important style here */
     }
   }
   ```

The specificity of the selector of the important style within the layer can be low, as long as it matches the element you are trying to override. Normal layers should be declared outside the layer because layered styles have lower precedence than unlayered styles.

### Tree proximity ignorance

The proximity of an element to other elements that are referenced in a given selector has no impact on specificity.

```css
body h1 {
  color: green;
}

html h1 {
  color: purple;
}
```

The `<h1>` elements will be purple because when declarations have the same specificity, the last declared selector has precedence.

### Directly targeted elements vs. inherited styles

Styles for a directly targeted element will always take precedence over inherited styles, regardless of the specificity of the inherited rule. Given the following CSS and HTML:

```css
#parent {
  color: green;
}

h1 {
  color: purple;
}
```

```html
<html lang="en">
  <body id="parent">
    <h1>Here is a title!</h1>
  </body>
</html>
```

The `h1` will be purple because the `h1` selector targets the element specifically, while the green is inherited from the `#parent` declarations.

## Examples

In the following CSS, we have three selectors targeting `` elements to set a color. For a given input, the specificity weight of the color declaration having precedence is the matching selector with the greatest weight:

```css
#myElement input.myClass {
  color: red;
} /* 1-1-1 */
input[type="<example-value>"]:required {
  color: blue;
} /* 0-2-1 */
html body main input {
  color: green;
} /* 0-0-4 */
```

If the above selectors all target the same input, the input will be red, as the first declaration has the highest value in the _ID_ column.

The last selector has four _TYPE_ components. While it has the highest integer value, no matter how many elements and pseudo-elements are included, even if there were 150, TYPE components never have precedence over _CLASS_ components. The column values are compared starting from left to right when column values are equal.

Had we converted the id selector in the example code above to an attribute selector, the first two selectors would have the same specificity, as shown below:

```css
[id="myElement"] input.myClass {
  color: red;
} /* 0-2-1 */
input[type="<example-value>"]:required {
  color: blue;
} /* 0-2-1 */
```

When multiple declarations have equal specificity, the last declaration found in the CSS is applied to the element. If both selectors match the same ``, the color will be blue.

## Additional notes

A few things to remember about specificity:

1. Specificity only applies when the same element is targeted by multiple declarations in the same cascade layer or origin. Specificity only matters for declarations of the same importance and same origin and cascade layer. If matching selectors are in different origins, the cascade determines which declaration takes precedence.

2. When two selectors in the same cascade layer and origin have the same specificity, scoping proximity is then calculated; the ruleset with the lowest scoping proximity wins. See How `@scope` conflicts are resolved for more details and an example.

3. If scope proximity is also the same for both selectors, source order then comes into play. When all else is equal, the last selector wins.

4. As per CSS rules, directly targeted elements will always take precedence over rules which an element inherits from its ancestor.

5. Proximity of elements in the document tree has no effect on the specificity.

## See also

- CSS cascading and inheritance module
- Learn: Handling conflicts
- Learn: Cascade layers
- CSS syntax module
- Introduction to CSS syntax: declarations, rulesets, and statements
- CSS error handling
- At-rules
- Inheritance
- Values: initial, computed, used, and actual
- Value definition syntax
- CSS nesting module
- Specificity Calculator by Keegan Street: An interactive website to test and understand your own CSS rules
- SpeciFISHity on specifishity.com: A fun way to learn about CSS specificity
- _ID-CLASS-TYPE_ exercise: A specificity quiz by Estelle Weyl
