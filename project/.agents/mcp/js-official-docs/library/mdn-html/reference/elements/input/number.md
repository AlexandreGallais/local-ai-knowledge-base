---
title: "`<input type=\"number\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/number/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="number">` HTML attribute value

`` elements of type **`number`** are used to let the user enter a number. They include built-in validation to reject non-numerical entries.

The browser may opt to provide stepper arrows to let the user increase and decrease the value using their mouse or by tapping with a fingertip.

On browsers that don't support inputs of type `number`, a `number` input falls back to type `text`.

```html
<label for="tentacles">Number of tentacles (10-100):</label>

<input type="number" id="tentacles" name="tentacles" min="10" max="100" />
```

```css
label {
  display: block;
  font:
    1rem "Fira Sans",
    sans-serif;
}

input,
label {
  margin: 0.4rem 0;
}
```

## Value

A number representing the value of the number entered into the input. You can set a default value for the input by including a number inside the `value` attribute, like so:

```html
<input id="number" type="number" value="42" />
```

## Additional attributes

In addition to the attributes commonly supported by all `` types, inputs of type `number` support these attributes.

### `list`

The values of the list attribute is the `id` of a `<datalist>` element located in the same document. The `<datalist>` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the `type` are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

### `max`

The maximum value to accept for this input. If the `value` entered into the element exceeds this, the element fails constraint validation. If the value of the `max` attribute isn't a number, then the element has no maximum value.

This value must be greater than or equal to the value of the `min` attribute.

### `min`

The minimum value to accept for this input. If the `value` of the element is less than this, the element fails constraint validation. If a value is specified for `min` that isn't a valid number, the input has no minimum value.

This value must be less than or equal to the value of the `max` attribute.

### `placeholder`

The `placeholder` attribute is a string that provides a brief hint to the user as to what kind of information is expected in the field. It should be a word or short phrase that demonstrates the expected type of data, rather than an explanatory message. The text _must not_ include carriage returns or line feeds.

If the control's content has one directionality (LTR or RTL) but needs to present the placeholder in the opposite directionality, you can use Unicode bidirectional algorithm formatting characters to override directionality within the placeholder; see How to use Unicode controls for bidi text for more information.

> **Note:**
> Avoid using the `placeholder` attribute if you can. It is not as semantically useful as other ways to explain your form, and can cause unexpected technical issues with your content. See `` labels for more information.

### `readonly`

A Boolean attribute which, if present, means this field cannot be edited by the user. Its `value` can, however, still be changed by JavaScript code directly setting the `HTMLInputElement` `value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### `step`

The `step` attribute is a number that specifies the granularity that the value must adhere to, or the special value `any`, which is described below. Only values which are a whole number of steps from the step base are valid. The step base is `min` if specified, `value` otherwise, or `0` if neither is provided.

The default stepping value for `number` inputs is `1`, allowing only integers to be entered—_unless_ the stepping base is not an integer.

A string value of `any` means that no stepping is implied, and any value is allowed (barring other constraints, such as `min` and `max`).

> **Note:**
> When the data entered by the user doesn't adhere to the stepping configuration, the user agent may round to the nearest valid value, preferring numbers in the positive direction when there are two equally close options.

## Using number inputs

The `number` input type should only be used for incremental numbers, especially when spinbutton incrementing and decrementing are helpful to user experience. The `number` input type is not appropriate for values that happen to only consist of numbers but aren't strictly speaking a number, such as postal codes in many countries or credit card numbers. For non-numeric inputs, consider using a different input type, such as `` or other `` type with the `inputmode` attribute:

```html
<input type="text" inputmode="numeric" pattern="\d*" />
```

`` elements can help simplify your work when building the user interface and logic for entering numbers into a form. When you create a number input with the proper `type` value, `number`, you get automatic validation that the entered text is a number, and usually a set of up and down buttons to step the value up and down.

> **Warning:**
> Logically, you should not be able to enter characters inside a number input other than numbers. Some browsers allow invalid characters, others do not; see Firefox bug 1398528.

> **Note:**
> A user can tinker with your HTML behind the scenes, so your site _must not_ use client-side validation for security purposes. You _must_ verify on the server side any transaction in which the provided value may have security implications of any kind.

Mobile browsers further help with the user experience by showing a special keyboard more suited for entering numbers when the user tries to enter a value.

### A basic <example-value> input

In its most basic form, a number input can be implemented like this:

```html
<label for="ticketNum">Number of tickets you would like to buy:</label>
<input id="ticketNum" type="number" name="ticketNum" value="0" />
```

A number input is considered valid when empty and when a single number is entered, but is otherwise invalid. If the `required` attribute is used, the input is no longer considered valid when empty.

> **Note:**
> Any number is an acceptable value, as long as it is a valid floating point number (that is, not NaN or Infinity).

### Placeholders

Sometimes it's helpful to offer an in-context hint as to what form the input data should take. This can be especially important if the page design doesn't offer descriptive labels for each ``. This is where **placeholders** come in. A placeholder is a value most commonly used to provide a hint as to the format the input should take `value`. It is displayed inside the edit box when the element's `value` is `""`. Once data is entered into the box, the placeholder disappears; if the box is emptied, the placeholder reappears.

Here, we have a `number` input with the placeholder "Multiple of 10". Note how the placeholder disappears and reappears as you manipulate the contents of the edit field.

```html
<input type="number" placeholder="Multiple of 10" />
```

### Controlling step size

By default, the up and down buttons provided for you to step the number up and down will step the value up and down by 1. You can change this by providing a `step` attribute, which takes as its value a number specifying the step amount. Our above example contains a placeholder saying that the value should be a multiple of 10, so it makes sense to add a `step` value of `10`:

```html
<input type="number" placeholder="multiple of 10" step="10" />
```

In this example, you should find that the up and down step arrows will increase and decrease the value by 10 each time, not 1. You can still manually enter a number that's not a multiple of 10, but it will be considered invalid.

### Specifying minimum and maximum values

You can use the `min` and `max` attributes to specify a minimum and maximum value that the field can have. For example, let's give our example a minimum of `0`, and a maximum of `100`:

```html
<input type="number" placeholder="multiple of 10" step="10" min="0" max="100" />
```

In this updated version, you should find that the up and down step buttons will not allow you to go below 0 or above 100. You can still manually enter a number outside these bounds, but it will be considered invalid.

### Allowing decimal values

One issue with number inputs is that their step size is 1 by default. If you try to enter a number with a decimal value that's not a whole number (such as "1.1"), it will be considered invalid. Note that values like "1.0" are considered valid because they are numerically equivalent to whole numbers. If you want to enter values with fractions, you'll need to reflect this in the `step` value (e.g., `step="0.01"` to allow decimals to two decimal places). Here's a basic <example-value>:

```html
<input type="number" placeholder="1.0" step="0.01" min="0" max="10" />
```

See that this example allows any value between `0.0` and `10.0`, with decimals to two places. For example, "9.52" is valid, but "9.521" is not.

If you want to allow arbitrary decimal values, you can set the `step` value to `"any"`.

### Controlling input size

`` elements of type `number` don't support form sizing attributes such as `size`. You'll have to resort to CSS to change the size of these controls.

For example, to adjust the width of the input to be only as wide as is needed to enter a three-digit number, we can change our HTML to include an `id` and to shorten our placeholder since the field will be too narrow for the text we have been using so far:

```html
<input
  type="number"
  placeholder="x10"
  step="10"
  min="0"
  max="100"
  id="number" />
```

Then we add some CSS to narrow the width of the element with the `id` selector `#number`:

```css
#number {
  width: 3em;
}
```

The result looks like this:

### Offering suggested values

You can provide a list of default options from which the user can select by specifying the `list` attribute, which contains as its value the `id` of a `<datalist>`, which in turn contains one `<option>` element per suggested value. Each `option`'s `value` is the corresponding suggested value for the number entry box.

```html
<input id="ticketNum" type="number" name="ticketNum" list="defaultNumbers" />
<span class="validity"></span>

<datalist id="defaultNumbers">
  <option value="10045678"></option>
  <option value="103421"></option>
  <option value="11111111"></option>
  <option value="12345678"></option>
  <option value="12999922"></option>
</datalist>
```

## Validation

We have already mentioned a number of validation features of `number` inputs, but let's review them now:

- `` elements automatically invalidate any entry that isn't a number (or empty, unless `required` is specified).
- You can use the `required` attribute to make an empty entry invalid. (In other words, the input _must_ be filled in.)
- You can use the `step` attribute to constrain valid values to a certain set of steps (e.g., multiples of 10).
- You can use the `min` and `max` attributes to constrain valid values to lower and upper bounds.

The following example exhibits all of the above features, as well as using some CSS to display valid and invalid icons, depending on the `input`'s value:

```html
<form>
  <div>
    <label for="balloons">Number of balloons to order (multiples of 10):</label>
    <input
      id="balloons"
      type="number"
      name="balloons"
      step="10"
      min="0"
      max="100"
      required />
    <span class="validity"></span>
  </div>
  <div>
    <input type="submit" />
  </div>
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

Try submitting the form with different invalid values entered — e.g., no value; a value below 0 or above 100; a value that is not a multiple of 10; or a non-numerical value — and see how the error messages the browser gives you differ with different ones.

The CSS applied to this example is as follows:

```css
div {
  margin-bottom: 10px;
}

input:invalid + span::after {
  content: "✖";
  padding-left: 5px;
}

input:valid + span::after {
  content: "✓";
  padding-left: 5px;
}
```

Here we use the `:invalid` and `:valid` pseudo classes to display an appropriate invalid or valid icon as generated content on the adjacent `` element, as a visual indicator of validity.

We put it on a separate `` element for added flexibility. Some browsers don't display generated content very effectively on some types of form inputs. (Read, for example, the section on `` validation.)

> **Warning:**
> HTML form validation is _not_ a substitute for server-side scripts that ensure that the entered data is in the proper format!
>
> It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely. It's also possible for someone to bypass your HTML and submit the data directly to your server.
>
> If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data is submitted (or data which is too large, is of the wrong type, and so forth).

### Pattern validation

`` elements do not support use of the `pattern` attribute for making entered values conform to a specific regex pattern.

The rationale for this is that number inputs won't be valid if they contain anything except numbers, and you can constrain the minimum and maximum number of valid digits using the `min` and `max` attributes (as explained above).

## Accessibility

The implicit role for the `` element is `spinbutton`. If spinbutton is not an important feature for your form control, consider _not_ using `type="number"`. Instead, use `inputmode="numeric"` along with a `pattern` attribute that limits the characters to numbers and associated characters. With ``, there is a risk of users accidentally incrementing a number when they're trying to do something else. Additionally, if users try to enter something that's not a number, there's no explicit feedback about what they're doing wrong.

Also consider using the `autocomplete` attribute to help users complete forms more quickly and with fewer chances of errors. For example, to enable autofill on a zip code field, set `autocomplete="postal-code"`.
