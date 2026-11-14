---
title: "`type()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/type/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `type()` CSS function

The **`type()`** CSS function allows you to specify a particular data type, and is used by the following CSS features:

- The `attr()` function, to specify the data type that an attribute value should be parsed into.
- The `@function` at-rule, to specify the permitted data types for CSS custom function parameters and results.

> **Note:**
> The `@property` at-rule `syntax` descriptor value uses the same `<syntax>` to define the permitted data types for registered custom properties, however, this always takes the form of a string.

## Syntax

```css
/* Single value */
type(<color>)
type(auto)

/* "|" combinator for multiple types */
type(<length> | <percentage>)

/* Space-separated list of values */
type(<color>+)

/* Comma-separated list of values */
type(<length>#)

/* Multiple keywords */
type(red | blue | green)

/* Combination of data type and keyword */
type(<percentage> | auto)

/* Universal syntax value */
type(*)
```

### Parameters

The `type()` function's syntax is as follows:

```plain
type(<syntax>)
```

The `<syntax>` parameter is an expression defining the data type. This can take the following forms:

- `<ident>`
    A CSS keyword value, written without angle brackets.

- `<syntax-type>`
    A type name, written in angle brackets, representing a CSS data type. The following data types are supported:
    - `<angle>`
        Accepts any valid `angle` value.
    - `<color>`
        Accepts any valid `<color>` value.
    - `<custom-ident>`
        Accepts any valid `<custom-ident>` value.
    - `<image>`
        Accepts any valid `image` value.
    - `<integer>`
        Accepts any valid `<integer>` value.
    - `<length>`
        Accepts any valid `<length>` value.
    - `<length-percentage>`
        Accepts any valid `<length>` or `<percentage>` value and any valid `calc()` expression combining `<length>` and `<percentage>` values.
    - `<number>`
        Accepts any valid `<number>` value.
    - `<percentage>`
        Accepts any valid `<percentage>` value.
    - `<resolution>`
        Accepts any valid `resolution` value.
    - `<string>`
        Accepts any valid `<string>` value.
    - `<time>`
        Accepts any valid `<time>` value.
    - `<transform-function>`
        Accepts any valid `<transform-function>` value.
    - `<transform-list>`
        Accepts a list of valid `<transform-function>` values. It is equivalent to `"<example-value>"`, and may not be followed by a `+` or `#` token.
    - `<url>`
        Accepts any valid `<url>` value.

- `*`
    The universal syntax.

You can combine `<syntax-type>` values using the following tokens:

- `+`
    A space-separated list of values is expected.
- `#`
    A comma-separated list of values is expected.

In addition, the `|` token can be used as a separator when specifying multiple values or combining `<ident>` and `<syntax-type>` values for the expected syntax.

### Return value

A data type definition.

## Description

The `type()` function is used when you need to define a data type. It can be considered as a subset of the overall value definition syntax used to define the set of valid values for every CSS property and function.

Most commonly, you'll see `type()` used to specify a single data type. The next example uses the `attr()` function to set the `background-color` property equal to the value of a user-defined `data-background` function. The required data type for the value has been specified as a `<color>`.

```css
background-color: attr(data-background type(<color>), red);
```

You could also specify an exact keyword requirement (for example, `type(blue)`), but this would be overly limiting.

Specifying `type(*)` permits any valid CSS value. This is the universal syntax, which cannot be multiplied or combined with other syntax components.

### Specifying multiple permitted types

You can use the `|` token as a separator when specifying a range of permitted data types, keywords, or a combination of both. For example:

- `type(<length> | <percentage>)`
- `type(red | green)`
- `type(<length> | auto)`

The following example shows how a `@function` at-rule can be used to define a custom function that takes two color parameters, and returns the first one unless the viewport width is less than `700px`, in which case it returns the second one. The first one is allowed to be `red` or `green`, while the second one has to be `blue`.

```css
@function --color-choice(--color1 type(red | green), --color2 blue) {
  result: var(--color1);
  @media (width < 700px) {
    result: var(--color2);
  }
}
```

> **Note:**
> In the case of `@function` data types, you can omit the `type()` function and just include the value in cases where only one data type or keyword is specified. This is the case with the `blue` type definition in the previous custom function. This doesn't work with the `attr()` function.

### Specifying lists of types

The `+` and `#` tokens can be appended to a `<syntax-type>` to specify that you are expecting a space-separated list or a comma-separated list, respectively. For example:

- A `<color>+` parameter expects a space-separated list of `<color>` values, for example `red blue #a60000 rgb(234 45 100)`.
- A `<length>#` parameter expects a comma-separated lists of `<length>` values, for example `30px, 1em, 15vw`.

You can combine multiple tokens using `|` as a separator. For example, `<color># | <integer>#` would expect a comma-separated list of `<color>` values or a comma-separated list of `<integer>` values.

## Examples

You can find several other examples in the `attr()` and `@function` documentation.

### Basic `@function` data type definition

This example defines a CSS custom function that combines multiple strings.

#### HTML

The HTML contains a single `` element with some text content.

```html
<section>What you gonna say?</section>
```

#### CSS

In the CSS, we start by specifying a `@function` called `--combine-strings`. This has a parameter called `--strings`, the data type of which is specified as one or more space-separated `<string>` values. It returns the string values with a space and a heart emoji appended onto the end.

```css
@function --combine-strings(--strings type(<string>+)) {
  result: var(--strings) " ❤️";
}
```

We then specify some basic <example-value> for the `` element and use the `--combine-strings()` function to specify the value of its `content` property, including two space-separated strings as the argument.

```css
section {
  font-family: system-ui;
  background-color: lime;
  padding: 20px;
}

section::after {
  content: --combine-strings("hello" "goodbye");
}
```

#### Result

## See also

- `@function` at-rule
- `attr()` function
- Using CSS custom functions
