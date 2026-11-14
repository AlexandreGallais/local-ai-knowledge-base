---
title: "`calc-size()` CSS function (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/calc-size/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `calc-size()` CSS function (part 2 of 2)

## Examples

### Basic `calc-size` usage

This example shows basic <example-value> sizing of a container using `calc-size()`

#### HTML

The HTML contains a single `` element that contains some child content.

```html
<section>
  <h2>Favorite quote</h2>

  <p>
    Fashion is something so ugly it has to be changed every fifteen minutes.
  </p>
</section>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

section {
  font-family: "Helvetica", "Arial", sans-serif;
  border: 1px solid black;
}

h2 {
  margin: 0;
  font-weight: normal;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1px;
}

p {
  font-size: 0.8rem;
}
```

In the CSS, we use flexbox to center the child elements inside the ``, and set the `width` and `height` of the `` to `calc-size()` functions. The `width` is set equal to `fit-content` plus `6rem`. The `height` is set to `auto` multiplied by two.

```css
section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: calc-size(fit-content, size + 6rem);
  height: calc-size(auto, size * 2);
}
```

The rest of the CSS has been hidden for brevity.

#### Result

We've created some horizontal and vertical space for the text to be centered in, without the use of padding.

### Basic `calc-size` animations

This example demonstrates how to use `calc-size()` to animate between a specific size and an intrinsic size. The demo features a character badge/"name tag", which can be hovered or focused to reveal information about the character. The reveal is handled by a `height` transition between a set length and `max-content`.

#### HTML

The HTML contains a single `` element with `tabindex="0"` set on it so it can receive keyboard focus. The `` contains `` and `` elements, each with their own child content.

```html
<section tabindex="0">
  <header>
    <h2>Chris Mills</h2>
  </header>
  <main>
    <p>Chris is the silent phantom of MDN.</p>
    <ul>
      <li><strong>Height</strong>: 3.03m</li>
      <li><strong>Weight</strong>: 160kg</li>
      <li><strong>Tech Fu</strong>: 7</li>
      <li><strong>Bad Jokes</strong>: 9</li>
    </ul>
  </main>
</section>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

section {
  font-family: "Helvetica", "Arial", sans-serif;
  width: 175px;
  border-radius: 5px;
  background: #eeeeee;
  box-shadow:
    inset 1px 1px 4px rgb(255 255 255 / 0.5),
    inset -1px -1px 4px rgb(0 0 0 / 0.5);
}

header {
  padding: 10px;
  border-bottom: 2px solid #cccccc;
}

main {
  padding: 0.7rem;
}

h2 {
  margin: 0;
  font-weight: normal;
  font-size: 1.1rem;
  text-align: center;
  letter-spacing: 1px;
}

p,
li {
  font-size: 0.8rem;
  line-height: 1.5;
}

p {
  margin-top: 0;
}
```

In the CSS, we set the ``'s `height` to `2.5rem` and `overflow` to `hidden` so only the `` is shown by default, then specify a `transition` that animates the `` `height` over 1 second during state changes. Finally, we set the `` `height` to a `calc-size()` function call on `:hover` and `:focus`. The function return value is the equivalent of `max-content` + `2rem`.

```css
section {
  height: 2.5rem;
  overflow: hidden;
  transition: height ease 1s;
}

section:hover,
section:focus {
  height: calc-size(max-content, size + 2rem);
}
```

The rest of the CSS has been hidden for brevity.

#### Result

Try hovering over the `` or focusing it via the keyboard — it will animate to its full height + 2rem, revealing all the content with 2rems of extra space at the bottom.

### Adjusting reading width based on `fit-content`

This example shows a container with text inside it, and a button that can be clicked to make the container width narrower or wider depending on reading preference.

#### HTML

The HTML contains a single `` element containing child text content, plus a `` to change the `` width.

```html
<section class="easy-reader">
  <h2>Easy reader</h2>

  <p>
    Eius velit aperiam ipsa. Deleniti eum excepturi ut magni maxime maxime
    beatae. Dicta aperiam est laudantium ut illum facere qui officiis. Sunt
    deleniti quam id. Quis sunt voluptatem praesentium minima dolorum autem
    consequatur velit.
  </p>

  <p>
    Vitae ab incidunt velit aspernatur deleniti distinctio rerum. Et natus sed
    et quos mollitia quia quod. Quae officia ex ea. Ducimus ut voluptatem et et
    debitis. Quidem provident laboriosam exercitationem similique deleniti.
    Temporibus vel veniam mollitia magni unde a nostrum.
  </p>

  <button class="width-adjust">Narrower</button>
</section>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

body {
  width: 600px;
  margin: 0 auto;
}

section {
  margin-top: 20px;
  font-family: "Helvetica", "Arial", sans-serif;
  background: #eeeeee;
  border: 2px solid #cccccc;
  padding: 0 20px;
  position: relative;
}

p,
li {
  font-size: 0.8rem;
  line-height: 1.5;
}

button {
  position: absolute;
  top: 2px;
  right: 2px;
}
```

In the CSS, we set the ``'s `width` to a default of `fit-content`. We then define two sets of `@keyframes`, `narrower`, which animates from `fit-content` to 70% of `fit-content` (calculated using `calc-size()`), and `wider`, which animates the same values but in the opposite direction. Finally, we attach those animations to two classes — `.narrower` and `.wider`. Each animation is defined to last one second and to keep the final state applied once finished.

```css
section {
  width: fit-content;
}

@keyframes narrower {
  from {
    width: fit-content;
  }

  to {
    width: calc-size(fit-content, size * 0.7);
  }
}

@keyframes wider {
  from {
    width: calc-size(fit-content, size * 0.7);
  }

  to {
    width: fit-content;
  }
}

.narrower {
  animation: narrower 1s ease forwards;
}

.wider {
  animation: wider 1s ease forwards;
}
```

The rest of the CSS has been hidden for brevity.

#### JavaScript

The JavaScript provides a narrower/wider toggle that applies the relevant class to the `` when the button is clicked:

```js
const widthAdjustBtn = document.querySelector(".width-adjust");
const easyReader = document.querySelector(".easy-reader");

widthAdjustBtn.addEventListener("click", () => {
  if (easyReader.classList.length === 1) {
    easyReader.classList.add("narrower");
    widthAdjustBtn.textContent = "Wider";
  } else if (easyReader.classList.contains("wider")) {
    easyReader.classList.replace("wider", "narrower");
    widthAdjustBtn.textContent = "Wider";
  } else if (easyReader.classList.contains("narrower")) {
    easyReader.classList.replace("narrower", "wider");
    widthAdjustBtn.textContent = "Narrower";
  }
});
```

#### Result

Try clicking the `` a few times to adjust the `` between the wide and narrow reading width, achieved by manipulating the `width` based on the `fit-content` value.

### Using a function inside the `calc-size()` function

As mentioned earlier, it is possible to use another function inside `calc-size()`. This example sets `field-sizing: content` on `` elements to make them as wide as the entered content, and then uses a `max()` function inside `calc-size()` to ensure that the ``s are at least a minimum size, and only start to grow when the entered text becomes wider than that size — by being set to `fit-content` plus `20px`.

#### HTML

The HTML contains a `<form>` element containing three textual `` types. Each `` has a `` associated with it to make the form accessible, and a `maxlength` applied to stop entered values getting long enough to break the form layout.

```html
<form>
  <div>
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" maxlength="48" />
  </div>
  <div>
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" maxlength="48" />
  </div>
  <div>
    <label for="address">Address:</label>
    <input type="text" id="address" name="address" maxlength="60" />
  </div>
</form>
```

#### CSS

```css
* {
  box-sizing: border-box;
}

body {
  width: 600px;
  margin: 0 auto;
}

form {
  margin-top: 20px;
  padding: 20px;
  font-family: "Helvetica", "Arial", sans-serif;
  background: #eeeeee;
  border: 2px solid #cccccc;
}

div {
  display: flex;
  align-items: center;
}

div:not(div:last-child) {
  margin-bottom: 20px;
}
```

In the CSS, we set the `width` of the `` elements to `100px`. We set `field-sizing: content` on the `` elements to make them as wide as the entered content — by default they would no width because nothing would be entered into them. To counteract this, we set their `width` values to `calc-size(fit-content, max(100px, size + 20px))`. This means that they are a minimum of `100px` wide, even with no value entered. When an entered value becomes wider than `100px`, their `width` changes to `fit-content` plus `20px`, which means they start to grow with the content size but keep a `20px` gap on the right-hand side.

```css
label {
  width: 100px;
}

input {
  field-sizing: content;
  width: calc-size(fit-content, max(100px, size + 20px));
}
```

The rest of the CSS has been hidden for brevity.

#### Result

Try entering some text inside the form inputs, and see how they grow when the values start to become as wide as the minimum width enforced by the `max()` function.

## See also

- `interpolate-size`
- `calc()`
- `round()`
- Animate to height: auto; (and other intrinsic sizing keywords) in CSS on developer.chrome.com (2024)
