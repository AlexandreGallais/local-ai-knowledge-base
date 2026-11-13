---
title: "`<input type=\"url\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/url/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="url">` HTML attribute value (part 2 of 2)

## Validation

There are two levels of content validation available for `url` inputs. First, there's the standard level of validation offered to all ``s, which automatically ensures that the contents meet the requirements to be a valid URL. But there's also the option to add additional filtering to ensure that your own specialized needs are met, if you have any.

> **Warning:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format. It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it entirely. It's also possible for someone to bypass your HTML entirely and submit the data directly to your server. If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data (or data which is too large, is of the wrong type, and so forth) is entered into your database.

### Basic <example-value>

Browsers that support the `url` input type automatically provide validation to ensure that only text that matches the standard format for URLs is entered into the input box.

The syntax of a URL is fairly intricate. It's defined by WHATWG's URL Living Standard and is described for newcomers in our article What is a URL?

### Making a URL required

As mentioned earlier, to make a URL entry required before the form can be submitted (you can't leave the field blank), you just need to include the `required` attribute on the input.

### Pattern validation

If you need the entered URL to be restricted further than just "any string that looks like a URL," you can use the `pattern` attribute to specify a regular expression the value must match for the value to be valid.

## Examples

### URL validation

In this example, we make sure that a URL is filled in using the `required` attribute and that the URL is something on `mozilla.org` using the `pattern` attribute for illustration.

#### HTML

In the `url` input, we set `pattern` to `".*\.mozilla\.org.*"`. This regular expression validates a string that has any number of characters, followed by ".mozilla.org", followed by any number of characters. Because the browser runs both the standard URL filter _and_ our custom pattern against the specified text, we wind up with a validation that says "make sure this is a valid URL, and also contains `.mozilla.org`."

Note that a strict pattern like `https://developer\.mozilla\.org.*` would be more robust, but that would make the `type="url"` attribute redundant in this case.

The `title` attribute also describes the `pattern` for users with assistive technologies.

```html
<form>
  <label for="myURL">
    Enter a url from this site:
    <input
      id="myURL"
      name="myURL"
      type="url"
      required
      pattern=".*\.mozilla\.org.*"
      title="URL should include mozilla.org" />
    <span class="validity"></span>
  </label>
  <button>Submit</button>
</form>
```

```js
document.querySelectorAll("form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
});
```

#### CSS

The CSS gives visual clues to show the user if the content is `:valid` or `:invalid` by adding an appropriate `content` property and includes alternative text for users with assistive technologies.

```css
input:focus:invalid {
  outline: 2px solid red;
}

input:focus:valid {
  outline: 2px solid green;
}

input + span {
  padding: 0 0.3rem;
}

input:invalid + span::after {
  content: "✖" / "Content is not valid";
  color: red;
}

input:valid + span::after {
  content: "✓" / "Content is valid";
  color: green;
}
```

#### Result

Copy this page's url and paste it in the input field and you will see a green outline and green tick. Enter any other URL that doesn't contain **mozilla.org** or an invalid URL and you will see a red outline and red cross.

Check the Pattern validation and Using URL inputs sections for other examples.

## Technical summary

       | Value
       | A string representing a URL, or empty

       | Events
       |
        `change` and
        `input`

       | Supported Common Attributes
       |
        `autocomplete`,
        `list`,
        `maxlength`,
        `minlength`,
        `pattern`,
        `placeholder`,
        `readonly`,
        `required` and
        `size`

       | IDL attributes
       |
        `list`, `value`, `selectionEnd`,
        `selectionDirection`

       | DOM interface
       | `HTMLInputElement`

       | Implicit ARIA Role
       |
        with no `list` attribute:
        <code>textbox</code>
        with `list` attribute: <code>combobox</code>

## See also

- HTML forms guide
- ``
- ``
- ``
