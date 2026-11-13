---
title: "Navigator: canShare() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigator/canshare/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Navigator: canShare() method

The **`canShare()`** method of the `Navigator` interface returns `true` if the equivalent call to `navigator.share()` would succeed.

The method returns `false` if the data cannot be _validated_. Reasons the data might be invalid include:

- The `data` parameter has been omitted or only contains properties with unknown values. Note that any properties that are not recognized by the user agent are ignored.
- A URL is badly formatted.
- Files are specified but the implementation does not support file sharing.
- Sharing the specified data would be considered a "hostile share" by the user-agent.

The Web Share API is gated by the web-share permission policy.
The `canShare()` method will return `false` if the permission is supported but has not been granted.

## Syntax

```js
canShare()
canShare(data)
```

### Parameters

- `data` (optional)
    An object defining the share data to test.
    Typically, an object with the same properties is passed to `navigator.share()` if this call returns `true`.

    Properties that are unknown to the user agent are ignored; share data is only assessed on properties understood by the user agent.
    All properties are optional but at least one known data property must be specified or the method will return `false`.

    Possible values are:
    - `url` (optional)
        A string representing a URL to be shared.
    - `text` (optional)
        A string representing text to be shared.
    - `title` (optional)
        A string representing the title to be shared.
    - `files` (optional)
        An array of `File` objects representing files to be shared.

### Return value

Returns `true` if the specified `data` can be shared with `Navigator.share()`, otherwise `false`.

## Examples

### Sending the MDN URL

The example uses `navigator.canShare()` to check whether `navigator.share()` can share the specified data.

#### HTML

The HTML just creates a paragraph in which to display the result of the test.

```html
<p class="result"></p>
```

#### JavaScript

```js
let shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
};

const resultPara = document.querySelector(".result");

if (!navigator.canShare) {
  resultPara.textContent = "navigator.canShare() not supported.";
} else if (navigator.canShare(shareData)) {
  resultPara.textContent =
    "navigator.canShare() supported. We can use navigator.share() to send the data.";
} else {
  resultPara.textContent = "Specified data cannot be shared.";
}
```

#### Result

The box below should state whether `navigator.canShare()` is supported on this browser, and if so, whether or not we can use `navigator.share()` to share the specified data:

### Feature checking example

This method feature tests whether a particular data property is valid and shareable.
If used with a single `data` property it will return `true` only if that property is valid and can be shared on the platform.

The code below demonstrates verifying that a data property is supported.

```js
// Feature that may not be supported
let testShare = { someNewProperty: "Data to share" };

// Complex data that uses new key
const shareData = {
  title: "MDN",
  text: "Learn web development on MDN!",
  url: "https://developer.mozilla.org",
  someNewProperty: "Data to share",
};

// Test that the key is valid and supported before sharing
if (navigator.canShare(testShare)) {
  // Use navigator.share() to share 'shareData'
} else {
  // Handle case that new data property can't be shared.
}
```

## See also

- `navigator.share()`
