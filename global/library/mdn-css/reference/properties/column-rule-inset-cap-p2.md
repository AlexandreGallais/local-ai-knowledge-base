---
title: "`column-rule-inset-cap` CSS property (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/column-rule-inset-cap/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `column-rule-inset-cap` CSS property (part 2 of 2)

## Examples

### Basic usage

This example demonstrates setting `column-rule-inset-cap` to inset the column rule cap segment endpoints on flex containers.

#### HTML

The markup includes two `` elements, each containing seven children. The only difference between the two containers is that the second one has an added `column` class.

```html
<h1>Insetting cap column rule endpoints</h1>
<article>
  <section>
    <h2>flex-direction: row</h2>
    <div class="flexbox">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
  <section>
    <h2>flex-direction: column</h2>
    <div class="flexbox column">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  </section>
</article>
```

```html
<p>
  <label
    >Change the size of the inset.
    <input type="range" min="-40" max="16" value="16" id="inset"
  /></label>
  <output id="o">16px</output>
</p>
```

#### CSS

We use the `display` property to turn the `.flexbox` elements into flex containers. We balance the items into three flex lines using `flex-wrap` and `flex-line-count`. We define a `lightblue` `rule` to paint both row and column gaps, then overwrite the `column-rule-color`, setting darker `blue` column gap decorations. Finally, we set the `column-rule-inset-cap` to `16px`.

```css
.flexbox {
  display: flex;
  flex-wrap: balance;
  flex-line-count: 3;
  gap: 20px;
  rule: 5px solid lightblue;
  column-rule-color: blue;

  column-rule-inset-cap: 16px;
}
```

We also set the `flex-direction` on the `.column` container, to change the main axis of the flex container, and make the items flow in columns rather than rows.

```css
.column {
  flex-direction: column;
}
```

The rest of the CSS is hidden for brevity.

```css
body {
  font-family: sans-serif;
  text-align: center;
}
h1 {
  font-size: 1.25em;
}
h2 {
  font-size: 1em;
}
article {
  display: flex;
  gap: 5vw;
  rule: 1px solid black;
  width: 100vw;
}
section {
  flex-basis: 45vw;
}
.flexbox > div {
  border: 1px solid green;
  background-color: lime;
  flex: 1 1 auto;
  height: 30px;
}
output {
  display: inline-block;
  width: 2em;
}
p {
  margin-top: 2.5em;
}
@layer no-support {
  @supports not (column-rule-inset-cap: 16px) {
    body::before {
      content: "Your browser doesn't support the column-rule-inset-cap property";
      background-color: wheat;
      display: block;
      text-align: center;
      padding: 1rem 0;
    }
  }
}
```

```js
const inset = document.getElementById("inset");
const containers = document.querySelectorAll(".flexbox");
const output = document.getElementById("o");

inset.addEventListener("input", () => {
  const val = `${inset.value}px`;
  containers[0].style.columnRuleInsetCap = val;
  containers[1].style.columnRuleInsetCap = val;
  output.innerText = val;
});
```

#### Result

Change the size of the inset. Note how the column segments grow and shrink only at their segment cap ends — the ends that don't intersect other column or row segments.

## See also

- `column-rule-inset-cap-end`
- `column-rule-inset-cap-start`
- `column-rule-inset` shorthand
- `row-rule-inset-cap` shorthand
- `rule-inset` shorthand
- `column-rule-break`
- `rule-break` shorthand
- `rule-overlap`
- `rule-visibility-items`
- `rule` shorthand
- CSS gaps module
