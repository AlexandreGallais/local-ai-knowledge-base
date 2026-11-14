---
title: "LoggerMessageHelper class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerMessageHelper.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerMessageHelper class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public static class LoggerMessageHelper
```

Utility type to support generated logging methods.

To be added.

## LoggerMessageHelper.ThreadLocalState property

```csharp
public static Microsoft.Extensions.Logging.LoggerMessageState ThreadLocalState { get; }
```

Gets a thread-local instance of this type.

Returns: To be added.

If the current thread's instance is in use, a new instance is returned so that nested logging calls on the same
thread don't share it.

## LoggerMessageHelper.Stringify(IEnumerable) method

```csharp
public static string Stringify (System.Collections.IEnumerable? enumerable);
```

Enumerates an enumerable into a string.

Parameters:

- `enumerable`: The enumerable object.

Returns: A string representation of the enumerable.

To be added.

## LoggerMessageHelper.Stringify<TKey,TValue>(KeyValuePair<TKey,TValue>>) method

```csharp
public static string Stringify<TKey,TValue> (System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<TKey,TValue>>? enumerable);
```

Enumerates an enumerable of key/value pairs into a string.

Parameters:

- `TKey`: Type of keys.
- `TValue`: Type of values.
- `enumerable`: The enumerable object.

Returns: A string representation of the enumerable.

To be added.
