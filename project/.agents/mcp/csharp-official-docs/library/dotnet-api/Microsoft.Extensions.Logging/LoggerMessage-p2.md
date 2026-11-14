---
title: "LoggerMessage class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/LoggerMessage.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LoggerMessage class (part 2 of 2)

## LoggerMessage.DefineScope<T1,T2,T3,T4,T5>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,IDisposable?> DefineScope<T1,T2,T3,T4,T5> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.

## LoggerMessage.DefineScope<T1,T2,T3,T4,T5,T6>(String) method

```csharp
public static Func<Microsoft.Extensions.Logging.ILogger,T1,T2,T3,T4,T5,T6,IDisposable?> DefineScope<T1,T2,T3,T4,T5,T6> (string formatString);
```

Creates a delegate that can be invoked to create a log scope.

Parameters:

- `T1`: The type of the first parameter passed to the named format string.
- `T2`: The type of the second parameter passed to the named format string.
- `T3`: The type of the third parameter passed to the named format string.
- `T4`: The type of the fourth parameter passed to the named format string.
- `T5`: The type of the fifth parameter passed to the named format string.
- `T6`: The type of the sixth parameter passed to the named format string.
- `formatString`: The named format string.

Returns: A delegate that, when invoked, creates a log scope.

To be added.
