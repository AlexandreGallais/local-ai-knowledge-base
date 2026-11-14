---
title: "Using interest invokers (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/popover_api/using_interest_invokers/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using interest invokers (part 2 of 2)

## Using interest invokers for creating preview popovers

As mentioned earlier, a very common use case for interest invokers is progressively enhancing links with preview information about the link target. This can include details such as a person's name, bio, and location displayed on a link to their profile page, or quick actions like subscribing to a group provided on a link to its homepage. These preview popovers are convenient because they help users get the information they need without navigating away and losing context.

Let's look at how to implement a preview popover using interest invokers.

### HTML

The markup includes a link to a GitHub profile inside a short paragraph and a `` containing a limited user profile with a fake "Follow" button. The link's `interestfor` attribute points to the `id` of the user profile. Additionally, the user profile has a `popover` attribute, which turns it into a popover element and hides it by default.

```html
<p>
  I think
  <a
    href="https://github.com/chrisdavidmills/"
    interestfor="user-info"
    target="_blank">
    @chrisdavidmills
  </a>
  should know about this.
</p>

<div id="user-info" popover="hint">
  <div class="wrapper">
    <img src="chris-mills.jpg" alt="chris mills" />
    <section>
      <p><strong>Chris Mills</strong></p>
      <p>
        Independent tech writer and web technology tinkerer, working on MDN on
        behalf of Google and Mozilla. A11y and open standards advocate. Heavy
        metal drummer. <button>Follow</button>
      </p>
      <p>🌍 Greenfield, UK</p>
    </section>
  </div>
</div>
```

### CSS

We start by setting an `interest-delay-start` value of `1s` on the link (the `a[interestfor]` selector is useful for selecting only the links that are interest invokers). This creates a slight delay before the preview popover appears. It can get annoying when popovers appear too quickly on a dense, link-heavy page; in such cases, this technique is useful.

```css
html {
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}
```

```css
a[interestfor] {
  interest-delay-start: 1s;
}
```

Next, we set a `position-area` value of `bottom right` on the popover so that it appears at the bottom-right corner of the link when interest is shown. (The rest of the popover styling is hidden here for brevity.)

```css
#user-info {
  position-area: bottom right;
}
```

```css
#user-info {
  border: 1px solid lightgray;
  border-radius: 5px;
  padding: 0 10px;
  margin: 5px;
  background-color: white;
  font-size: 0.8rem;
}

#user-info .wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 480px;
  font-size: 0.8rem;
}

#user-info img {
  margin: 10px 0;
  border: 1px solid lightgray;
  border-radius: 5px;
}
```

In the final CSS block, we animate the popover's `opacity` property so that it fades in smoothly when interest is shown (as matched by the `:interest-target` pseudo-class). Because the popover starts hidden (via `display: none`), there are a few additional rules required to animate it correctly. We need to set `transition-behavior: allow-discrete` on the `overlay` and `display` properties to enable discrete animations. We also need to use a `@starting-style` block to define the initial state of the popover in the `interest-target` state, as it has not previously been rendered.

```css
[popover]:interest-target {
  opacity: 1;
}

[popover] {
  opacity: 0;
  transition:
    opacity 0.7s,
    overlay 0.7s allow-discrete,
    display 0.7s allow-discrete;
}

@starting-style {
  [popover]:interest-target {
    opacity: 0;
  }
}
```

### Result

This renders as follows:

Try hovering or focusing the link to view the preview popover. There is also progressive enhancement at play in this example — in non-supporting browsers, the link works as expected.

## Using interest invokers without popovers

Let's look at an example that uses interest invokers without popovers. In this example, we create a style preview panel. You can activate various color scheme buttons to apply different styles to the panel. We've progressively enhanced the interaction using interest invokers so you can preview the style before selecting it. When interest is shown on a button, its color scheme is applied to the panel, and when interest is lost, the panel reverts to the previously-applied style.

### HTML

The HTML contains five `` elements and an `` element representing the style preview panel. Each button has the same `interestfor` value, referencing the `id` of the ``, and each has a `class` that represents a different color scheme. Note that the `` does not have a `popover` attribute set (popovers are not a requirement for using interest invokers).

```html
<div>
  <button interestfor="style-panel" class="black-white">Black/White</button>
  <button interestfor="style-panel" class="bubblegum">Bubblegum</button>
  <button interestfor="style-panel" class="purple-haze">Purple haze</button>
  <button interestfor="style-panel" class="blaze">Blaze</button>
  <button interestfor="style-panel" class="mint-brown">Mint brown</button>
</div>
<article id="style-panel" class="black-white">
  <h2>Style preview panel</h2>
  <p>This is fun, right?</p>
</article>
```

### CSS

First, we define the styles for each `class` that's applied to a `` element:

```css
html {
  font-family: sans-serif;
}

* {
  box-sizing: border-box;
}

body {
  width: 640px;
  margin: 0 auto;
}

body > div {
  display: flex;
  gap: 5px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 5px;
  border-radius: 3px;
  cursor: pointer;
}

#style-panel {
  padding: 20px;
  border-radius: 30px;
  margin-top: 20px;
  border-width: 10px;
  corner-shape: scoop;
}

h2 {
  margin-top: 0;
  text-align: center;
  letter-spacing: 5px;
}

p {
  margin-bottom: 0;
  text-align: center;
  font-weight: bold;
  letter-spacing: 3px;
}
```

```css
.black-white {
  color: black;
  background-color: white;
  border: 2px solid black;
}

.bubblegum {
  color: #fff8f0;
  background-color: #ef476f;
  border: 2px solid #fff8f0;
  box-shadow: 0 0 2px #ef476f;
}

.purple-haze {
  color: #8a1c7c;
  background-color: #f0bcd4;
  border: 2px solid #8a1c7c;
}

.blaze {
  color: #f2e94e;
  background-color: #7e6b8f;
  border: 2px solid #f2e94e;
}

.mint-brown {
  color: #41463d;
  background-color: #1cfeba;
  border: 2px solid #41463d;
}
```

Next, we apply styles to any button on which interest is shown, using the `:interest-source` pseudo-class. This allows users to easily see which button is currently drawing interest.

```css
button:interest-source {
  background-color: black;
  color: white;
  border: 2px solid black;
}
```

Lastly, we apply a `transition` to the style panel so that `all` property values that change on the element animate smoothly over a duration of `0.7s`. This means that all color scheme changes applied to the panel will animate.

```css
#style-panel {
  transition: all 0.7s;
}
```

### JavaScript

In this part of the code, we start by getting references to the style panel and all the buttons. We also create a variable called `prevStyle` and set it to `black-white`. This is the initial color scheme applied to the panel and also the style the panel returns to when interest is lost.

```js
const stylePanel = document.getElementById("style-panel");
const buttons = document.querySelectorAll("button");

let prevStyle = "black-white";
```

Next, we set `interest` and `loseinterest` event listeners on the style panel. These events call the `sampleStyle()` and `revertStyle()` functions to apply and revert styles as interest is shown and lost on the buttons. We also loop through the `buttons` `NodeList` and add a `click` event listener to each one so that when a button is activated, the `setStyle()` function is run.

```js
stylePanel.addEventListener("interest", sampleStyle);
stylePanel.addEventListener("loseinterest", revertStyle);
buttons.forEach((button) => button.addEventListener("click", setStyle));
```

Finally, we define the functions mentioned previously:

- `sampleStyle()`: When interest is shown on a button, its `class` is obtained from `e.source.className` (`InterestEvent.source` contains a reference to the interest invoker on which interest was shown) and applied to the style panel via `e.target.className`.
- `revertStyle()`: When interest is lost, the style panel reverts to its previous style stored in `prevStyle`.
- `setStyle()`: When a button is clicked, its `className` is applied to the style panel. We also update `prevStyle` to the clicked button's `className` so that the next time a style is previewed, the panel can revert to the _new_ previously-set style.

```js
function sampleStyle(e) {
  e.target.className = e.source.className;
}

function revertStyle(e) {
  e.target.className = prevStyle;
}

function setStyle(e) {
  stylePanel.className = e.target.className;
  prevStyle = e.target.className;
}
```

### Result

This renders as follows:

Try hovering or focusing a button to preview its style in the panel. Clicking a button applies the style permanently. Note that setting the styles still works in browsers that do not support interest invokers, even though the "preview" functionality doesn't.

## See also

- Interest invoker examples landing page
- Popover API
