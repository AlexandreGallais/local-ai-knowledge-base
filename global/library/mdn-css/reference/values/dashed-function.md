---
title: "`<dashed-function>` CSS type"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/dashed-function/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<dashed-function>` CSS type

The **`<dashed-function>`** CSS data type represents the syntax used to call CSS custom functions, which are defined using the `@function` at-rule.

## Syntax

A `<dashed-function>` value consists of the `--function-name`, followed by parentheses containing the function's arguments (for example, `--my-function(30px, 3)`).

You can include `<dashed-function>` values in place of regular CSS property values or property value components, in cases where you want to dynamically calculate the values based on function logic rather than providing static values.

In cases where you want to pass <example-value> values as arguments, you can do so by wrapping them in curly braces (`{ }`).

## Examples

For more examples, see our Using CSS custom functions guide.

### Basic `<dashed-function>` usage

This example shows a basic <example-value> that returns a semi-transparent version of the color passed to it.

#### HTML

The markup features a `` containing some text content:

```html
<p>Some content</p>
```

#### CSS

In our styles, we first define the CSS custom function. The function is called `--transparent` and accepts two parameters: a color and a numeric alpha channel value. Inside the function body, we use relative color syntax to transform the passed color into an `oklch()` color with an alpha channel equal to the passed alpha value; this becomes the function's `result`:

```css
@function --transparent(--color <color>, --alpha <number>) {
  result: oklch(from var(--color) l c h / var(--alpha));
}
```

Next, we define a `--base-color` custom property with a value of `#faa6ff` on the `:root` element. We assign that property to be the value of the `` element's `border` color, and then set its `background-color` value to equal a transparent version of the same color. This is done by setting the value to equal the `<dashed-function>` syntax, specifying the `--transparent()` function and passing it arguments of `var(--base-color)` and `0.8`.

```css
html,
body {
  height: 100%;
}

body {
  margin: 0;
  display: grid;
  place-items: center;
  font-family: system-ui;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0 20px,
    lightgrey 20px 40px
  );
}
```

```css
:root {
  --base-color: #faa6ff;
}

p {
  width: 50%;
  padding: 30px;
  border-radius: 20px;
  border: 3px solid var(--base-color);
  background-color: --transparent(var(--base-color), 0.8);
}
```

#### Result

## See also

- CSS custom properties
- `@function` at-rule
- `type()` function
- Using CSS custom functions
- CSS custom functions and mixins module
