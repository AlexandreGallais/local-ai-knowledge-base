---
title: "ARIA: aria-valuenow attribute"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/attributes/aria-valuenow/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: aria-valuenow attribute

The `aria-valuenow` attribute defines the current value for a `range` widget.

## Description

The `aria-valuenow` attribute defines the current value for range widgets. It is similar to the `value` attribute of `<progress>`, `<meter>`, and `` of type `range`, `number` and all the date-time types.

When creating a range type role, including `meter`, `scrollbar`, `slider`, and `spinbutton` on a non-semantic element, the `aria-valuenow` enables defining a current numeric value between the minimum and maximum values. The minimum and maximum values are defined with `aria-valuemin` and `aria-valuemax`.

> **Warning:**
> The `range` role itself should **NOT** be used as it is an "abstract". The `aria-valuenow` attribute is used on all of the range roles subtypes.

```html
<p id="birthyearLabel">What year were you born?</p>
<div
  role="spinbutton"
  tabindex="-1"
  aria-valuenow="1984"
  aria-valuemin="1900"
  aria-valuemax="2021"
  aria-labelledby="birthyearLabel">
  <span class="value"> 1984 </span>
  <span role="button">
    <span aria-hidden="true">+</span>
    Increment year by 1
  </span>
  <span role="button">
    <span aria-hidden="true">-</span>
    Decrement year by 1
  </span>
</div>
```

Use semantic HTML elements when you can:

```html
<label for="birthyear">What year were you born?</label>
<input type="number" id="birthyear" value="1984" min="1900" max="2021" />
```

If there is no known value, like when a progress bar is in an indeterminate state, don't set an `aria-valuenow` attribute.

When there is no `aria-valuenow` set, no information is implied about a current value.

When used with sliders and spinbuttons, assistive technologies announce the actual value to users.

When used with progressbar and scrollbar, assistive technologies announce the value to users as a percent. When `aria-valuemin` and `aria-valuemax` are both defined, the percent value is calculated as a position on the range. Otherwise, the actual value is announced as a percent.

When the value to be announced, either the actual value or the value as a percent, may not be clear to users, the `aria-valuetext` attribute should be used to provide a user-friendly representation of the value. When set, the valuetext string is announced instead of the valuenow numeric value. For example, if a slider represents the days of the week, so the day of the week's `aria-valuenow` is a number, the `aria-valuetext` property should be set to a string that makes the slider value understandable, such as "Monday".

## Examples

```html
<p id="temperatureLabel">Oven Temperature</p>
<div
  role="meter"
  id="temperature"
  aria-valuenow="205"
  aria-valuemin="70"
  aria-valuemax="250"
  aria-labelledby="temperatureLabel">
  <div class="meter-color" aria-hidden="true"></div>
</div>
```

The first rule of ARIA use is "if you can use a native feature with the semantics and behavior you require already built in, instead of repurposing an element and **adding** an ARIA role, state or property to make it accessible, then do so."

```html
<label for="temperature">Oven Temperature</label>
<input type="range" id="temperature" value="205" min="70" max="250" step="5" />
```

If we employ native HTML semantics with `` we get styles and semantics for free.

## Values

- `<number>`
    A decimal number, between the minimum and maximum values.

## Associated interfaces

- `Element.ariaValueNow`
    The `ariaValueNow` property, part of the `Element` interface, reflects the value of the `aria-valuenow` attribute.
- `ElementInternals.ariaValueNow`
    The `ariaValueNow` property, part of the `ElementInternals` interface, reflects the value of the `aria-valuenow` attribute.

## Associated roles

Used in roles:

- `meter`
- `scrollbar`
- `separator`
- `slider`
- `spinbutton`

Inherited into roles:

- `meter`
- `progressbar`
- `scrollbar`
- `slider`
- `spinbutton`

## See also

- `range` role
- `` element `value` attribute
- `aria-valuetext`
- `aria-valuemax`
- `aria-valuemin`.
