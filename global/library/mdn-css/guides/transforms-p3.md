---
title: "CSS transforms (part 3 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/transforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS transforms (part 3 of 3)

```js
allTransformFieldset
  .querySelectorAll("input[type='range']")
  .forEach((rangeInput) => {
    // Event listeners for when the range inputs change
    rangeInput.addEventListener("input", (el) => {
      updateTransform();
    });

    // Reset the relevant transform setting when the range input is double clicked
    rangeInput.addEventListener("dblclick", (el) => {
      resetInput(el.target);
      updateTransform();
    });
  });

// Event listeners for when checkbox inputs change
allTransformFieldset
  .querySelectorAll("input[type='checkbox']")
  .forEach((checkboxInput) => {
    checkboxInput.addEventListener("input", (el) => {
      updateTransform();
    });
  });

// "Reset All" button event listener
resetAllButton.addEventListener("click", () => {
  allTransformFieldset.querySelectorAll("input").forEach((input) => {
    resetInput(input);
  });
  updateTransform();
});

// Section reset button event listeners
allTransformFieldset
  .querySelectorAll(".resetSectionButton")
  .forEach((resetSectionButton) => {
    resetSectionButton.addEventListener("click", (el) => {
      let allRanges = el.target.parentElement.parentElement.querySelectorAll(
        "input[type='range']",
      );
      allRanges.forEach((range) => {
        resetInput(range);
      });

      let allCheckboxes =
        el.target.parentElement.parentElement.querySelectorAll(
          "input[type='checkbox']",
        );
      allCheckboxes.forEach((check) => {
        resetInput(check);
      });

      updateTransform();
    });
  });

function resetInput(inputEl) {
  if (!inputEl) {
    console.warn(`inputEl \`${inputEl}\` is falsy!`);
    console.trace();
    return;
  }

  const defaultValue = inputEl.getAttribute("data-default");
  if (inputEl.getAttribute("type") === "checkbox") {
    inputEl.checked = defaultValue === "checked";
  } else {
    inputEl.value = defaultValue || "0";
  }
}

function updateOutputs() {
  translateXOutput.value = `${translateXRange.value}px`;
  translateYOutput.value = `${translateYRange.value}px`;
  translateZOutput.value = `${translateZRange.value}px`;

  rotateXOutput.value = `${rotateXRange.value}°`;
  rotateYOutput.value = `${rotateYRange.value}°`;
  rotateZOutput.value = `${rotateZRange.value}°`;

  scaleXOutput.value = `${scaleXRange.value}x`;
  scaleYOutput.value = `${scaleYRange.value}x`;
  scaleZOutput.value = `${scaleZRange.value}x`;

  skewXOutput.value = `${skewXRange.value}°`;
  skewYOutput.value = `${skewYRange.value}°`;

  perspectiveOutput.value = `${perspectiveRange.value}px`;

  perspectiveOriginXOutput.value = `${perspectiveOriginXRange.value}%`;
  perspectiveOriginYOutput.value = `${perspectiveOriginYRange.value}%`;
}

function updateTransform() {
  updateOutputs();

  cube.style.transform = `translate3d(${translateXRange.value}px,
                ${translateYRange.value}px,
                ${translateZRange.value}px)
                rotateX(${rotateXRange.value}deg)
                rotateY(${rotateYRange.value}deg)
                rotateZ(${rotateZRange.value}deg)
                scale3d(${scaleXRange.value},
                ${scaleYRange.value},
                ${scaleZRange.value})
                skewX(${skewXRange.value}deg)
                skewY(${skewYRange.value}deg)`;
  cube.style.backfaceVisibility = `${backfaceVisibilityCheckbox.checked ? "visible" : "hidden"}`;

  outputContainer.style.perspective = `${perspectiveRange.value}px`;
  outputContainer.style.perspectiveOrigin = `${perspectiveOriginXRange.value}% ${perspectiveOriginYRange.value}%`;

  perspectiveDot.style.top = `${perspectiveOriginYRange.value}%`;
  perspectiveDot.style.left = `${perspectiveOriginXRange.value}%`;
}
updateTransform();
```

You can also use the `perspective` slider to modify the `perspective` property of the cube's container, which determines the distance between you and the `z=0` plane.

The `perspective-origin` sliders determine where you, the viewer, are looking into the 3D space for purposes of determining the view's _vanishing point_. This vanishing point is indicated by a small red dot. You can imagine modifying these sliders as physically moving your head up, down, left, and right to see different parts of the cube without moving the cube itself.

The `backface-visibility` checkbox determines whether the cube's back faces are set to `visible` or `hidden`.

The cube in the above example is comprised of six `` elements, all of which are styled with CSS to create the cube's faces. The cube is not drawn using a 2D or 3D canvas context, so **you can inspect the faces of the cube with your browser's developer tools as you would inspect any other DOM element**. Try using your browser's developer tools element picker to inspect different faces of the cube as you transform its position and rotation.

> **Note:**
> The order in which transformations, including 3D rotations, are applied affects the resultant transformation. In the above example, transforms are translated, scaled, rotated, then skewed. The rotations are applied in the order X → Y → Z.

## Reference

### Properties

- `backface-visibility`
- `perspective`
- `perspective-origin`
- `rotate`
- `scale`
- `transform`
- `transform-box`
- `transform-origin`
- `transform-style`
- `translate`

### Functions

- `matrix()`
- `matrix3d()`
- `perspective()`
- `rotate()`
- `rotate3d()`
- `rotateX()`
- `rotateY()`
- `rotateZ()`
- `scale()`
- `scale3d()`
- `scaleX()`
- `scaleY()`
- `scaleZ()`
- `skew()`
- `skewX()`
- `skewY()`
- `translate()`
- `translate3d()`
- `translateX()`
- `translateY()`
- `translateZ()`

### Data types

- `<transform-function>`

## Guides

- Using CSS transforms
    Step-by-step tutorial about how to transform elements styled with CSS.
- Coordinate systems
    Describes the way pixel locations are defined in the CSS object model.
- Performance fundamentals: Use CSS transforms
    An overview of web performance fundamentals, including how CSS transforms can improve performance.
- Matrix math for the web
    Describes how object transformations can be represented by mathematical matrices.

## Related concepts

- CSS Properties:
  - `animation`
  - `background-position`
  - `clip`
  - `clip-path`
  - `contain`
  - `content-visibility`
  - `isolation`
  - `mask`
  - `mask-border-source`
  - `mask-image`
  - `mix-blend-mode`
  - `opacity`
  - `overflow`
  - `transition`
  - `visibility`
- Data types:
  - `angle`
  - `length-percentage`
  - `length`
  - `number`
  - `percentage`
  - `position`
- Glossary terms:
  - Interpolation
  - Stacking context
- SVG concepts:
  - `<animate>` element
  - `<animateTransform>` element
  - `<set>` element
  - `transform` element

## See also

- Basic SVG transformations tutorial
- CSS animations module
- CSS transitions module
