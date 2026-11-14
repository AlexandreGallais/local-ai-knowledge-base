---
title: "`if()` CSS function (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/if/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `if()` CSS function (part 2 of 2)

## Examples

### Basic `if()` usage

In this example, we'll show basic usage of each of the three types of `<if-test>`.

#### HTML

Our HTML features a `` element with two `` elements inside it, containing `<h2>` headings. The `` has a custom property set on it inside its `style` attribute — `--show-apple:true` — which we use later on to conditionally set a property value.

```html
<section style="--show-apple:true">
  <article><h2>First article</h2></article>
  <article><h2>Second article</h2></article>
</section>
```

#### CSS

In our CSS, we first target the `` element, laying it out with flexbox and setting a `gap` between the two child `` elements. We then use an `if()` function with an `orientation` media query `<if-test>` to set the value of the `flex-direction` property to `row` if the document is in landscape orientation, or `column` if it is in portrait orientation. This lays out the `article` elements side-by-side in wide screens, and top-to-bottom in narrow screens.

```css
html {
  height: 100%;
  font-family: sans-serif;
}

body,
section {
  height: inherit;
}

h2 {
  text-align: center;
}

article {
  background-color: cyan;
  border: 3px solid gray;
  flex: 1;
}
```

```css
section {
  display: flex;
  gap: 16px;
  flex-direction: if(
    media(orientation: landscape): row;
    else: column;
  )
}
```

Next, we target the `<h2>` element's `::before` pseudo-element, setting its `content` property to an apple emoji, but only if `--show-apple: true` is set (we did this earlier with an inline `<style>` in our HTML). We achieve this using an `if()` function with a style query `<if-test>`:

```css
h2::before {
  content: if(
    style(--show-apple: true): "🍎 ";
  );
}
```

Finally, we target the `<h2>` element itself. We use a feature query `<if-test>` to test whether the browser supports `lch()` colors, and set the `color` property to an `lch()` color if so, or a hex equivalent if not.

```css
h2 {
  color: if(
    supports(color: lch(29.57% 43.25 344.44)): lch(29.57% 43.25 344.44);
    else: #792359;
  )
}
```

#### Result

Note how the styling is applied. Test out the conditional styling for the first two `if()` queries by modifying the rendered demo using your browser's devtools:

- Remove the `` element's `style` attribute and note how the apple emojis are no longer rendered.
- Change the `height` attribute of the embedding `` to `1200px`. This will change the orientation from landscape to portrait. Note how the layout changes as a result.

### Controlling a color scheme with `if()`

This demo shows how you can start to have some real fun with CSS `if()` functions. Among other things, we use `if()` functions to conditionally set the values of some custom properties, enabling us to control the entire color scheme!

#### HTML

Our HTML contains an `` element with some content inside it — a top-level heading, a couple of `` elements, and an ``. We also include a `<form>` containing a `<select>` drop-down that enables selecting a color scheme.

```html
<article>
  <h1>Main heading</h1>
  <p>
    Lorem ipsum dolor sit amet consectetur adipiscing elit.
    Quisque faucibus ex sapien vitae pellentesque sem placerat.
    In id cursus mi pretium tellus duis convallis.
  </p>
  <aside>
    <h2>An aside</h2>
    <p>
      Tempus leo eu aenean sed diam urna tempor. Pulvinar vivamus
      fringilla lacus nec metus bibendum egestas.
    </p>
  </aside>
  <p>
    Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
    hendrerit semper vel class aptent taciti sociosqu. Ad litora
    torquent per conubia nostra inceptos himenaeos.
  </p>
</article>
<form>
  <label for="scheme">Choose color scheme:</label>
  <select id="scheme">
    <option value="">Default</option>
    <option value="ice">Ice</option>
    <option value="fire">Fire</option>
  </select>
</form>
```

#### CSS

In our CSS, we give the `<body>` element a `max-width` of `700px` and center it using `auto` `margin` values. However, we use an `if()` function with a media query `<if-test>` to set the `margin-top` component inside the `margin` shorthand to `0` if the viewport's width is less than `700px`, and `20px` if it is wider. This means that on wide screens we get a bit of margin at the top of the content, but this is removed on narrow screens, where it looks a bit weird.

```css
* {
  box-sizing: border-box;
}

html {
  font-family: "Helvetica", "Arial", sans-serif;
}

p {
  line-height: 1.5;
}

form {
  padding-left: 20px;
  margin-top: 20px;
}

article h2 {
  margin: 0;
  font-size: 1.8rem;
}
```

```css
body {
  max-width: 700px;
  margin: if(
    media(width < 700px): 0;
    else: 20px;
  ) auto 0;
}
```

We then set the `--scheme` custom property to match the `` element's `class` name. The class will be set by our JavaScript when a new value is selected in our `<select>` element. You'll see the significance of the custom element value in the next CSS block.

```css
.ice {
  --scheme: ice;
}

.fire {
  --scheme: fire;
}
```

We can see the real power of CSS `if()` functions when we combine them with custom properties. Here we use `if()` functions to set our `--color1` and `--color2` custom properties to different color values depending on the value of the `--scheme` custom property. We then use the `--color1` and `--color2` values in our `` element's `color`, `border`, and `background-image` properties, and our `` element's `color` and `background-color` properties.

We are controlling our entire color scheme via custom properties, with different values set via `if()` functions.

```css
article {
  padding: 20px;
  --color1: if(
    style(--scheme: ice): #03045e;
    style(--scheme: fire): #621708;
    else: black;
  );
  --color2: if(
    style(--scheme: ice): #caf0f8;
    style(--scheme: fire): #ffc971;
    else: white;
  );

  color: var(--color1);
  border: 3px solid var(--color1);
  background-image: linear-gradient(
    to left,
    var(--color2),
    white,
    var(--color2)
  );
}

aside {
  color: var(--color2);
  background-color: var(--color1);
  padding: 20px;
}
```

Finally, we use `if()` functions in a couple more places:

- We set our `<h1>` element's `font-size` to be `calc(3rem + 2vw)` if the viewport is wider than `700px`, and `3rem` otherwise. This means the font size updates dynamically with viewport width changes on wider screens, but stays the same on narrow screens.
- We set a suitable emoji as the `content` of our `<h1>` element's `::before` pseudo-class, depending on the value of the `--scheme` custom property.

```css
h1 {
  margin: 0;
  font-size: if(
    media(width > 700px): calc(3rem + 2vw);
    else: 3rem;
  );
}

h1::before {
  content: if(
    style(--scheme: ice): "❄️ ";
    style(--scheme: fire): "🔥 ";
    else: "";
  );
}
```

#### JavaScript

Our JavaScript adds a `change` event listener to the `<select>` element. When a new value is selected, our script sets the `` element's `class` attribute to equal that value.

```js
const articleElem = document.querySelector("article");
const selectElem = document.querySelector("select");

selectElem.addEventListener("change", () => {
  articleElem.className = selectElem.value;
});
```

#### Result

This demo renders as follows:

Try selecting different color scheme values to see the effect on the look and feel.

## See also

- Container style queries
- Media queries
- Feature queries
- CSS values and units module
