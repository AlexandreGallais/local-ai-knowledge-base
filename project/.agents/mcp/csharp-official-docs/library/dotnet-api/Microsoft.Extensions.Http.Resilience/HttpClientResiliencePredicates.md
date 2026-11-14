---
title: "HttpClientResiliencePredicates class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/HttpClientResiliencePredicates.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HttpClientResiliencePredicates class

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public static class HttpClientResiliencePredicates
```

Provides static predicates used within the current package.

To be added.

## HttpClientResiliencePredicates.IsTransient(HttpResponseMessage>) method

```csharp
public static bool IsTransient (Polly.Outcome<System.Net.Http.HttpResponseMessage> outcome);
```

Determines whether an outcome should be treated by resilience strategies as a transient failure.

Parameters:

- `outcome`: To be added.

Returns: `true` if outcome is transient, `false` if not.

To be added.

## HttpClientResiliencePredicates.IsTransient(HttpResponseMessage>, CancellationToken) method

```csharp
public static bool IsTransient (Polly.Outcome<System.Net.Http.HttpResponseMessage> outcome, System.Threading.CancellationToken <example-value>);
```

Determines whether an `HttpResponseMessage` should be treated by resilience strategies as a transient failure.

Parameters:

- `outcome`: The outcome of the user-specified callback.
- `cancellationToken`: The `CancellationToken` associated with the execution.

Returns: `true` if outcome is transient, `false` if not.

To be added.
