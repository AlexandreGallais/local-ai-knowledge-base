---
title: "`counter()` CSS function"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/counter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `counter()` CSS function

The **`counter()`** CSS function returns a string representing the current value of the named counter, if there is one.

The `counter()` function is generally used within pseudo-element through the `content` property but, theoretically, it can be used wherever a `string` value is supported.

```css
.double-list {
  counter-reset: count -1;
}

.double-list li {
  counter-increment: count 2;
}

.double-list li::marker {
  content: counter(count, decimal) ") ";
}
```

```html
<p>Best Dynamic Duos in Sports:</p>
<ol class="double-list">
  <li>Simone Biles + Jonathan Owens</li>
  <li>Serena Williams + Venus Williams</li>
  <li>Aaron Judge + Giancarlo Stanton</li>
  <li>LeBron James + Dwyane Wade</li>
  <li>Xavi Hernandez + Andres Iniesta</li>
</ol>
```

## Syntax

```css
/* Basic usage */
counter(counter-name);

/* changing the counter display */
counter(counter-name, upper-roman)
```

Counters have no visible effect by themselves.
The `counter()` and `counters()` functions are what make counters useful by returning developer-defined strings (or images).

### Values

The `counter()` function accepts up to two parameters. The first parameter is the `<counter-name>`. The optional second parameter is the `<counter-style>`.

- `<counter-name>`
    A `<custom-ident>` identifying the counter, which is the same case-sensitive name used with the `counter-reset` and `counter-increment` property values. The counter name cannot start with two dashes and can't be `none`, `unset`, `initial`, or `inherit`.
- `<counter-style>`
    A `list-style-type` name, `counter-style-name` or `symbols()` function, where a counter style name is a `numeric`, `alphabetic`, or `symbolic` predefined counter style, a complex longhand east Asian or Ethiopic predefined counter style, or other predefined counter style. If omitted, the counter-style defaults to `decimal`.

> **Note:**
> To join the counter values when nesting counters, use the `counters()` function, which provides an additional `string` parameter.

## Examples

### lower-roman compared to lower-alpha

In this example, we display a counter using `lower-roman` and `lower-alpha` list styles.

#### HTML

```html
<ol>
  <li></li>
  <li></li>
  <li></li>
</ol>
```

#### CSS

```css
ol {
  counter-reset: count;
}
li {
  counter-increment: count;
}
li::after {
  content:
    "[" counter(count, lower-roman) "] == ["
    counter(count, lower-alpha) "]";
}
```

#### Result

### Displaying a counter using three styles

In this example, we use the `counter()` function three times.

#### HTML

```html
<ol>
  <li></li>
  <li></li>
  <li></li>
</ol>
```

#### CSS

We include the `counter()` function with three different counter styles, including the default decimal value. We've added padding to the list to provide space for the long `::marker` string.

```css
ol {
  counter-reset: listCounter;
  padding-left: 5em;
}
li {
  counter-increment: listCounter;
}
li::marker {
  content:
    "Item #" counter(listCounter) " is: ";
}
li::after {
  content:
    "[" counter(listCounter, decimal-leading-zero) "] == ["
    counter(listCounter, upper-roman) "]";
}
```

#### Result

## See also

- Using CSS Counters
- `counter-reset`
- `counter-set`
- `counter-increment`
- `@counter-style`
- CSS `counters()` function
- CSS lists and counters module
- CSS counter styles module
- CSS generated content module
