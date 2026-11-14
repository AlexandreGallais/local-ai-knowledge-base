---
title: "Using container size and style queries (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/containment/container_size_and_style_queries/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using container size and style queries (part 2 of 3)

## Container style queries

A _container style query_ is a `@container` query that evaluates computed styles of the container element as defined in one or more `style()` functional notations. The boolean syntax and logic used to combine style features into a style query are the same as in CSS feature queries. The only difference is the function name — `style()` within a `<style-feature>` as opposed to `supports()` within a `<support-condition>`:

```css
@container style(<style-feature>),
    not style(<style-feature>),
    style(<style-feature>) and style(<style-feature>),
    style(<style-feature>) or style(<style-feature>) {
  /* <stylesheet> */
}
```

The parameter of each `style()` function is a single **`<style-feature>`**. Per the CSS containment specification, a `<style-feature>` can be a valid CSS declaration, a CSS property, or a `<custom-property-name>`. The only style feature currently supported is custom properties, with or without a value. See the browser compatibility table for `@container`.

If the `<style-feature>` includes a value, the style query evaluates to true if the computed value of the custom property (or, in the future, the CSS declaration) passed as the `style()` argument is true for the container being queried. Otherwise, it resolves to false.
A style feature without a value evaluates to true if the computed value is different from the initial value for the given property.

In the future, we'll be able to write style queries like so:

```css
@container style(color: green) and style(background-color: transparent),
    not style(background-color: red),
    style(--themeBackground),
    style(--themeColor: blue) or style(--themeColor: purple),
    (width <= 100vw) and style(max-width: 600px) {
  /* <stylesheet> */
}
```

The `style()` functional notation is used to differentiate style queries from size queries. While not yet supported, we will eventually be able to query regular CSS declarations such as `max-width: 600px`. Querying `@container (max-width: 600px)` is a size query; containment with `container-type`, or the `container` shorthand, is needed. That query will return true if the container is 600px or less. That is different from querying `@container style(max-width: 600px)`, which is a style query; when supported, this query will return true if the container has a `max-width` value of `600px`.

Until style queries for regular CSS declarations and properties are supported, we are limited to including only custom properties as the `style()` parameter, with or without a value:

```css
@container style(--themeBackground),
    style(--themeColor: blue) or style(--themeColor: purple) {
  /* <stylesheet> */
}
```

A few things to note that have already been mentioned but are important to remember:

- All elements can be style query containers; setting a `container-type` is not required. When descendant styles don't impact the computed styles of an ancestor, containment is not needed.
- A `<container-condition>` can include both style and size features. If including size features in your query, make sure your container elements have a `container-type` of `size` or `inline-size` set.
- If you don't want an element to be considered as a container, ever, give it a `container-name` that will not be used. Setting `container-name: none` removes any query names associated with a container; it does not prevent the element from being a style container.
- At the time of this writing (February 2024), container style queries only work with CSS custom property values in the `style()` query.

Now, let's dive in and take a look at the different `<style-feature>` types.

### Style queries for custom properties

Style queries for custom properties allow you to query the custom properties, also called "CSS variables", of a parent element. They are included within a `<style-query>` just as you would include any regular CSS property within a feature query: either with or without a value.

#### Standalone custom property queries

The `<style-query>` parameter of the `style()` functional notation can include just a CSS variable name; a custom property with no value. When no value is included, the query will return false if the value is the same as the value of the `initial-value` descriptor within the `@property` at-rule, if there is one. The style query will return true and match all elements that have a custom property value that differs from the `initial-value` or for all elements that have a custom property of any value if the custom property was declared without being registered.

##### Unregistered custom properties

When CSS variables are introduced via a CSS custom property value assignment, valueless custom property queries always return true.

```css
:root {
  --theme-color: rebeccapurple;
}

@container style(--theme-color) {
  /* <stylesheet> */
}
```

In this example, the container query matches the element on which the `--theme-color` property was declared and all of its descendants. As the CSS variable `--theme-color` was declared on the `:root`, the style query `style(--theme-color)` will be true for every element within that DOM node.

##### Registered properties

The behavior of registered custom properties is different. When explicitly defined with the `@property` CSS at-rule or via JavaScript with `CSS.registerProperty()`, the style query `style(--theme-color)` only returns true for elements if the element's computed value for `--theme-color` is different from the `initial-value` set in the original definition of that custom property.

```css
@property --theme-color {
  initial-value: rebeccapurple;
  inherits: true;
}

:root {
  --theme-color: rebeccapurple;
}

main {
  --theme-color: blue;
}

@container style(--theme-color) {
  /* <stylesheet> */
}
```

In this example, the `:root` element does NOT match the style query because the value of the custom property is the same as the `initial-value` value. The custom property value for the element (and all the elements inheriting the value) is still `rebeccapurple`. Only elements that differ from the initial value, in this case, the `` and its descendants that inherit that changed value, are a match.

#### Custom property with a value

If a style query includes a value for the custom property, the element's computed value for that property must be an exact match, with equivalent values only being a match if the custom property was defined with a `@property` at rule (or a `CSS.registerProperty()` method call) containing a `syntax` descriptor.

```css
@container style(--accent-color: blue) {
  /* <stylesheet> */
}
```

This container style query matches any element that has `blue` as the computed value of the `--accent-color` custom property.

In this case, other color values equivalent to sRGB `blue` (such as the hexadecimal code `#0000ff`) will match only if the `--accent-color` property was defined as a color with `@property` or `CSS.registerProperty()`, for example:

```css
@property --accent-color {
  syntax: "<color>";
  inherits: true;
  initial-value: #0000ff;
}
```

In this case, if the value of `--accent-color` were set to `blue`, `#00f`, `#0000ff`, `rgb(0 0 255 / 1)`, or `rgb(0% 0% 100%)` it would return true for `@container style(--accent-color: blue)`.

##### Example

In this example, we have a `<fieldset>` with four radio buttons. The fourth option includes a text `` for entering a custom color.

```html
<fieldset>
  <legend>Change the value of <code>--theme</code></legend>
  <ol>
    <li>
      <input type="radio" name="selection" value="red" id="red" />
      <label for="red">--theme: red;</label>
    </li>
    <li>
      <input type="radio" name="selection" value="green" id="green" />
      <label for="green">--theme: green</label>
    </li>
    <li>
      <input type="radio" name="selection" value="blue" id="blue" />
      <label for="blue">--theme: blue</label>
    </li>
    <li>
      <input type="radio" name="selection" value="currentColor" id="other" />
      <label for="other">Other</label>
      <label for="color">color:</label>
      <input name="selection-value" value="currentColor" id="color" />
    </li>
  </ol>
</fieldset>
<output>I change colors</output>
```

JavaScript updates the value of the CSS `--theme` variable on the `<body>` element, which is an ancestor of the `<fieldset>` and `<output>` elements, whenever a radio button is selected. When the text `` is updated, the `value` of the `other` radio button is updated only if the `other` radio button is checked, which in turn updates the value of `--theme`.

```js
const radios = document.querySelectorAll('input[name="selection"]');
const body = document.querySelector("body");
const other = document.getElementById("other");
const color = document.getElementById("color");

for (const radio of radios) {
  radio.addEventListener("change", (e) => {
    body.style.setProperty("--theme", e.target.value);
  });
}
color.addEventListener("input", (e) => {
  other.style.setProperty("value", e.target.value);
  if (other.checked) {
    body.style.setProperty("--theme", e.target.value);
  }
});
```

We use the `@property` at-rule to define a CSS variable `--theme` to be a `<color>` value and set the `initial-value` to `red`, ensuring equivalent colors are a match regardless of what syntax is used (for example, `red` is equal to `rgb(255 0 0)`, `#ff0000`, and `#f00`).

```css
@property --theme {
  syntax: "<color>";
  inherits: true;
  initial-value: red;
}
```

```css
output {
  padding: 3px 5px;
  margin-top: 5px;
}
```

The first style feature query is a custom property with no value. This query type returns true when the computed value for the custom property value is different from the `initial-value` for that property. In this case, it will be true when the value of `--theme` is any value other than any syntax equivalent value of `red` (such as `#ff0000`). When true, the `<output>` will have a 5px dotted outline. The outline color is the current value of `--theme`. The default text `color` is gray.

```css
@container style(--theme) {
  output {
    outline: 5px dotted var(--theme);
    color: #777777;
  }
}
```

The second and third style queries include values for the custom property. These will match if the container's `--theme` value is an equivalent color to the value listed, even if that value is the same as the `initial-value`. The first query matches elements whose `--theme` value is equivalent to `red`, `blue`, or `green`. When it is, the `color` will be the color current value of `--theme` (in the case of `blue` and `green`, overriding the gray set in the first style query).

The second style query states that when `--theme` is equivalent to `red`, the `<output>`'s contents will also be bold. We did this to better demonstrate that the container query is a match.

```css
@container style(--theme: green) or style(--theme: blue) or style(--theme: red) {
  output {
    color: var(--theme);
  }
}

@container style(--theme: red) {
  output {
    font-weight: bold;
  }
}
```

Try entering different color values into the text box. You may notice that values that are sRGB equivalents of `red` will make the `<output>` red — as it matches `style(--theme: red)` — while removing the outline, because `style(--theme)` returns false if the element's value for `--theme` is the same as the initial value for `--theme` defined by the `@property` at-rule. Any non-red sRGB valid color value, including `currentColor` or `hsl(180 100% 50%)`, etc., makes the first style query return true; they are values that are different from the `initial-value`.

Because we set `syntax: "<color>";`, the CSS variable can only be assigned valid `<color>` values. Valid values for the `color` property that aren't value `<color>` values, such as `unset` or `inherit`, are invalid for this custom property, and will be ignored.

If you enter `unset` or `gibberish`, the JavaScript updates the `style` on the `<body>` to `--theme: unset` or `--theme: gibberish`. Neither of these are colors. Both are invalid and ignored. This means the initial value is inherited and unchanged, with `style(--theme)` returning false and `style(--theme: red)` returning true.

> **Note:**
> When declaring custom properties, consider using `@property` with the `syntax` descriptor so the browser can properly compare computed values.
