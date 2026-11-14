---
title: "`placeholder` HTML attribute"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/attributes/placeholder/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `placeholder` HTML attribute

The **`placeholder`** attribute defines the text displayed in a form control when the control has no value. The placeholder text should provide a brief hint to the user as to the expected type of data that should be entered into the control.

Effective placeholder text includes a word or short phrase that hints at the expected data type, not an explanation or prompt. The placeholder must not be used instead of a ``. As the placeholder is not visible if the value of the form control is not null, using `placeholder` instead of a `` for a prompt harms usability and accessibility.

The `placeholder` attribute is supported by the following input types: ``<text>``, ``<search>``, ``<url>``, ``<tel>``, ``<email>``, and ``<password>``. It is also supported by the ``<textarea>`` element. The example below shows the `placeholder` attribute in use to explain the expected format of an input field.

> **Note:**
> Except in ``<textarea>`` elements, the `placeholder` attribute can't include any line feeds (LF) or carriage returns (CR). If either is included in the value, the placeholder text will be clipped.

## Accessibility concerns

Placeholders should only be used to show an example of the type of data that should be entered into a form; never as a replacement for a `` element; doing so harms accessibility and user experience.

The `` text is visually and programmatically associated with its corresponding form control. Screen readers don't announce placeholder content by default, but they do announce label content; it's the label that informs assistive technology users what data should be entered in the control. Labels also improve user experience for users of pointing devices: When a user clicks, touches, or taps a ``, focus is moved to the label's associated form control.

Placeholders cannot be relied upon as a replacement for a label even for those not relying on assistive technology. Placeholder text is displayed at lower color contrast than the default form control text. This is by design, as you don't want users to be confused by what is placeholder text versus what is a filled-in form field. However, this lack of contrast can cause issues for low-vision users. Additionally, placeholder text disappears from form fields when users start entering text. If the placeholder text contains instructional information or examples that disappear, it can be confusing to users with cognitive issues and can make the form inaccessible if the placeholder contained the label.

## Example

### HTML

```html
<label for="name">Enter your name:</label>
<input type="text" id="name" name="name" placeholder="e.g. Mike Shinoda" />
```

## See also

- HTML `title`
- CSS `:placeholder-shown` pseudo-class selector
- CSS `::placeholder` pseudo-element selector
