---
title: "`::placeholder` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_placeholder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::placeholder` CSS pseudo-element

The **`::placeholder`** CSS pseudo-element represents the placeholder text in an `` or `<textarea>` element.

```css
input {
  margin-top: 0.5rem;
}

input::placeholder {
  font-weight: bold;
  opacity: 0.5;
  color: red;
}
```

```html
<label for="first-name">Your phone number:</label><br />

<input
  id="first-name"
  type="tel"
  name="phone"
  minlength="9"
  maxlength="9"
  placeholder="It must be 9 digits" />
```

Only the subset of CSS properties that apply to the `::first-line` pseudo-element can be used in a rule using `::placeholder` in its selector.

> **Note:**
> In most browsers, the appearance of placeholder text is a translucent or light gray color by default.

## Syntax

```css
::placeholder {
  /* ... */
}
```

## Accessibility

### Color contrast

#### Contrast Ratio

Placeholder text typically has a lighter color treatment to indicate that it is a suggestion for what kind of input will be valid, and is not actual input of any kind.

It is important to ensure that the contrast ratio between the color of the placeholder text and the background of the input is high enough that people experiencing low vision conditions will be able to read it while also making sure there is enough of a difference between the placeholder text and input text color that users do not mistake the placeholder for inputted data.

Color contrast ratio is determined by comparing the luminosity of the placeholder text and the input background color values. In order to meet current Web Content Accessibility Guidelines (WCAG), a ratio of 4.5:1 is required for text content and 3:1 for larger text such as headings. Large text is defined as 18.66px and bold or larger, or 24px or larger.

- WebAIM: Color Contrast Checker
- MDN Understanding WCAG, Guideline 1.4 explanations
- Understanding Success Criterion 1.4.3 | W3C Understanding WCAG 2.0

#### Usability

Placeholder text with sufficient color contrast may be interpreted as entered input. Placeholder text will also disappear when a person enters content into an `` element. Both of these circumstances can interfere with successful form completion, especially for people with cognitive concerns.

An alternate approach to providing placeholder information is to include it outside of the input in close visual proximity, then use `aria-describedby` to programmatically associate the `` with its hint.

With this implementation, the hint content is available even if information is entered into the input field, and the input appears free of preexisting input when the page is loaded. Most screen reading technology will use `aria-describedby` to read the hint after the input's label text is announced, and the person using the screen reader can mute it if they find the extra information unnecessary.

```html
<label for="user-email">Your email address</label>
<span id="user-email-hint" class="input-hint">Example: user@example.com</span>
<input
  id="user-email"
  aria-describedby="user-email-hint"
  name="email"
  type="email" />
```

- Placeholders in Form Fields Are Harmful — Nielsen Norman Group

### Windows High Contrast Mode

Placeholder text will appear with the same styling as user-entered text content when rendered in Windows High Contrast Mode. This will make it difficult for some people to determine which content has been entered, and which content is placeholder text.

### Labels

Placeholders are not a replacement for the `` element. Without a label that has been programmatically associated with an input using a combination of the `for` and `id` attributes, assistive technology such as screen readers cannot parse `` elements.

- Placeholders in Form Fields Are Harmful — Nielsen Norman Group

## Examples

### Change placeholder appearance

This example shows some of the adjustments that you can make to the styles of placeholder text.

#### HTML

```html
<input placeholder="Type here" />
```

#### CSS

```css
input::placeholder {
  color: red;
  font-size: 1.2em;
  font-style: italic;
  opacity: 0.5;
}
```

#### Result

### Opaque text

Some browsers make placeholder text less opaque. If you want fully opaque text, then set the `color` property value explicitly. The `currentColor` value can be used to have the same color as the corresponding input element.

#### HTML

```html
<input placeholder="Color set by browser" />
<input placeholder="Same color as input" class="explicit-color" />
<input placeholder="Semi-opaque text color" class="opacity-change" />
```

#### CSS

```css
input {
  font-weight: bold;
  color: green;
}

.explicit-color::placeholder {
  /* use the same color as input element to avoid the browser set default color */
  color: currentColor;
}

.opacity-change::placeholder {
  /* less opaque text */
  color: color-mix(in srgb, currentColor 70%, transparent);
}
```

#### Result

> **Note:**
> Note that browsers use different default colors for placeholder text. For example, Firefox uses the input element's color with 54% opacity, and Chrome uses `darkgray` color. If you want consistent placeholder text color across the browsers, then set the `color` explicitly.

## See also

- The `:placeholder-shown` pseudo-class styles an element that _has_ an active placeholder.
- Related HTML elements: ``, `<textarea>`
- HTML forms
