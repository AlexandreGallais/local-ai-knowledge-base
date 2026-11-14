---
title: "Window: location property (part 2 of 4)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/window/location/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Window: location property (part 2 of 4)

## Examples

### Basic <example-value>

```js
alert(location); // alerts "https://developer.mozilla.org/en-US/docs/Web/API/Window/location"
```

### Example 1: Navigate to a new page

Whenever a new value is assigned to the location object, a document will be loaded using the URL as if `location.assign()` had been called with the modified URL.

Note that navigation-related sandbox flags may result in an exception being thrown and the navigation failing.

```js
location.assign("https://www.mozilla.org"); // or
location = "https://www.mozilla.org";
```

### Example 2: Reloading the current page

```js
location.reload();
```

### Example 3

Consider the following example, which will reload the page by using the `replace()` method to insert the value of `location.pathname` into the hash:

```js
function reloadPageWithHash() {
  location.replace(`https://example.com/#${location.pathname}`);
}
```

### Example 4: Display the properties of the current URL in an alert dialog

```js
function showLoc() {
  const logLines = [
    "Property (Typeof): Value",
    `location (${typeof location}): ${location}`,
  ];
  for (const prop in location) {
    logLines.push(
      `${prop} (${typeof location[prop]}): ${location[prop] || "n/a"}`,
    );
  }
  alert(logLines.join("\n"));
}

// in html: <button onclick="showLoc();">Show location properties</button>
```

### Example 5: Send a string of data to the server by modifying the `search` property

```js
function sendData(data) {
  location.search = data;
}

// in html: <button onclick="sendData('Some data');">Send data</button>
```

The current URL with "?Some%20data" appended is sent to the server (if no action is taken by the server, the current document is reloaded with the modified search string).
