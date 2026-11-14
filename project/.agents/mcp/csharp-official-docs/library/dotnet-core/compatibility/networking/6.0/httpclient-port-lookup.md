---
title: "Breaking change: Port removed from SPN for Kerberos and Negotiate"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/6.0/httpclient-port-lookup.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Port removed from SPN for Kerberos and Negotiate

When using `System.Net.Http.HttpClient` with Kerberos or Negotiate authentication, non-default ports are no longer included in service principal names (SPN) to look up services. This new .NET 6 behavior is consistent with .NET Core 3.1 and earlier versions.

## Previous behavior

If you connected to a service on a non-default port, .NET 5 included a `port` component when constructing the SPN to look up the service.

## New behavior

Starting in .NET 6, by default, the SPN is not constructed with a `port` component, even for non-default ports.

## Version introduced

6.0 RC 1

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

We want to bring back the behavior from .NET Core 1.0 - 3.1 that customers had started to depend on.

## Recommended action

If you need to preserve .NET 5 behavior, you can set the app context switch `System.Net.Http.UsePortInSpn` or the environment variable `DOTNET_SYSTEM_NET_HTTP_USEPORTINSPN` to `true`.

## Affected APIs

- `System.Net.Http.HttpClient` behavior
