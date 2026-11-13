---
title: "`<input type=\"number\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="number">` HTML attribute value (part 2 of 2)

## Examples

We've already covered the fact that by default, the increment is `1`, and you can use the `step` attribute to allow decimal inputs. Let's take a closer look.

In the following example is a form for entering the user's height. It defaults to accepting a height in meters, but you can click the relevant button to change the form to accept feet and inches instead. The input for the height in meters accepts decimals to two places.

The HTML looks like this:

```html
<form>
  <div class="metersInputGroup">
    <label for="meters">Enter your height — meters:</label>
    <input
      id="meters"
      type="number"
      name="meters"
      step="0.01"
      min="0"
      placeholder="e.g. 1.78"
      required />
    <span class="validity"></span>
  </div>
  <div class="feetInputGroup">
    <span>Enter your height — </span>
    <label for="feet">feet:</label>
    <input id="feet" type="number" name="feet" min="0" step="1" />
    <span class="validity"></span>
    <label for="inches">inches:</label>
    <input id="inches" type="number" name="inches" min="0" max="11" step="1" />
    <span class="validity"></span>
  </div>
  <div>
    <input
      type="button"
      class="meters"
      value="Enter height in feet and inches" />
  </div>
  <div>
    <input type="submit" value="Submit form" />
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

You'll see that we are using many of the attributes we've already looked at in the article earlier on. Since we want to accept a meter value in centimeters, we've set the `step` value to `0.01`, so that values like _1.78_ are not seen as invalid. We've also provided a placeholder for that input.

We've hidden the feet and inches inputs initially using `style="display: none;"`, so that meters is the default entry type.

Now, onto the CSS. This looks very similar to the validation styling we saw before; nothing remarkable here.

```css
div {
  margin-bottom: 10px;
  position: relative;
}

input[type="number"] {
  width: 100px;
}

input + span {
  padding-right: 30px;
}

input:invalid + span::after {
  position: absolute;
  content: "✖";
  padding-left: 5px;
}

input:valid + span::after {
  position: absolute;
  content: "✓";
  padding-left: 5px;
}
```

And finally, the JavaScript:

```js
const metersInputGroup = document.querySelector(".metersInputGroup");
const feetInputGroup = document.querySelector(".feetInputGroup");
const metersInput = document.querySelector("#meters");
const feetInput = document.querySelector("#feet");
const inchesInput = document.querySelector("#inches");
const switchBtn = document.querySelector('input[type="button"]');

feetInputGroup.style.display = "none"; // Hide feet/inches inputs initially

switchBtn.addEventListener("click", () => {
  if (switchBtn.getAttribute("class") === "meters") {
    switchBtn.setAttribute("class", "feet");
    switchBtn.value = "Enter height in meters";

    metersInputGroup.style.display = "none";
    feetInputGroup.style.display = "block";

    feetInput.setAttribute("required", "");
    inchesInput.setAttribute("required", "");
    metersInput.removeAttribute("required");

    metersInput.value = "";
  } else {
    switchBtn.setAttribute("class", "meters");
    switchBtn.value = "Enter height in feet and inches";

    metersInputGroup.style.display = "block";
    feetInputGroup.style.display = "none";

    feetInput.removeAttribute("required");
    inchesInput.removeAttribute("required");
    metersInput.setAttribute("required", "");

    feetInput.value = "";
    inchesInput.value = "";
  }
});
```

After declaring a few variables, an event listener is added to the `button` to control the switching mechanism. This involves changing over the button's `class` and ``, and updating the display values of the two sets of inputs when the button is pressed.

(Note that we're not converting back and forth between meters and feet/inches here, which a real-life web application would probably do.)

> **Note:**
> When the user clicks the button, the `required` attribute(s) are removed from the input(s) we are hiding, and empty the `value` attribute(s). This is so the form can be submitted if both input sets aren't filled in. It also ensures that the form won't submit data that the user didn't mean to.
>
> If you didn't do this, you'd have to fill in both feet/inches **and** meters to submit the form!

## Technical summary

       | Value
       | A `Number` representing a number, or empty

       | Events
       |
        `change` and
        `input`

       | Supported common attributes
       |
         `autocomplete`,
         `list`,
         `placeholder`,
         `readonly`

       | IDL attributes
       |
        `list`,
        `value`,
        `valueAsNumber`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       |
        <code>spinbutton</code>

## See also

- HTML forms guide
- ``
- ``
