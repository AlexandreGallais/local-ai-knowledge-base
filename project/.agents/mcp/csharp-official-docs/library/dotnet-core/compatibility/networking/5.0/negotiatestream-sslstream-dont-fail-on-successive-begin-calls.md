---
title: "Breaking change: NegotiateStream and SslStream allow successive Begin operations"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/5.0/negotiatestream-sslstream-dont-fail-on-successive-begin-calls.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NegotiateStream and SslStream allow successive Begin operations

Error cases on security streams are handled differently, and successive calls to `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` may no longer fail.

## Version introduced

5.0

## Change description

In previous .NET versions, calling `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` successively without first calling `EndAuthenticateAsServer` or `EndAuthenticateAsClient` results in a `System.NotSupportedException`. Starting in .NET 5, successive calls to `BeginAuthenticateAsServer` or `BeginAuthenticateAsClient` no longer result in a `System.NotSupportedException`, because these APIs are backed by a `System.Threading.Tasks.Task`-based implementation.

## Reason for change

Switching the internal implementation from asynchronous programming model (APM) to `System.Threading.Tasks.Task`-based improves performance and decreases code complexity.

## Recommended action

No action is required on the part of the developer.

## Affected APIs

- `System.Net.Security.SslStream.BeginAuthenticateAsServer*`
- `System.Net.Security.SslStream.BeginAuthenticateAsClient*`
- `System.Net.Security.NegotiateStream.BeginAuthenticateAsServer*`
- `System.Net.Security.NegotiateStream.BeginAuthenticateAsClient*`
