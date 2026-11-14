---
title: "Headers: getSetCookie() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/headers/getsetcookie/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Headers: getSetCookie() method

The **`getSetCookie()`** method of the `Headers` interface returns an array containing the values of all `Set-Cookie` headers associated with a response. This allows `Headers` objects to handle having multiple `Set-Cookie` headers, which wasn't possible prior to its implementation.

This method is intended for use on server environments (for example Node.js). Browsers block frontend JavaScript code from accessing the `Set-Cookie` header, as required by the Fetch spec, which defines `Set-Cookie` as a forbidden response-header name that must be filtered out from any response exposed to frontend code.

## Syntax

```js
getSetCookie()
```

### Parameters

None.

### Return value

An array of strings representing the values of all the different `Set-Cookie` headers associated with a response.

If no `Set-Cookie` headers are set, the method will return an empty array (`[ ]`).

## Examples

As alluded to above, running code like the following on the client won't return any results — `Set-Cookie` is filtered out from `Headers` retrieved over the network.

```js
fetch("https://example.com").then((response) => {
  console.log(response.headers.getSetCookie());
  // No header values returned
});
```

However, the following could be used to query multiple `Set-Cookie` values. This is much more useful on the server, but it would also work on the client.

```js
const headers = new Headers({
  "Set-Cookie": "name1=value1",
});

headers.append("Set-Cookie", "name2=value2");

headers.getSetCookie();
// Returns ["name1=value1", "name2=value2"]
```

## See also

- HTTP
- `Set-Cookie`
