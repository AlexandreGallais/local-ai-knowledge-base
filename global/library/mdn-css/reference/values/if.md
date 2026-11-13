---
title: "`if()` CSS function (part 1 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/if/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `if()` CSS function

The **`if()`** CSS function allows different values to be set for a property depending on the result of a conditional test. The test can be based on a style query, a media query, or a feature query.

## Syntax

```css
/* Single <if-test> */
if(style(--scheme: dark): #eeeeee;)
if(media(print): black;)
if(media(width > 700px): 0 auto;)
if(supports(color: lch(7.1% 60.23 300.16)): lch(7.1% 60.23 300.16);)

/* <if-test> with else */
if(style(--size: "2xl"): 1em; else: 0.25em;)
if(media(print): white; else: black;)
if(media(width < 700px): 0 auto; else: 20px auto)
if(
  supports(color: lch(7.1% 60.23 300.16)): lch(7.1% 60.23 300.16);
  else: #03045e;
)
if(
  supports(color: lch(75% 0 0)): 3px solid lch(75% 0 0);
  else: 3px solid silver;
)

/* Multiple <if-test>s */
if(
  style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8);
  style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971);
  else: none;
)

/* <if-test> within a shorthand */
3px yellow if(
  style(--color: green): dashed;
  style(--color: yellow): inset;
  else: solid;
)
```

### Parameters

The parameter is a semi-colon–separated list of `<if-branch>`es. Each `<if-branch>` is an `<if-condition>` followed by a colon and a `<value>`:

```plain
<if-branch> = <if-condition> : <value>;
```

- `<if-condition>`
    An `<if-test>` or the `else` keyword.
    - `<if-test>`
        A style query, media query, or feature query.

    - `else`
        A keyword representing an `<if-condition>` that always evaluates to true.

- `<value>`
    A property value.

### Return value

A value or guaranteed-invalid.

## Description

The CSS `if()` function provides conditional logic to CSS property values, and works in a similar fashion to JavaScript `if...else` statements.

The `if()` function can be used inside the value of any property, and can contain zero or more semi-colon-separated `<if-condition>`s. Each `<if-condition>` is either an `<if-test> : <value>` pair or an `else : <value>` pair. The semi-colon after the last `<if-condition>` is optional.

The return value is calculated as follows:

1. The `<if-condition>` expressions are evaluated, in the order they appear in the function.
2. The first `<if-condition>` that evaluates to `true` has its associated `<value>` returned.
3. If no `<if-condition>` evaluates to `true`, the function returns a <guaranteed-invalid&gt:. This behaves as invalid or `false` if the `if()` function is used in a value statement that has a fallback, such as a custom property or an `anchor()` function.

For example:

```css
div {
  background-image: if(
    style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8);
    style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971);
    else: none;
  );
}
```

In this case, we are setting a different `linear-gradient()` as the `background-image` on `` elements, depending on whether a `--scheme` custom property is set to `ice` or `fire`. If `--scheme` doesn't exist, or it exists and is set to any other value, the `else` value comes into play, and the `background-image` property is set to `none`.

> **Note:**
> Each condition must be separated from its associated value with a colon, and each `<if-condition> : <value>` pair must be separated with a semi-colon. The semi-colon is optional for the last `<if-condition> : <value>` pair.

> **Warning:**
> There must be no space between the `if` and the opening parenthesis (`(`). If there is, the whole declaration is invalid.

If a single `<if-condition>` or `<value>` is invalid, it does not invalidate the entire `if()` function; instead, the parser moves on to the next `<if-condition> : <value>` pair. If no `<if-condition>` nor `<value>` is valid, the function returns guaranteed-invalid.

### Frequency and position of `else : <value>` pairs

You can include multiple `else : <value>` pairs inside an `if()` function, in any position. However, in most cases, a single `else : <value>` pair at the end of the semi-colon-separated list is used to provide the default value that is always returned if none of the `<if-test>`s evaluate to true.

If you include an `else : <value>` pair before any `<if-test> : <value>` pairs, the conditions that follow it are not evaluated because `else` always evaluates to `true`. The following `if()` therefore always returns `none`, and the two `<if-test> : <value>` pairs are never evaluated:

```css
div {
  background-image: if(
    else: none;
    style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8);
    style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971)
  );
}
```

Debugging a value that is not behaving as expected is one case where you might want to put an `else : <value>` in a position other than the end of the value list. In the following example, we are trying to work out whether the first `<if-test> : <value>` pair is working properly. If it isn't, the `else : <value>` pair returns a value of `url("debug.png")` to display an image indicating that the first `<if-test> : <value>` pair needs fixing. The last two `<if-test> : <value>` pairs are again never evaluated.

```css
div {
  background-image: if(
    style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8);
    else: url("debug.png");
    style(--scheme: fire): linear-gradient(#ffc971, white, #ffc971);
    else: none;
  );
}
```

Note that an `if()` function is still valid if it contains only an `else : <value>` pair, or nothing at all. The following property values are both valid:

```css
background-color: if(else: yellow);
background-image: if();
```

These functions are not useful. They were included to demonstrate their validity. In this case, the `background-color` value will always be set to `yellow` and the `background-image` will be set to its initial value. You would be better off setting the `background-color` directly to `yellow`, and the `background-image` to `initial` or `none`.

### Types of if-tests

An `<if-test>` accepts one of three query types. This section looks at each one in detail.

#### Style queries

A style query `<if-test>` allows you to test whether a particular property value is set on an element, and apply a value to a different property as a result. We walked through several style query examples earlier on; let's look at another example:

```css
background-image: if(
  style(--scheme: ice): linear-gradient(#caf0f8, white, #caf0f8);
  else: none;
);
```

If the `--scheme` custom property is set to a value of `ice` on the same element, the provided `linear-gradient()` value is returned. If not, then `none` is returned.

Using style queries inside `if()` statements has an advantage over `@container` queries — you can target an element with styles directly, based on whether a custom property is set on it, rather than having to check set styles on a container parent element.

You can also use `and`, `or`, or `not` logic inside style queries. For example:

```css
background-color: if(
  style((--scheme: dark) or (--scheme: very-dark)): black;
);

background-color: if(
  style((--scheme: dark) and (--contrast: hi)): black;
);

background-color: if(
  not style(--scheme: light): black;
);
```

A `@container` query does have some advantages — you can only set single property values at a time with `if()` style queries, whereas `@container` queries can be used to conditionally apply whole sets of rules. The two approaches are complementary, and have different uses.

Note that container style queries currently don't support regular CSS properties, just CSS custom properties. For example, the following won't work:

```css
if(
  background-color: if(style(color: white): black;);
)
```

#### Media queries

A media query `<if-test>` can be used to set a value for a property depending on whether a media query test returns true.

You can use media types. For example, the following `<if-test> : <value>` pair returns a value of `white` on print media, while the `else` clause causes `#eeeeee` to be returned on non-print media.

```css
background-color: if(
  media(print): white;
  else: #eeeeee;
)
```

You can also use media features — the following returns a value of `0 auto` if the current viewport width is less than `700px`, or `20px auto` if this is not the case:

```css
margin: if(
  media(width < 700px): 0 auto;
  else: 20px auto;
)
```

This is really useful when you need to vary a single property value based on a media query result.

You can also use `and`, `or`, or `not` logic inside media queries. For example:

```css
border-color: if(
  media((width > 700px) and (width < 1000px)): blue;
);

border-color: if(
  media((width < 500px) or (orientation: landscape)): blue;
);

background-color: if(
  not media(width < 500px): blue;
  else: red
);
```

When you want to set multiple declarations or rules based on one media query, a regular `@media` construct is needed. The two approaches are complementary, and have different uses.

#### Feature queries

A feature query `<if-test>` can be used to set a value for a property depending on whether the browser supports a particular property value.

For example, the following returns an `color_value/lch()` color if `lch()` colors are supported, or an `color_value/rgb()` color if not:

```css
color: if(
  supports(color: lch(75% 0 0)): lch(75% 0 0);
  else: rgb(185 185 185);
)
```

Selector support queries also work. The following will return a value of `1em` if the browser supports the `:buffering` pseudo-class, or `initial` if not:

```css
margin-top: if(
  supports(selector(:buffering)): 1em;
  else: initial;
)
```

You can also use `and`, `or`, or `not` logic inside feature queries. For example:

```css
margin-top: if(
  supports((selector(:buffering)) and (color: blue)): 1em;
);

margin-top: if(
  supports((selector(:buffering)) or (color: not-a-color)): 1em;
);

margin-top: if(
  supports(not selector(:buffering)): 1em;
);
```

Feature queries are really useful inside `if()` statements when you need to vary a single property value based on support for a particular value or a separate property. When you want to set multiple declarations or rules based on one feature query, a regular `@supports` construct is better. The two approaches are complementary, and have different uses.

### Providing fallback values

The `if()` statement does not gracefully degrade; an explicit fallback needs to be provided for non-supporting browsers.

For example, in this case we provide a static `padding` value for browsers that don't support `if()`. Browsers that support `if()` will override the first declaration with the second one, which sets different padding values depending on whether or not the `--size: "2xl"` custom property is set.

```css
padding: 1em;
padding: if(style(--size: "2xl"): 1em; else: 0.25em);
```

> **Note:**
> Remember to include the `else` condition. In `if()`-supporting browsers, if no `else` value were included and `--size` was not equal to `"2xl"`, the padding would be set to `initial`.

### Whole and partial values

An `if()` function can be set as the value of any CSS property, but it can also be used to determine parts of property values. For example, the following sets a different `border-color` inside a `border` shorthand property, depending on whether `color_value/lch()` colors are supported:

```css
border: if(
  supports(color: lch(75% 0 0)): 3px solid lch(75% 0 0);
  else: 3px solid silver;
);
```

However, we could use the `if()` function to determine the `border-color` component only:

```css
border: 3px solid
  if(
    supports(color: lch(75% 0 0)): lch(75% 0 0); else: silver;
  );
```

### Nesting if() functions

Because an `if()` function can take the place of whole property values or individual components, it is possible to nest `if()` functions within other `if()` functions, and inside other functions such as `calc()`.

For example, in this declaration we are using `if()` to set a `color` property value depending on various conditions. We have an outer `if()` function that returns a particular value depending on whether the `--scheme` custom property is set to `ice` or `fire` (with an `else` value of `black` that is returned if neither of the conditions return true).

However, the two `<value>`s are also `if()` functions. These inner `if()` functions return a light color value if the user prefers a dark color scheme (determined using the `prefers-color-scheme` media query), and a dark color value otherwise.

```css
color: if(
  style(--scheme: ice):
    if(
      media(prefers-color-scheme: dark): #caf0f8;
      else: #03045e;
    );
  style(--scheme: fire):
    if(
      media(prefers-color-scheme: dark): #ffc971;
      else: #621708;
    );
  else: black
);
```

In the next example, we set the `width` property equal to a `calc()` function that subtracts `50px` from a percentage of the parent element's width. The percentage is represented by an `if()` function, which test whether the `--scheme: wide` custom property is set. If so, the percentage is `70%`, so the outer function resolves to `calc(70% - 50px)`. If not, the percentage is `50%`, so the outer function resolves to `calc(50% - 50px)`.

```css
width: calc(if(
    style(--scheme: wide): 70%;
    else: 50%;
  ) - 50px);
```
