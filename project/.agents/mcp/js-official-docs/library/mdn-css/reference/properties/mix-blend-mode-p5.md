---
title: "`mix-blend-mode` CSS property (part 5 of 5)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/properties/mix-blend-mode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `mix-blend-mode` CSS property (part 5 of 5)

```html
        soft-light
        <div class="container soft-light">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        difference
        <div class="container difference">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        exclusion
        <div class="container exclusion">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        hue
        <div class="container hue">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        saturation
        <div class="container saturation">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        color
        <div class="container color">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        luminosity
        <div class="container luminosity">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        plus-darker
        <div class="container plus-darker">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
      <div class="cell">
        plus-lighter
        <div class="container plus-lighter">
          <div class="group">
            <div class="item firefox"></div>
            <svg class="item" viewBox="0 0 150 150">
              <ellipse class="item R" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item G" cx="75" cy="75" rx="25" ry="70"></ellipse>
              <ellipse class="item B" cx="75" cy="75" rx="25" ry="70"></ellipse>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

```css
html,
body {
  height: 100%;
  box-sizing: border-box;
  background: #eeeeee;
}

.grid {
  width: 100%;
  display: flex;
  font: 1em monospace;
}

.row {
  display: flex;
  flex: 1 auto;
  flex-direction: row;
  flex-wrap: wrap;
  height: auto;
}

.col {
  display: flex;
  flex: 1 auto;
  flex-direction: column;
  height: auto;
}

.cell {
  margin: 0.5em;
  padding: 0.5em;
  background-color: white;
  overflow: hidden;
  text-align: center;
}

.note {
  background: #fff3d4;
  padding: 1em;
  margin: 0.5em 0.5em 0;
  font: 0.8em sans-serif;
  text-align: left;
  white-space: nowrap;
}

.note + .row .cell {
  margin-top: 0;
}

.container {
  position: relative;
  background:
    linear-gradient(to right, black 0%, transparent 50%, white 100%),
    linear-gradient(to bottom, yellow 0%, magenta 50%, cyan 100%);
  width: 150px;
  height: 150px;
  margin: 0 auto;
}

.R {
  transform-origin: center;
  transform: rotate(-30deg);
  fill: url("#red");
}

.G {
  transform-origin: center;
  transform: rotate(90deg);
  fill: url("#green");
}

.B {
  transform-origin: center;
  transform: rotate(210deg);
  fill: url("#blue");
}

.isolate .group {
  isolation: isolate;
}

.normal .item {
  mix-blend-mode: normal;
}
.multiply .item {
  mix-blend-mode: multiply;
}
.screen .item {
  mix-blend-mode: screen;
}
.overlay .item {
  mix-blend-mode: overlay;
}
.darken .item {
  mix-blend-mode: darken;
}
.lighten .item {
  mix-blend-mode: lighten;
}
.color-dodge .item {
  mix-blend-mode: color-dodge;
}
.color-burn .item {
  mix-blend-mode: color-burn;
}
.hard-light .item {
  mix-blend-mode: hard-light;
}
.soft-light .item {
  mix-blend-mode: soft-light;
}
.difference .item {
  mix-blend-mode: difference;
}
.exclusion .item {
  mix-blend-mode: exclusion;
}
.hue .item {
  mix-blend-mode: hue;
}
.saturation .item {
  mix-blend-mode: saturation;
}
.color .item {
  mix-blend-mode: color;
}
.luminosity .item {
  mix-blend-mode: luminosity;
}
.plus-darker .item {
  mix-blend-mode: plus-darker;
}
.plus-lighter .item {
  mix-blend-mode: plus-lighter;
}
```

### Using mix-blend-mode with HTML

#### HTML

```html
<div class="isolate">
  <div class="circle circle-1"></div>
  <div class="circle circle-2"></div>
  <div class="circle circle-3"></div>
</div>
```

#### CSS

```css
.circle {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  mix-blend-mode: screen;
  position: absolute;
}

.circle-1 {
  background: red;
}

.circle-2 {
  background: lightgreen;
  left: 40px;
}

.circle-3 {
  background: blue;
  left: 20px;
  top: 40px;
}

.isolate {
  isolation: isolate; /* Without isolation, the background color will be taken into account */
  position: relative;
}
```

#### Result

### Using mix-blend-mode with SVG

#### SVG

```html
<svg>
  <g class="isolate">
    <circle cx="40" cy="40" r="40" fill="red" />
    <circle cx="80" cy="40" r="40" fill="lightgreen" />
    <circle cx="60" cy="80" r="40" fill="blue" />
  </g>
</svg>
```

#### CSS

```css
circle {
  mix-blend-mode: screen;
}
.isolate {
  isolation: isolate;
} /* Without isolation, the background color will be taken into account */
```

#### Result

### Using mix-blend-mode with text

This example uses `mix-blend-mode` to blend text color with the background color of its parent element.

#### HTML

```html
<div class="container">
  <p>Mostly Harmless</p>
  <p class="multiply">Mostly Harmless</p>
  <p class="screen">Mostly Harmless</p>
  <p class="hard-light">Mostly Harmless</p>
</div>
```

#### CSS

```css
@import "https://fonts.googleapis.com/css2?family=Rubik+Moonrocks&display=swap";

.container {
  background-color: blue;
}

p {
  font:
    4rem "Rubik Moonrocks",
    cursive;
  font-weight: bold;
  color: orange;
  padding: 0.5rem;
  margin: 0;
}

.multiply {
  mix-blend-mode: multiply;
}

.screen {
  mix-blend-mode: screen;
}

.hard-light {
  mix-blend-mode: hard-light;
}
```

#### Result

## See also

- `<blend-mode>`
- `background-blend-mode`
