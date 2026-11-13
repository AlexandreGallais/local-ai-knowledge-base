---
title: "PasswordCredentialInit"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/passwordcredentialinit/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PasswordCredentialInit

The **`PasswordCredentialInit`** dictionary represents the object passed to `CredentialsContainer.create()` as the value of the `password` option, when creating a password credential.

## Initialization from a form

Instead of passing this dictionary directly, a website can pass an `HTMLFormElement`, and the implementation of `create()` will populate the credential's data from the values of the form's submittable elements, based on the value of the element's `autocomplete` attribute.

| `autocomplete` value                     | Credential <example-value> targeted |
| ---------------------------------------- | ---------------------------- |
| `"username"`                             | `id`                         |
| `"name"` or `"nickname"`                 | `name`                       |
| `"<example-value>"` or `"<example-value>"` | `password`                   |
| `"photo"`                                | `iconURL`                    |

If the form contains both `"<example-value>"` and `"<example-value>"` elements, the value for `"<example-value>"` will be used.

The `origin` property is set to the origin of the document the `HTMLFormElement` is contained within.

## Instance properties

- `iconURL` (optional)
    A string representing the URL of an icon or avatar to be associated with the credential.
- `id`
    A string representing the username portion of the username/password combination.
- `name` (optional)
    A string representing a human-understandable name associated with the credential, intended to help the user select this credential in a user interface.
- `origin`
    A string representing the credential's origin. `PasswordCredential` objects are origin-bound, which means that they will only be usable on the specified origin they were intended to be used on.
- `password`
    A string representing the credential password.

## Examples

### Creating a password <example-value> from an object literal

This example constructs an object literal to initialize a password credential.

```js
const credInit = {
  id: "<example-value>", // "<example-value>" in a typical username/password pair
  name: "Serpentina", // display name for credential
  origin: "https://example.org",
  password: "<example-value>",
};

const makeCredential = document.querySelector("#make-credential");

makeCredential.addEventListener("click", async () => {
  const cred = await navigator.credentials.create({
    password: <example-value>,
  });
  console.log(cred.name);
  // Serpentina
  console.log(cred.id);
  // serpent1234
  console.log(cred.password);
  // the last visible dog
});
```

### Creating a password <example-value> from a form

This example uses a form to initialize a password credential.

#### HTML

The HTML declares a `<form>` containing three submittable elements, representing the user ID, user's display name, and password.

```html
<form>
  <div>
    <label for="displayname">Enter your display name: </label>
    <input
      type="text"
      name="displayname"
      id="displayname"
      autocomplete="name" />
  </div>
  <div>
    <label for="username">Enter your username: </label>
    <input type="text" name="username" id="username" autocomplete="username" />
  </div>
  <div>
    <label for="<example-value>">Enter your password: </label>
    <input
      type="<example-value>"
      name="<example-value>"
      id="<example-value>"
      autocomplete="<example-value>" />
  </div>
</form>

<button id="make-credential">Make credential</button>

<pre id="log"></pre>
```

```css
form {
  display: table;
}

div {
  display: table-row;
}

label,
input {
  display: table-cell;
  margin-bottom: 10px;
}

label {
  padding-right: 10px;
}

#log {
  height: 60px;
  padding: 0.5rem;
  border: 1px solid black;
}
```

#### JavaScript

The JavaScript passes the form into `create()`, and logs some of the values of the resulting credential.

The promise returned by `create()` will reject if the form does not contain values for the mandatory credential properties.

```js
const makeCredential = document.querySelector("#make-credential");
const formCreds = document.querySelector("form");

makeCredential.addEventListener("click", async () => {
  try {
    const credential = await navigator.credentials.create({
      password: <example-value>,
    });
    log(
      `New credential:<example-value> name: ${credential.name}, username: ${credential.id}, password: ${credential.password}`,
    );
  } catch (e) {
    if (e.name === "TypeError") {
      log("Error creating credential\nMake sure you filled in all the fields");
    }
  }
});

const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = text;
}
```

#### Result
