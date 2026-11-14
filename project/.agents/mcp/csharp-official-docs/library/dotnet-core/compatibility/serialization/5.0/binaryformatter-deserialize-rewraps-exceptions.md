---
title: "Breaking change: BinaryFormatter.Deserialize rewraps some exceptions"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/serialization/5.0/binaryformatter-deserialize-rewraps-exceptions.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# BinaryFormatter.Deserialize rewraps some exceptions in SerializationException

The `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*` method now rewraps some exception objects inside a `System.Runtime.Serialization.SerializationException` before propagating the exception back to the caller.

## Change description

Previously, the `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*` method allowed some arbitrary exceptions, such as `System.ArgumentNullException`, to propagate up the stack to its callers.

In .NET 5 and later, the `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*` method more aggressively catches exceptions that occur due to invalid deserialization operations and wraps them in a `System.Runtime.Serialization.SerializationException`.

## Version introduced

5.0

## Recommended action

In most cases, you don't need to take any action. However, if your call site depends on a particular exception being thrown, you can unwrap the exception from the outer `System.Runtime.Serialization.SerializationException`, as shown in the following example.

```csharp
Stream inputStream = GetInputStream();
var formatter = new BinaryFormatter();

try
{
    object deserialized = formatter.Deserialize(inputStream);
}
catch (MyException myEx)
{
    // Handle 'myEx' here in case it was thrown directly.
}
catch (SerializationException serEx) when (serEx.InnerException is MyException myEx)
{
    // Handle 'myEx' here in case it was wrapped in SerializationException.
}
```

## Affected APIs

- `System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize*`
