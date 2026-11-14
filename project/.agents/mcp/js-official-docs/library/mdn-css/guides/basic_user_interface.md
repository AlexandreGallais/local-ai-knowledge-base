---
title: "CSS basic user interface"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/basic_user_interface/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS basic user interface

The **CSS basic user interface** module allows you to define the rendering and functionality of features related to the user interface, including outline properties, visual feedback for pointing devices and keyboards, and modifying the default appearance of UI widgets.

Basic user interface properties can be used to improve user experience and accessibility by providing visual cues to elements that are being interacted with, including styling mouse cursors and keyboard directional focus navigation, and styling caret cursors when an editable element has focus. The module includes features for providing outlines to focused (or unfocused) elements without impacting an element's box model dimensions and styling. This UI module also enables the styling of user interface controls.

## Basic user interface in action

To view how basic user interface properties can alter the appearance of UI features, interact with the elements in this sample. Note that some features in this sample improve usability while others harm user experience.

```html
<div><span contenteditable>Edit this text </span></div>
<fieldset>
  <legend>Play with these fake form controls</legend>
  <input type="checkbox" id="check" />
  <input type="radio" name="a" />
  <input type="radio" name="a" />
  <input type="range" />
  <progress></progress>
</fieldset>
<fieldset>
  <legend>Be careful not to ruin usability: try resizing these.</legend>
  <textarea>
  cursor: wait;
  </textarea>
  <textarea>
  resize: none;
  </textarea>
  <textarea>
  pointer-events: none;
  </textarea>
</fieldset>
```

```css
body {
  font-family: sans-serif;
  font-size: 1.25rem;
}
[contenteditable] {
  cursor: copy;
  caret-color: magenta;
  border: 1px solid #cccccc;
}
:focus {
  outline: dashed magenta 3px;
  outline-offset: 10px;
}
* {
  accent-color: magenta;
}
div,
fieldset {
  margin: 20px;
}
textarea:nth-of-type(1) {
  cursor: wait;
}
textarea:nth-of-type(2) {
  resize: none;
}
textarea:nth-of-type(3) {
  pointer-events: none;
}
```

The CSS `outline` and `outline-offset` properties were used to provide feedback to users on which element currently has focus. An `accent-color` provides a theme color to all the form controls. The caret that appears when the text is edited has the same color thanks to the `caret-color` property. These can all be considered UI improvements.

Some features harm usability. The `cursor` property was used to change cursors from the browser default, which is confusing. The `resize` property prevents the second `<textarea>` from being resizable while the `pointer-events` property prevents the third `<textarea>` from receiving click events. It is still focusable using the keyboard.

Click "Play" in the example above to see or edit the code for the animation in the MDN Playground.

## Reference

### Properties

- `accent-color`
- `appearance`
- `caret-animation`
- `caret-color`
- `caret-shape`
- `cursor`
- `interest-delay`, shorthand for:
  - `interest-delay-start`
  - `interest-delay-end`
- `outline`, shorthand for:
  - `outline-color`
  - `outline-style`
  - `outline-width`
- `outline-offset`
- `pointer-events`
- `resize`
- `user-select`

The CSS basic user interface module also defines the `caret`, `nav-down`, `nav-left`, `nav-right`, and `nav-up` properties. Currently, no browsers support these features.

## Guides

- Learn forms: advanced form styling
    Explains how `appearance` can be used to style form controls.

## Related concepts

- CSS `cursor` property
- SVG `cursor` attribute
- CSS `:focus`, `:focus-within`, and `:focus-visible` pseudoclasses
- `CaretPosition` Interface

## See also

- Tips for Designing Useful and Usable Focus Indicators (2016)
