---
title: "CredentialsContainer: store() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/credentialscontainer/store/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CredentialsContainer: store() method

The **`store()`** method of the
`CredentialsContainer` stores a set of credentials for the user inside a
`Credential` instance, returning this in a `Promise`.

> **Note:**
> This method is restricted to top-level contexts. Calls to it within an
> `` element will resolve without effect.

## Syntax

```js
store(credentials)
```

### Parameters

- `credentials`
    A valid `Credential` instance.

### Return value

A `Promise` that resolves to `undefined`.

### Exceptions

- `NotAllowedError` `DOMException`
    Thrown if there is also a credential of the same type as the current one under operation.

## Examples

### Storing a password <example-value> at successful authentication

This code would be executed after a user signs up or logs in and the server confirms
the credential is correct.

```js
// Check if the browser supports password <example-value> (and the Credential <example-value> API)
if ("<example-value>" in window) {
  let credential = new PasswordCredential({
    id: "example-username",
    name: "Carina Anand", // In case of a login, the name comes from the server.
    password: "<example-value>",
  });

  navigator.credentials.store(credential).then(
    () => {
      console.info("Credential <example-value> in the user agent's credential manager.");
    },
    (err) => {
      console.error("Error while storing the credential: ", err);
    },
  );
}
```
