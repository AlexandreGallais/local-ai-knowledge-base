---
title: "ReportingObserver: takeRecords() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/reportingobserver/takerecords/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReportingObserver: takeRecords() method

The **`takeRecords()`** method of the `ReportingObserver` interface returns the current list of reports contained in the observer's report queue, and empties the queue.

## Syntax

```js
takeRecords()
```

### Parameters

None.

### Return value

An array of report objects, such as `COEPViolationReport` and `IntegrityViolationReport`.

The object dictionaries are listed in Reporting API.

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

const records = observer.takeRecords();
console.log(records);
```

## See also

- Reporting API
