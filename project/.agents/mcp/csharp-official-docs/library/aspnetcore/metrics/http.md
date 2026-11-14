---
title: "ASP.NET Core built-in HTTP metrics (part 1 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/metrics/http.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# ASP.NET Core built-in HTTP metrics

This article describes the built-in HTTP-related metrics for ASP.NET Core produced using the `System.Diagnostics.Metrics` API. These metrics cover hosting, routing, rate limiting, header parsing, the Kestrel web server, and SignalR.

For an overview of all built-in metrics reference pages and how to read this reference, see ASP.NET Core built-in metrics. For information on how to collect, report, enrich, and test with ASP.NET Core metrics, see ASP.NET Core metrics.

## `Microsoft.AspNetCore.Hosting`

The `Microsoft.AspNetCore.Hosting` metrics report high-level information about HTTP requests received by ASP.NET Core:

* `http.server.request.duration`
* `http.server.active_requests`

> **Note:**
> In ASP.NET Core 11 and later, the instruments under `Microsoft.AspNetCore.Hosting` are the framework's primary implementation of the OpenTelemetry HTTP server semantic conventions. Register this meter directly with the OpenTelemetry SDK (for example, call `AddMeter("Microsoft.AspNetCore.Hosting")` in your OpenTelemetry metrics pipeline) without adding the `OpenTelemetry.Instrumentation.AspNetCore` package. For details, see ASP.NET Core metrics.

### Metric: `http.server.request.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`http.server.request.duration` | Histogram | `s` | Measures the duration of inbound HTTP requests.

Attribute | Type | Description | Examples | Presence
--- |--- | --- | --- | ---
`http.route` | string | The matched route. | `{controller}/{action}/``{id?}`| If it's available.
`error.type` | string | Describes a class of error the operation ended with. | `timeout`; `name_resolution_error`; `500` | If request has ended with an error.
`http.request.method` | string | HTTP request method. | `GET`; `POST`; `HEAD` | Always
`http.response.status_code` | int | HTTP response status code. | `200` | If one was sent.
`network.protocol.version` | string | Version of the protocol specified in `network.protocol.name`. | `3.1.1` | Always
`url.scheme` | string | The URI scheme component identifying the used protocol. | `http`; `https` | Always
`aspnetcore.request.is_unhandled` | boolean | True when the request wasn't handled by the application pipeline. | `true` | If the request was unhandled.

The time used to handle an inbound HTTP request as measured at the hosting layer of ASP.NET Core. The time measurement starts once the underlying web host has:

* Sufficiently parsed the HTTP request headers on the inbound network stream to identify the new request.
* Initialized the context data structures such as the `Microsoft.AspNetCore.Http.HttpContext`.

The time ends when:

* The ASP.NET Core handler pipeline is finished executing.
* All response data has been sent.
* The context data structures for the request are being disposed.

When using OpenTelemetry, the default buckets for this metric are set to [ 0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10 ].

### Metric: `http.server.active_requests`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`http.server.active_requests` | UpDownCounter | `{request}` | Measures the number of concurrent HTTP requests that are currently in flight.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`http.request.method` | string | HTTP request method. [1] | `GET`; `POST`; `HEAD` | Always
`url.scheme`| string | The URI scheme component identifying the used protocol. | `http`; `https` | Always

## `Microsoft.AspNetCore.Routing`

The `Microsoft.AspNetCore.Routing` metrics report information about routing HTTP requests to ASP.NET Core endpoints:

* `aspnetcore.routing.match_attempts`

### Metric: `aspnetcore.routing.match_attempts`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.routing.match_attempts` | Counter | `{match_attempt}` | Number of requests that were attempted to be matched to an endpoint.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.routing.match_status` | string | Match result. | `success`; `failure` | Always
`aspnetcore.routing.is_fallback_route` | boolean | A value that indicates whether the matched route is a fallback route. | `true` | If a route was successfully matched.
`http.route` | string | The matched route. | `{controller}/{action}/``{id?}` | If a route was successfully matched.

## `Microsoft.AspNetCore.RateLimiting`

The `Microsoft.AspNetCore.RateLimiting` metrics report rate limiting information from ASP.NET Core rate-limiting middleware:

* `aspnetcore.rate_limiting.active_request_leases`
* `aspnetcore.rate_limiting.request_lease.duration`
* `aspnetcore.rate_limiting.queued_requests`
* `aspnetcore.rate_limiting.request.time_in_queue`
* `aspnetcore.rate_limiting.requests`

### Metric: `aspnetcore.rate_limiting.active_request_leases`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.rate_limiting.active_request_leases` | UpDownCounter | `{request}` | Number of requests that are currently active on the server that hold a rate limiting lease.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.rate_limiting.policy` | string | Rate limiting policy name. | `fixed`; `sliding`; `token` | If the matched endpoint for the request had a rate-limiting policy.

### Metric: `aspnetcore.rate_limiting.request_lease.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.rate_limiting.request_lease.duration` | Histogram | `s` | The duration of the rate limiting lease held by requests on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.rate_limiting.policy` | string | Rate limiting policy name. | `fixed`; `sliding`; `token` | If the matched endpoint for the request had a rate-limiting policy.

### Metric: `aspnetcore.rate_limiting.queued_requests`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.rate_limiting.queued_requests` | UpDownCounter | `{request}` | Number of requests that are currently queued waiting to acquire a rate limiting lease.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.rate_limiting.policy` | string | Rate limiting policy name. | `fixed`; `sliding`; `token` | If the matched endpoint for the request had a rate-limiting policy.

### Metric: `aspnetcore.rate_limiting.request.time_in_queue`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.rate_limiting.request.time_in_queue` | Histogram | `s` | The time a request spent in a queue waiting to acquire a rate limiting lease.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.rate_limiting.policy` | string | Rate limiting policy name. | `fixed`; `sliding`; `token` | If the matched endpoint for the request had a rate-limiting policy.
`aspnetcore.rate_limiting.result` | string | The rate limiting result shows whether lease was acquired or contains a rejection reason. | `acquired`; `request_canceled` | Always

### Metric: `aspnetcore.rate_limiting.requests`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.rate_limiting.requests` | Counter | `{request}` | Number of requests that tried to acquire a rate limiting lease.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.rate_limiting.policy` | string | Rate limiting policy name. | `fixed`; `sliding`; `token` | If the matched endpoint for the request had a rate-limiting policy.
`aspnetcore.rate_limiting.result` | string | The rate limiting result shows whether lease was acquired or contains a rejection reason. | `acquired`; `request_canceled` | Always

## `Microsoft.AspNetCore.HeaderParsing`

The `Microsoft.AspNetCore.HeaderParsing` metrics report information about ASP.NET Core header parsing:

* `aspnetcore.header_parsing.parse_errors`
* `aspnetcore.header_parsing.cache_accesses`

### Metric: `aspnetcore.header_parsing.parse_errors`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.header_parsing.parse_errors` | Counter | `{parse_error}` | Number of errors that occurred when parsing HTTP request headers.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.header_parsing.header.name` | string | The header name. | `Content-Type` | Always
`error.type` | string | The error message. | `Unable to parse media type value.` | Always

### Metric: `aspnetcore.header_parsing.cache_accesses`

The metric is emitted only for HTTP request header parsers that support caching.

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`aspnetcore.header_parsing.cache_accesses` | Counter | `{cache_access}` | Number of times a cache storing parsed header values was accessed.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`aspnetcore.header_parsing.header.name` | string | The header name. | `Content-Type` | Always
`aspnetcore.header_parsing.cache_access.type` | string | A value indicating whether the header's value was found in the cache or not. | `Hit`; `Miss` | Always
