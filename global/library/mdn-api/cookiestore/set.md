---
title: "CookieStore: set() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cookiestore/set/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CookieStore: set() method

The **`set()`** method of the `CookieStore` interface sets a cookie with the given `name` and `value` or `options` object.

## Syntax

```js
set(name, value)
set(options)
```

### Parameters

This method requires one of the following:

- `name` (optional)
    A string with the name of the cookie.
- `value` (optional)
    A string with the value of the cookie.

Or

- `options` (optional)
    An object containing:
    - `domain` (optional)
        A string containing the domain of the cookie. Defaults to `null`.
    - `expires` (optional)
        A timestamp, given as Unix time in milliseconds, containing the expiration date of the cookie. Defaults to `null`.
    - `maxAge` (optional)
        A number representing the number of seconds until the cookie expires. A zero or negative number will expire the cookie immediately. If both `expires` and `maxAge` are set, the `set()` call fails with a `TypeError`. Defaults to `null`.
    - `name`
        A string with the name of a cookie.
    - `partitioned` (optional)
        A boolean value that defaults to `false`. If set to `true`, the set cookie will be a partitioned cookie. See Cookies Having Independent Partitioned State (CHIPS) for more information.
    - `path` (optional)
        A string containing the path of the cookie. Defaults to `/`.
    - `sameSite` (optional)
        One of the following `SameSite` values: `"strict"`, `"lax"`, or `"none"`.
    - `value`
        A string with the value of the cookie.

> **Note:**
> While the values can be set here and will be used internally, some browsers will only return `name` and `value` options from `CookieStore.get()` and `CookieStore.getAll()`.

### Return value

A `Promise` that resolves with `undefined` when setting the cookie completes.

### Exceptions

- `SecurityError` `DOMException`
    Thrown if the origin cannot be serialized to a URL.
- `TypeError`
    Thrown if:
    - Both the `expires` and `maxAge` properties are set.
    - Setting the cookie with the given `name` and `value` or `options` fails in any other way.

## Examples

### Setting a cookie with name and value

This example sets a cookie by passing a `name` and `value` of "cookie1" and "cookie1-value", respectively.
The other properties of the cookie are set with default values, as defined in the `options` parameter.

The code first waits for the cookie to be set: as this operation can fail, the operation is performed in a `try...catch` block and any errors are logged to the console.
It then gets and logs the cookie that was just set.

```js
async function cookieTest() {
  // Set cookie: passing name and value
  try {
    await cookieStore.set("cookie1", "cookie1-value");
  } catch (error) {
    console.log(`Error setting cookie1: ${error}`);
  }

  // Get the cookie and log its values
  const cookie = await cookieStore.get("cookie1");
  console.log(cookie);
}
```

### Setting a cookie with options

This example sets a cookie by passing an `options` object with `name`, `value`, `expires`, and `partitioned`.

The code first waits for the cookie to be set: as this operation can fail, the operation is performed in a `try...catch` block and any errors are logged to the console.
It then gets and logs the cookie that was just set.

```js
async function cookieTest() {
  const day = 24 * 60 * 60 * 1000;
  const cookieName = "cookie2";
  try {
    // Set cookie: passing options
    await cookieStore.set({
      name: cookieName,
      value: `${cookieName}-value`,
      expires: Date.now() + day,
      partitioned: true,
    });
  } catch (error) {
    log(`Error setting ${cookieName}: ${error}`);
    console.log(error);
  }

  // Log the new cookie
  const cookie = await cookieStore.get(cookieName);
  console.log(cookie);
}
```

### Setting cookies with the same name

These calls create two separate cookies because their paths differ:

```js
await cookieStore.set({ name: "theme", value: "light", path: "/" });
await cookieStore.set({ name: "theme", value: "dark", path: "/docs" });
```

On a page under `/docs/`, `cookieStore.getAll("theme")` can retrieve both cookies. Calling `cookieStore.set("theme", "blue")` updates the cookie at the default path `/`, leaving the `/docs` cookie unchanged.
