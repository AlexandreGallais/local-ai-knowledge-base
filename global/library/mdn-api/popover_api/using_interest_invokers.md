---
title: "Using interest invokers (part 1 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popover_api/using_interest_invokers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using interest invokers

**Interest invokers** provide a mechanism for updating an interface or running custom code when a user "shows interest" or "loses interest" in an element (for example, by hovering or unhovering it). They are most commonly used to show and hide popovers. This guide explains the concepts behind interest invokers, what their use cases are, and how to use them.

## Concepts

The Popover API provides the functionality to display a popover when a related control element (the **invoker**) is activated, for example, when it is clicked. This feature is useful for displaying UI elements such as modals and information panels. You can create popovers declaratively by using the `popover` attribute together with either `popovertarget` or `commandfor`.

In addition to these activation-based popovers, there is a common need to display a popover when a control element is hovered or focused – interactions that indicate user interest. For example, many social and community sites let users hover over a link to a person's or group's profile page to show a popover with more information. This quick preview helps users decide whether they want to visit the full page. Such popovers may also contain quick actions, such as "Follow" or "Subscribe to group", allowing users to take an action without losing their current context.

Interest invokers enable the browser to provide interest-based popover behavior in a consistent and accessible way, without requiring JavaScript. The browser determines when a user is showing interest in an element, and therefore, when an action should be taken. "Showing interest" generally occurs when a user hovers, focuses, or long-presses the element (the exact nature of "interest" may vary across browsers), and "losing interest" generally happens when the user stops interacting with the element.

The browser also fires events when interest is gained or lost, so you can run custom code in response. In addition, this feature includes CSS properties and selectors for styling elements based on interest.

> **Note:**
> On devices with an `Esc` key <example-value>, pressing it cancels all interest. This provides a general escape mechanism if the interaction becomes distracting or unwanted.

You can also use interest invokers to run custom code in non-popover cases. However, this guide focuses mainly on popovers, since they are the most common use of interest invokers.

## Creating an interest invoker

Creating an interest invoker declaratively has the following two requirements:

- An **invoker element**: This is the element that the user interacts with to indicate interest and trigger an action, such as showing or hiding a popover. The invoker element must have an `interestfor` attribute whose value is the `id` of the target element. The invoker element can be an HTML ``, ``, or `<area>` element, or an SVG `` element.

- A **target element**: This is the element that is affected or controlled when interest is gained or lost. The target element must have an `id`, and it can be just about any element type. Giving this element a `popover` attribute turns it into a popover.

  > **Note:**
  > You can also set the target element programmatically by setting the invoker element's `interestForElement` DOM property to a reference to the target element. For more information, see JavaScript API for interest invokers section later in this guide.

Let's look at a simple example. Here, the **invoker element** is a link, and the **target element** is a paragraph with the `popover` attribute.

```css
.no-interest-invokers body::before {
  content: "Your browser doesn't support interest invokers.";
  background-color: wheat;
  display: block;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}
```

```js
const supported = Object.hasOwn(
  HTMLButtonElement.prototype,
  "interestForElement",
);
if (!supported) {
  document.querySelector("html").classList.add("no-interest-invokers");
}
```

```html
<p>Some text with a <a href="#" interestfor="mypopover">link</a>.</p>
<p id="mypopover" popover>A short preview with some quick info</p>
```

Setting the `popover` attribute on the target element causes it to be hidden (via `display: none`) and centered on the screen. Showing interest in the invoker element (the link) causes the popover to appear.

This renders as follows. Try interacting with the link:

Note how the popover appears when the link is hovered, focused, or long-pressed, and disappears when the interaction stops. In contrast, if the link is activated instead, such as with a mouse click, it behaves like a normal link – except that in this example it doesn't go anywhere.

The value of the `popover` attribute doesn't affect the popover's behavior in this example. However, it becomes important when you combine interest invoker popovers with regular popovers, as shown in the next section.

## Combining interest invokers with activation-based popovers

You can combine interest invokers with regular popovers on the same control element. In the following example, a `` element is set up as an interest invoker using the `interestfor` attribute, meaning it will show a tooltip when the user shows interest in it. If the button is clicked, it will show or hide a different popover referenced by the `commandfor` attribute. The `command` attribute is set to `toggle-popover`, allowing the button to be pressed multiple times to toggle the popover between its shown and hidden states.

```css
#my-tooltip {
  position-area: right;
}

#my-infobox {
  position-area: bottom;
}
```

```html
<p>
  Some content including a
  <button
    interestfor="my-tooltip"
    commandfor="my-infobox"
    command="toggle-popover">
    button
  </button>
</p>
<p id="my-tooltip" popover="hint">A hover tooltip</p>
<p id="my-infobox" popover>
  An infobox that also contains some control buttons<br />
  <button>Button 1</button> <button>Button 2</button>
</p>
```

This renders as follows:

You can show interest in the button to display the tooltip, and click the button to reveal the infobox. Note that the `popover` values matter here — the tooltip popover is set to `popover="hint"`, whereas the infobox is set to just `popover` (equivalent to `popover="auto"`). This allows the tooltip to stay visible even when the infobox is shown. If both popovers were set to `auto`, you wouldn't be able to see both the tooltip and the infobox at the same time. In a UI, it is useful to be able to view multiple tooltips without hiding parts of the UI that you've already opened.

## Styling interest invokers

When styling popovers used with interest invokers, you can use the same styling techniques as with any other popover (see Styling popovers), including using anchoring positioning to position popovers relative to invokers and animating popovers.

That said, there are some CSS features specific to interest invokers:

- The `interest-delay` shorthand property and its related `interest-delay-start` and `interest-delay-end` longhands: These can be used to add a delay between the user gaining or losing interest and the browser acting on that change — for example, showing or hiding a popover.
- The `:interest-source` and `:interest-target` pseudo-classes: These can be used to apply styles to the interest invoker and its associated target element, respectively, only when interest is indicated.

Let's look at a simple example that demonstrates how these features work.

We've defined two buttons and a tooltip. The tooltip is shown or hidden when the user shows or loses interest in either button.

```html
<p>
  <button interestfor="my-tooltip">Button 1</button>
  <button interestfor="my-tooltip">Button 2</button>
</p>
<p id="my-tooltip" popover="hint">A hover tooltip</p>
```

In the CSS, we've set an `interest-delay` of `1s 2s` on the `` — this creates a delay of 1 second before the tooltip appears when the user shows interest, and a delay of 2 seconds before it disappears when the user loses interest. We've also used the `button:interest-source` selector to change the `background-color` of the buttons to `orange` when interest is shown.

```css
button {
  interest-delay: 1s 2s;
}

button:interest-source {
  background-color: orange;
}
```

Next, we've combined the `:interest-source` pseudo-class with the `:has()` pseudo-class to apply `interest-delay-start: 0s` to all buttons inside the paragraph, but only when the paragraph contains a button that interest is shown on (that is, a button matching `button:interest-source`). This is a useful technique — having the popover appear as soon as interest is shown on any button would create an annoying user experience, but after the user has shown interest in a button, it is convenient for them to be able to quickly move between different popovers.

```css
p:has(button:interest-source) button {
  interest-delay-start: 0s;
}
```

We've also set a `position-area` of `bottom` on the tooltip so that it appears below the button. This is possible because associating any popover with its interest invoker creates an implicit anchor reference between them (see Popover anchor positioning for more details).

```css
#my-tooltip {
  position-area: bottom;
}
```

Finally, we've used the `#my-tooltip:interest-target` selector to set a dashed border on the popover when interest is shown.

```css
#my-tooltip:interest-target {
  border-style: dashed;
}
```

This renders as follows:

Try showing interest in the button (for example by hovering or focusing it) to observe the behavior described earlier.

## JavaScript API for interest invokers

Interest invokers have an associated JavaScript API that lets you query the element being targeted by an interest invoker and run custom code when interest is shown or lost. The features of this API are:

- The `interestForElement` property, which is available on the `HTMLButtonElement`, `HTMLAnchorElement`, `HTMLAreaElement`, and `SVGAElement` interfaces. It returns a reference to the target element for the interest invoker. This is the element whose `id` is referenced in the equivalent HTML or SVG interest invoker's `interestfor` attribute.
- The `interest` and `loseinterest` events, which are fired on an interest invoker's target element when interest is shown and lost, respectively. You can listen for these events to run custom code in response.
- The `InterestEvent` interface, which is the event object for the `interest` and `loseinterest` events. This includes a `source` property that contains a reference to the associated interest invoker element.

### Detecting support for interest invokers

One of the uses of the API is feature detection. The simplest way to check whether interest invokers are supported is to use the `Object.hasOwn()` method on one of the interface types to see if the `interestForElement` property is available.

For example:

```js
const supported = Object.hasOwn(
  HTMLButtonElement.prototype,
  "interestForElement",
);
```

All the examples in this guide use this technique to detect support. If the return value is `false`, indicating that the feature is not supported, we add a class to the `<html>` element:

```js
if (!supported) {
  document.querySelector("html").classList.add("no-interest-invokers");
}
```

We then use that class in our CSS to display a "not supported" banner:

```css
.no-interest-invokers body::before {
  content: "Your browser doesn't support interest invokers.";
  background-color: wheat;
  display: block;
  padding: 10px 0;
  width: 100%;
  text-align: center;
}
```

### Interest invoker API in action

Let's look at a basic <example-value> that shows the API features in action. This example has three links and a paragraph set up as a popover:

```html
<p>
  Here's some links:
  <a href="#">Link 1</a>
  <a href="#">Link 2</a>
  <a href="#">Link 3</a>
</p>
<p id="my-tooltip" popover="hint">A hover tooltip</p>
```

```css
html {
  font-family: sans-serif;
}

#my-tooltip {
  position-area: bottom;
}
```

In the JavaScript, we get references to the popover and the three links. We then loop through the links and set each link's `interestForElement` property to reference the popover element. This programmatically sets up the interest invoker-target relationship between the popover and each link.

```js
const tooltip = document.getElementById("my-tooltip");
const links = document.querySelectorAll("a");
links.forEach((link) => (link.interestForElement = tooltip));
```

Next, we attach `interest` and `loseinterest` event handlers to the popover. When interest is shown on one of the links, we update the popover's text content so it includes the text content of the link that caused the popover to appear (retrieved via the event object's `source` property). When interest is lost, we append an asterisk to the `source` element's text content, so you can see the number of times interest has been shown on it.

```js
tooltip.addEventListener("interest", (e) => {
  tooltip.textContent = `Interest shown on ${e.source.textContent}`;
});

tooltip.addEventListener("loseinterest", (e) => {
  e.source.textContent += "*";
});
```

This renders as follows:
