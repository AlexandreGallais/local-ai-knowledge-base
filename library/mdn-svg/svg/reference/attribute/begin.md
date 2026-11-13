---
title: "begin"
tool: "mdn-svg"
version: "2026-11"
source: "https://github.com/mdn/content/blob/aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d/files/en-us/web/svg/reference/attribute/begin/index.md"
commit: "aa3f3f5d4d00cba08b88bddcfa94a84e2a4d976d"
license: "CC-BY-SA-2.5"
---

# begin

The **`begin`** attribute defines when the associated element becomes active.
For an animation element, this is the point at which the animation should begin.

The attribute value is a semicolon separated list of values. The interpretation of a list of start times is detailed in the SMIL specification in "Evaluation of begin and end time lists". Each individual value can be one of the following: `<offset-value>`, `<syncbase-value>`, `<event-value>`, `<repeat-value>`, `<accessKey-value>`, `<wallclock-sync-value>` or the keyword `indefinite`.

You can use this attribute with the following SVG elements:

- `<animate>`
- `<animateMotion>`
- `<animateTransform>`
- `<set>`

## animate, animateMotion, animateTransform, set

For `<animate>`, `<animateMotion>`, `<animateTransform>`, and `<set>`, `begin` defines when the element should begin, i.e., become active.

       | Value
       | `&#x3C;begin-value-list>`

       | Default value
       | `0s`

       | Animatable
       | No

The `<begin-value-list>` is a semicolon-separated list of values. Each value can be one of the following:

- `<offset-value>`
    This value defines a clock-value that represents a point in time relative to the beginning of the SVG document (usually the `load` or `DOMContentLoaded` event). Negative values are valid.
- `<syncbase-value>`
    This value defines a _syncbase_ and an optional offset from that _syncbase_. The element's animation start time is defined relative to the begin or active end of another animation.

    A valid syncbase-value consists of an ID reference to another animation element followed by a dot and either `begin` or `end` to identify whether to synchronize with the beginning or active end of the referenced animation element. An optional offset value as defined in `<offset-value>` can be appended.

- `<event-value>`
    This value defines an event and an optional offset that determines the time at which the element's animation should begin. The animation start time is defined relative to the time that the specified event is fired.

    A valid event-value consists of an element ID followed by a dot and one of the supported events for that element. All valid events (not necessarily supported by all elements) are defined by the DOM and HTML specifications. Those are:
    - `focus`
    - `blur`
    - `focusin`
    - `focusout`
    - `DOMActivate`
    - `auxclick`
    - `click`
    - `dblclick`
    - `mousedown`
    - `mouseenter`
    - `mouseleave`
    - `mousemove`
    - `mouseout`
    - `mouseover`
    - `mouseup`
    - `wheel`
    - `beforeinput`
    - `input`
    - `keydown`
    - `keyup`
    - `compositionstart`
    - `compositionupdate`
    - `compositionend`
    - `load`
    - `unload`
    - `abort`
    - `error`
    - `select`
    - `resize`
    - `scroll`
    - `beginEvent`
    - `endEvent`
    - `repeatEvent`

    An optional offset value as defined in `<offset-value>` can be appended.

- `<repeat-value>`
    This value defines a qualified repeat event. The element animation start time is defined relative to the time that the repeat event is raised with the specified iteration value.

    A valid repeat value consists of an element ID followed by a dot and the function `repeat()` with an integer value specifying the number of repetitions as parameter. An optional offset value as defined in `<offset-value>` can be appended.

- `<accessKey-value>`
    This value defines an access key that should trigger the animation. The element animation will begin when the user presses the specified key.

    A valid accessKey-value consists of the function `accessKey()` with the character to be input as parameter. An optional offset value as defined in `<offset-value>` can be appended.

- `<wallclock-sync-value>`
    This value defines the animation start time as a real-world clock time.

    A valid wallclock-sync-value consists of the function `wallclock()` with a time value as parameter. The time syntax is based upon the syntax defined in ISO 8601.

- `indefinite`
    The begin of the animation will be determined by a `beginElement()` method call or a hyperlink targeted to the element.

## Examples

### Offset example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg">
  <!-- animated rectangles -->
  <rect x="10" y="35" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="100"
      begin="0s"
      dur="8s"
      fill="freeze" />
  </rect>

  <rect x="35" y="60" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="75"
      begin="2s"
      dur="6s"
      fill="freeze" />
  </rect>

  <rect x="60" y="85" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="50"
      begin="4s"
      dur="4s"
      fill="freeze" />
  </rect>

  <!-- grid -->
  <text x="10" y="20" text-anchor="middle">0s</text>
  <line x1="10" y1="25" x2="10" y2="105" stroke="grey" stroke-width=".5" />
  <text x="35" y="20" text-anchor="middle">2s</text>
  <line x1="35" y1="25" x2="35" y2="105" stroke="grey" stroke-width=".5" />
  <text x="60" y="20" text-anchor="middle">4s</text>
  <line x1="60" y1="25" x2="60" y2="105" stroke="grey" stroke-width=".5" />
  <text x="85" y="20" text-anchor="middle">6s</text>
  <line x1="85" y1="25" x2="85" y2="105" stroke="grey" stroke-width=".5" />
  <text x="110" y="20" text-anchor="middle">8s</text>
  <line x1="110" y1="25" x2="110" y2="105" stroke="grey" stroke-width=".5" />

  <line x1="10" y1="30" x2="110" y2="30" stroke="grey" stroke-width=".5" />
  <line x1="10" y1="105" x2="110" y2="105" stroke="grey" stroke-width=".5" />
</svg>
```

### Syncbase example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- animated rectangles -->
  <rect x="10" y="35" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="50"
      id="first"
      begin="0s;third.end"
      dur="4s" />
  </rect>

  <rect x="60" y="60" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="25"
      id="second"
      begin="first.end"
      dur="2s" />
  </rect>

  <rect x="85" y="85" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      to="25"
      id="third"
      begin="second.end"
      dur="2s" />
  </rect>

  <!-- grid -->
  <text x="10" y="20" text-anchor="middle">0s</text>
  <line x1="10" y1="25" x2="10" y2="105" stroke="grey" stroke-width=".5" />
  <text x="35" y="20" text-anchor="middle">2s</text>
  <line x1="35" y1="25" x2="35" y2="105" stroke="grey" stroke-width=".5" />
  <text x="60" y="20" text-anchor="middle">4s</text>
  <line x1="60" y1="25" x2="60" y2="105" stroke="grey" stroke-width=".5" />
  <text x="85" y="20" text-anchor="middle">6s</text>
  <line x1="85" y1="25" x2="85" y2="105" stroke="grey" stroke-width=".5" />
  <text x="110" y="20" text-anchor="middle">8s</text>
  <line x1="110" y1="25" x2="110" y2="105" stroke="grey" stroke-width=".5" />

  <line x1="10" y1="30" x2="110" y2="30" stroke="grey" stroke-width=".5" />
  <line x1="10" y1="105" x2="110" y2="105" stroke="grey" stroke-width=".5" />
</svg>
```

### Event example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- animated rectangle -->
  <rect x="10" y="35" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      from="0"
      to="100"
      begin="startButton.click"
      dur="8s"
      fill="freeze" />
  </rect>

  <!-- trigger -->
  <rect
    id="startButton"
    cursor="pointer"
    x="19.5"
    y="62.5"
    rx="5"
    height="25"
    width="80"
    fill="#EFEFEF"
    stroke="black"
    stroke-width="1" />

  <text x="60" y="80" text-anchor="middle" pointer-events="none">
    Click me.
  </text>

  <!-- grid -->
  <text x="10" y="20" text-anchor="middle">0s</text>
  <line x1="10" y1="25" x2="10" y2="55" stroke="grey" stroke-width=".5" />
  <text x="35" y="20" text-anchor="middle">2s</text>
  <line x1="35" y1="25" x2="35" y2="55" stroke="grey" stroke-width=".5" />
  <text x="60" y="20" text-anchor="middle">4s</text>
  <line x1="60" y1="25" x2="60" y2="55" stroke="grey" stroke-width=".5" />
  <text x="85" y="20" text-anchor="middle">6s</text>
  <line x1="85" y1="25" x2="85" y2="55" stroke="grey" stroke-width=".5" />
  <text x="110" y="20" text-anchor="middle">8s</text>
  <line x1="110" y1="25" x2="110" y2="55" stroke="grey" stroke-width=".5" />

  <line x1="10" y1="30" x2="110" y2="30" stroke="grey" stroke-width=".5" />
  <line x1="10" y1="55" x2="110" y2="55" stroke="grey" stroke-width=".5" />
</svg>
```

### Repeat example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- animated rectangle -->
  <rect x="10" y="35" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      from="0"
      to="100"
      id="myLoop"
      begin="0s;myLoop.end"
      dur="4s"
      repeatCount="3" />

    <set
      attributeType="CSS"
      attributeName="fill"
      to="green"
      begin="myLoop.begin" />

    <set
      attributeType="CSS"
      attributeName="fill"
      to="gold"
      begin="myLoop.repeat(1)" />

    <set
      attributeType="CSS"
      attributeName="fill"
      to="red"
      begin="myLoop.repeat(2)" />
  </rect>

  <!-- grid -->
  <text x="10" y="20" text-anchor="middle">0s</text>
  <line x1="10" y1="25" x2="10" y2="55" stroke="grey" stroke-width=".5" />
  <text x="35" y="20" text-anchor="middle">1s</text>
  <line x1="35" y1="25" x2="35" y2="55" stroke="grey" stroke-width=".5" />
  <text x="60" y="20" text-anchor="middle">2s</text>
  <line x1="60" y1="25" x2="60" y2="55" stroke="grey" stroke-width=".5" />
  <text x="85" y="20" text-anchor="middle">3s</text>
  <line x1="85" y1="25" x2="85" y2="55" stroke="grey" stroke-width=".5" />
  <text x="110" y="20" text-anchor="middle">4s</text>
  <line x1="110" y1="25" x2="110" y2="55" stroke="grey" stroke-width=".5" />

  <line x1="10" y1="30" x2="110" y2="30" stroke="grey" stroke-width=".5" />
  <line x1="10" y1="55" x2="110" y2="55" stroke="grey" stroke-width=".5" />
</svg>
```

### Accesskey example

```html
<svg
  width="120"
  height="120"
  viewBox="0 0 120 120"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink">
  <!-- animated rectangles -->
  <rect x="10" y="35" height="15" width="0">
    <animate
      attributeType="XML"
      attributeName="width"
      from="0"
      to="100"
      begin="accessKey(s)"
      dur="8s"
      fill="freeze" />
  </rect>

  <!-- trigger -->
  <text x="60" y="80" text-anchor="middle" pointer-events="none">
    Hit the "s" key
  </text>

  <!-- grid -->
  <text x="10" y="20" text-anchor="middle">0s</text>
  <line x1="10" y1="25" x2="10" y2="55" stroke="grey" stroke-width=".5" />
  <text x="35" y="20" text-anchor="middle">2s</text>
  <line x1="35" y1="25" x2="35" y2="55" stroke="grey" stroke-width=".5" />
  <text x="60" y="20" text-anchor="middle">4s</text>
  <line x1="60" y1="25" x2="60" y2="55" stroke="grey" stroke-width=".5" />
  <text x="85" y="20" text-anchor="middle">6s</text>
  <line x1="85" y1="25" x2="85" y2="55" stroke="grey" stroke-width=".5" />
  <text x="110" y="20" text-anchor="middle">8s</text>
  <line x1="110" y1="25" x2="110" y2="55" stroke="grey" stroke-width=".5" />

  <line x1="10" y1="30" x2="110" y2="30" stroke="grey" stroke-width=".5" />
  <line x1="10" y1="55" x2="110" y2="55" stroke="grey" stroke-width=".5" />
</svg>
```

_This example is embedded in an iFrame. If you want to activate the key events, you have to click on it first._

## See also

- SVG animation with SMIL
