---
title: "`::picker()` CSS pseudo-element"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/selectors/_doublecolon_picker/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `::picker()` CSS pseudo-element

The **`::picker()`** CSS pseudo-element targets the picker part of an element, for example the drop-down picker of a customizable select element.

## Syntax

```css
::picker(<ident>) {
  /* ... */
}
```

### Parameters

- `ident`
    A string representing the element whose picker you want to target. The following values are available:
    - `select`
        The drop-down picker of customizable select elements.

## Description

The `::picker()` pseudo-element targets the picker part of a form control, that is, the pop-up part that appears to allow you to make a selection when you press the control button. It is only available to target when the originating element has a picker and has base appearance set on it via the `appearance` property `base-select` value.

The `::picker(select)` selector targets all descendants of customizable `<select>` element except for the first `` child; these descendants are grouped together by the browser and rendered as the picker. The first `` child represents the control button that opens the picker when pressed.

This allows you to target all of the picker contents as a single entity, for example if you want to customize its border, animate it when it appears and disappears, or position it somewhere different to the default position. Our customizable select elements guide shows many examples of `::picker(select)` usage.

### Picker popover behavior

The `<select>` element and the picker have an implicit invoker/popover relationship assigned to them automatically, as specified by the Popover API. See Using the Popover API for more details of popover behavior, and see Animating the picker drop-down using popover states for a typical use case allowed by the implicit popover association.

### Picker anchor positioning

A further side-effect of the implicit invoker/popover relationship mentioned above is that the `<select>` element and the picker also have an implicit anchor reference, meaning that the picker is automatically associated with the select via CSS anchor positioning. This has several advantages, most notably:

- The browser default styles position the picker relative to the button (the anchor) and you can customize this position as explained in Positioning elements relative to their anchor. For reference, the related default styles are as follows:

  ```css
  inset: auto;
  margin: 0;
  min-inline-size: anchor-size(self-inline);
  min-block-size: 1lh;
  /* Go to the edge of the viewport, and add scrollbars if needed. */
  max-block-size: stretch;
  overflow: auto;
  /* Below and span-right, by default. */
  position-area: block-end span-inline-end;
  ```

- The browser default styles also define some position-try fallbacks that reposition the picker if it is in danger of overflowing the viewport. Position-try fallbacks are explained in the Fallback options and conditional hiding for overflow guide. For reference, the related default fallback styles are as follows:

  ```css
  position-try-order: most-block-size;
  position-try-fallbacks:
    /* First try above and span-right, */
    /* then below but span-left, */
    /* then above and span-left. */
    block-start span-inline-end,
    block-end span-inline-start,
    block-start span-inline-start;
  ```

> **Note:**
> If you want to remove the implicit anchor reference to stop the picker from being anchored to the `<select>` element, you can do so by setting the `position-anchor` property of the picker to an anchor name that doesn't exist in the current document, such as `--not-an-anchor-name`. See also removing an anchor association.

## Examples

### Basic <example-value> select usage

To opt-in to the custom select functionality and minimal browser base styles (and remove the OS-provided styling), the `<select>` element and its picker both need to have an `appearance` value of `base-select` set on them:

```css
select,
::picker(select) {
  appearance: base-select;
}
```

You could then, for example, remove the picker's default black `border`:

```css
::picker(select) {
  border: none;
}
```

## See also

- `<select>`, `<option>`, `<optgroup>`, ``, ``, `<selectedcontent>`
- `appearance`
- `::picker-icon`, `::checkmark`
- `:open`, `:checked`
- Customizable select elements
