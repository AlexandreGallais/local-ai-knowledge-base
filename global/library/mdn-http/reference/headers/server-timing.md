---
title: "Server-Timing header"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/reference/headers/server-timing/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Server-Timing header

The HTTP **`Server-Timing`** response header communicates one or more performance metrics about the request-response cycle to the user agent.
It is used to surface backend server timing metrics (for example, database read/write, CPU time, file system access, etc.) in the developer tools in the user's browser or in the `PerformanceServerTiming` interface.

       | Header type
       | Response header

## Syntax

```http
// A single metric
Server-Timing: <timing-metric>

// Multiple metrics as a comma-separated list
Server-Timing: <timing-metric>, …, <timing-metricN>
```

A `<timing-metric>` has a name, and may include an optional duration and an optional description.
For example:

```http
// A metric with a name only
Server-Timing: missedCache

// A metric with a duration
Server-Timing: cpu;dur=2.4

// A metric with a description and duration
Server-Timing: cache;desc="Cache Read";dur=23.2

// Two metrics with duration values
Server-Timing: db;dur=53, app;dur=47.2
```

## Directives

- `<timing-metric>`
    A comma-separated list of one or more metrics with the following components separated by semi-colons:
    - `<name>`
        A name token (no spaces or special characters) for the metric that is implementation-specific or defined by the server, like `cacheHit`.
    - `<duration>` (optional)
        A duration as the string `dur`, followed by `=`, followed by a value, like `dur=23.2`.
    - `<description>` (optional)
        A description as the string `desc`, followed by `=`, followed by a value as a token or a quoted string, like `desc=prod` or `desc="<example-value>"`.

Names and descriptions should be kept as short as possible (for example, use abbreviations and omit optional values) to minimize HTTP data overhead.

## Description

### Privacy and security

The `Server-Timing` header may expose potentially sensitive application and infrastructure information.
Decide which metrics to send, when to send them, and who should see them based on the use case.
For example, you may decide to only show metrics to authenticated users and nothing on public responses.

### PerformanceServerTiming interface

In addition to having `Server-Timing` header metrics appear in the developer tools of the browser, the `PerformanceServerTiming` interface enables tools to automatically collect and process metrics from JavaScript. This interface is restricted to the same origin, but you can use the `Timing-Allow-Origin` header to specify the domains that are allowed to access the server metrics. The interface is only available in secure contexts (HTTPS) in some browsers.

The components of the `Server-Timing` header map to the `PerformanceServerTiming` properties as follows:

- `"name"` -> `PerformanceServerTiming.name`
- `"dur"` -> `PerformanceServerTiming.duration`
- `"desc"` -> `PerformanceServerTiming.description`

## Examples

### Sending a metric using the Server-Timing header

The following response includes a metric `custom-metric` with a duration of `123.45` milliseconds, and a description of "My custom metric":

```http
Server-Timing: custom-metric;dur=123.45;desc="My custom metric"
```

### Server-Timing as HTTP trailer

In the following response, the `Trailer` header is used to indicate that a `Server-Timing` header will follow the response body.
A metric `custom-metric` with a duration of `123.4` milliseconds is sent.

```http
HTTP/1.1 200 OK
Transfer-Encoding: chunked
Trailer: Server-Timing

--- response body ---
Server-Timing: custom-metric;dur=123.4
```

> **Warning:**
> Only the browser's DevTools can use the `Server-Timing` header as an HTTP trailer to display information in the Network -> Timings tab.
> The Fetch API cannot access HTTP trailers.
> See Browser compatibility for more information.

## See also

- `PerformanceServerTiming`
- `Trailer` header
