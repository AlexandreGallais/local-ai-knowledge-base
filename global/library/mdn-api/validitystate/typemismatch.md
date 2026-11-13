---
title: "ValidityState: typeMismatch property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/validitystate/typemismatch/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ValidityState: typeMismatch property

The read-only **`typeMismatch`** property of the `ValidityState` interface indicates if the value of an ``, after having been edited by the user, does not conform to the constraints set by the element's `type` attribute.

If the `type` attribute expects specific strings, such as the `<email>` and `<url>` types and the value doesn't conform to the constraints set by the type, the `typeMismatch` property will be true.

The `<email>` input type expects one or more valid email addresses, depending on whether the `multiple` attribute is present. A valid email address includes an email prefix and a domain, with or without a top-level domain. If the value of the email input is not an empty string, a single valid email address, or one or more comma separated email address if the `multiple` attribute is present, there is a `typeMismatch`.

The `<url>` input type expects one or more valid URLs, depending on whether the `multiple` attribute is present. A valid URL includes a protocol, optionally with an IP address, or an optional subdomain, domain, and top-level domain combination. If the value of the URL input is not an empty string, a single valid URL, or one or more comma separated URLS if the `multiple` attribute is present, there is a `typeMismatch`.

| Input type                              | Value             | Expected value                                                 |
| --------------------------------------- | ----------------- | -------------------------------------------------------------- |
| `<email>` | `x@y` or `user@example.com`  | email address, with or without TLD |
| `<url>`     | `x:` or `x://y.z` | protocol or full URL with protocol                             |

## Value

A boolean that is `true` if the `ValidityState` does not conform to the constraints.

## Examples

### Type mismatch on input element

The `typeMismatch` occurs when there is a disconnect between the `value` expected via the `type` attribute and the data that is actually present.
The `typeMismatch` is only one of the many possible errors and is only relevant for the `<email>` and `<url>` types.
When the value provided doesn't match the expected value based on the type for other input types, you get different errors.
For example, if the `<number>` input value is not a floating point number, the `badInput` is `true`.
If the email is `required` but is empty, the `valueMissing` will be `true`.

```html
<pre id="log">Validation logged here...</pre>
<p>
  <label>
    Enter an email address:
    <input id="emailInput" type="email" value="example.com" required />
  </label>
</p>
```

```css
input:invalid {
  border: red solid 3px;
}
```

```css
body {
  margin: 0.5rem;
}
pre {
  padding: 1rem;
  height: 2rem;
  background-color: lightgrey;
  outline: 1px solid grey;
}
```

```js
const emailInput = document.getElementById("emailInput");
const logElement = document.getElementById("log");

function log(text) {
  logElement.innerText = text;
}

emailInput.addEventListener("input", () => {
  emailInput.reportValidity();
  if (emailInput.validity.valid) {
    log("Input OK…");
  } else if (emailInput.validity.typeMismatch) {
    log("Input is not an email.");
  } else {
    log(`Validation failed: ${emailInput.validationMessage}`);
  }
});
```

## See also

- ValidityState badInput, valid, customError properties.
- Constraint validation
- Forms: Data form validation
- Regular Expressions
