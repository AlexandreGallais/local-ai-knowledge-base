---
title: "PerformanceResourceTiming"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/performanceresourcetiming/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# PerformanceResourceTiming

The **`PerformanceResourceTiming`** interface enables retrieval and analysis of detailed network timing data regarding the loading of an application's resources. An application can use the timing metrics to determine, for example, the length of time it takes to fetch a specific resource, such as an `XMLHttpRequest`, ``, image, or script.

## Instance properties

### Inherited from `PerformanceEntry`

This interface extends the following `PerformanceEntry` properties for resource performance entry types by qualifying and constraining them as follows:

- `PerformanceEntry.duration` (read-only)
    Returns a `timestamp` that is the difference between the `responseEnd` and the `startTime` properties.
- `PerformanceEntry.entryType` (read-only)
    Returns `"resource"`.
- `PerformanceEntry.name` (read-only)
    Returns the resource's URL.
- `PerformanceEntry.startTime` (read-only)
    Returns the `timestamp` for the time a resource fetch started. If there are no HTTP redirects or their timing information is not exposed, this value is equivalent to `PerformanceResourceTiming.fetchStart`. Otherwise, this value can be earlier than `fetchStart`.

### Timestamps

The interface supports the following timestamp properties which you can see in the diagram and are listed in the order in which they are recorded for the fetching of a resource. An alphabetical listing is shown in the navigation, at left.

- `PerformanceResourceTiming.redirectStart` (read-only)
    A `DOMHighResTimeStamp` that represents the start time of the fetch which initiates the redirect.
- `PerformanceResourceTiming.redirectEnd` (read-only)
    A `DOMHighResTimeStamp` immediately after receiving the last byte of the response of the last redirect.
- `PerformanceResourceTiming.workerStart` (read-only)
    Returns a `DOMHighResTimeStamp` immediately before dispatching the `FetchEvent` if a Service Worker thread is already running, or immediately before starting the Service Worker thread if it is not already running. If the resource is not intercepted by a Service Worker the property will always return 0.
- `PerformanceResourceTiming.fetchStart` (read-only)
    A `DOMHighResTimeStamp` immediately before the browser starts to fetch the resource. If there are no HTTP redirects or their timing information is not exposed, this value is equivalent to `PerformanceEntry.startTime`. Otherwise, this value can be later than `startTime`.
- `PerformanceResourceTiming.domainLookupStart` (read-only)
    A `DOMHighResTimeStamp` immediately before the browser starts the domain name lookup for the resource.
- `PerformanceResourceTiming.domainLookupEnd` (read-only)
    A `DOMHighResTimeStamp` representing the time immediately after the browser finishes the domain name lookup for the resource.
- `PerformanceResourceTiming.connectStart` (read-only)
    A `DOMHighResTimeStamp` immediately before the browser starts to establish the connection to the server to retrieve the resource.
- `PerformanceResourceTiming.secureConnectionStart` (read-only)
    A `DOMHighResTimeStamp` immediately before the browser starts the handshake process to secure the current connection.
- `PerformanceResourceTiming.connectEnd` (read-only)
    A `DOMHighResTimeStamp` immediately after the browser finishes establishing the connection to the server to retrieve the resource.
- `PerformanceResourceTiming.requestStart` (read-only)
    A `DOMHighResTimeStamp` immediately before the browser starts requesting the resource from the server.
- `PerformanceResourceTiming.firstInterimResponseStart` (read-only)
    A `DOMHighResTimeStamp` that represents the interim response time (for example, 100 Continue or 103 Early Hints).
- `PerformanceResourceTiming.responseStart` (read-only)
    A `DOMHighResTimeStamp` immediately after the browser receives the first byte of the response from the server (which may be an interim response).
- `PerformanceResourceTiming.finalResponseHeadersStart` (read-only)
    A `DOMHighResTimeStamp` that represents the final headers response time (for example, 200 Success), after any interim response time.
- `PerformanceResourceTiming.responseEnd` (read-only)
    A `DOMHighResTimeStamp` immediately after the browser receives the last byte of the resource or immediately before the transport connection is closed, whichever comes first.

### Additional resource information

Additionally, this interface exposes the following properties containing more information about a resource:

- `PerformanceResourceTiming.contentType` (read-only)
    A string representing a minimized and standardized version of the MIME-type of the fetched resource.
- `PerformanceResourceTiming.contentEncoding` (read-only) (experimental)
    A string representing the `Content-Encoding` of the fetched resource.
- `PerformanceResourceTiming.decodedBodySize` (read-only)
    A number that is the size (in octets) received from the fetch (HTTP or cache) of the message body, after removing any applied content encoding.
- `PerformanceResourceTiming.deliveryType` (read-only)
    Indicates how the resource was delivered — for example from the cache or from a navigational prefetch.
- `PerformanceResourceTiming.encodedBodySize` (read-only)
    A number representing the size (in octets) received from the fetch (HTTP or cache), of the payload body, before removing any applied content encodings.
- `PerformanceResourceTiming.initiatorType` (read-only)
    A string representing the web platform feature that initiated the performance entry.
- `PerformanceResourceTiming.nextHopProtocol` (read-only)
    A string representing the network protocol used to fetch the resource, as identified by the ALPN Protocol ID (RFC7301).
- `PerformanceResourceTiming.renderBlockingStatus` (read-only)
    A string representing the render-blocking status. Either `"blocking"` or `"non-blocking"`.
- `PerformanceResourceTiming.responseStatus` (read-only)
    A number representing the HTTP response status code returned when fetching the resource.
- `PerformanceResourceTiming.transferSize` (read-only)
    A number representing the size (in octets) of the fetched resource. This is the size of the response body plus a fixed value that stands in for the size of the response headers.
- `PerformanceResourceTiming.serverTiming` (read-only)
    An array of `PerformanceServerTiming` entries containing server timing metrics.

## Instance methods

- `PerformanceResourceTiming.toJSON()`
    Returns a JSON-serializable plain object representing the `PerformanceResourceTiming` object. Automatically called by `JSON.stringify()`.

## Description

The interface's properties create a resource loading timeline with high-resolution timestamps for network events such as redirect start and end times, fetch start, DNS lookup start and end times, response start and end times, and more. Additionally, the interface extends `PerformanceEntry` with other properties which provide data about the size of the fetched resource as well as the type of resource that initiated the fetch.

### Typical resource timing metrics

The properties of this interface allow you to calculate certain resource timing metrics. Common use cases include:

- Measuring TCP handshake time (`connectEnd` - `connectStart`)
- Measuring DNS lookup time (`domainLookupEnd` - `domainLookupStart`)
- Measuring redirection time (`redirectEnd` - `redirectStart`)
- Measuring interim request time (`firstInterimResponseStart` - `finalResponseHeadersStart`)
- Measuring request time (`responseStart` - `requestStart`)
- Measuring document request time (`finalResponseHeadersStart` - `requestStart`)
- Measuring TLS negotiation time (`requestStart` - `secureConnectionStart`)
- Measuring time to fetch (without redirects) (`responseEnd` - `fetchStart`)
- Measuring ServiceWorker processing time (`fetchStart` - `workerStart`)
- Checking if content was compressed (`decodedBodySize` should not be `encodedBodySize`)
- Checking if local caches were hit (`transferSize` should be `0`)
- Checking if modern and fast protocols are used (`nextHopProtocol` should be HTTP/2 or HTTP/3)
- Checking if the correct resources are render-blocking (`renderBlockingStatus`)

### Managing resource buffer sizes

By default only 250 resource timing entries are buffered. For more information see the resource buffer sizes of the Resource Timing guide.

### Cross-origin restrictions

Timing information for a cross-origin resource is restricted unless the resource passes the `Timing-Allow-Origin` check.
This applies to the following properties, which return `0`, an empty string, or an empty array by default when loading a resource from an origin other than the one of the web page itself: `redirectStart`, `redirectEnd`, `workerStart`, `domainLookupStart`, `domainLookupEnd`, `connectStart`, `connectEnd`, `secureConnectionStart`, `requestStart`, `firstInterimResponseStart`, `responseStart`, `finalResponseHeadersStart`, `nextHopProtocol`, `transferSize`, `deliveryType`, and `serverTiming`.
Even a resource that passes the CORS check still needs `Timing-Allow-Origin` to expose them.

For example, to allow `https://developer.mozilla.org` to see resource timing information, the cross-origin resource should send:

```http
Timing-Allow-Origin: https://developer.mozilla.org
```

Other properties describe the response itself rather than its timing, and depend on the CORS check instead of the `Timing-Allow-Origin` check.
The `contentType`, `encodedBodySize`, `decodedBodySize`, and `responseStatus` properties return `0` or an empty string for cross-origin resources unless the resource was requested in `cors` mode and passed the CORS check.
Frame navigations, such as an `` loading its document, don't use CORS, so their body sizes are exposed only for same-origin frames loaded without cross-origin redirects.
The `transferSize` property depends on both checks: it's `0` without `Timing-Allow-Origin`, and it excludes the body size if the resource doesn't pass the CORS check.

If the document in a cross-origin `` fails the `Timing-Allow-Origin` check, the browser reports a fallback entry.
In this entry, `responseEnd` is the time at which the iframe finished loading, including its subresources.
See Cross-origin iframes for more information.

## Examples

### Logging resource timing information

Example using a `PerformanceObserver`, which notifies of new `resource` performance entries as they are recorded in the browser's performance timeline. Use the `buffered` option to access entries from before the observer creation.

```js
const observer = new PerformanceObserver((list) => {
  list.getEntries().forEach((entry) => {
    console.log(entry);
  });
});

observer.observe({ type: "resource", buffered: true });
```

Example using `Performance.getEntriesByType()`, which only shows `resource` performance entries present in the browser's performance timeline at the time you call this method:

```js
const resources = performance.getEntriesByType("resource");
resources.forEach((entry) => {
  console.log(entry);
});
```

## See also

- Resource timing (Overview)
