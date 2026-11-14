---
title: "CSPViolationReport: statusCode property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/cspviolationreport/statuscode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# CSPViolationReport: statusCode property

The **`statusCode`** property of the `CSPViolationReport` dictionary is a number representing the HTTP status code of the response to the request that triggered a Content Security Policy (CSP) violation (when loading a window or worker).

## Value

A number representing the HTTP status code of the response to the request that triggered the CSP violation.

## Examples

In this example we create a new `ReportingObserver` to observe content violation reports of type `"csp-violation"`.
Each time the callback function is invoked, we log the status code for the first entry of the reports array.

```js
const observer = new ReportingObserver(
  (reports, observer) => {
    console.log(`statusCode: ${reports[0].body.statusCode}`);
    // For example: 200
  },
  {
    types: ["csp-violation"],
    buffered: true,
  },
);

observer.observe();
```

Note that while there might be multiple reports in the returned array, for brevity we only log the status code of the first report.

## See also

- `SecurityPolicyViolationEvent.statusCode`
