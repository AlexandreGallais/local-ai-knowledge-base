---
title: "ReportingObserver"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/reportingobserver/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ReportingObserver

The `ReportingObserver` interface of the Reporting API allows you to collect and access reports.

## Constructor

- `ReportingObserver()`
    Creates a new `ReportingObserver` object instance, which can be used to collect and access reports.

## Instance properties

_This interface has no properties defined on it._

## Instance methods

- `ReportingObserver.disconnect()`
    Stops a reporting observer that had previously started observing from collecting reports.
- `ReportingObserver.observe()`
    Instructs a reporting observer to start collecting reports in its report queue.
- `ReportingObserver.takeRecords()`
    Returns the current list of reports contained in the observer's report queue, and empties the queue.

## Events

_This interface has no events that fire on it._

## Examples

### Displaying deprecation reports

This example shows how to observe `"deprecation"` reports using a `ReportingObserver`.

```html
<pre id="log"></pre>
```

```css
#log {
  height: 200px;
  margin: 10px;
  overflow: scroll;
  padding: 0.5rem;
  border: 1px solid black;
}
```

```js
const logElement = document.querySelector("#log");
function log(text) {
  logElement.innerText = `${logElement.innerText}${text}\n`;
  logElement.scrollTop = logElement.scrollHeight;
}
```

#### JavaScript

First we construct a new `ReportingObserver` object to listen for reports with the type `"deprecation"`, passing a callback that will receive and log the reports.

```js
const options = {
  types: ["deprecation"],
  buffered: true,
};

const observer = new ReportingObserver((reports, observer) => {
  reports.forEach((report) => {
    // console.log(report);
    log(JSON.stringify(report, null, 2));
  });
}, options);

// Start the observer
observer.observe();
```

We then call the following code which uses synchronous XHR (deprecated API).
Note that this is defined after the observer it triggers once the observer is running.

```js
const xhr = new XMLHttpRequest();
xhr.open("GET", "/", false); // false = synchronous (deprecated)
xhr.send();
```

#### Results

On browsers that support deprecation reports, a report should be displayed below.
Note that the `type` is `"deprecation"`.

## See also

- Reporting API
