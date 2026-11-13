---
title: "`<tt>` HTML teletype text element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/tt/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<tt>` HTML teletype text element

The **`<tt>`** HTML element creates inline text which is presented using the user agent's default monospace font face. This element was created for the purpose of rendering text as it would be displayed on a fixed-width display such as a teletype, text-only screen, or line printer.

The terms **non-proportional**, **monotype**, and **monospace** are used interchangeably and have the same general meaning: they describe a typeface whose characters are all the same number of pixels wide.

This element is obsolete, however. You should use the more semantically helpful `<code>`, `<kbd>`, ``, or `` elements for inline text that needs to be presented in monospace type, or the `<pre>` tag for content that should be presented as a separate block.

> **Note:**
> If none of the semantic elements are appropriate for your use case (for example, if you need to show some content in a non-proportional font), you should consider using the `` element, styling it as desired using CSS. The `font-family` property is a good place to start.

## Attributes

This element only includes the global attributes

## Usage notes

The `<tt>` element is, by default, rendered using the browser's default non-proportional font. You can override this using CSS by creating a rule using the `tt` selector, as seen in the example Overriding the default font above.

> **Note:**
> User-configured changes to the default monospace font setting may take precedence over your CSS.

Although this element wasn't officially deprecated in HTML 4.01, its use was discouraged in favor of the semantic elements and/or CSS. The `<tt>` element is obsolete in HTML 5.

## Examples

### Basic <example-value>

This example uses `<tt>` to show text entered into, and output by, a terminal application.

```html
<p>
  Enter the following at the telnet command prompt:
  <code>set localecho</code><br />

  The telnet client should display: <tt>Local Echo is on</tt>
</p>
```

#### Result

### Overriding the default font

You can override the browser's default font—if the browser permits you to do so, which it isn't required to do—using CSS.

#### HTML

```html
<p>
  Enter the following at the telnet command prompt:
  <code>set localecho</code><br />

  The telnet client should display: <tt>Local Echo is on</tt>
</p>
```

#### CSS

```css
tt {
  font-family: "Lucida Console", "Menlo", "Monaco", "Courier New", monospace;
}
```

#### Result

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, palpable content.

       | Permitted content
       |
        Phrasing content.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Permitted ARIA roles
       | Any

       | DOM interface
       | `HTMLElement`

## See also

- The semantic `<code>`, ``, `<kbd>`, and `` elements
- The `<pre>` element for displaying preformatted text blocks
