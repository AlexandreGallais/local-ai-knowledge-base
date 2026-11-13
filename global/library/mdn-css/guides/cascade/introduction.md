---
title: "Introduction to the CSS cascade (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/cascade/introduction/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Introduction to the CSS cascade

The **cascade** is an algorithm that defines how user agents combine property values originating from different sources. The cascade defines the origin and layer that takes precedence when declarations in more than one origin, cascade layer, or `@scope` block set a value for a property on an element.

The cascade lies at the core of CSS, as emphasized by the name: _**Cascading**_ Style Sheets. When a selector matches an element, the property value from the origin with the highest precedence gets applied, even if the selector from a lower precedence origin or layer has greater specificity.

This article explains what the cascade is and the order in which CSS declarations cascade, covering cascade layers and origin type. Understanding origin precedence is key to understanding the cascade.

## Origin types

The CSS cascade algorithm's job is to select CSS declarations in order to determine the correct values for CSS properties. CSS declarations come from different origin types: **User-agent stylesheets**, **Author stylesheets**, and **User stylesheets**.

Though stylesheets come from these different origins and can be within different layers in each of these origins, they overlap in terms of their default scope; to make this work, the cascade algorithm defines how they interact. Before addressing the interactions, we'll define some key terms in the next few sections.

### User-agent stylesheets

User-agents, or browsers, have basic <example-value> that give default styles to any document. These stylesheets are named **user-agent stylesheets**. Most browsers use actual stylesheets for this purpose, while others simulate them in code. The end result is the same.

Some browsers let users modify the user-agent stylesheet, but this is rare and not something that can be controlled.

Although some constraints on user-agent stylesheets are set by the HTML specification, browsers have a lot of latitude: that means some differences exist between browsers. To simplify the development process, Web developers may use a CSS reset stylesheet, such as normalize.css, which sets common properties values to a known state for all browsers before beginning to make alterations to suit their specific needs.

Unless the user-agent stylesheet includes an `!important` next to a property, making it "important", styles declared by author styles, including a reset stylesheet, take precedence over the user-agent styles, regardless of the specificity of the associated selector.

### Author stylesheets

**Author stylesheets** are the most common type of stylesheet; these are the styles written by web developers. These styles can reset user-agent styles, as noted above, and define the styles for the design of a given web page or application. The author, or web developer, defines the styles for the document using one or more linked or imported stylesheets, `<style>` blocks, and inline styles defined with the `style` attribute. These author styles define the look and feel of the website — its theme.

### User stylesheets

In most browsers, the user (or reader) of the website can choose to override styles using a custom **user stylesheet** designed to tailor the experience to the user's wishes. Depending on the user agent, user styles can be configured directly or added via browser extensions.

### Cascade layers

The cascade order is based on origin type. The cascade within each origin type is based on the declaration order of cascade layers within that type. For all origins - user-agent, author, or user - styles can be declared within or outside of named or anonymous layers. When declared using `layer`, `layer()` or `@layer`, styles are placed into the specified named layer, or into an anonymous layer if no name is provided. Styles declared outside of a layer are treated as being part of an anonymous last declared layer.

Let's take a look at cascading origin type before diving into cascade layers within each origin type.

## Cascading order

The cascading algorithm determines how to find the value to apply for each property for each document element. The following steps apply to the cascading algorithm:

1. **Relevance**: It first filters all the rules from the different sources to keep only the rules that apply to a given element. That means rules whose selector matches the given element and which are part of an appropriate `media` at-rule.
2. **Origin and importance**: Then it sorts these rules according to their importance, that is, whether or not they are followed by `!important`, and by their origin. Ignoring layers for the moment, the cascade order is as follows:

   | Precedence Order (low to high) | Origin                  | Importance   |
   | ------------------------------ | ----------------------- | ------------ |
   | 1                              | user-agent (browser)    | normal       |
   | 2                              | user                    | normal       |
   | 3                              | author (developer)      | normal       |
   | 4                              | CSS keyframe animations |              |
   | 5                              | author (developer)      | `!important` |
   | 6                              | user                    | `!important` |
   | 7                              | user-agent (browser)    | `!important` |
   | 8                              | CSS transitions         |              |

3. **Specificity**: In case of equality with an origin, the specificity of a rule is considered to choose one value or another. The specificity of the selectors are compared, and the declaration with the highest specificity wins.
4. **Scoping proximity**: When two selectors in the origin layer with precedence have the same specificity, the property value within scoped rules with the smallest number of hops up the DOM hierarchy to the scope root wins. See How `@scope` conflicts are resolved for more details and an example.
5. **Order of appearance**: In the origin with precedence, if there are competing values for a property that are in style block matching selectors of equal specificity and scoping proximity, the last declaration in the style order is applied.

The cascade is in ascending order, meaning:

- Animations take precedence over normal values, whether declared in user, author, or user-agent styles.
- Important values take precedence over animations, whether declared in user, author, or user-agent styles.
- Transitions take precedence over important values.

> **Note:**
> **Transitions and animations**
>
> Property values set by animation `@keyframes` are more important than all normal styles (those with no `!important` set).
>
> Property values being set in a `transition` take precedence over all other values set, even those marked with `!important`.

The cascade algorithm is applied _before_ the specificity algorithm, meaning if `:root p { color: red;}` is declared in the user stylesheet (row 2) and a less specific `p {color: blue;}` is in the author stylesheet (row 3), the paragraphs will be blue.

## Basic <example-value>

Before taking a deeper look at how cascade layers impact the cascade, let's look at an example involving multiple sources of CSS across the various origins, and work through the steps of the cascade algorithm:

Here we have a user agent stylesheet, two author stylesheets, and a user stylesheet, with no inline styles within the HTML:

**User-agent CSS:**

```css
li {
  margin-left: 10px;
}
```

**Author CSS 1:**

```css
li {
  margin-left: 0;
} /* This is a reset */
```

**Author CSS 2:**

```css
@media screen {
  li {
    margin-left: 3px;
  }
}

@media print {
  li {
    margin-left: 1px;
  }
}

@layer namedLayer {
  li {
    margin-left: 5px;
  }
}
```

**User CSS:**

```css
.specific {
  margin-left: 1em;
}
```

**HTML:**

```html
<ul>
  <li class="specific">1<sup>st</sup></li>
  <li>2<sup>nd</sup></li>
</ul>
```

In this case, declarations inside `li` and `.specific` rules should apply.

Once again, there are five steps in the cascade algorithm, in order:

1. Relevance
2. Origin and importance
3. Specificity
4. Scoping proximity
5. Order of appearance

The `1px` is for print media. Due to lack of _relevance_ based on its media type, it is removed from consideration.

No declaration is marked as `!important`, so the precedence order is author stylesheets over user stylesheets over user-agent stylesheet. Based on _origin and importance_, the `1em` from the user stylesheet and the `10px` from the user-agent stylesheet are removed from consideration.

Note that even though the user style on `.specific` of `1em` has a higher specificity, it's a normal declaration in a user stylesheet. As such, it has a lower precedence than any author styles, and gets removed by the origin and importance step of the algorithm before specificity even comes into play.

There are three declarations in author stylesheets:

```css
li {
  margin-left: 0;
} /* from author css 1 */
```

```css
@media screen {
  li {
    margin-left: 3px;
  }
}
```

```css
@layer namedLayer {
  li {
    margin-left: 5px;
  }
}
```

The last one, the `5px` is part of a cascade layer. Normal declarations in layers have lower precedence than normal styles not in a layer within the same origin type. This is also removed by step 2 of the algorithm, _origin and importance_.

This leaves the `0` and the `3px`, which both have the same selector, hence the same _specificity_. Neither of them are inside a `@scope` block, so scoping proximity does not come into play in this example either.

We then look at _order of appearance_. The second one, the last of the two unlayered author styles, wins.

```css
margin-left: 3px;
```

> **Note:**
> The declaration defined in the user CSS, while it may have greater specificity, is not chosen as the cascade algorithm's _origin and importance_ is applied before the _specificity_ algorithm. The declaration defined in a cascade layer, though it may come later in the code, will not take precedence either as normal styles in cascade layers have less precedence than normal unlayered styles. _Order of appearance_ only matters when both origin, importance, and specificity are equal.
