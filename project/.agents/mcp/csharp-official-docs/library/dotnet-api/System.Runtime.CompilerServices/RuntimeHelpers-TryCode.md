---
title: "RuntimeHelpers+TryCode delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.CompilerServices/RuntimeHelpers+TryCode.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RuntimeHelpers+TryCode delegate

Namespace: `System.Runtime.CompilerServices`

```csharp
public delegate void RuntimeHelpers.TryCode(object? userData);
```

Represents a delegate to code that should be run in a try block.

Parameters:

- `userData`: Data to pass to the delegate.

#### Remarks
Use the `TryCode` delegate with the `RuntimeHelpers.ExecuteCodeWithGuaranteedCleanup` method.
