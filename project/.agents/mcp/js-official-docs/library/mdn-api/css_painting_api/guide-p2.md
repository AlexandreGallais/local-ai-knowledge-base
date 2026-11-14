---
title: "Using the CSS Painting API (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/css_painting_api/guide/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Using the CSS Painting API (part 2 of 2)

## Passing parameters

> **Note:**
> The following example requires the Experimental Web Platform features flag to be enabled in Chrome or Edge by visiting `about://flags`.

With the CSS Paint API, we not only have access to custom properties and regular properties, but we can pass <example-value> arguments to the `paint()` function as well.

We can add these extra arguments when we call the function in the CSS. Let's say we want to sometimes stroke our background instead of fill it — let's pass in an extra argument for this occasion.

```css
li {
  background-image: paint(hollow-highlights, stroke);
}
```

Now we can use the `inputArguments()` method in the `registerPaint()` class to access the custom argument we have added to our `paint()` function.

```js
class Worklet {
  static get inputArguments() {
    return ["*"];
  }
  // …
}
```

We then have access to that argument.

```js
class Worklet {
  // …
  paint(ctx, size, props, args) {
    // use our custom arguments
    const hasStroke = args[0].toString();

    // if stroke arg is 'stroke', don't fill
    if (hasStroke === "stroke") {
      ctx.fillStyle = "transparent";
      ctx.strokeStyle = color;
    }
    // …
  }
  // …
}
```

We can also specify that we want a particular type of argument.

Let's say we add a second argument with how many pixels wide we want the stroke to be:

```css
li {
  background-image: paint(hollow-highlights, stroke, 10px);
}
```

When we `get` our list of argument values, we can ask specifically for a `<length>` unit.

```js
class Worklet {
  // …
  static get inputArguments() {
    return ["*", "<length>"];
  }
  // …
}
```

In this case, we specifically requested the `<length>` attribute. The first element in the returned array will be a `CSSUnparsedValue`. The second will be a `CSSStyleValue`.

If the custom argument is a CSS value, for instance a unit, we can invoke Typed OM CSSStyleValue class (and sub classes) by using the value type keyword when we retrieve it in the `registerPaint()` function.

Now we can access the type and value properties, meaning we can get the number of pixels and a number type right out of the box. (Admittedly, `ctx.lineWidth` takes a float as a value rather than a value with length units, but for example's sake…)

```js
class Worklet {
  // …
  paint(ctx, size, props, args) {
    const strokeWidth = args[1];

    if (strokeWidth.unit === "px") {
      ctx.lineWidth = strokeWidth.value;
    } else {
      ctx.lineWidth = 1.0;
    }

    // …
  }
  // …
}
```

It's worth noting the difference between using custom properties to control different parts of this worklet and the arguments set out here. Custom properties (and in fact any properties on the style map) are global — they can be used elsewhere within our CSS (and JS).

You may for example have a `--main-color`, which will be useful for setting the color within a `paint()` function, but can also be used to set colors elsewhere in your CSS. If you wanted to change it specifically for paint, it could prove difficult. This is where the custom argument feature comes in handy. Another way to think about it is that arguments are set to control what you are actually drawing, whereas properties are set to control styling.

Now we can really start to see the benefits of this API, if we can control a myriad of drawing parameters from our CSS through both custom properties and extra `paint()` function arguments, then we can really start to build reusable and highly controllable styling functions.

### The paint worklet

```js
registerPaint(
  "hollow-highlights",
  class {
    static get inputProperties() {
      return ["--box-color"];
    }
    // Input arguments that can be passed to the `paint` function
    static get inputArguments() {
      return ["*", "<length>"];
    }

    static get contextOptions() {
      return { alpha: true };
    }

    paint(ctx, size, props, args) {
      // ctx   -> drawing context
      // size  -> size of the box being painted
      // props -> list of custom properties available to the element
      // args  -> list of arguments set when calling the paint() function in the CSS

      // where to start the highlight & dimensions
      const x = 0;
      const y = size.height * 0.3;
      const blockWidth = size.width * 0.33;
      const blockHeight = size.height * 0.85;

      // the values passed in the paint() function in the CSS
      const color = props.get("--box-color");
      const strokeType = args[0].toString();
      const strokeWidth = parseInt(args[1], 10);

      // set the stroke width
      ctx.lineWidth = strokeWidth ?? 1.0;
      // set the fill type
      if (strokeType === "stroke") {
        ctx.fillStyle = "transparent";
        ctx.strokeStyle = color;
      } else if (strokeType === "filled") {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
      } else {
        ctx.fillStyle = "none";
        ctx.strokeStyle = "none";
      }

      // block
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(blockWidth, y);
      ctx.lineTo(blockWidth + blockHeight, blockHeight);
      ctx.lineTo(x, blockHeight);
      ctx.lineTo(x, y);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // dashes
      for (let i = 0; i < 4; i++) {
        let start = i * 2;
        ctx.beginPath();
        ctx.moveTo(blockWidth + start * 10 + 10, y);
        ctx.lineTo(blockWidth + start * 10 + 20, y);
        ctx.lineTo(blockWidth + start * 10 + 20 + blockHeight, blockHeight);
        ctx.lineTo(blockWidth + start * 10 + 10 + blockHeight, blockHeight);
        ctx.lineTo(blockWidth + start * 10 + 10, y);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }
    } // paint
  },
);
```

### Using the paint worklet

We can set different colors, stroke widths, and pick whether the background image should be filled or hollow:

```css
li {
  --box-color: hsl(155 90% 60% / 50%);
  background-image: paint(hollow-highlights, stroke, 5px);
}

li:nth-of-type(3n) {
  --box-color: hsl(255 90% 60% / 50%);
  background-image: paint(hollow-highlights, filled, 3px);
}

li:nth-of-type(3n + 1) {
  --box-color: hsl(355 90% 60% / 50%);
  background-image: paint(hollow-highlights, stroke, 1px);
}
```

```html
<ul>
  <li>item 1</li>
  <li>item 2</li>
  <li>item 3</li>
  <li>item 4</li>
  <li>item 5</li>
  <li>item 6</li>
  <li>item 7</li>
  <li>item 8</li>
  <li>item 9</li>
  <li>item 10</li>
  <li>item 11</li>
  <li>item 12</li>
  <li>item 13</li>
  <li>item 14</li>
  <li>item 15</li>
  <li>item 16</li>
  <li>item 17</li>
  <li>item</li>
</ul>
```

In our `<script>` we register the worklet:

```js
CSS.paintWorklet.addModule("hollow.js");
```

## See also

- CSS Painting API
- CSS Typed Object Model API
