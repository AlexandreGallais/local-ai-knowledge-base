---
title: "ARIA: radio role"
tool: "mdn-accessibility"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/accessibility/aria/reference/roles/radio_role/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ARIA: radio role

The `radio` role is one of a group of checkable radio buttons, in a `radiogroup`, where no more than a single radio button can be checked at a time.

## Description

A radio button is a checkable input that when associated with other radio buttons, only one of which can be checked at a time. The radio buttons must be grouped together in a `radiogroup` to indicate which ones affect the same value.

```html
<div role="radiogroup" aria-labelledby="legend25" id="radiogroup25">
  <p id="legend25">Ipsum and lorem?</p>
  <div>
    <span
      role="radio"
      aria-checked="false"
      tabindex="0"
      aria-labelledby="q25_radio1-label"
      data-value="True"></span>
    <label id="q25_radio1-label">True</label>
  </div>
  <div>
    <span
      role="radio"
      aria-checked="false"
      tabindex="0"
      aria-labelledby="q25_radio2-label"
      data-value="False"></span>
    <label id="q25_radio2-label">False</label>
  </div>
  <div>
    <span
      role="radio"
      aria-checked="true"
      tabindex="0"
      aria-labelledby="q25_radio3-label"
      data-value="huh?"></span>
    <label id="q25_radio3-label">What is the question?</label>
  </div>
</div>
```

The `role` attribute only adds semantics; all of the functionality that comes natively with the HTML radio needs to be added with JavaScript and the HTML `tabindex` attribute.

> **Note:**
> The first rule of ARIA is if a native HTML element or attribute has the semantics and behavior you require, use it instead of re-purposing an element and adding ARIA. Instead use the native HTML `` (with an associated ``), which natively provides all the functionality required:

```html
<fieldset>
  <legend>Ipsum and lorem?</legend>
  <div>
    <input type="radio" value="True" id="q25_radio1" name="q25" />
    <label for="q25_radio1">True</label>
  </div>
  <div>
    <input type="radio" value="False" id="q25_radio2" name="q25" />
    <label for="q25_radio2">False</label>
  </div>
  <div>
    <input type="radio" value="huh?" id="q25_radio3" name="q25" checked />
    <label for="q25_radio3">What is the question?</label>
  </div>
</fieldset>
```

The native HTML radio form control (``) has two states ("checked" or "not checked"). Similarly, an element with `role="radio"` can expose two states through the `aria-checked` attribute: `true` representing the checked state, and `false` representing the unchecked state. The `aria-checked` value of `mixed` is not valid to use for a radio button.

If a radio button is checked, the radio element has `aria-checked` set to `true`. If it is not checked, it has `aria-checked` set to `false`.

Each radio button element has role `radio`. The radio role should always be nested with other associated radios in a `radiogroup`. If it is not possible to nest the radio button within a radio group, use the `id` of the non-grouped radio in a space separated list of values as the value of the `aria-owns` attribute on the `radiogroup` element to indicate the relationship of the `radiogroup` to its radio members.

Each radio element is labeled by its content, has a visible label referenced by `aria-labelledby`, or has a label specified with `aria-label`. The containing `radiogroup` element should either have a visible label referenced by `aria-labelledby` or a label specified with `aria-label`. If elements providing additional information about either the radio group or each radio button are present, those elements should be referenced by the `radiogroup` element or radio elements with the `aria-describedby` property.

As `radio` is an interactive control; it must be focusable and keyboard accessible. If the role is applied to a non-focusable element, use the `tabindex` attribute to change this. The expected keyboard shortcut for activating a radio is the `Space` key. Use JavaScript to toggle the `aria-checked` attribute to `true` when a radio becomes checked while ensuing that all the other radio roles in the group are set to `aria-checked="false"`.

To programmatically indicate that a radio button must be chosen from a radio group the `aria-required` attribute, with a value of `true`, must be specified on the `radiogroup` element. It is not expected to use the `aria-required` attribute on individual ARIA radio buttons.

### All descendants are presentational

There are some types of user interface components that, when represented in a platform accessibility API, can only contain text. Accessibility APIs do not have a way of representing semantic elements contained in a `radio`. To deal with this limitation, browsers automatically apply role `presentation` to all descendant elements of any `radio` element as it is a role that does not support semantic children.

For example, consider the following `radio` element, which contains a heading.

```html
<div role="radio"><h6>name of my radio</h6></div>
```

Because descendants of `radio` are presentational, the following code is equivalent:

```html
<div role="radio"><h6 role="presentation">name of my radio</h6></div>
```

From the assistive technology user's perspective, the heading does not exist since the previous code snippets are equivalent to the following in the accessibility tree:

```html
<div role="radio">name of my radio</div>
```

### Associated WAI-ARIA roles, states, and properties

- `radiogroup` role
    The radio buttons are contained in or owned by an element with role `radiogroup`. If unable to be nested within a `radiogroup` within the markup, the `aria-owns` attribute of the `radiogroup` contains the `id` values of the non-nested radio buttons in the group.

- `aria-checked`
    The value of `aria-checked` defines the state of a radio. When used with radio elements, the attribute has one of two possible values:
    - `true`
        The radio is checked.
    - `false`
        The radio is not checked.

> **Note:**
> Use the `tabindex` attribute if the `role="radio"` is used on an element that does not natively accept keyboard focus. E.g., a `` or ``.

### Keyboard interactions

- `Tab` + `Shift`
    Move focus into and out of the radio group. When focus moves into a radio group, and a radio button is already checked, focus is set on the checked button. If none of the radio buttons are checked, focus is set on the first radio button in the group.

- `Space`
    Checks the radio if not already checked. Unchecks a previously checked radio button in the radio group.

- `Right Arrow` and `Down Arrow`
    Move focus to and checks the next radio button in the group, unchecking the previously focused radio button. If focus is on the last radio button, focus moves to the first radio button.

- `Left Arrow` and `Up Arrow`
    Move focus to and checks the previous radio button in the group, unchecking the previously focused radio button. If focus is on the first radio button, focus moves to the last radio button.

### Radios in a toolbar

Because arrow keys are used to navigate among elements of a toolbar and the `Tab` key moves focus in and out of a toolbar, when a radio group is nested inside a toolbar, the keyboard interaction of the radio group is slightly different from that of a radio group that is not inside of a toolbar. See `radiogroup` keyboard interactions for more information

## Required JavaScript

- `onClick`
    Handle mouse clicks on both the radio and the associated label that will change the state of the radio by changing the value of the `aria-checked` attribute and the appearance of the radio so it appears checked or unchecked to the sighted user
- `onKeyPress`
    Handle the case where the user presses the `Space` key to change the state of the radio by changing the value of the `aria-checked` attribute and the appearance of the radio so it appears checked or unchecked to the sighted user

## Examples

The following example uses ARIA to modify otherwise generic elements to be exposed as radio buttons. CSS and JavaScript are used to visually and programmatically modify the checked or unchecked state of the element.

### HTML

```html
<div role="radiogroup" aria-labelledby="legend" id="radiogroup">
  <p id="legend">
    Should you be using the <code>radio</code> role or
    <code>&lt;input type="radio"></code>?
  </p>
  <div>
    <span
      role="radio"
      aria-checked="true"
      tabindex="0"
      aria-labelledby="ariaLabel"
      data-value="True"></span>
    <label id="ariaLabel">ARIA role</label>
  </div>
  <div>
    <span
      role="radio"
      aria-checked="false"
      tabindex="0"
      aria-labelledby="htmllabel"
      data-value="False"></span>
    <label id="htmllabel">HTML <code>&lt;input type="radio"></code></label>
  </div>
</div>
```

### CSS

```css
[role="radio"] {
  padding: 5px;
}

[role="radio"][aria-checked="true"]::before {
  content: "(x)";
  font-family: monospace;
}

[role="radio"][aria-checked="false"]::before {
  content: "( )";
  font-family: monospace;
}
```

### JavaScript

A lot of JavaScript is required to make radio buttons out of non-semantic HTML.

```js
// initialize all the radio role elements

const radioGroups = document.querySelectorAll('[role="radiogroup"]');

for (const radioGroup of radioGroups) {
  const radios = radioGroup.querySelectorAll("[role=radio]");
  for (const radio of radios) {
    radio.addEventListener("keydown", handleKeydown);
    radio.addEventListener("click", handleClick);
  }
}

// handle mouse and touch events
function handleClick(event) {
  setChecked(this);
  event.stopPropagation();
  event.preventDefault();
}

// handle key <example-value>
function handleKeydown(event) {
  switch (event.code) {
    case "Space":
    case "Enter":
      currentChecked();
      break;

    case "ArrowUp":
    case "ArrowLeft":
      previousRadioChecked();
      break;

    case "ArrowDown":
    case "ArrowRight":
      nextItemChecked();
      break;

    default:
      break;
  }
  event.stopPropagation();
  event.preventDefault();
}

// when a radio is selected, give it focus, set checked to true;
// ensure all other radios in radio group are not checked

function setChecked() {
  // uncheck all the radios in group
  // iterated through all the radios in radio group
  // eachRadio.tabIndex = -1;
  // eachRadio.setAttribute('aria-checked', 'false');
  // set the selected radio to checked
  // thisRadio.setAttribute('aria-checked', 'true');
  // thisRadio.tabIndex = 0;
  // thisRadio.focus();
  // set the value of the radioGroup to the value of the currently selected radio
}
```

No JavaScript (or even CSS) would be needed had we used semantic HTML element with the name of each radio button in a group of radio buttons being the same:

```html
<fieldset>
  <legend>
    Should you be using the <code>radio</code> role or
    <code>&lt;input type="radio"></code>?
  </legend>
  <div>
    <input type="radio" name="bestPractices" id="ariaLabel" value="True" />
    <label for="ariaLabel">ARIA role</label>
  </div>
  <div>
    <input type="radio" name="bestPractices" id="htmllabel" value="False" />
    <label for="htmllabel">HTML <code>&lt;input type="radio"></code></label>
  </div>
</fieldset>
```

## Best practices

The first rule of ARIA is: if a native HTML element or attribute has the semantics and behavior you require, use it instead of re-purposing an element and adding an ARIA role, state or property to make it accessible. As such, it is recommended to use native HTML radio button form controls instead of recreating a radio's functionality with JavaScript and ARIA.

## See also

- HTML `` radio button
- HTML `tabindex` attribute
- ARIA: `radiogroup` role
- ARIA: `checkbox` role
- ARIA: `menuitem` role
- ARIA: `menuitemradio` role
- ARIA: `menuitemradio` role
- ARIA: `option` role
