---
title: "`speak-as` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/speak-as/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `speak-as` CSS at-rule descriptor

The **`speak-as`** descriptor specifies how a counter symbol constructed with a given `@counter-style` will be represented in the spoken form. For example, an author can specify a counter symbol to be either spoken as its numerical value or just represented with an audio cue.

## Syntax

```css
/* Keyword values */
speak-as: auto;
speak-as: bullets;
speak-as: numbers;
speak-as: words;
speak-as: spell-out;

/* @counter-style name value */
speak-as: <counter-style-name>;
```

### Values

- `auto`
    If the value of `speak-as` is specified as `auto`, then the effective value of `speak-as` will be determined based on the value of the `system` descriptor:
    - If the value of `system` is `alphabetic`, the effective value of `speak-as` will be `spell-out`.
    - If `system` is `cyclic`, the effective value of `speak-as` will be `bullets`.
    - If `system` is `extends`, the value of `speak-as` will be the same as if `speak-as: auto` is specified on the extended style.
    - For all other cases, specifying `auto` has the same effect as specifying `speak-as: numbers`.

- `bullets`
    A phrase or an audio cue defined by the user agent for representing an unordered list item will be read out.
- `numbers`
    The numerical value of the counter will be read out in the document language.
- `words`
    The user agent will generate a counter value as normal and read it out as a word in the document language.
- `spell-out`
    The user agent will generate a counter representation as normal and would read it out letter by letter. If the user agent doesn't know how to read out a particular counter symbol, the user agent might read it out as if the value of `speak-as` was `numbers`.
- `<counter-style-name>`
    The name of another counter style, specified as a `<custom-ident>`. If included, the counter will be spoken out in the form specified in that counter style, kind of like specifying the `fallback` descriptor. If the specified style does not exist, `speak-as` defaults to `auto`.

## Accessibility

Assistive technology support is very limited for the `speak-as` property. Do not rely on it to convey information critical to understanding the page's purpose.

Let's Talk About Speech CSS | CSS Tricks (2017)

## Examples

### Setting the spoken form for a counter

In this example, the counter system is fixed with unintelligible symbols used for the visual markers. However, the `speak-as` descriptor is used to set the list item markers as numbers in the accessibility tree. When supported, numbers rather than visual markers will be read out by screen readers.

To experience the result of the `speak-as` descriptor, use assistive technology such as VoiceOver or another screen reader or view the accessibility panel in the developer tools of a browser that supports `speak-as`.

#### HTML

```html
<ul class="list">
  <li>I had one apple</li>
  <li>I ate two bananas</li>
  <li>I devoured three oranges</li>
  <li>I am not hungry for dinner</li>
  <li>But I'll have five scoops of ice cream for dessert</li>
</ul>
```

#### CSS

```css
@counter-style speak-as-example {
  system: fixed;
  symbols:     ;
  suffix: " ";
  speak-as: numbers;
}

.list {
  list-style: speak-as-example;
}
```

#### Result

## See also

- Other `@counter-style` descriptors: `system`, `symbols`, `additive-symbols`, `negative`, `prefix`, `suffix`, `range`, `pad`, and `fallback`
- `list-style`, `list-style-image`, `list-style-position`
- `symbols()`: the functional notation for creating anonymous counter styles.
- CSS counter styles module
- CSS lists and counters module
