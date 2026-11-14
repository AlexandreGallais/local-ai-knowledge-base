---
title: "Networking config settings (part 1 of 2)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/runtime-config/networking.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Runtime configuration options for networking

## HTTP/2 protocol

- Configures whether support for the HTTP/2 protocol is enabled.
- If you omit this setting, support for the HTTP/2 protocol is enabled. This is equivalent to setting the value to `true`.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Http.SocketsHttpHandler.Http2Support` | `false` - disabled`true` - enabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP2SUPPORT` | `0` - disabled`1` - enabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## HTTP/3 protocol

- Starting in .NET 7, HTTP/3 is enabled by default.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.SocketsHttpHandler.Http3Support` | `false` - disabled `true` - enabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP3SUPPORT` | `0` - disabled`1` - enabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## SPN creation in HttpClient (.NET 6 and later)

- Impacts generation of service principal names (SPN) for Kerberos and NTLM authentication when `Host` header is missing and the target isn't running on the default port.
- .NET 6 and later versions don't include the port in the SPN by default. However, the behavior is configurable.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Http.UsePortInSpn` | `true` - include port number in SPN, for example, `HTTP/host:port``false` - don't include port in SPN, for example, `HTTP/host` |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_USEPORTINSPN` | `1` - include port number in SPN, for example, `HTTP/host:port``0` - don't include port in SPN, for example, `HTTP/host` |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Managed NTLM authentication

On non-Windows platforms, the system GSSAPI implementation might not provide NTLM, might require an additional native NTLM provider, or might have compatibility issues. Set this option to `true` when an application must authenticate to an existing NTLM service and the system provider can't complete the authentication. .NET then uses its built-in managed implementation of NTLM and SPNEGO for HTTP and SMTP authentication and `System.Net.Security.NegotiateAuthentication`.

> **Important:**
> NTLM is a legacy authentication protocol and uses cryptographic algorithms that don't meet current recommendations. Enable managed NTLM only when required for compatibility with existing systems. Negotiate prefers Kerberos when available but can fall back to NTLM. To prevent NTLM, request Kerberos explicitly when supported or use a modern authentication protocol.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Security.UseManagedNtlm` | `false` - use the system GSSAPI implementation`true` - use the built-in managed NTLM and SPNEGO implementation |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## HTTP/2 dynamic window scaling

- Configures whether the HTTP/2 dynamic window scaling algorithm is disabled for flow control. The algorithm is enabled by default.
- When set to `true`, the dynamic window scaling algorithm is disabled.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.SocketsHttpHandler.Http2FlowControl.DisableDynamicWindowSizing` | `false` - enabled (default)`true` - disabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_HTTP2FLOWCONTROL_DISABLEDYNAMICWINDOWSIZING` | `0` - enabled (default)`1` - disabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## HTTP/2 stream receive window size

- Configures the maximum size of the HTTP/2 stream receive window.
- Defaults to 16 MB. Values below 65,535 are clamped to 65,535. There's no hard upper limit, but increasing this setting beyond the default is only beneficial on networks that are both high throughput and high latency.

| | Setting name | Values |
| - | - | - |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_FLOWCONTROL_MAXSTREAMWINDOWSIZE` | Integer (default: 16 MB; minimum: 65,535) |

## HTTP/2 stream window scale threshold

- Configures the multiplier that controls how aggressively the HTTP/2 stream-receive window grows. Higher values result in a more conservative window growth, which reduces peak throughput.
- Defaults to 1.0. Values below 0 are reset to the default. There's no hard upper limit, but values much above the default progressively limit per-request throughput.

> **Note:**
> This setting is intended for advanced diagnostics and internal tuning. Most developers don't need to change it.

| | Setting name | Values |
| - | - | - |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_FLOWCONTROL_STREAMWINDOWSCALETHRESHOLDMULTIPLIER` | Float (default: 1.0; minimum: 0) |

## HTTP activity propagation

Configures whether distributed tracing activity propagation is enabled for `System.Net.Http.HttpClient`. When enabled, outgoing HTTP requests propagate trace context headers (such as `traceparent`) for distributed tracing tools like OpenTelemetry.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Http.EnableActivityPropagation` | `true` - enabled (default)`false` - disabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_ENABLEACTIVITYPROPAGATION` | `1` - enabled (default)`0` - disabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Pending connection timeout on request completion

Configures the timeout (in milliseconds) for completing a pending connection attempt after its initiating HTTP request finishes. When a connection is still being established after the request completes, this timeout determines how long to wait before abandoning the connection attempt.

- Defaults to `5000` (5 seconds).
- Set to `-1` to wait indefinitely until the connection completes.
- Set to `0` to cancel the pending connection immediately when the request completes.
- There's no hard upper limit, but very large values are impractical.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.SocketsHttpHandler.PendingConnectionTimeoutOnRequestCompletion` | Integer (default: `5000`) |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_PENDINGCONNECTIONTIMEOUTONREQUESTCOMPLETION` | Integer (default: `5000`) |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Proxy pre-authentication

When enabled, `System.Net.Http.SocketsHttpHandler` proactively sends `Basic` proxy authentication credentials on the first request instead of waiting for a `407` challenge response from the proxy. This is useful for proxies that don't send `407` challenge responses.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Http.SocketsHttpHandler.ProxyPreAuthenticate` | `false` - disabled (default)`true` - enabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_PROXYPREAUTHENTICATE` | `0` - disabled (default)`1` - enabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Maximum connections per server

Configures the maximum number of simultaneous TCP connections that `System.Net.Http.SocketsHttpHandler` opens to a single server. The handler ignores values less than `1` and uses the default.

- Defaults to unlimited (`int.MaxValue`).

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.SocketsHttpHandler.MaxConnectionsPerServer` | Integer (default: unlimited) |
| **Environment variable** | `DOTNET_SYSTEM_NET_HTTP_SOCKETSHTTPHANDLER_MAXCONNECTIONSPERSERVER` | Integer (default: unlimited) |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Socket inline completions

Configures whether socket continuations are allowed to run on the event thread instead of being dispatched to the `System.Threading.ThreadPool`. Enabling this setting can improve performance in some scenarios. However, it might degrade performance if expensive work holds the I/O thread for longer than needed.

> **Note:**
> Test to make sure enabling this setting helps performance in your specific scenario.

| | Setting name | Values |
| - | - | - |
| **Environment variable** | `DOTNET_SYSTEM_NET_SOCKETS_INLINE_COMPLETIONS` | `0` - disabled (default)`1` - enabled |

## Socket thread count

Configures the number of threads used for socket I/O. When not overridden, the value is calculated based on processor count and architecture. Practical values are in the range `[1, ProcessorCount]`. Values outside this range aren't rejected but are unlikely to improve performance.

> **Note:**
> This setting is intended for extreme load scenarios. Most developers don't need to change it.

| | Setting name | Values |
| - | - | - |
| **Environment variable** | `DOTNET_SYSTEM_NET_SOCKETS_THREAD_COUNT` | Integer |

## IPv6

Configures whether Internet Protocol version 6 (IPv6) is disabled.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.DisableIPv6` | `false` - enabled (default)`true` - disabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_DISABLEIPV6` | `0` - enabled (default)`1` - disabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## TLS session resumption

Control whether TLS session resumption disables TLS session resumption for `System.Net.Security.SslStream`. Session resumption allows TLS reconnections to skip a full handshake by reusing previously negotiated session parameters, which reduces latency.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Security.DisableTlsResume` | `false` - enabled (default)`true` - disabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_SECURITY_DISABLETLSRESUME` | `0` - enabled (default)`1` - disabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## Server AIA downloads

When enabled, the TLS client automatically downloads intermediate certificates from Authority Information Access (AIA) extension URLs in server certificates. This allows the client to build a complete certificate chain even when the server doesn't send the full chain.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Security.EnableServerAiaDownloads` | `false` - disabled (default)`true` - enabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_SECURITY_ENABLESERVERAIADOWNLOADS` | `0` - disabled (default)`1` - enabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## QUIC configuration caching

Disables caching of MsQuic configuration objects. When enabled (default), the system caches and reuses configuration objects across connections, which reduces the overhead of TLS and QUIC setup for repeated connections with the same parameters.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Quic.DisableConfigurationCache` | `false` - caching enabled (default)`true` - caching disabled |
| **Environment variable** | `DOTNET_SYSTEM_NET_QUIC_DISABLE_CONFIGURATION_CACHE` | `0` - caching enabled (default)`1` - caching disabled |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.

## App-local MsQuic (Windows)

When enabled, the QUIC implementation uses the MsQuic library from the application directory instead of the system-provided library bundled with the .NET assembly.

| | Setting name | Values |
| - | - | - |
| **runtimeconfig.json** | `System.Net.Quic.AppLocalMsQuic` | `false` - use system MsQuic (default)`true` - use app-local MsQuic |

This configuration setting doesn't have a specific MSBuild property. However, you can add a `RuntimeHostConfigurationOption` MSBuild item instead. Use the *runtimeconfig.json* setting name as the value of the `Include` attribute. For an example, see MSBuild properties.
