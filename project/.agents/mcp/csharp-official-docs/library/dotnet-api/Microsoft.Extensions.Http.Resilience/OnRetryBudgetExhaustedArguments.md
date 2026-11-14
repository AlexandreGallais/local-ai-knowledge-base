---
title: "OnRetryBudgetExhaustedArguments struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Http.Resilience/OnRetryBudgetExhaustedArguments.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OnRetryBudgetExhaustedArguments struct

Namespace: `Microsoft.Extensions.Http.Resilience`

```csharp
public readonly struct OnRetryBudgetExhaustedArguments
```

Arguments of the `OnRetryBudgetExhausted` resilience event.

To be added.

## OnRetryBudgetExhaustedArguments.OnRetryBudgetExhaustedArguments(Int32) constructor

```csharp
public OnRetryBudgetExhaustedArguments (int attemptNumber);
```

Initializes a new instance of the `OnRetryBudgetExhaustedArguments` struct.

Parameters:

- `attemptNumber`: The zero-based number of the attempt whose retry was denied.

To be added.

## OnRetryBudgetExhaustedArguments.AttemptNumber property

```csharp
public int AttemptNumber { get; }
```

Gets the zero-based number of the attempt whose retry was denied.

Returns: To be added.

To be added.
