---
title: "`<input type=\"url\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="url">` HTML attribute value

`` elements of type **`url`** are used to let the user enter and edit a URL.

The input value is automatically validated to ensure that it's either empty or a properly-formatted URL before the form can be submitted. The `:valid` and `:invalid` CSS pseudo-classes are automatically applied as appropriate to visually denote whether the current value of the field is a valid URL or not.

```html
<label for="url">Enter an https:// URL:</label>
<input
  type="url"
  name="url"
  id="url"
  placeholder="https://example.com"
  pattern="https://.*"
  size="30"
  required />
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

The `` element's `value` attribute contains a string that is automatically validated as conforming to URL syntax. More specifically, there are two possible value formats that will pass <example-value>:

1. An empty string ("") indicates the user did not enter a value or that the value was removed.
2. A single properly-formed absolute URL. This doesn't necessarily mean the URL address exists, but it is at least formatted correctly. An entry matching `urlscheme://rest-of-url` can be valid, even if the `urlscheme` entered doesn't exist.

See Validation for details on how URLs are validated to ensure that they're formatted properly.

## Additional attributes

In addition to the global attributes, and the attributes that operate on all `` elements regardless of their type, `url` inputs support the following attributes.

> **Note:**
> The `autocorrect` global attribute can be added to url inputs, but the stored state is always `off`.

### list

The values of the list attribute is the `id` of a `<datalist>` element located in the same document. The `<datalist>` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the `type` are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

### maxlength

The maximum string length (measured in UTF-16 code units) that the user can enter into the `url` input. This must be an integer value of `0` or higher. If no `maxlength` is specified, or an invalid value is specified, the `url` input has no maximum length. This value must also be greater than or equal to the value of `minlength`.

The input will fail constraint validation if the length of the text value of the field is greater than `maxlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### minlength

The minimum string length (measured in UTF-16 code units) that the user can enter into the `url` input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified, the `url` input has no minimum length.

The input will fail constraint validation if the length of the text entered into the field is fewer than `minlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### pattern

The `pattern` attribute, when specified, is a regular expression that the input's `value` must match for the value to pass <example-value> validation. It must be a valid JavaScript regular expression, as used by the `RegExp` type, and as documented in our guide on regular expressions; the `'u'` flag is specified when compiling the regular expression so that the pattern is treated as a sequence of Unicode code points, instead of as ASCII. No forward slashes should be specified around the pattern text.

If the specified pattern is not specified or is invalid, no regular expression is applied and this attribute is ignored completely.

> **Note:**
> Use the `title` attribute to specify text that most browsers will display as a tooltip to explain what the requirements are to match the pattern. You should also include other explanatory text nearby.

See the section Pattern validation for details and an example.

### placeholder

The `placeholder` attribute is a string that provides a brief hint to the user as to what kind of information is expected in the field. It should be a word or short phrase that demonstrates the expected type of data, rather than an explanatory message. The text _must not_ include carriage returns or line feeds.

If the control's content has one directionality (LTR or RTL) but needs to present the placeholder in the opposite directionality, you can use Unicode bidirectional algorithm formatting characters to override directionality within the placeholder; see How to use Unicode controls for bidi text for more information.

> **Note:**
> Avoid using the `placeholder` attribute if you can. It is not as semantically useful as other ways to explain your form, and can cause unexpected technical issues with your content. See `` labels for more information.

### readonly

The `readonly` Boolean attribute, if present, means this field cannot be edited by the user. Its `value` can, however, still be changed by JavaScript code directly setting the `HTMLInputElement` `value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### size

The `size` attribute is a numeric value indicating how many characters wide the input field should be. The value must be a number greater than zero, and the default value is 20. Since character widths vary, this may or may not be exact and should not be relied upon to be so; the resulting input may be narrower or wider than the specified number of characters, depending on the characters and the font (`font` settings in use).

This does _not_ set a limit on how many characters the user can enter into the field. It only specifies approximately how many can be seen at a time. To set an upper limit on the length of the input data, use the `maxlength` attribute.

### spellcheck

The `spellcheck` global attribute is used to indicate whether to enable spell-checking for an element. It can be used on any editable content, but here we consider specifics related to the use of `spellcheck` on `` elements. The permitted values for `spellcheck` are:

- `false`
    Disable spell-checking for this element.
- `true`
    Enable spell-checking for this element.
- "" (empty string) or no value
    Follow the element's default behavior for spell-checking. This may be based upon a parent's `spellcheck` setting or other factors.

An input field can have spell-checking enabled if it doesn't have the readonly attribute set and is not disabled.

The value returned by reading `spellcheck` may not reflect the actual state of spell-checking within a control if the user agent's preferences override the setting.

## Using URL inputs

When you create a URL input with the proper `type` value, `url`, you get automatic validation that the entered text is at least in the correct form to potentially be a legitimate URL. This can help avoid cases in which the user mistypes their website's address, or provides an invalid one.

It's important, however, to note that this is not enough to ensure that the specified text is a URL which actually exists, corresponds to the user of the site, or is acceptable in any other way. It ensures that the value of the field is properly formatted to be a URL.

> **Note:**
> A user can tinker with your HTML behind the scenes, so your site _must not_ use this validation for any security purposes. You _must_ verify the URL on the server-side of any transaction in which the provided text may have any security implications of any kind.

### A basic URL input

This element is implemented as a standard text input field with basic <example-value> features. In its most basic form, a URL input can be implemented like this:

```html
<input id="myURL" name="myURL" type="url" />
```

Notice that it's considered valid when empty and when a single validly-formatted URL address is entered, but is otherwise not considered valid. By adding the `required` attribute, only properly-formed URLs are allowed; the input is no longer considered valid when empty.

There is nothing magical going on here. Submitting this form would cause the following data to be sent to the server: `myURL=http%3A%2F%2Fwww.example.com`. Note how characters are escaped as necessary.

### Placeholders

Sometimes it's helpful to offer an in-context hint as to what form the input data should take. This can be especially important if the page design doesn't offer descriptive labels for each ``. This is where **placeholders** come in. A placeholder is a value that demonstrates the form the `value` should take by presenting an example of a valid value, which is displayed inside the edit box when the element's `value` is "". Once data is entered into the box, the placeholder disappears; if the box is emptied, the placeholder reappears.

Here, we have a `url` input with the placeholder `http://www.example.com`. Note how the placeholder disappears and reappears as you manipulate the contents of the edit field.

```html
<input
  id="myURL"
  name="myURL"
  type="url"
  placeholder="http://www.example.com" />
```

### Controlling the input size

You can control both the physical length of the input box and the minimum and maximum lengths allowed for the input text.

#### Physical input element size

The physical size of the input box can be controlled using the `size` attribute. With it, you can specify the number of characters the input box can display at a time. In this example, for instance, the `url` edit box is 30 characters wide:

```html
<input id="myURL" name="myURL" type="url" size="30" />
```

#### Element value length

The `size` is separate from the length limitation on the entered URL itself. You can specify a minimum length, in characters, for the entered URL using the `minlength` attribute; similarly, use `maxlength` to set the maximum length of the entered URL. If `maxLength` exceeds `size`, the input box's contents will scroll as needed to show the current selection or insertion point as the content is manipulated.

The example below creates a 30-character wide URL address entry box, requiring that the contents be no shorter than 10 characters and no longer than 80 characters.

```html
<input
  id="myURL"
  name="myURL"
  type="url"
  size="30"
  minlength="10"
  maxlength="80" />
```

> **Note:**
> These attributes also affect validation; a value shorter or longer than the specified minimum/maximum lengths will be classified as invalid; in addition most browsers will refuse to let the user enter a value longer than the specified maximum length.

### Providing default options

#### Providing a single default using the value attribute

As always, you can provide a default value for a `url` input box by setting its `value` attribute:

```html
<input id="myURL" name="myURL" type="url" value="http://www.example.com" />
```

#### Offering suggested values

Taking it a step further, you can provide a list of default options from which the user can select by specifying the `list` attribute. This doesn't limit the user to those options, but does allow them to select commonly-used URLs more quickly. This also offers hints to `autocomplete`. The `list` attribute specifies the ID of a `<datalist>`, which in turn contains one `<option>` element per suggested value; each `option`'s `value` is the corresponding suggested value for the URL entry box.

```html
<input id="myURL" name="myURL" type="url" list="defaultURLs" />

<datalist id="defaultURLs">
  <option value="https://developer.mozilla.org/"></option>
  <option value="http://www.google.com/"></option>
  <option value="http://www.microsoft.com/"></option>
  <option value="https://www.mozilla.org/"></option>
  <option value="http://w3.org/"></option>
</datalist>
```

With the `<datalist>` element and its `<option>`s in place, the browser will offer the specified values as potential values for the URL; this is typically presented as a popup or drop-down menu containing the suggestions. While the specific user experience may vary from one browser to another, typically clicking in the edit box presents a drop-down of the suggested URLs. Then, as the user types, the list is adjusted to show only matching values. Each typed character narrows down the list until the user makes a selection or types a custom value.

#### Using labels for suggested values

You can opt to include the `label` attribute on one or all of your `<option>` elements to provide textual labels. Some browsers may display only the labels, while others may display both the label and the URL.

```html
<input id="myURL" name="myURL" type="url" list="defaultURLs" />

<datalist id="defaultURLs">
  <option value="https://developer.mozilla.org/" label="MDN Web Docs"></option>
  <option value="http://www.google.com/" label="Google"></option>
  <option value="http://www.microsoft.com/" label="Microsoft"></option>
  <option value="https://www.mozilla.org/" label="Mozilla"></option>
  <option value="http://w3.org/" label="W3C"></option>
</datalist>
```
