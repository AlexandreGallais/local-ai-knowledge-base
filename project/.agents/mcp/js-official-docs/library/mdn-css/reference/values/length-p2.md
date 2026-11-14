---
title: "`<length>` CSS type (part 2 of 2)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/reference/values/length/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<length>` CSS type (part 2 of 2)

## Absolute length units

**Absolute length units** represent a physical measurement when the physical properties of the output medium are known, such as for print layout. This is done by anchoring one of the units to a **physical unit** or the **visual angle unit** and then defining the others relative to it. Physical units include `cm`, `in`, `mm`, `pc`, `pt`, `px`, and `Q`.The anchoring is done differently for low-resolution devices, such as screens, versus high-resolution devices, such as printers.

For low-dpi devices, the unit `px` represents the physical _reference pixel_; other units are defined relative to it. Thus, `1in` is defined as `96px`, which equals `72pt`. The consequence of this definition is that on such devices, dimensions described in inches (`in`), centimeters (`cm`), or millimeters (`mm`) don't necessarily match the size of the physical unit with the same name.

For high-dpi devices, inches (`in`), centimeters (`cm`), and millimeters (`mm`) are the same as their physical counterparts. Therefore, the `px` unit is defined relative to them (1/96 of `1in`).

> **Note:**
> Many users increase their user agent's default font size to make text more legible. Absolute lengths can cause accessibility problems because they are fixed and do not scale according to user settings. For this reason, prefer relative lengths (such as `em` or `rem`) when setting `font-size`.

- `px`
    One pixel. For screen displays, it traditionally represents one device pixel (dot). However, for _printers_ and _high-resolution screens_, one CSS pixel implies multiple device pixels. `1px` = `1in / 96`.
- `cm`
    One centimeter. `1cm` = `96px / 2.54`.
- `mm`
    One millimeter. `1mm` = `1cm / 10`.
- `Q`
    One quarter of a millimeter. `1Q` = `1cm / 40`.
- `in`
    One inch. `1in` = `2.54cm` = `96px`.
- `pc`
    One pica. `1pc` = `12pt` = `1in / 6`.
- `pt`
    One point. `1pt` = `1in / 72`.

## Interpolation

When animated, values of the `<length>` data type are interpolated as real, floating-point numbers. The interpolation happens on the calculated value. The speed of the interpolation is determined by the easing function associated with the animation.

## Examples

### Comparing different length units

The following example provides you with an input field in which you can enter a `<length>` value (e.g., `300px`, `50%`, `30vw`) to set the width of a result bar that will appear below it once you've pressed the `Enter` or the `Return` key.

This allows you to compare and contrast the effects of different length units.

#### HTML

```html
<div class="outer">
  <div class="input-container">
    <label for="length">Enter width:</label>
    <input type="text" id="length" />
  </div>
  <div class="inner"></div>
</div>
<div class="results"></div>
```

#### CSS

```css
html {
  font-family: sans-serif;
  font-weight: bold;
  box-sizing: border-box;
}

.outer {
  width: 100%;
  height: 50px;
  background-color: #eeeeee;
  position: relative;
}

.inner {
  height: 50px;
  background-color: #999999;
  box-shadow:
    inset 3px 3px 5px rgb(255 255 255 / 50%),
    inset -3px -3px 5px rgb(0 0 0 / 50%);
}

.result {
  height: 20px;
  box-shadow:
    inset 3px 3px 5px rgb(255 255 255 / 50%),
    inset -3px -3px 5px rgb(0 0 0 / 50%);
  background-color: orange;
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.result code {
  position: absolute;
  margin-left: 20px;
}

.results {
  margin-top: 10px;
}

.input-container {
  position: absolute;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px;
}

label {
  margin: 0 10px 0 20px;
}
```

#### JavaScript

```js
const inputDiv = document.querySelector(".inner");
const inputElem = document.querySelector("input");
const resultsDiv = document.querySelector(".results");

inputElem.addEventListener("change", () => {
  inputDiv.style.width = inputElem.value;

  const result = document.createElement("div");
  result.className = "result";
  result.style.width = inputElem.value;
  const code = document.createElement("code");
  code.textContent = `width: ${inputElem.value}`;
  result.appendChild(code);
  resultsDiv.appendChild(result);

  inputElem.value = "";
  inputElem.focus();
});
```

#### Result

## See also

- Learn: Values and units
- CSS values & units module
- Box Model
