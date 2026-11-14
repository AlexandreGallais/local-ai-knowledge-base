---
title: "XMLHttpRequest: setAttributionReporting() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/xmlhttprequest/setattributionreporting/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# XMLHttpRequest: setAttributionReporting() method

The **`setAttributionReporting()`** method of the
`XMLHttpRequest` interface indicates that you want the request's response to be able to register a JavaScript-based attribution source or attribution trigger.

See the Attribution Reporting API for more details.

## Syntax

```js
setAttributionReporting(options)
```

### Parameters

- `options`
    An object providing attribution reporting options, which includes the following properties:
    - `eventSourceEligible`
        A boolean. If set to `true`, the request's response is eligible to register an attribution source. If set to `false`, it isn't.
    - `triggerEligible`
        A boolean. If set to `true`, the request's response is eligible to register an attribution trigger. If set to `false`, it isn't.

### Return value

None (`undefined`).

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if the associated `XMLHttpRequest` has not yet been `opened`, or has already been `sent`.
- `TypeError`
    Thrown if use of the Attribution Reporting API is blocked by an `attribution-reporting` `Permissions-Policy`.

## Examples

```js
const attributionReporting = {
  eventSourceEligible: true,
  triggerEligible: false,
};

function triggerSourceInteraction() {
  const req = new XMLHttpRequest();
  req.open("GET", "https://shop.example/endpoint");
  // Check availability of setAttributionReporting() before calling
  if (typeof req.setAttributionReporting === "function") {
    req.setAttributionReporting(attributionReporting);
    req.send();
  } else {
    throw new Error("Attribution reporting not available");
    // Include recovery code here as appropriate
  }
}

// Associate the interaction trigger with whatever
// element and event makes sense for your code
elem.addEventListener("click", triggerSourceInteraction);
```

## See also

- Attribution Reporting API
