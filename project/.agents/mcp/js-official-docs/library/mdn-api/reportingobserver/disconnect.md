---
title: "ReportingObserver: disconnect() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/reportingobserver/disconnect/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReportingObserver: disconnect() method

The **`disconnect()`** method of the `ReportingObserver` interface stops a reporting observer that had previously started observing from collecting reports.

After calling `disconnect()`, neither `ReportingObserver.takeRecords()` nor the `reports` parameter of the `ReportingObserver()` callback will return any reports.
The associated observer will no longer be active.

## Syntax

```js
disconnect()
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

// …

observer.disconnect();
```

## See also

- Reporting API
