---
title: "`symbols` CSS at-rule descriptor"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/at-rules/@counter-style/symbols/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `symbols` CSS at-rule descriptor

The **`symbols`** CSS descriptor of the `@counter-style` at-rule is used to specify the symbols for creating counter representations in the specified counter system. Specifying this descriptor is mandatory when the value of the `system` descriptor is `cyclic`, `numeric`, `alphabetic`, `symbolic`, or `fixed`.

## Syntax

```css
symbols: A B C D E;
symbols: "\24B6" "\24B7" "\24B8" D E;
symbols: "0" "1" "2" "4" "5" "6" "7" "8" "9";
symbols: url("one.svg") url("two.svg") url("three.svg");
symbols: indic-numbers;
```

### Values

The `symbols` descriptor is specified as a list of one or more space-separated `<symbol>` values.

- `<symbol>`
    Specifies the symbol to use within the counter system. Each symbol in the list can be either a `<string>`, an `image`, or a `<custom-ident>`. The `<image>` value can, in turn, be specified as a `<url>` or `gradient`.

> **Note:**
> When using an identifier for a symbol, note that ASCII non-letters such as `*`, `"`, and `\` are not considered identifiers. They must be either quoted as a string or escaped.

## Description

A symbol can be a string, image, or identifier. It is used within the `@counter-style` at-rule.

When the value of the `system` descriptor is `cyclic`, `numeric`, `alphabetic`, `symbolic`, or `fixed`, the `symbols` descriptor must be specified. For the `additive` system, use the `additive-symbols` descriptor instead to specify the symbols.

While a space between quoted symbols is not required, it makes CSS more readable. To use a quote as a symbol, either escape the quote character or enclose the character within different quotes, such as `"'"`.

When defining symbols with identifiers instead of strings, be sure to use identifier syntax rules. For example, as noted above, ASCII non-letters such as `*` are not identifiers and must be either quoted or escaped. Hex escape characters are followed by a space. This space may look like the space separating two identifiers, but it enables digits to follow hex-escaped characters. This means that two spaces must be included after a hex-escaped identifier to separate it from the next identifier. For example, it is better to use the string `"\2A 1"` instead of `\2A  1` with two spaces, as your code tools might remove double spaces. It is generally safer to quote identifiers that need to be escaped or use strings.

## Examples

### Setting counter symbols

In this example, the list of values for the `symbols` descriptor include letters (`A`, `D`, `E`), a number within quotes (`"1"`), and a hex-escape identifier within quotes (`"\24B7"`) for the character `Ⓑ`.

#### HTML

```html
<ul class="list">
  <li>One</li>
  <li>Two</li>
  <li>Three</li>
  <li>Four</li>
  <li>Five</li>
</ul>
```

#### CSS

```css
@counter-style symbols-example {
  system: fixed;
  symbols: A "1" "\24B7" D E;
}

.list {
  list-style: symbols-example;
}
```

#### Result

## See also

- `@counter-style` descriptors: `system`, `additive-symbols`, `negative`, `prefix`, `suffix`, `range`, `pad`, `speak-as`, `fallback`
- List style properties: `list-style`, `list-style-image`, `list-style-position`
- `symbols()` function
- `<url>` type
- CSS counter styles module
