---
title: "OptionsMonitorExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Options/OptionsMonitorExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OptionsMonitorExtensions class

Namespace: `Microsoft.Extensions.Options`

```csharp
public static class OptionsMonitorExtensions
```

Extension methods for `IOptionsMonitor<T>`.

To be added.

## OptionsMonitorExtensions.OnChange<TOptions>(IOptionsMonitor<TOptions>, Action<TOptions>) method

```csharp
public static IDisposable? OnChange<TOptions> (this Microsoft.Extensions.Options.IOptionsMonitor<TOptions> monitor, Action<TOptions> listener);
```

Registers a listener to be called whenever `TOptions` changes.

Parameters:

- `TOptions`: The type of options instance being monitored.
- `monitor`: The IOptionsMonitor.
- `listener`: The action to be invoked when `TOptions` has changed.

Returns: An object that should be disposed to stop listening for changes.

To be added.
