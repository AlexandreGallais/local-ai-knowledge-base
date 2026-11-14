---
title: "`speak-as` CSS property"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/speak-as/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `speak-as` CSS property

The **`speak-as`** CSS property is used to define how HTML content is spoken. The one to three enumerated key terms determine the manner by which elements and text get rendered by aural technologies, such as screen readers and digital assistants.

This property applies to all content, including pseudo-elements, with the exception `::marker` pseudo-elements constructed via a `@counter-style` with a defined `speak-as` descriptor, which takes precedence over any inherited `speak-as` property value.

## Syntax

```css
/* single value syntax */
speak-as: normal;
speak-as: spell-out;
speak-as: literal-punctuation;
speak-as: digits;
speak-as: no-punctuation;

/* multiple value syntax */
speak-as: spell-out literal-punctuation;
speak-as: spell-out no-punctuation;
speak-as: digits literal-punctuation;
speak-as: digits no-punctuation;
speak-as: spell-out digits literal-punctuation;
speak-as: spell-out digits no-punctuation;
```

### Values

- `normal`
    Normal pronunciation rules with punctuation replaced by pauses. For example, "Hello, world!" would be pronounced as "Hello (pause) world (pause)". This is the default value.
- `spell-out`
    Content is spelled out letter by letter. For example, "role" would be pronounced as "r" "o" "l" "e".
- `literal-punctuation`
    Punctuation marks are spelled out literally. For example, "Hello, world!" would be pronounced as "Hello comma world exclamation mark."
- `digits`
    Numbers are pronounced as individual digits. For example, "31" would be pronounced as "three one".
- `no-punctuation`
    Content is pronounced normally without any punctuation. For example, "Hello, world!" would be pronounced as "Hello" "world".

> **Note:**
> Support of the `speak-as` property is limited and inconsistently implemented across different assistive technologies, such as screen readers or speech synthesizers. To ensure any pronunciation-dependent critical information remains user-friendly and accessible to a wide audience, do not rely solely on this CSS property to define how this information content is presented aurally.

## Examples

### HTML

```html
<p class="normal">Hello, world! I'm 25.</p>
<p class="spell-out">Hello, world! I'm 25.</p>
<p class="literal-punctuation">Hello, world! I'm 25.</p>
<p class="no-punctuation">Hello, world! I'm 25.</p>
<p class="digits">Hello, world! I'm 25.</p>
<p class="multi">Hello, world! I'm 25.</p>
```

### CSS

```css
.normal {
  speak-as: normal;
}

.spell-out {
  speak-as: spell-out;
}

.literal-punctuation {
  speak-as: literal-punctuation;
}

.no-punctuation {
  speak-as: no-punctuation;
}

.digits {
  speak-as: digits;
}
.multi {
  speak-as: literal-punctuation digits;
}
```

## See also

- `@counter-style` at-rule `speak-as` descriptor
- CSS counter styles module
- CSS lists and counters module
- Web Speech API
