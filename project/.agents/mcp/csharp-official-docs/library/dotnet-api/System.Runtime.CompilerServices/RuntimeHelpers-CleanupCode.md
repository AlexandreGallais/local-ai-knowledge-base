---
title: "RuntimeHelpers+CleanupCode delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeHelpers+CleanupCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeHelpers+CleanupCode delegate

Namespace: `System.Runtime.CompilerServices`

```csharp
public delegate void RuntimeHelpers.CleanupCode(object? userData, bool exceptionThrown);
```

Represents a method to run when an exception occurs.

Parameters:

- `userData`: Data to pass to the delegate.
- `exceptionThrown`: `true` to express that an exception was thrown; otherwise, `false`.

#### Remarks
Use the `CleanupCode` delegate with the `RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup` method.
