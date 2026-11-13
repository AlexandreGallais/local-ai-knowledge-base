---
title: "`<progress>` HTML progress indicator element"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/progress/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<progress>` HTML progress indicator element

The **`<progress>`** HTML element displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

```html
<label for="file">File progress:</label>

<progress id="file" max="100" value="70">70%</progress>
```

```css
label {
  padding-right: 10px;
  font-size: 1rem;
}
```

## Attributes

This element includes the global attributes.

- `max`
    This attribute describes how much work the task indicated by the `progress` element requires. The `max` attribute, if present, must have a value greater than `0` and be a valid floating point number. The default value is `1`.
- `value`
    This attribute specifies how much of the task that has been completed. It must be a valid floating point number between `0` and `max`, or between `0` and `1` if `max` is omitted. If there is no `value` attribute, the progress bar is indeterminate; this indicates that an activity is ongoing with no indication of how long it is expected to take.

> **Note:**
> Unlike the `<meter>` element, the minimum value is always 0, and the `min` attribute is not allowed for the `<progress>` element.

> **Note:**
> The `:indeterminate` pseudo-class can be used to match against indeterminate progress bars. To change the progress bar to indeterminate after giving it a value you must remove the value attribute with `element.removeAttribute('value')`.

## Accessibility

### Labeling

In most cases you should provide an accessible label when using `<progress>`. While you can use the standard ARIA labeling attributes `aria-labelledby` or `aria-label` as you would for any element with `role="progressbar"`, when using `<progress>` you can alternatively use the `` element.

> **Note:**
> Text placed between the element's tags is not an accessible label, it is only recommended as a fallback for old browsers that do not support this element.

#### Examples

```html
<label>
  Uploading Document: <progress value="70" max="100">70 %</progress>
</label>

<!-- OR -->
<br />

<label for="progress-bar">Uploading Document</label>
<progress id="progress-bar" value="70" max="100">70 %</progress>
```

#### Result

### Describing a particular region

If the `<progress>` element is describing the loading progress of a section of a page, use `aria-describedby` to point to the status, and set `aria-busy="true"` on the section that is being updated, removing the `aria-busy` attribute when it has finished loading.

#### Examples

```html
<div aria-busy="true" aria-describedby="progress-bar">
  <!-- content is for this region is loading -->
</div>

<!-- ... -->

<progress id="progress-bar" aria-label="Content loading…"></progress>
```

##### Result

## Examples

```html
<progress value="70" max="100">70 %</progress>
```

## Technical summary

       |
        Content categories

       |
        Flow content,
        phrasing content, labelable content,
        palpable content.

       | Permitted content
       |
        Phrasing content, but there must be no `&#x3C;progress>` element among its
        descendants.

       | Tag omission
       | None, both the starting and ending tag are mandatory.

       | Permitted parents
       |
        Any element that accepts
        phrasing content.

       | Implicit ARIA role
       | `progressbar`

       | Permitted ARIA roles
       | No `role` permitted

       | DOM interface
       | `HTMLProgressElement`

## See also

- Creating vertical form controls
- `<meter>`
- `:indeterminate`
- `-moz-orient`
- `::-moz-progress-bar`
- `::-webkit-progress-bar`
- `::-webkit-progress-value`
- `::-webkit-progress-inner-element`
