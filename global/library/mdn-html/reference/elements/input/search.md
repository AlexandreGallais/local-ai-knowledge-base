---
title: "`<input type=\"search\">` HTML attribute value (part 1 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/search/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="search">` HTML attribute value

`` elements of type **`search`** are text fields designed for the user to enter search queries into. These are functionally identical to `text` inputs, but may be styled differently by the user agent.

```html
<label for="site-search">Search the site:</label>
<input type="search" id="site-search" name="q" />

<button>Search</button>
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

The `value` attribute contains a string representing the value contained in the search field. You can retrieve this using the `HTMLInputElement.value` property in JavaScript.

```js
searchTerms = mySearch.value;
```

If no validation constraints are in place for the input (see Validation for more details), the value can be any text string or an empty string (`""`).

## Additional attributes

In addition to the global attributes and the attributes that operate on all `` elements regardless of their type, search field inputs support the following attributes.

### list

The values of the list attribute is the `id` of a `<datalist>` element located in the same document. The `<datalist>` provides a list of predefined values to suggest to the user for this input. Any values in the list that are not compatible with the `type` are not included in the suggested options. The values provided are suggestions, not requirements: users can select from this predefined list or provide a different value.

### maxlength

The maximum string length (measured in UTF-16 code units) that the user can enter into the search field. This must be an integer value of 0 or higher. If no `maxlength` is specified, or an invalid value is specified, the search field has no maximum length. This value must also be greater than or equal to the value of `minlength`.

The input will fail constraint validation if the length of the text entered into the field is greater than `maxlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### minlength

The minimum string length (measured in UTF-16 code units) that the user can enter into the search field. This must be a non-negative integer value smaller than or equal to the value specified by `maxlength`. If no `minlength` is specified, or an invalid value is specified, the search input has no minimum length.

The search field will fail constraint validation if the length of the text entered into the field is fewer than `minlength` UTF-16 code units long. Constraint validation is only applied when the value is changed by the user.

### pattern

The `pattern` attribute, when specified, is a regular expression that the input's `value` must match for the value to pass <example-value> validation. It must be a valid JavaScript regular expression, as used by the `RegExp` type, and as documented in our guide on regular expressions; the `'u'` flag is specified when compiling the regular expression so that the pattern is treated as a sequence of Unicode code points, instead of as ASCII. No forward slashes should be specified around the pattern text.

If the specified pattern is not specified or is invalid, no regular expression is applied and this attribute is ignored completely.

> **Note:**
> Use the `title` attribute to specify text that most browsers will display as a tooltip to explain what the requirements are to match the pattern. You should also include other explanatory text nearby.

See the section Specifying a pattern for details and an example.

### placeholder

The `placeholder` attribute is a string that provides a brief hint to the user as to what kind of information is expected in the field. It should be a word or short phrase that demonstrates the expected type of data, rather than an explanatory message. The text _must not_ include carriage returns or line feeds.

If the control's content has one directionality (LTR or RTL) but needs to present the placeholder in the opposite directionality, you can use Unicode bidirectional algorithm formatting characters to override directionality within the placeholder; see How to use Unicode controls for bidi text for more information.

> **Note:**
> Avoid using the `placeholder` attribute if you can. It is not as semantically useful as other ways to explain your form, and can cause unexpected technical issues with your content. See `` labels for more information.

### readonly

A Boolean attribute which, if present, means this field cannot be edited by the user. Its `value` can, however, still be changed by JavaScript code directly setting the `HTMLInputElement` `value` property.

> **Note:**
> Because a read-only field cannot have a value, `required` does not have any effect on inputs with the `readonly` attribute also specified.

### size

The `size` attribute is a numeric value indicating how many characters wide the input field should be. The value must be a number greater than zero, and the default value is 20. Since character widths vary, this may or may not be exact and should not be relied upon to be so; the resulting input may be narrower or wider than the specified number of characters, depending on the characters and the font (`font` settings in use).

This does _not_ set a limit on how many characters the user can enter into the field. It only specifies approximately how many can be seen at a time. To set an upper limit on the length of the input data, use the `maxlength` attribute.

### spellcheck

`spellcheck` is a global attribute that is used to indicate whether to enable spell-checking for an element. It can be used on any editable content, but here we consider specifics related to the use of `spellcheck` on `` elements. The permitted values for `spellcheck` are:

- `false`
    Disable spell-checking for this element.
- `true`
    Enable spell-checking for this element.
- "" (empty string) or no value
    Follow the element's default behavior for spell-checking. This may be based upon a parent's `spellcheck` setting or other factors.

An input field can have spell-checking enabled if it doesn't have the readonly attribute set and is not disabled.

The value returned by reading `spellcheck` may not reflect the actual state of spell-checking within a control, if the user agent's preferences override the setting.

## Non-standard attributes

The following non-standard attributes are available to search input fields.
Avoid using them where possible.

### incremental

The Boolean attribute `incremental` is a WebKit and Blink extension (so supported by Safari, Opera, Chrome, etc.) which, if present, tells the user agent to process the input as a live search. As the user edits the value of the field, the user agent sends `search` events to the `HTMLInputElement` object representing the search box. This allows your code to update the search results in real time as the user edits the search.

If `incremental` is not specified, the `search` event is only sent when the user explicitly initiates a search (such as by pressing the `Enter` or `Return` key while editing the field).

The `search` event is rate-limited so that it is not sent more frequently than an implementation-defined interval.

### results

The `results` attribute—supported only by Safari—is a numeric value that lets you override the maximum number of entries to be displayed in the `` element's natively-provided drop-down menu of previous search queries.

The value must be a non-negative decimal number. If not provided, or an invalid value is given, the browser's default maximum number of entries is used.

## Using search inputs

`` elements of type `search` are very similar to those of type `text`, except that they are specifically intended for handling search terms. They are basically equivalent in behavior, but user agents may choose to style them differently by default (and, of course, sites may use stylesheets to apply custom styles to them).

### Basic <example-value>

```html
<input type="search" id="mySearch" name="q" />
```

This renders like so:

`q` is the most common `name` given to search inputs, although it's not mandatory. If this input is included in a form and submitted, the data name/value pair sent to the server will be `q=searchTerm`.

> **Note:**
> You must remember to set a `name` for your input, otherwise nothing will be submitted.

### Differences between search and text types

The main basic <example-value> come in the way browsers handle them. The first thing to note is that some browsers show a cross icon that can be clicked on to remove the search term instantly if desired, in Chrome this action is also triggered when pressing escape. The following screenshot comes from Chrome:

In addition, modern browsers also tend to automatically store search terms previously entered across domains, which then come up as autocomplete options when subsequent searches are performed in search inputs on that domain. This helps users who tend to do searches on the same or similar search queries over time. This screenshot is from Firefox:

At this point, let's look at some useful techniques you can apply to your search forms.

### Setting placeholders

You can provide a useful placeholder inside your search input that could give a hint on what to do using the `placeholder` attribute. Look at the following example:

```html
<input type="search" id="mySearch" name="q" placeholder="Search the site…" />
```

You can see how the placeholder is rendered below:

### Search form labels and accessibility

One problem with search forms is their accessibility; a common design practice is not to provide a label for the search field (although there might be a magnifying glass icon or similar), as the purpose of a search form is normally fairly obvious for sighted users due to placement (this example shows a typical visual pattern).

This could, however, cause confusion for screen reader users, as they will not receive any verbal indication of what the search input is. One way around this that won't impact your visual design is to use landmark elements.

- Wrap the whole search functionality in a `<search>` element, which creates a landmark region that assistive technologies can announce and quickly navigate to. If your `` is already in a `<form>`, you can alternatively add `role="search"` to the `<form>` element, which also makes the `<form>` a search landmark. The `<search>` element uses native HTML semantics, while `role="search"` has more support and may be terser to type if you already have a `<form>` wrapper.
- If that isn't enough, you can use an `aria-label` attribute on the `` itself. This should be a descriptive text label that will be read out by the screen reader; it's used as a non-visual equivalent to ``.

Let's have a look at a minimal example:

```html
<search>
  <input
    type="search"
    id="mySearch"
    name="q"
    placeholder="Search the site…"
    aria-label="Search through site content" />
</search>
```

You can see how this is rendered below:

There is no visual difference from the previous example, but screen reader users have way more information available to them.

> **Note:**
> See Signposts/Landmarks for more information about such accessibility features.

### Physical input element size

The physical size of the input box can be controlled using the `size` attribute. With it, you can specify the number of characters the input box can display at a time. In this example, for instance, the search box is 30 characters wide:

```html
<input
  type="search"
  id="mySearch"
  name="q"
  placeholder="Search the site…"
  size="30" />
```

The result is this wider input box:
