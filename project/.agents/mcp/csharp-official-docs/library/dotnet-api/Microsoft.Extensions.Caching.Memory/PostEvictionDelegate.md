---
title: "PostEvictionDelegate delegate"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Caching.Memory/PostEvictionDelegate.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PostEvictionDelegate delegate

Namespace: `Microsoft.Extensions.Caching.Memory`

```csharp
public delegate void PostEvictionDelegate(object key, object? value, EvictionReason reason, object? state);
```

Represents the callback method that gets called when a cache entry expires.

Parameters:

- `key`: The key of the entry being evicted.
- `value`: The value of the entry being evicted.
- `reason`: The `EvictionReason`.
- `state`: The information that was passed when registering the callback.

To be added.
