---
title: "ReportingObserver: observe() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/reportingobserver/observe/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReportingObserver: observe() method

The **`observe()`** method of the `ReportingObserver` interface instructs a reporting observer to start collecting reports in its report queue.

## Syntax

```js
observe()
```

### Parameters

None.

### Return value

None (`undefined`).

## Examples

### Basic usage

```js
const options = {
  types: ["deprecation"],
  buffered: true,
};

const observer = new ReportingObserver((reports, observer) => {
  reportBtn.onclick = () => displayReports(reports);
}, options);

observer.observe();
```

## See also

- Reporting API
