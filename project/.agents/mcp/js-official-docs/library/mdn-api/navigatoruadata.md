---
title: "NavigatorUAData"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/navigatoruadata/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# NavigatorUAData

The **`NavigatorUAData`** interface of the `User-Agent Client Hints API` returns information about the browser and operating system of a user.

An instance of this object is returned by calling `Navigator.userAgentData` or `WorkerNavigator.userAgentData`. Therefore, this interface has no constructor.

> **Note:**
> The terms _high entropy_ and _low entropy_ refer to the amount of information these values reveal about the browser. The values returned as properties are deemed low entropy, which are unlikely to identify a user. The `NavigatorUAData.getHighEntropyValues()` can be used to request additional high entropy values, which could potentially reveal more identifying information. These values are therefore retrieved via a `Promise`, allowing time for the browser to request user permission, or make other checks.

## Instance properties

- `NavigatorUAData.brands` (read-only) (experimental)
    Returns an array of brand information containing the browser name and version.
- `NavigatorUAData.mobile` (read-only) (experimental)
    Returns `true` if the user-agent is running on a mobile device.
- `NavigatorUAData.platform` (read-only) (experimental)
    Returns the platform brand the user-agent is running on.

## Instance methods

- `NavigatorUAData.getHighEntropyValues()` (experimental)
    Returns a `Promise` that resolves with a dictionary object containing low entropy information and requested high entropy information about the browser.
- `NavigatorUAData.toJSON()` (experimental)
    Returns a JSON-serializable plain object representing the `NavigatorUAData` object. Automatically called by `JSON.stringify()`.

## Examples

### Getting the brands

The following example prints the value of `NavigatorUAData.brands` to the console.

```js
console.log(navigator.userAgentData.brands);
```

### Returning high entropy values

In the following value a number of hints are requested using the `NavigatorUAData.getHighEntropyValues()` method. When the promise resolves, this information is printed to the console.

```js
navigator.userAgentData
  .getHighEntropyValues([
    "architecture",
    "model",
    "platform",
    "platformVersion",
    "fullVersionList",
  ])
  .then((ua) => {
    console.log(ua);
  });
```

## See also

- Improving user privacy and developer experience with User-Agent Client Hints
