---
title: "Using the Popover API (part 1 of 3)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popover_api/using/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the Popover API

The **Popover API** provides developers with a standard, consistent, flexible mechanism for displaying popover content on top of other page content. Popover content can be controlled either declaratively using HTML attributes, or via JavaScript. This article provides a detailed guide to using all of its features.

## Creating declarative popovers

In its simplest form, a popover is created by adding the `popover` attribute to the element that you want to contain your popover content. An `id` is also needed to associate the popover with its controls.

```html
<div id="mypopover" popover>Popover content</div>
```

> **Note:**
> Setting the `popover` attribute with no value is equivalent to setting `popover="auto"`.

Adding this attribute causes the element to be hidden on page load by having `display: none` set on it. To show/hide the popover, you need to add at least one control button (also known as the popover **invoker**). You can set a `` (or `` of `type="button"`) as a popover control button by giving it a `popovertarget` attribute, the value of which should be the ID of the popover to control:

```html
<button popovertarget="mypopover">Toggle the popover</button>
<div id="mypopover" popover>Popover content</div>
```

The default behavior is for the button to be a toggle button — pressing it repeatedly will toggle the popover between showing and hidden.

If you want to change that behavior, you can use the `popovertargetaction` attribute — this takes a value of `"hide"`, `"show"`, or `"toggle"`. For example, to create separate show and hide buttons, you could do this:

```html
<button popovertarget="mypopover" popovertargetaction="show">
  Show popover
</button>
<button popovertarget="mypopover" popovertargetaction="hide">
  Hide popover
</button>
<div id="mypopover" popover>Popover content</div>
```

You can see how the previous code snippet renders in our Basic <example-value> popover example (source).

> **Note:**
> If the `popovertargetaction` attribute is omitted, `"toggle"` is the default action that will be performed by a control button.

When a popover is shown, it has `display: none` removed from it and it is put into the top layer so it will sit on top of all other page content.

### `command` and `commandfor`

The `commandfor` and `command` attributes provide very similar functionality to `popovertarget` and `popovertargetaction`, but with a more general design aimed at providing other functionality beyond popover commands, including custom commands.

The previous code snippet could be rewritten like this:

```html
<button commandfor="mypopover" command="show-popover">Show popover</button>
<button commandfor="mypopover" command="hide-popover">Hide popover</button>
<div id="mypopover" popover>Popover content</div>
```

## auto state, and "light dismiss"

When a popover element is set with `popover` or `popover="auto"` as shown above, it is said to have **auto state**. The important behaviors to note about auto state are:

- The popover can be "light dismissed" — this means that you can hide the popover by clicking outside it.
- The popover can also be closed, using browser-specific mechanisms such as pressing the `Esc` key.
- Usually, only one `auto` popover can be shown at a time — showing a second popover when one is already shown will hide the first one. The exception to this rule is when you have nested auto popovers. See the Nested popovers section for more details.

> **Note:**
> `popover="auto"` popovers are also dismissed by successful `HTMLDialogElement.showModal()` and `Element.requestFullscreen()` calls on other elements in the document. Bear in mind however that calling these methods on a shown popover will result in failure because those behaviors don't make sense on an already-shown popover. You can however call them on an element with the `popover` attribute that isn't currently being shown.

Auto state is useful when you only want to show a single popover at once. Perhaps you have multiple teaching UI messages that you want to show, but don't want the display to start getting cluttered and confusing, or perhaps you are showing status messages where the new status overrides any previous status.

You can see the behavior described above in action in our Multiple auto popovers example (source). Try light dismissing the popovers after they are shown, and see what happens when you try to show both at the same time.

## Popover accessibility features

When a relationship is established between a popover and its control (invoker) via the `popovertarget` attribute, the API automatically makes two other changes to the environment to allow keyboard and assistive technology (AT) users to more easily interact with the popover:

- When the popover is shown, the keyboard focus navigation order is updated so that the popover is next in the sequence: for example, when a button is pressed to show a popover, any buttons inside the popover will be next in the tabbing order (will be focused by pressing the `Tab` key). Conversely, when closing the popover via the keyboard (usually via the `Esc` key), focus is shifted back to the invoker.
- To allow AT such as screen readers to make sense of the relationship between the invoker and the popover, an implicit `aria-details` and `aria-expanded` relationship is set up between them.

Setting up a relationship between a popover and its control in this manner also creates an implicit anchor reference between the two — see Popover anchor positioning for more details.

## Other ways to set up a popover-invoker relationship

You can set up a popover-invoker relationship in other ways, in addition to using the `popovertarget` attribute:

- Using the `source` option of the `HTMLElement.showPopover()` or `HTMLElement.togglePopover()` methods. Bear in mind that in this case, only the focus navigation order changes are made, not the implicit ARIA relationship. This is because the `source` option can be set to any kind of element, not just `` elements, and it cannot be guaranteed that the relationship would make sense.
- Between a `<select>` element and its dropdown picker, when opting it into customizable select element functionality via the `appearance` property `base-select` value. In this case, an implicit popover-invoker relationship is created between the two.

## Using manual popover state

One alternative to auto state is **manual state**, achieved by setting `popover="manual"` on your popover element:

```html
<div id="mypopover" popover="manual">Popover content</div>
```

In this state:

- The popover cannot be "light dismissed", although declarative show/hide/toggle buttons (as seen earlier) will still work.
- Multiple independent popovers can be shown simultaneously.

You can see this behavior in action in our Multiple manual popovers example (source).

## The `beforetoggle` and `toggle` events

You can respond to a popover being shown or hidden using the `beforetoggle` and `toggle` events:

- `beforetoggle` is fired just before a popover is shown or hidden. This can be used for example to prevent the popover being shown or hidden (using `Event.preventDefault()`), to add animation classes to a popover to animate it, or to clean up the state of a popover after it has been used.
- `toggle` is fired just after a popover is shown or hidden. This is generally used to run other code in response to a popover toggle state changing.

Both of these events have a `ToggleEvent` event object. This event has the following features in addition to those inherited from the default `Event` object:

- The `oldState` and `newState` properties indicate which state the popover has just transitioned from and to, allowing you to respond specifically to a popover opening or closing.
- The `source` property contains a reference to the HTML popover control element that initiated the toggle, allowing you to run different code in response to the toggle event depending on which control initiated it.

Typical usage might look something like this:

```js
const popover = document.getElementById("mypopover");

popover.addEventListener("toggle", (e) => {
  console.log(e.newState);
});
```

Note that calling `showPopover()`, `hidePopover()`, or `togglePopover()` from within a `beforetoggle` event listener while another popover is already being shown or hidden is not permitted, and will throw an `InvalidStateError` `DOMException`.

See the previous reference links for more information and examples.

## Showing popovers via JavaScript

You can also control popovers using a JavaScript API.

The `HTMLElement.popover` property can be used to get or set the `popover` attribute. This can be used to create a popover via JavaScript, and is also useful for feature detection. For example:

```js
function supportsPopover() {
  return Object.hasOwn(HTMLElement.prototype, "popover");
}
```

Similarly:

- `HTMLButtonElement.popoverTargetElement` and `HTMLInputElement.popoverTargetElement` provide an equivalent to the `popovertarget` attribute, allowing you to set up the control button(s) for a popover, although the property value taken is a reference to the popover DOM element to control.
- `HTMLButtonElement.popoverTargetAction` and `HTMLInputElement.popoverTargetAction` provide an equivalent to the `popovertargetaction` global HTML attribute, allowing you to specify the action taken by a control button.

Putting these three together, you can programmatically set up a popover and its control button, like so:

```js
const popover = document.getElementById("mypopover");
const toggleBtn = document.getElementById("toggleBtn");

const popoverSupported = supportsPopover();

if (popoverSupported) {
  popover.popover = "auto";
  toggleBtn.popoverTargetElement = popover;
  toggleBtn.popoverTargetAction = "toggle";
} else {
  toggleBtn.style.display = "none";
}
```

You also have several methods to control showing and hiding:

- `HTMLElement.showPopover()` to show a popover.
- `HTMLElement.hidePopover()` to hide a popover.
- `HTMLElement.togglePopover()` to toggle a popover.

For example, you might want to provide the ability to toggle a help popover on and off by clicking a button or pressing a particular key on the keyboard. The first one could be achieved declaratively, or you could do it using JavaScript as shown above.

For the second one, you could create an event handler that programs two separate keys — one to open the popover and one to close it again:

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (popover.matches(":popover-open")) {
      popover.hidePopover();
    }
  }

  if (event.key === "s") {
    if (!popover.matches(":popover-open")) {
      popover.showPopover();
    }
  }
});
```

This example uses `Element.matches()` to programmatically check whether a popover is currently showing. The `:popover-open` pseudo-class matches only popovers that are currently being shown. This is important to avoid the errors that are thrown if you try to show an already-shown popover, or hide an already-hidden popover.

Alternatively, you could program a single key to show _and_ hide the popover like this:

```js
document.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    popover.togglePopover();
  }
});
```

See our Toggle help UI example (source) to see the popover JavaScript properties, feature detection, and `togglePopover()` method in action.

## Nested popovers

There is an exception to the rule about not displaying multiple auto popovers at once — when they are nested inside one another. In such cases, multiple popovers are allowed to both be open at the same time, due to their relationship with each other. This pattern is supported to enable use cases such as nested popover menus.

There are three different ways to create nested popovers:

1. Direct DOM descendants:

   ```html
   <div popover>
     Parent
     <div popover>Child</div>
   </div>
   ```

2. Via invoking/control elements:

   ```html
   <div popover>
     Parent
     <button popovertarget="foo">Click me</button>
   </div>

   <div popover id="foo">Child</div>
   ```

3. Via the `anchor` attribute:

   ```html
   <div popover id="foo">Parent</div>

   <div popover anchor="foo">Child</div>
   ```

> **Note:**
> An `auto` popover cannot have a `hint` popover as its parent in the `auto` popover stack (though it can nest `auto` popovers or `hint` popovers).
> If an `auto` popover is structurally nested within a `hint` popover — for example, the `auto` is a DOM descendant of the hint, or its invoker sits inside the hint — the browser automatically downgrades the `auto` popover's effective type to `hint`, and it is treated as such.

See our Nested popover menu example (source) for an example. You'll notice that quite a few event handlers have been used to display and hide the subpopover appropriately during mouse and keyboard access, and also to hide both menus when an option is selected from either. Depending on how you handle loading of new content, either in an SPA or multi-page website, some or all of these may not be necessary, but they have been included in this demo for illustrative purposes.

### Creating the sub-menus with `popover="auto"`

The popup sub-menus are created declaratively, using `auto` popovers.

First, the control buttons:

```html
<section id="button-bar">
  <button popovertarget="submenu-1" popovertargetaction="toggle" id="menu-1">
    Menu A
  </button>

  <button popovertarget="submenu-2" popovertargetaction="toggle" id="menu-2">
    Menu B
  </button>

  <button popovertarget="submenu-3" popovertargetaction="toggle" id="menu-3">
    Menu C
  </button>
</section>
```

Now, the popovers themselves:

```html
<div id="submenu-1" popover="auto">
  <button>Option A</button><br /><button>Option B</button>
</div>
<div id="submenu-2" popover="auto">
  <button>Option A</button><br /><button>Option B</button>
</div>
<div id="submenu-3" popover="auto">
  <button>Option A</button><br /><button>Option B</button>
</div>
```
