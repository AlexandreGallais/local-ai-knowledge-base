---
title: "ASP.NET Core built-in HTTP metrics (part 2 of 2)"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/53d05ee9faf3cfe577c6180a0a4c6966d8396ffd/aspnetcore/metrics/http.md"
commit: "53d05ee9faf3cfe577c6180a0a4c6966d8396ffd"
license: "CC-BY-4.0"
---

# ASP.NET Core built-in HTTP metrics (part 2 of 2)

## `Microsoft.AspNetCore.Server.Kestrel`

The `Microsoft.AspNetCore.Server.Kestrel` metrics report HTTP connection information from ASP.NET Core Kestrel web server:

* `kestrel.active_connections`
* `kestrel.connection.duration`
* `kestrel.rejected_connections`
* `kestrel.queued_connections`
* `kestrel.queued_requests`
* `kestrel.upgraded_connections`
* `kestrel.tls_handshake.duration`
* `kestrel.active_tls_handshakes`

> **Note:**
> In ASP.NET Core 11 and later, the Kestrel meter conforms to the OpenTelemetry semantic conventions for Kestrel web server metrics. Register it directly with the OpenTelemetry SDK (for example, call `AddMeter("Microsoft.AspNetCore.Server.Kestrel")` in your OpenTelemetry metrics pipeline) without adding the `OpenTelemetry.Instrumentation.AspNetCore` package. For details, see ASP.NET Core metrics.

### Metric: `kestrel.active_connections`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.active_connections` | UpDownCounter | `{connection}` | Number of connections that are currently active on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type`| string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port`| int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

### Metric: `kestrel.connection.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.connection.duration` | Histogram | `s` | The duration of connections on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`error.type` | string | Describes a type of error the connection ended with, or the unhandled exception type thrown during the connection pipeline. Known connection errors can be found at Semantic Conventions for Kestrel web server metrics. | `connection_reset`; `invalid_request_headers`; `System.OperationCanceledException` | If the connection ended with a known error or an exception was thrown.
`network.protocol.name` | string | OSI application layer or non-OSI equivalent. | `http`; `web_sockets` | Always
`network.protocol.version` | string | Version of the protocol specified in `network.protocol.name`. | `1.1`; `2` | Always
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.
`tls.protocol.version` | string | TLS protocol version. | `1.2`; `1.3` | If the connection is secured with TLS.

As this metric is tracking the connection duration, and ideally HTTP connections are used for multiple requests, the buckets should be longer than those used for request durations. For example, using [ 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 30, 60, 120, 300] provides an upper bucket of 5 mins.

### Metric: `kestrel.rejected_connections`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.rejected_connections` | Counter | `{connection}` | Number of connections rejected by the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.transport`| string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address`| string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

Connections are rejected when the currently active count exceeds the value configured with `MaxConcurrentConnections`.

### Metric: `kestrel.queued_connections`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.queued_connections` | UpDownCounter | `{connection}` | Number of connections that are currently queued and are waiting to start.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

### Metric: `kestrel.queued_requests`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.queued_requests` | UpDownCounter | `{request}` | Number of HTTP requests on multiplexed connections (HTTP/2 and HTTP/3) that are currently queued and are waiting to start.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.protocol.name` | string | OSI application layer or non-OSI equivalent. | `http`; `web_sockets` | Always
`network.protocol.version` | string | Version of the protocol specified in `network.protocol.name`. | `1.1`; `2` | Always
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

### Metric: `kestrel.upgraded_connections`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.upgraded_connections` | UpDownCounter | `{connection}` | Number of connections that are currently upgraded (WebSockets).

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

The counter only tracks HTTP/1.1 connections.

### Metric: `kestrel.tls_handshake.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.tls_handshake.duration` | Histogram | `s` | The duration of TLS handshakes on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`error.type` | string | The full name of exception type. | `System.OperationCanceledException`; `Contoso.MyException` | If an exception was thrown.
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.
`tls.protocol.version` | string | TLS protocol version. | `1.2`; `1.3` | If the connection is secured with TLS.

When using OpenTelemetry, the default buckets for this metric are set to [ 0.005, 0.01, 0.025, 0.05, 0.075, 0.1, 0.25, 0.5, 0.75, 1, 2.5, 5, 7.5, 10 ].

### Metric: `kestrel.active_tls_handshakes`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`kestrel.active_tls_handshakes` | UpDownCounter | `{handshake}` | Number of TLS handshakes that are currently in progress on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`network.transport` | string | OSI transport layer or inter-process communication method. | `tcp`; `unix` | Always
`network.type` | string | OSI network layer or non-OSI equivalent. | `ipv4`; `ipv6` | If the transport is `tcp` or `udp`.
`server.address` | string | Server address domain name if available without reverse DNS lookup;  otherwise, IP address or Unix domain socket name. | `example.com` | Always
`server.port` | int | Server port number | `80`; `8080`; `443` | If the transport is `tcp` or `udp`.

## `Microsoft.AspNetCore.Http.Connections`

The `Microsoft.AspNetCore.Http.Connections` metrics report connection information from ASP.NET Core SignalR:

* `signalr.server.connection.duration`
* `signalr.server.active_connections`

### Metric: `signalr.server.connection.duration`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`signalr.server.connection.duration` | Histogram | `s` | The duration of connections on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`signalr.connection.status` | string | SignalR HTTP connection closure status. | `app_shutdown`; `timeout` | Always
`signalr.transport` | string | SignalR transport type | `web_sockets`; `long_polling` | Always

Value | Description
--- | ---
`normal_closure` | The connection was closed normally.
`timeout` | The connection was closed due to a timeout.
`app_shutdown` | The connection was closed because the app is shutting down.

`signalr.transport` is one of the following:

Value | Description
--- | ---
`server_sent_events` | server-sent events
`long_polling` | Long Polling
`web_sockets` | WebSocket

As this metric is tracking the connection duration, and ideally SignalR connections are durable, the buckets should be longer than those used for request durations. For example, using [0, 0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 30, 60, 120, 300] provides an upper bucket of 5 mins.

### Metric: `signalr.server.active_connections`

Name | Instrument Type | Unit (UCUM) | Description
--- | --- | --- | ---
`signalr.server.active_connections` | UpDownCounter | `{connection}` | Number of connections that are currently active on the server.

Attribute | Type | Description | Examples | Presence
--- | --- | --- | --- | ---
`signalr.connection.status` | string | SignalR HTTP connection closure status. | `app_shutdown`; `timeout` | Always
`signalr.transport` | string | SignalR transport type | `web_sockets`; `long_polling` | Always

## Related content

* ASP.NET Core built-in metrics
* ASP.NET Core built-in diagnostics metrics
* ASP.NET Core built-in Blazor (Razor components) metrics
* ASP.NET Core built-in authentication and authorization metrics
* ASP.NET Core metrics
