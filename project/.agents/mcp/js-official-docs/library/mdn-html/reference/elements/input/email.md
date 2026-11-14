---
title: "`<input type=\"email\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/email/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="email">` HTML attribute value

`` elements of type **`email`** are used to let the user enter and edit an email address, or, if the `multiple` attribute is specified, a list of email addresses.

The input value is automatically validated to ensure that it's either empty or a properly-formatted email address (or list of addresses) before the form can be submitted. The `:valid` and `:invalid` CSS pseudo-classes are automatically applied as appropriate to visually denote whether the current value of the field is a valid email address or not.

```html
<label for="email">Enter your example.com email:</label>

<input type="email" id="email" pattern=".+@example\.com" size="30" required />
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

The `` element's `value` attribute contains a string which is automatically validated as conforming to email syntax. More specifically, there are three possible value formats that will pass <example-value>:

1. An empty string ("") indicating that the user did not enter a value or that the value was removed.
2. A single properly-formed email address. This doesn't necessarily mean the email address exists, but it is at least formatted correctly. This means `username@domain` or `user@example.com`. There's more to it than that, of course; see Validation for a regular expression that matches the email address validation algorithm.
3. If and only if the `multiple` attribute is specified, the value can be a list of properly-formed comma-separated email addresses. Any trailing and leading whitespace is removed from each address in the list.

See Validation for details on how email addresses are validated to ensure that they're formatted properly.

## Additional attributes

In addition to the global attributes, and the attributes that operate on all `` elements regardless of their type, `email` inputs support the following attributes.

> **Note:**
> The `autocorrect` global attribute can be added to email inputs, but the stored state is always `off`.

### list

The values of the list attribute is the `id` of a `<datalist>` element located in the same document. The `<datalist>` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the `type` are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

### maxlength

The maximum string length (measured in UTF-16 code units) that the user can enter into the `email` input. This must be an integer value of 0 or higher. If no `maxlength` is specified, or an invalid value is specified, the `email` input has no maximum length. This value must also be greater than or equal to the value of `minlength`.

The input will fail constraint validation if the length of the text value of the field is greater than `maxlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### minlength

The minimum string length (measured in UTF-16 code units) that the user can enter into the `email` input. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified, the `email` input has no minimum length.

The input will fail constraint validation if the length of the text entered into the field is fewer than `minlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### multiple

A Boolean attribute which, if present, indicates that the user can enter a list of multiple email addresses, separated by commas and, optionally, whitespace characters. See Allowing multiple email addresses for an example, or HTML attribute: multiple for more details.

> **Note:**
> Normally, if you specify the `required` attribute, the user must enter a valid email address for the field to be considered valid. However, if you add the `multiple` attribute, a list of zero email addresses (an empty string, or one which is entirely whitespace) is a valid value. In other words, the user does not have to enter even one email address when `multiple` is specified, regardless of the value of `required`.

### pattern

The `pattern` attribute, when specified, is a regular expression that the input's `value` must match for the value to pass <example-value> validation. It must be a valid JavaScript regular expression, as used by the `RegExp` type, and as documented in our guide on regular expressions; the `'u'` flag is specified when compiling the regular expression so that the pattern is treated as a sequence of Unicode code points, instead of as ASCII. No forward slashes should be specified around the pattern text.

If the specified pattern is not specified or is invalid, no regular expression is applied and this attribute is ignored completely.

> **Note:**
> Use the `title` attribute to specify text that most browsers will display as a tooltip to explain what the requirements are to match the pattern. You should also include other explanatory text nearby.

See the section Pattern validation for details and an example.

### `placeholder`

The `placeholder` attribute is a string that provides a brief hint to the user as to what kind of information is expected in the field. It should be a word or short phrase that demonstrates the expected type of data, rather than an explanatory message. The text _must not_ include carriage returns or line feeds.

If the control's content has one directionality (LTR or RTL) but needs to present the placeholder in the opposite directionality, you can use Unicode bidirectional algorithm formatting characters to override directionality within the placeholder; see How to use Unicode controls for bidi text for more information.

> **Note:**
> Avoid using the `placeholder` attribute if you can. It is not as semantically useful as other ways to explain your form, and can cause unexpected technical issues with your content. See `` labels for more information.

### `readonly`

A Boolean attribute which, if present, means this field cannot be edited by the user. Its `value` can, however, still be changed by JavaScript code directly setting the `HTMLInputElement` `value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### `size`

The `size` attribute is a numeric value indicating how many characters wide the input field should be. The value must be a number greater than zero, and the default value is 20. Since character widths vary, this may or may not be exact and should not be relied upon to be so; the resulting input may be narrower or wider than the specified number of characters, depending on the characters and the font (`font` settings in use).

This does _not_ set a limit on how many characters the user can enter into the field. It only specifies approximately how many can be seen at a time. To set an upper limit on the length of the input data, use the `maxlength` attribute.

## Using email inputs

Email addresses are among the most frequently-inputted textual data forms on the web; they're used when logging into websites, when requesting information, to allow order confirmation, for webmail, and so forth. As such, the `email` input type can make your job as a web developer much easier since it can help simplify your work when building the user interface and logic for email addresses. When you create an email input with the proper `type` value, `email`, you get automatic validation that the entered text is at least in the correct form to potentially be a legitimate email address. This can help avoid cases in which the user mistypes their address, or provides an invalid address.

It's important, however, to note that this is not enough to ensure that the specified text is an email address which actually exists, corresponds to the user of the site, or is acceptable in any other way. It ensures that the value of the field is properly formatted to be an email address.

> **Note:**
> It's also crucial to remember that a user can tinker with your HTML behind the scenes, so your site _must not_ use this validation for any security purposes. You _must_ verify the email address on the server side of any transaction in which the provided text may have any security implications of any kind.

### A basic email input

Currently, all browsers which implement this element implement it as a standard text input field with basic <example-value> features. The specification does, however, allow browsers latitude on this. For example, the element could be integrated with the user's device's built-in address book to allow picking email addresses from that list. In its most basic form, an `email` input can be implemented like this:

```html
<input id="emailAddress" type="email" />
```

Notice that it's considered valid when empty and when a single validly-formatted email address is entered, but is otherwise not considered valid. By adding the `required` attribute, only validly-formed email addresses are allowed; the input is no longer considered valid when empty.

### Allowing multiple email addresses

By adding the `multiple` Boolean attribute, the input can be configured to accept multiple email addresses.

```html
<input id="emailAddress" type="email" multiple />
```

The input is now considered valid when a single email address is entered, or when any number of email addresses separated by commas and, optionally, some number of whitespace characters are present.

> **Note:**
> When `multiple` is used, the value _is_ allowed to be empty.

Some examples of valid strings when `multiple` is specified:

- `""`
- `"me@example"`
- `"user@example.com"`
- `"user@example.com,user@example.com"`
- `"user@example.com, user@example.com"`
- `"user@example.com,user@example.com, user@example.com"`

Some examples of invalid strings:

- `","`
- `"me"`
- `"user@example.com user@example.com"`

### Placeholders

Sometimes it's helpful to offer an in-context hint as to what form the input data should take. This can be especially important if the page design doesn't offer descriptive labels for each ``. This is where **placeholders** come in. A placeholder is a value that demonstrates the form the `value` should take by presenting an example of a valid value, which is displayed inside the edit box when the element's `value` is "". Once data is entered into the box, the placeholder disappears; if the box is emptied, the placeholder reappears.

Here, we have an `email` input with the placeholder `user@example.com`. Note how the placeholder disappears and reappears as you manipulate the contents of the edit field.

```html
<input type="email" placeholder="user@example.com" />
```

### Controlling the input size

You can control not only the physical length of the input box, but also the minimum and maximum lengths allowed for the input text itself.

#### Physical input element size

The physical size of the input box can be controlled using the `size` attribute. With it, you can specify the number of characters the input box can display at a time. In this example the `email` edit box is 15 characters wide:

```html
<input type="email" size="15" />
```

#### Element value length

The `size` is separate from the length limitation on the entered email address itself so that you can have fields fit in a small space while still allowing longer email address strings to be entered. You can specify a minimum length, in characters, for the entered email address using the `minlength` attribute; similarly, use `maxlength` to set the maximum length of the entered email address.

The example below creates a 32 character-wide email address entry box, requiring that the contents be no shorter than 3 characters and no longer than 64 characters.

```html
<input type="email" size="32" minlength="3" maxlength="64" />
```

### Providing default options

#### Providing a single default using the value attribute

As always, you can provide a default value for an `email` input box by setting its `value` attribute:

```html
<input type="email" value="user@example.com" />
```

#### Offering suggested values

Taking it a step further, you can provide a list of default options from which the user can select by specifying the `list` attribute. This doesn't limit the user to those options, but does allow them to select commonly-used email addresses more quickly. This also offers hints to `autocomplete`. The `list` attribute specifies the ID of a `<datalist>`, which in turn contains one `<option>` element per suggested value; each `option`'s `value` is the corresponding suggested value for the email entry box.

```html
<input type="email" size="40" list="defaultEmails" />

<datalist id="defaultEmails">
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
</datalist>
```

With the `<datalist>` element and its `<option>`s in place, the browser will offer the specified values as potential values for the email address; this is typically presented as a popup or drop-down menu containing the suggestions. While the specific user experience may vary from one browser to another, typically clicking in the edit box presents a drop-down of the suggested email addresses. Then, as the user types, the list is filtered to show only matching values. Each typed character narrows down the list until the user makes a selection or types a custom value.
