---
title: "CSS transforms (part 2 of 3)"
tool: "mdn-css"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/css/guides/transforms/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSS transforms (part 2 of 3)

## CSS transforms in action

Use the sliders in the example below to modify the translation, rotation, scale, and skew CSS transform properties of the cube in 3D space. As you move the cube through 3D space, notice the way it interacts with the element labeled `z:0px`, which is located at the 3D position `(0, 0, 0)`.

```html
<article>
  <fieldset id="allTransformFieldset">
    <legend>
      Transform settings
      <button id="resetAllButton" aria-label="Reset">↻</button>
    </legend>
    <section id="fieldsetSection">
      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Translation</span>
          </label>
          <button
            id="translateSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span id="translateXLabel">X</span>
              <input
                type="range"
                min="-100"
                max="100"
                value="0"
                data-default="0"
                id="translateXRange"
                aria-labelledby="translateXLabel" />
            </label>
            <output id="translateXOutput" for="translateXRange"></output>
          </div>
          <div>
            <label>
              <span id="translateYLabel">Y</span>
              <input
                type="range"
                min="-100"
                max="100"
                value="0"
                data-default="0"
                id="translateYRange"
                aria-labelledby="translateYLabel" />
            </label>
            <output id="translateYOutput" for="translateYRange"></output>
          </div>
          <div>
            <label>
              <span id="translateZLabel">Z</span>
              <input
                type="range"
                min="-100"
                max="100"
                value="0"
                data-default="0"
                id="translateZRange"
                aria-labelledby="translateZLabel" />
            </label>
            <output id="translateZOutput" for="translateZRange"></output>
          </div>
        </div>
      </fieldset>

      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Rotation</span>
          </label>
          <button
            id="rotateSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span id="rotateXLabel">X</span>
              <input
                type="range"
                min="-360"
                max="360"
                value="0"
                data-default="0"
                id="rotateXRange"
                aria-labelledby="rotateXLabel" />
            </label>
            <output id="rotateXOutput" for="rotateXRange"></output>
          </div>
          <div>
            <label>
              <span id="rotateYLabel">Y</span>
              <input
                type="range"
                min="-360"
                max="360"
                value="0"
                data-default="0"
                id="rotateYRange"
                aria-labelledby="rotateYLabel" />
            </label>
            <output id="rotateYOutput" for="rotateYRange"></output>
          </div>
          <div>
            <label>
              <span id="rotateZLabel">Z</span>
              <input
                type="range"
                min="-360"
                max="360"
                value="0"
                data-default="0"
                id="rotateZRange"
                aria-labelledby="rotateZLabel" />
            </label>
            <output id="rotateZOutput" for="rotateZRange"></output>
          </div>
        </div>
      </fieldset>

      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Scale</span>
          </label>
          <button
            id="scaleSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span id="scaleXLabel">X</span>
              <input
                type="range"
                min="0.1"
                max="2.5"
                value="1"
                data-default="1"
                step="0.1"
                id="scaleXRange"
                aria-labelledby="scaleXLabel" />
            </label>
            <output id="scaleXOutput" for="scaleXRange"></output>
          </div>
          <div>
            <label id="scaleYLabel">
              <span>Y</span>
              <input
                type="range"
                min="0.1"
                max="2.5"
                value="1"
                data-default="1"
                step="0.1"
                id="scaleYRange"
                aria-labelledby="scaleYLabel" />
            </label>
            <output id="scaleYOutput" for="scaleYRange"></output>
          </div>
          <div>
            <label id="scaleZLabel">
              <span>Z</span>
              <input
                type="range"
                min="0.1"
                max="2.5"
                value="1"
                data-default="1"
                step="0.1"
                id="scaleZRange"
                aria-labelledby="scaleZLabel" />
            </label>
            <output id="scaleZOutput" for="scaleZRange"></output>
          </div>
        </div>
      </fieldset>

      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Skew</span>
          </label>
          <button
            id="skewSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span id="skewXLabel">X</span>
              <input
                type="range"
                min="-90"
                max="90"
                value="0"
                data-default="0"
                id="skewXRange"
                aria-labelledby="skewXLabel" />
            </label>
            <output id="skewXOutput" for="skewXRange"></output>
          </div>
          <div>
            <label>
              <span id="skewYLabel">Y</span>
              <input
                type="range"
                min="-90"
                max="90"
                value="0"
                data-default="0"
                id="skewYRange"
                aria-labelledby="skewYLabel" />
            </label>
            <output id="skewYOutput" for="skewYRange"></output>
          </div>
        </div>
      </fieldset>

      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Container Perspective</span>
          </label>
          <button
            id="containerPerspectiveSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span id="perspectiveLabel"><code>perspective</code></span>
              <input
                type="range"
                min="75"
                max="500"
                value="200"
                data-default="200"
                id="perspectiveRange"
                aria-labelledby="perspectiveLabel" />
            </label>
            <output id="perspectiveOutput" for="perspectiveRange"></output>
          </div>
          <div>
            <label>
              <span id="perspectiveOriginXLabel"
                ><code>perspective-origin</code> X (%)</span
              >
              <input
                type="range"
                min="0"
                max="100"
                value="50"
                data-default="50"
                id="perspectiveOriginXRange"
                aria-labelledby="perspectiveOriginXLabel" />
            </label>
            <output
              id="perspectiveOriginXOutput"
              for="perspectiveOriginXRange"></output>
          </div>
          <div>
            <label>
              <span><code>perspective-origin</code> Y (%)</span>
              <input
                type="range"
                min="0"
                max="100"
                value="50"
                data-default="50"
                id="perspectiveOriginYRange"
                aria-labelledby="perspectiveOriginYLabel" />
            </label>
            <output
              id="perspectiveOriginYOutput"
              for="perspectiveOriginYRange"></output>
          </div>
        </div>
      </fieldset>

      <fieldset class="transformFieldset">
        <legend>
          <label>
            <span>Other Properties</span>
          </label>
          <button
            id="otherSectionReset"
            class="resetSectionButton"
            aria-label="Reset">
            ↻
          </button>
        </legend>
        <div class="controlsContainer">
          <div>
            <label>
              <span><code>backface-visibility</code></span>
              <input
                type="checkbox"
                checked
                data-default="checked"
                id="backfaceVisibilityCheckbox" />
            </label>
          </div>
        </div>
      </fieldset>
    </section>
  </fieldset>
  <section id="outputSection">
    <div id="outputContainer">
      <div id="cube">
        <div class="face front">1</div>
        <div class="face back">2</div>
        <div class="face right">3</div>
        <div class="face left">4</div>
        <div class="face top">5</div>
        <div class="face bottom">6</div>
      </div>
      <div id="z0"><code>z:0px</code></div>
    </div>
    <div id="perspectiveDot"></div>
  </section>
</article>
```

```css
#allTransformFieldset {
  border: none;
  padding: 0;
  margin-bottom: 4px;
  accent-color: blue; /* or any color */
  font-family:
    "Inter", "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans",
    "Droid Sans", "Helvetica Neue", sans-serif;
}

#allTransformFieldset > legend {
  margin-bottom: 4px;
}

fieldset {
  margin: 0;
}

legend {
  font-weight: bold;
  padding: 0;
}

#fieldsetSection {
  display: flex;
  flex-wrap: wrap;
  align-items: start;
  gap: 8px;
}

#outputSection {
  width: 100%;
  min-height: 400px;
  background: linear-gradient(skyblue, khaki);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: clip;
}

#outputContainer {
  position: absolute;
  width: 100%;
  height: 100%;
  perspective: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  transform-style: preserve-3d;
  pointer-events: none;
}

#z0 {
  width: 50px;
  height: 50px;
  background: linear-gradient(
    to right bottom,
    rgb(223 223 223),
    rgb(190 190 190)
  );
  transform: translateZ(0px);
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: black;
  border-radius: 50%;
  outline: 1px solid rgb(0 0 0 / 0.35);
  pointer-events: all;
}

#perspectiveDot {
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: rgb(240 0 0 / 0.5);
  transform: translate3d(-2px, -2px, 0px);
  position: absolute;
}

#cube {
  width: 100px;
  height: 100px;
  transform-style: preserve-3d;
  transition: all 0.075s ease-out;
  position: absolute;
  pointer-events: all;
}

.face {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  position: absolute;
  backface-visibility: inherit;
  font-size: 60px;
  color: white;
}

.front {
  background: rgb(90 90 90 / 0.7);
  transform: translateZ(50px);
}

.back {
  background: rgb(0 210 0 / 0.7);
  transform: rotateY(180deg) translateZ(50px);
}

.right {
  background: rgb(210 0 0 / 0.7);
  transform: rotateY(90deg) translateZ(50px);
}

.left {
  background: rgb(0 0 210 / 0.7);
  transform: rotateY(-90deg) translateZ(50px);
}

.top {
  background: rgb(210 210 0 / 0.7);
  transform: rotateX(90deg) translateZ(50px);
}

.bottom {
  background: rgb(210 0 210 / 0.7);
  transform: rotateX(-90deg) translateZ(50px);
}

.transformFieldset {
  margin: 0;
}

.controlsContainer {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 4px;
}

.controlsContainer {
  width: 100%;
}

.controlsContainer > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

.controlsContainer > div > label {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
}

button {
  font-size: 18px;
  border-radius: 50%;
  border: #cccccc solid 1px;
  padding: 0;
  width: 26px;
  height: 26px;
  margin-left: 4px;
}

input[type="range"] {
  width: 172px;
}

output {
  width: 3em;
}
```
