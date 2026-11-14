---
title: "`<input type=\"email\">` HTML attribute value (part 2 of 2)"
tool: "mdn-html"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/html/reference/elements/input/email/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# `<input type="email">` HTML attribute value (part 2 of 2)

## Validation

There are two levels of content validation available for `email` inputs. First, there's the standard level of validation offered to all ``s, which automatically ensures that the contents meet the requirements to be a valid email address. But there's also the option to add additional filtering to ensure that your own specialized needs are met, if you have any.

> **Warning:**
> HTML form validation is _not_ a substitute for scripts that ensure that the entered data is in the proper format. It's far too easy for someone to make adjustments to the HTML that allow them to bypass the validation, or to remove it completely. It's also possible for someone to bypass your HTML entirely and submit the data directly to your server. If your server-side code fails to validate the data it receives, disaster could strike when improperly-formatted data (or data which is too large, is of the wrong type, and so forth) is entered into your database.

### Basic <example-value>

Browsers automatically provide validation to ensure that only text that matches the standard format for Internet email addresses is entered into the input box. Browsers use an algorithm equivalent to the following regular expression:

```js
/^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;
```

To learn more about how form validation works and how to take advantage of the `:valid` and `:invalid` CSS properties to style the input based on whether the current value is valid, see Form data validation.

> **Note:**
> There are known specification issues related to international domain names and the validation of email addresses in HTML. See W3C bug 15489 and whatwg/html#4562 for details.

### Pattern validation

If you need the entered email address to be restricted further than just "any string that looks like an email address," you can use the `pattern` attribute to specify a regular expression the value must match for it to be valid. If the `multiple` attribute is specified, each individual item in the comma-delineated list of values must match the regular expression.

For example, let's say you're building a page for employees of Best Startup Ever, Inc. which will let them contact their IT department for help. In our simplified form, the user needs to enter their email address and a message describing the problem they need help with. We want to ensure that not only does the user provide a valid email address, but for security purposes, we require that the address be an internal corporate email address.

Since inputs of type `email` validate against both the standard email address validation _and_ the specified `pattern`, you can implement this easily. Let's see how:

```css
body {
  font: 16px sans-serif;
}

.emailBox {
  padding-bottom: 20px;
}

.messageBox {
  padding-bottom: 20px;
}

label {
  line-height: 22px;
}

label::after {
  content: ":";
}
```

```html
<form>
  <div class="emailBox">
    <label for="emailAddress">Your email address</label><br />
    <input
      id="emailAddress"
      type="email"
      size="64"
      maxlength="64"
      required
      placeholder="user@example.com"
      pattern=".+@beststartupever\.com"
      title="Please provide only a Best Startup Ever corporate email address" />
  </div>

  <div class="messageBox">
    <label for="message">Request</label><br />
    <textarea
      id="message"
      cols="80"
      rows="8"
      required
      placeholder="My shoes are too tight, and I have forgotten how to dance."></textarea>
  </div>
  <input type="submit" value="Send Request" />
</form>
```

```js
document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();
});
```

Our `<form>` contains one `` of type `email` for the user's email address, a `<textarea>` to enter their message for IT into, and an `` of type `"submit"`, which creates a button to submit the form. Each text entry box has a `` associated with it to let the user know what's expected of them.

Let's take a closer look at the email address entry box. Its `size` and `maxlength` attributes are both set to 64 in order to show room for 64 characters worth of email address, and to limit the number of characters actually entered to a maximum of 64. The `required` attribute is specified, making it mandatory that a valid email address be provided.

An appropriate `placeholder` is provided—`user@example.com`—to demonstrate what constitutes a valid entry. This string demonstrates both that an email address should be entered, and suggests that it should be a corporate beststartupever.com account. This is in addition to the fact that using type `email` will validate the text to ensure that it's formatted like an email address. If the text in the input box isn't an email address, you'll get an error message that looks something like this:

If we left things at that, we would at least be validating on legitimate email addresses. But we want to go one step farther: we want to make sure that the email address is in fact in the form `[username]@beststartupever.com`. This is where we'll use `pattern`. We set `pattern` to `.+@beststartupever.com`. This regular expression requests a string that consists of at least one character of any kind, then an "@" followed by the domain name "beststartupever.com".

Note that this is not even close to an adequate filter for valid email addresses; it would allow things such as " @beststartupever.com" (note the leading space) or "@@beststartupever.com", neither of which is valid. However, the browser runs both the standard email address filter _and_ our custom pattern against the specified text. As a result, we wind up with a validation which says "make sure this resembles a valid email address, and if it is, make sure it's also a beststartupever.com address."

It's advisable to use the `title` attribute along with `pattern`. If you do, the `title` _must_ describe the pattern. That is, it should explain what format the data should take on, rather than any other information. That's because the `title` may be displayed or spoken as part of a validation error message. For example, the browser might present the message "The entered text doesn't match the required pattern." followed by your specified `title`. If your `title` is something like "Email address", the result would be the message "The entered text doesn't match the required pattern. Email address", which isn't very good.

That's why, instead, we specify the string "Please provide only a Best Startup Ever corporate email address" By doing that, the resulting full error message might be something like "The entered text doesn't match the required pattern. Please provide only a Best Startup Ever corporate email address."

> **Note:**
> If you run into trouble while writing your validation regular expressions and they're not working properly, check your browser's console; there may be helpful error messages there to aid you in solving the problem.

## Examples

Here we have an email input with the ID `emailAddress` which is allowed to be up to a maximum of 256 characters long. The input box itself is physically 64 characters wide, and displays the text `user@example.com` as a placeholder anytime the field is empty. In addition, by using the `multiple` attribute, the box is configured to allow the user to enter zero or more email addresses, separated by commas, as described in Allowing multiple email addresses. As a final touch, the `list` attribute contains the ID of a `<datalist>` whose `<option>`s specify a set of suggested values the user can choose from.

As an added touch, the `` element is used to establish a label for the email entry box, with its `for` attribute referencing the `emailAddress` ID of the `` element. By associating the two elements in this way, clicking on the label will focus the input element.

```html
<label for="emailAddress">Email</label><br />
<input
  id="emailAddress"
  type="email"
  placeholder="user@example.com"
  list="defaultEmails"
  size="64"
  maxlength="256"
  multiple />

<datalist id="defaultEmails">
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
  <option value="user@example.com"></option>
</datalist>
```

## Technical summary

       | Value
       |
        A string representing an email address, or
        empty

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
        `multiple`,
        `name`,
        `pattern`,
        `placeholder`,
        `readonly`,
        `required`,
        `size`, and
        `type`

       | IDL attributes
       | `list` and `value`

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
- Attributes:
  - `list`
  - `minlength`
  - `maxlength`
  - `multiple`
  - `pattern`
  - `placeholder`
  - `readonly`
  - `size`
