---
title: "ContactsManager: getProperties() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contactsmanager/getproperties/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContactsManager: getProperties() method

The **`getProperties()`** method of the
`ContactsManager` interface returns a `Promise` which resolves
with an `Array` of `strings` indicating which contact
properties are available.

## Syntax

```js
getProperties()
```

### Parameters

None.

### Return value

Returns a `Promise` that resolves with an `Array` of `strings` naming the contact properties that can be returned by the current system.

Properties can include the following:

- `'name'`: The contact's name.
- `'tel'`: The telephone number(s) of the contact.
- `'email'`: The email address of the contact.
- `'address'`: The contact's postal address.
- `'icon'`: The avatar of the contact.

### Exceptions

No exceptions are thrown.

## Examples

### Verify Property Support

The following asynchronous function uses the `getProperties()` method to check
whether the current system supports the `icon` property.

```js
async function checkProperties() {
  const supportedProperties = await navigator.contacts.getProperties();
  if (!supportedProperties.includes("icon")) {
    console.log("Your system does not support getting icons.");
  }
}
```

### Select Using Only Supported Properties

The following example is similar to one for the `select()` method. Instead of hard-coding the properties passed to `select()`, it uses `getProperties()` to ensure that only supported properties are passed. Otherwise, `select()` might throw a `TypeError`. `handleResults()` is a developer defined function.

```js
const supportedProperties = await navigator.contacts.getProperties();

async function getContacts() {
  try {
    const contacts = await navigator.contacts.select(supportedProperties);
    handleResults(contacts);
  } catch (ex) {
    // Handle any errors here.
  }
}
```
