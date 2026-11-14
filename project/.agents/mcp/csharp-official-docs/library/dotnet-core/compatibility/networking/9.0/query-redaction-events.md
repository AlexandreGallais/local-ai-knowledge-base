---
title: "URI query redaction in HttpClient EventSource events"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/networking/9.0/query-redaction-events.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# URI query and fragment redaction in HttpClient EventSource events

In .NET 9, the default behavior of `System.Diagnostics.Tracing.EventSource` events emitted by `System.Net.Http.HttpClient` and `System.Net.Http.SocketsHttpHandler` (`EventSource` name: `System.Net.Http`) has been modified to scrub the query, user info, and fragment parts of the URI. This change enhances privacy by preventing the logging of potentially sensitive information contained in query strings while keeping the performance costs of the redaction minimal. If necessary, you can override this behavior.

## Version introduced

.NET 9 Preview 7

## Previous behavior

Previously, events emitted by `HttpClient` and `SocketsHttpHandler` included query string information, which could inadvertently expose sensitive information.

## New behavior

With the change in dotnet/runtime#104741, the query part is replaced by a `*` character, and the user info and fragment parts are removed in `HttpClient` and `SocketsHttpHandler` events by default. This change affects specific events and parameters, such as `pathAndQuery` in `RequestStart` and `redirectUri` in `Redirect`.

## Type of breaking change

This change is a behavioral change.

## Reason for change

The primary reason for this change was to enhance privacy by reducing the risk of sensitive information being logged inadvertently. Query strings often contain sensitive data, and redacting them from logs by default helps protect this information. To keep the implementation simple and efficient, the user info and fragment parts are also scrubbed.

## Recommended action

If you need query string information when consuming `HttpClient` or `SocketsHttpHandler` events and you're confident that it's safe to do so, you can disable URI redaction globally by setting an AppContext switch in one of three ways. The switch skips any redaction, so URIs are reported as-is, including the query, user info, and fragment parts.

- In the project file.

  ```xml
  <ItemGroup>
    <RuntimeHostConfigurationOption Include="System.Net.Http.DisableUriRedaction" Value="true" />
  </ItemGroup>
  ```

- In the *runtimeconfig.json* file.

  ```json
  {
      "runtimeOptions": {
          "configProperties": {
              "System.Net.Http.DisableUriRedaction": true
          }
      }
  }
  ```

- Through an environment variable.

  Set `DOTNET_SYSTEM_NET_HTTP_DISABLEURIREDACTION` to `true` or 1.

Otherwise, no action is required, and the default behavior will help enhance the privacy aspects of your application.

> **Note:**
> This switch also skips URI redaction in the default `IHttpClientFactory` logs. For more information, see URI query redaction in IHttpClientFactory logs.

## Affected APIs

- System.Net.Http.SocketsHttpHandler.Send)
- System.Net.Http.SocketsHttpHandler.SendAsync)
